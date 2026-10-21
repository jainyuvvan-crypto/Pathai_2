const engine = window.PathAIEngine;
const nav = document.querySelectorAll('[data-view]');
const panels = document.querySelectorAll('[data-view-panel]');
const search = document.querySelector('#global-search');
const suggestions = document.querySelector('#search-suggestions');
const goal = document.querySelector('#goal');
const generated = document.querySelector('#generated');
const output = document.querySelector('#roadmap-output');
const roadmapLibrary = document.querySelector('#roadmap-library');
const resources = window.PathAIResourceLibrary || { all: [], categories: [], count: 0 };
const starters = window.PathAIStarterLibrary || { all: [], categories: [], count: 0 };
const FREE_ROADMAP_LIMIT = 2;
let activeRoadmap = null;

const companionResources = [
  { title: 'CS50x: Introduction to Computer Science', provider: 'Harvard University', type: 'Course', url: 'https://cs50.harvard.edu/x/?nt=1', description: 'A full introductory computer science course covering problem solving, C, Python, SQL, web programming, and a final project.', difficulty: 'Beginner', duration: '10 weeks', topics: ['coding', 'python', 'programming', 'computer science'] },
  { title: 'CS50’s Introduction to AI with Python', provider: 'Harvard University', type: 'Course', url: 'https://cs50.harvard.edu/ai/?hl=en-US', description: 'A project-based course covering search, classification, optimisation, machine learning, and language models.', difficulty: 'Intermediate', duration: '7 weeks', topics: ['ai', 'machine learning', 'python', 'coding'] },
  { title: 'Harvard CS50 visual lectures', provider: 'YouTube discovery', type: 'Video search', url: 'https://www.youtube.com/results?search_query=Harvard+CS50+computer+science', description: 'Find lecture and short-form explanations from the official CS50 ecosystem and related visual lessons.', difficulty: 'Beginner', duration: 'Varies', topics: ['coding', 'python', 'programming', 'computer science'] },
  { title: 'MIT Introduction to Computer Science and Programming in Python', provider: 'MIT OpenCourseWare', type: 'Course', url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/', description: 'A university-level introduction to computational thinking and programming in Python.', difficulty: 'Beginner', duration: '9 weeks', topics: ['coding', 'python', 'programming', 'computer science'] },
  { title: 'Machine Learning Crash Course', provider: 'Google', type: 'Course', url: 'https://developers.google.com/machine-learning/crash-course', description: 'Practical lessons, visualisations, and exercises for core machine-learning concepts.', difficulty: 'Intermediate', duration: '15 hrs', topics: ['ai', 'machine learning', 'data'] },
  { title: 'Hugging Face Course', provider: 'Hugging Face', type: 'Course', url: 'https://huggingface.co/learn/nlp-course/chapter1/1', description: 'Hands-on lessons for transformers and natural-language applications.', difficulty: 'Intermediate', duration: '12+ hrs', topics: ['ai', 'machine learning', 'nlp'] },
  { title: 'MIT OpenCourseWare management search', provider: 'MIT OpenCourseWare', type: 'Course library', url: 'https://ocw.mit.edu/search/?d=Management', description: 'Open university materials for strategy, management, and entrepreneurship.', difficulty: 'Intermediate', duration: 'Varies', topics: ['business', 'startup', 'management'] },
  { title: 'Finance and capital markets', provider: 'Khan Academy', type: 'Course', url: 'https://www.khanacademy.org/economics-finance-domain', description: 'Approachable lessons for financial literacy, markets, and economic reasoning.', difficulty: 'Beginner', duration: 'Varies', topics: ['finance', 'accounting', 'economics'] },
];

const currentPlan = () => localStorage.getItem('pathai.plan') || 'free';
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]));
const PROFILE_KEY = 'pathai.profile.v1';
const auth = window.PathAIAuth;
const session = auth.getSession() || { provider: 'email', name: 'Learner', email: '', picture: '' };
const onboarding = (() => { try { return JSON.parse(localStorage.getItem('pathai.onboarding.v1') || '{}'); } catch { return {}; } })();
const PROFILE_INTERESTS = ['AI', 'Coding', 'Business', 'Finance', 'Literature', 'Design', 'Science', 'Languages'];
const usernameFrom = (email) => email.split('@')[0].toLowerCase().replace(/[^a-z0-9_.]/g, '').slice(0, 24) || 'learner';
const defaultProfile = { owner: session.email, username: usernameFrom(session.email), displayName: session.name, email: session.email, pace: 'Steady · 3 hours a week', bio: '', interests: (onboarding.interests || []).filter((interest) => PROFILE_INTERESTS.includes(interest)), photo: session.picture || '' };
const readProfile = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
    return saved.owner === session.email ? { ...defaultProfile, ...saved } : { ...defaultProfile };
  } catch { return { ...defaultProfile }; }
};
let profile = readProfile();
let profileDraft = { ...profile };
const initialsFor = (name) => name.trim().split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'AL';
const renderProfile = (nextProfile = profileDraft) => {
  document.querySelectorAll('[data-profile-avatar]').forEach((avatar) => {
    avatar.textContent = nextProfile.photo ? '' : initialsFor(nextProfile.displayName);
    avatar.classList.toggle('has-photo', Boolean(nextProfile.photo));
    avatar.style.backgroundImage = nextProfile.photo ? `url(${nextProfile.photo})` : '';
  });
  document.querySelectorAll('[data-profile-display], [data-profile-preview]').forEach((node) => { node.textContent = nextProfile.displayName; });
  document.querySelectorAll('[data-profile-username], [data-username-preview]').forEach((node) => { node.textContent = `@${nextProfile.username}`; });
  document.querySelector('#greeting')?.firstChild && (document.querySelector('#greeting').firstChild.textContent = `Welcome back, ${nextProfile.displayName}`);
  const fields = { '#profile-username': nextProfile.username, '#profile-display-name': nextProfile.displayName, '#profile-email': nextProfile.email, '#profile-pace': nextProfile.pace, '#profile-bio': nextProfile.bio };
  Object.entries(fields).forEach(([selector, value]) => { const field = document.querySelector(selector); if (field) field.value = value; });
  document.querySelectorAll('[data-interest]').forEach((button) => button.classList.toggle('selected', nextProfile.interests.includes(button.dataset.interest)));
  const count = document.querySelector('#interest-count'); if (count) count.textContent = `${nextProfile.interests.length} selected`;
  const bioCount = document.querySelector('#bio-count'); if (bioCount) bioCount.textContent = String(nextProfile.bio.length);
};
const updatePlanUI = () => {
  const savedCount = engine.getRoadmaps().length;
  const plus = currentPlan() === 'plus';
  document.querySelector('[data-plan-label]')?.replaceChildren(document.createTextNode(plus ? 'AI Plus · unlimited roadmaps' : `Free plan · ${Math.max(0, FREE_ROADMAP_LIMIT - savedCount)} left`));
  document.querySelectorAll('[data-plan-status]').forEach((node) => node.replaceChildren(document.createTextNode(plus ? 'AI PLUS' : 'FREE PLAN')));
  document.querySelector('[data-plan-limit]')?.replaceChildren(document.createTextNode(plus ? 'Unlimited roadmaps' : `${Math.max(0, FREE_ROADMAP_LIMIT - savedCount)} roadmaps left`));
  document.querySelector('[data-roadmap-count]')?.replaceChildren(document.createTextNode(String(savedCount)));
};

const applyTheme = (theme) => {
  const selected = theme === 'dark' ? 'dark' : 'light';
  document.body.dataset.theme = selected;
  localStorage.setItem('pathai.theme', selected);
  document.querySelectorAll('[data-theme-choice]').forEach((button) => button.classList.toggle('selected', button.dataset.themeChoice === selected));
};
renderProfile();
applyTheme(localStorage.getItem('pathai.theme') || 'light');

document.querySelectorAll('[data-interest]').forEach((button) => button.addEventListener('click', () => {
  const interests = new Set(profileDraft.interests);
  interests.has(button.dataset.interest) ? interests.delete(button.dataset.interest) : interests.add(button.dataset.interest);
  profileDraft.interests = [...interests];
  renderProfile(profileDraft);
}));
document.querySelector('#profile-bio')?.addEventListener('input', (event) => { profileDraft.bio = event.target.value; const counter = document.querySelector('#bio-count'); if (counter) counter.textContent = String(event.target.value.length); });
document.querySelector('#profile-photo')?.addEventListener('change', (event) => {
  const [file] = event.target.files;
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => { profileDraft.photo = String(reader.result); renderProfile(profileDraft); });
  reader.readAsDataURL(file);
});
document.querySelector('#save-profile')?.addEventListener('click', () => {
  profileDraft = { ...profileDraft, owner: session.email, username: document.querySelector('#profile-username')?.value.trim().replace(/^@+/, '') || defaultProfile.username, displayName: document.querySelector('#profile-display-name')?.value.trim() || defaultProfile.displayName, email: document.querySelector('#profile-email')?.value.trim() || defaultProfile.email, pace: document.querySelector('#profile-pace')?.value || defaultProfile.pace, bio: document.querySelector('#profile-bio')?.value.trim() || '', interests: [...document.querySelectorAll('[data-interest].selected')].map((button) => button.dataset.interest) };
  profile = { ...profileDraft };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  renderProfile(profile);
  const feedback = document.querySelector('#profile-save-feedback'); if (feedback) { feedback.textContent = 'Profile saved'; window.setTimeout(() => { feedback.textContent = ''; }, 2400); }
  const status = document.querySelector('#settings-status'); if (status) status.textContent = 'Saved just now.';
});
document.querySelectorAll('[data-theme-choice]').forEach((button) => button.addEventListener('click', () => applyTheme(button.dataset.themeChoice)));
document.querySelectorAll('[data-session-label]').forEach((node) => { node.textContent = `${session.provider === 'google' ? 'Google' : 'Email'} · ${session.email}`; });
document.querySelectorAll('[data-logout]').forEach((button) => button.addEventListener('click', () => { auth.signOut(); window.location.replace('./index.html'); }));

const switchView = (view) => {
  nav.forEach((item) => item.classList.toggle('active', item.dataset.view === view));
  panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.viewPanel === view));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
nav.forEach((item) => item.addEventListener('click', () => switchView(item.dataset.view)));

search.addEventListener('focus', () => { suggestions.hidden = false; });
search.addEventListener('input', () => { suggestions.hidden = false; });
document.addEventListener('click', (event) => { if (!event.target.closest('.global-search')) suggestions.hidden = true; });
document.addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); search.focus(); } });
document.querySelectorAll('[data-search-fill]').forEach((item) => item.addEventListener('click', () => { search.value = item.dataset.searchFill; suggestions.hidden = true; goal.value = `I want to learn ${item.dataset.searchFill}`; switchView('home'); goal.focus(); }));
document.querySelectorAll('[data-focus-goal]').forEach((button) => button.addEventListener('click', () => { switchView('home'); goal.focus(); goal.scrollIntoView({ behavior: 'smooth', block: 'center' }); }));

const displayTitle = (value) => value.trim().replace(/^I want to learn /i, '').replace(/^I want to /i, '').replace(/\.$/, '') || 'Your learning path';
const resourceIconAsset = (resource) => {
  const subject = `${resource.category || ''} ${(resource.topics || []).join(' ')} ${resource.title || ''}`.toLowerCase();
  if (/ai|machine learning|neural|nlp|prompt|transformer/.test(subject)) return 'spark.png';
  if (/cod|python|javascript|software|programming|web|api|github/.test(subject)) return 'code.png';
  if (/finance|account|economics|market|budget|invest/.test(subject)) return 'finance.png';
  if (/business|startup|management|sales|career|portfolio/.test(subject)) return 'briefcase.png';
  if (/literature|reading|poetry|english|language|grammar|writing/.test(subject)) return /english|language|grammar|pronunciation/.test(subject) ? 'language.png' : 'book.png';
  if (/design|ux|ui|figma|creative|art/.test(subject)) return 'art.png';
  if (/psychology|behavior|motivation|social/.test(subject)) return 'users.png';
  if (/math|algebra|calculus|geometry|probability|statistics|science|research|biology|physics|data/.test(subject)) return 'science.png';
  const type = String(resource.type || '').toLowerCase();
  if (type.includes('video')) return 'video.png';
  if (type.includes('course')) return 'learning-apps.png';
  if (type.includes('documentation')) return 'source-sheet.png';
  if (type.includes('read')) return 'book.png';
  return 'spark.png';
};
const resourceIconMarkup = (resource, className = 'resource-pixel-icon') => `<img class="${className}" src="./public/assets/pathai-icons/${resourceIconAsset(resource)}" alt="" aria-hidden="true" />`;
const resourceRegistry = new Map();
companionResources.forEach((resource, index) => resourceRegistry.set(`companion-${index}`, { ...resource, id: `companion-${index}` }));
const renderResource = (resource) => { if (resource.id) resourceRegistry.set(resource.id, resource); return `<button class="step-resource" type="button" data-open-resource="${resource.id || ''}"><span class="resource-type" title="${escapeHTML(resource.type)}">${resourceIconMarkup(resource)}<span class="sr-only">${escapeHTML(resource.type)}</span></span><span><strong>${escapeHTML(resource.title)}</strong><small>${escapeHTML(resource.provider)} · ${escapeHTML(resource.duration)} · ${escapeHTML(resource.difficulty)}</small><em>${escapeHTML(resource.description)}</em></span><b class="resource-arrow" aria-hidden="true">↗</b></button>`; };

const getRelatedResources = (resource) => {
  if (activeRoadmap) {
    const steps = activeRoadmap.phases.flatMap((phase) => phase.steps);
    const owner = steps.find((step) => step.resources.some((item) => item.id === resource.id));
    const ordered = [...(owner ? owner.resources : []), ...steps.flatMap((step) => step.resources)];
    const fromRoadmap = [...new Map(ordered.filter((item) => item.url !== resource.url).map((item) => [item.url, item])).values()].slice(0, 4);
    if (fromRoadmap.length) return fromRoadmap;
  }
  const haystack = `${resource.title} ${resource.provider} ${resource.description} ${resource.category || ''}`.toLowerCase();
  const matching = companionResources.filter((candidate) => candidate.topics.some((topic) => haystack.includes(topic)) && candidate.url !== resource.url);
  const fallback = companionResources.filter((candidate) => candidate.url !== resource.url);
  return [...new Map([...matching, ...fallback].map((candidate) => [candidate.url, candidate])).values()].slice(0, 4);
};

const closeResourceOverlay = () => document.querySelector('.resource-overlay')?.remove();
const openResourceOverlay = (resource) => {
  if (!resource) return;
  closeResourceOverlay();
  const related = getRelatedResources(resource);
  const videoId = /^[\w-]{11}$/.test(resource.videoId || '') ? resource.videoId : '';
  const isVideo = String(resource.type || '').toLowerCase().includes('video');
  const ctaLabel = videoId ? 'Watch on YouTube' : isVideo ? 'Find the video' : 'Open the resource';
  const player = videoId ? `<div class="resource-video"><iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="${escapeHTML(resource.title)}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>` : '';
  const overlay = document.createElement('div');
  overlay.className = 'resource-overlay';
  overlay.innerHTML = `<div class="resource-dialog" role="dialog" aria-modal="true" aria-labelledby="resource-dialog-title"><button class="resource-overlay-close" type="button" aria-label="Close resource details">×</button><div class="resource-dialog-main"><span class="resource-dialog-kicker"><i>${resourceIconMarkup(resource)}</i> ${escapeHTML(resource.type)}</span><h2 id="resource-dialog-title">${escapeHTML(resource.title)}</h2><p class="resource-dialog-provider">${escapeHTML(resource.provider)} · ${escapeHTML(resource.duration)} · ${escapeHTML(resource.difficulty)}</p>${player}<p class="resource-dialog-description">${escapeHTML(resource.description)}</p><div class="resource-dialog-meta"><span><b>01</b> Open the lesson</span><span><b>02</b> Take notes</span><span><b>03</b> Practise one idea</span></div><a class="resource-dialog-cta" href="${escapeHTML(resource.url)}" target="_blank" rel="noreferrer">${ctaLabel} <b>↗</b></a><small class="resource-dialog-note">PathAI opens the original provider page in a new tab.</small></div><aside class="resource-related"><small>CONTINUE THE THREAD</small><h3>More like this</h3><div>${related.map((item) => `<a href="${escapeHTML(item.url)}" target="_blank" rel="noreferrer"><span class="related-icon">${resourceIconMarkup(item)}</span><span><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.provider)} · ${escapeHTML(item.type)}</small></span><b>↗</b></a>`).join('')}</div></aside></div>`;
  document.body.appendChild(overlay);
  const close = () => overlay.remove();
  overlay.addEventListener('click', (event) => { if (event.target === overlay) close(); });
  overlay.querySelector('.resource-overlay-close').addEventListener('click', close);
  overlay.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
  overlay.tabIndex = -1;
  overlay.focus();
};
document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-open-resource]');
  if (!trigger) return;
  event.preventDefault();
  openResourceOverlay(resourceRegistry.get(trigger.dataset.openResource));
});

const renderStepDetail = (stepId) => {
  const step = activeRoadmap.phases.flatMap((phase) => phase.steps).find((item) => item.id === stepId);
  if (!step) return;
  const panel = document.createElement('aside');
  panel.className = 'step-detail';
  panel.innerHTML = `<button class="step-detail-close" aria-label="Close">×</button><small>LEARNING STEP · ${escapeHTML(step.estimatedDuration)}</small><h2>${escapeHTML(step.title)}</h2><p>${escapeHTML(step.description)}</p><div class="detail-block"><strong><i class="detail-icon">✦</i> Why it matters</strong><span>${escapeHTML(step.learningObjectives?.[0] || step.description)}</span></div><div class="detail-block"><strong><i class="detail-icon">↗</i> Prerequisites</strong><span>${step.prerequisites?.length ? step.prerequisites.map(escapeHTML).join(' · ') : 'No prerequisite — start here.'}</span></div><h3>Your guide</h3><ol class="guide-list"><li><b class="guide-index">01</b><div><strong>Learn the idea</strong><span>Watch or read one resource, then write three notes in your own words.</span></div></li><li><b class="guide-index">02</b><div><strong>Try the exercise</strong><span>${escapeHTML(step.exercise.title)}: ${escapeHTML(step.exercise.instructions)}</span></div></li><li><b class="guide-index">03</b><div><strong>Check your understanding</strong><span>${escapeHTML(step.exercise.successCriteria)}</span></div></li></ol><h3>Visual + trusted resources</h3><div class="step-resources">${step.resources.length ? step.resources.map(renderResource).join('') : '<p>No verified resources found yet. Retry discovery when a provider is connected.</p>'}</div><div class="detail-block exercise"><strong><i class="detail-icon">✓</i> Completion check</strong><span>Do not mark this complete until you can explain the concept and show your practice result.</span></div><div class="step-actions"><button class="dark" data-start-step><span class="button-glyph">${step.completionStatus === 'completed' ? '✓' : '▶'}</span>${step.completionStatus === 'completed' ? 'Completed' : step.completionStatus === 'in-progress' ? 'In progress' : 'Start learning'}</button><button class="outline" data-complete-step><span class="button-glyph">${step.completionStatus === 'completed' ? '↶' : '✓'}</span>${step.completionStatus === 'completed' ? 'Mark as not complete' : 'Mark as completed'}</button></div>`;
  document.body.appendChild(panel);
  panel.querySelector('.step-detail-close').addEventListener('click', () => panel.remove());
  panel.querySelector('[data-start-step]').addEventListener('click', (event) => { if (step.completionStatus !== 'completed') step.completionStatus = 'in-progress'; engine.updateRoadmap(activeRoadmap); event.currentTarget.innerHTML = '<span class="button-glyph">◐</span>In progress'; renderRoadmap(activeRoadmap); });
  panel.querySelector('[data-complete-step]').addEventListener('click', () => { step.completionStatus = step.completionStatus === 'completed' ? 'not-started' : 'completed'; engine.updateRoadmap(activeRoadmap); panel.remove(); renderRoadmap(activeRoadmap); renderSavedRoadmaps(); });
};

const PROVIDER_NAMES = { gemini: 'Gemini', openai: 'OpenAI', anthropic: 'Claude' };
const roadmapSourceLabel = (roadmap) => roadmap.status === 'ai-generated' ? `AI-GENERATED · ${(PROVIDER_NAMES[roadmap.generator?.provider] || 'AI').toUpperCase()}` : roadmap.status === 'offline-template' ? 'OFFLINE TEMPLATE' : 'CURATED PROVIDERS';
const roadmapStatusNote = (roadmap) => {
  if (roadmap.status === 'ai-generated') {
    const generator = roadmap.generator || {};
    const videos = generator.videos === 'youtube-api' ? 'Each step opens with a matched YouTube video you can watch here.' : 'Each step links to a targeted YouTube search; add YOUTUBE_API_KEY on the server to attach exact videos.';
    const links = generator.linksChecked ? ` ${generator.linksChecked} suggested links were checked and ${generator.linksRemoved || 0} broken ones removed.` : '';
    return `${PROVIDER_NAMES[generator.provider] || 'AI'} designed this roadmap for your exact goal.${links} ${videos}`;
  }
  if (roadmap.status === 'offline-template') return `Built from PathAI's offline templates because the AI was unavailable${roadmap.fallbackReason ? ` (${roadmap.fallbackReason})` : ''}. Add an AI key to the server's .env file for roadmaps written by AI.`;
  return 'Built from PathAI’s curated provider templates.';
};

const renderRoadmap = (roadmap) => {
  const totalSteps = roadmap.phases.reduce((sum, phase) => sum + phase.steps.length, 0);
  const completed = roadmap.phases.flatMap((phase) => phase.steps).filter((step) => step.completionStatus === 'completed').length;
  const analysis = roadmap.analysis || {};
  output.innerHTML = `<div class="roadmap-output-head"><div><small>INTERACTIVE LEARNING MAP · ${roadmapSourceLabel(roadmap)}</small><h2>${escapeHTML(roadmap.title)}</h2><p>${escapeHTML(roadmap.description)}</p></div><span>${completed}/${totalSteps} complete</span></div><div class="roadmap-analysis"><b>Prompt analyzed</b><span>${escapeHTML(analysis.outcome || 'A structured learning path')}</span>${analysis.keywords?.length ? `<small>Signals: ${analysis.keywords.map(escapeHTML).join(' · ')}</small>` : ''}</div><div class="roadmap-meta"><span>${escapeHTML(roadmap.skillLevel)}</span><span>${escapeHTML(roadmap.hoursPerWeek)}</span><span>${escapeHTML(roadmap.objective)}</span><small>Follow the branches from left to right. Click any node for a step-by-step guide.</small></div><div class="mindmap-toolbar"><span><i></i> roadmap map · ${roadmap.phases.length} phases · ${totalSteps} steps</span><div><button data-map-zoom="out" aria-label="Zoom out">−</button><button data-map-zoom="reset">100%</button><button data-map-zoom="in" aria-label="Zoom in">+</button></div></div><div class="mindmap-viewport"><div class="mindmap-canvas" id="mindmap-canvas"><div class="mindmap-root"><small>YOUR GOAL</small><strong>${escapeHTML(roadmap.title)}</strong><span>${totalSteps} guided steps · click a node to begin</span></div><div class="mindmap-branches">${roadmap.phases.map((phase, phaseIndex) => `<section class="mindmap-phase"><div class="mindmap-phase-head"><b>${String(phaseIndex + 1).padStart(2, '0')}</b><div><small>PHASE ${phaseIndex + 1}</small><h3>${escapeHTML(phase.title)}</h3><p>${escapeHTML(phase.description)}</p></div></div><div class="mindmap-steps">${phase.steps.map((step) => `<button class="mindmap-node ${step.completionStatus === 'completed' ? 'completed' : ''} ${step.completionStatus === 'in-progress' ? 'in-progress' : ''}" data-roadmap-step="${step.id}"><span>${step.completionStatus === 'completed' ? '✓' : String(step.orderIndex + 1).padStart(2, '0')}</span><strong>${escapeHTML(step.title)}</strong><small>${step.estimatedDuration} · ${step.resources.length} links</small></button>`).join('')}</div></section>`).join('')}</div></div></div><div class="roadmap-status">${escapeHTML(roadmapStatusNote(roadmap))}</div>`;
  output.hidden = false;
  output.querySelectorAll('[data-roadmap-step]').forEach((button) => button.addEventListener('click', () => renderStepDetail(button.dataset.roadmapStep)));
  let zoom = 1;
  const canvas = output.querySelector('#mindmap-canvas');
  output.querySelectorAll('[data-map-zoom]').forEach((button) => button.addEventListener('click', () => { const action = button.dataset.mapZoom; zoom = action === 'in' ? Math.min(1.35, zoom + .1) : action === 'out' ? Math.max(.75, zoom - .1) : 1; canvas.style.transform = `scale(${zoom})`; canvas.style.width = `${100 / zoom}%`; output.querySelector('[data-map-zoom="reset"]').textContent = `${Math.round(zoom * 100)}%`; }));
};

const renderSavedRoadmaps = () => {
  const saved = engine.getRoadmaps();
  updatePlanUI();
  if (!saved.length) { roadmapLibrary.innerHTML = '<div class="library-empty-state"><strong>Your first path starts here.</strong><span>Generate a roadmap from one clear goal and it will be saved to this library. There are no sample paths here.</span><button class="dark" data-view="home">Create roadmap →</button></div>'; roadmapLibrary.querySelector('[data-view]')?.addEventListener('click', () => switchView('home')); return; }
  roadmapLibrary.innerHTML = saved.map((roadmap) => { const steps = roadmap.phases.flatMap((phase) => phase.steps); const complete = steps.filter((step) => step.completionStatus === 'completed').length; const percent = Math.round((complete / steps.length) * 100); return `<article class="roadmap-card ${complete ? 'lime' : 'pink'}"><small>${escapeHTML(roadmap.skillLevel.toUpperCase())} · ${roadmap.phases.length} PHASES · ${steps.length} STEPS</small><h2>${escapeHTML(roadmap.title)}</h2><p>${escapeHTML(roadmap.hoursPerWeek)} · ${escapeHTML(roadmap.objective)}</p><div class="progress"><i style="width:${percent}%"></i></div><small>${percent}% complete · updated ${new Date(roadmap.updatedAt).toLocaleDateString()}</small><div class="saved-actions"><button class="open-saved" data-open-saved="${roadmap.id}">Open roadmap →</button><button class="delete-saved" data-delete-saved="${roadmap.id}">Remove</button></div></article>`; }).join('');
  roadmapLibrary.querySelectorAll('[data-open-saved]').forEach((button) => button.addEventListener('click', () => { activeRoadmap = saved.find((item) => item.id === button.dataset.openSaved); switchView('home'); renderRoadmap(activeRoadmap); output.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
  roadmapLibrary.querySelectorAll('[data-delete-saved]').forEach((button) => button.addEventListener('click', () => { const next = saved.filter((item) => item.id !== button.dataset.deleteSaved); localStorage.setItem('pathai.roadmaps.v2', JSON.stringify(next)); if (activeRoadmap?.id === button.dataset.deleteSaved) { activeRoadmap = null; output.hidden = true; } renderSavedRoadmaps(); }));
};

const generate = async () => {
  if (!goal.value.trim()) { goal.focus(); goal.setAttribute('aria-invalid', 'true'); return; }
  goal.removeAttribute('aria-invalid');
  const button = document.querySelector('#generate');
  const original = button.textContent;
  button.disabled = true;
  button.textContent = 'Thinking…';
  generated.hidden = false;
  generated.classList.remove('has-error');
  generated.querySelector('h2').textContent = displayTitle(goal.value);
  const thinking = ['Reading your goal and level…', 'Designing phases from first principles…', 'Writing steps, practice tasks, and prerequisites…', 'Finding resources and videos for every step…', 'Checking every link still works…', 'Almost there — assembling your map…'];
  let thought = 0;
  generated.querySelector('p').textContent = thinking[0];
  const thinkingTimer = window.setInterval(() => { thought = Math.min(thought + 1, thinking.length - 1); generated.querySelector('p').textContent = thinking[thought]; }, 3500);
  output.hidden = true;
  try {
    const saved = engine.getRoadmaps();
    if (currentPlan() !== 'plus' && saved.length >= FREE_ROADMAP_LIMIT) {
      window.clearInterval(thinkingTimer);
      generated.querySelector('p').textContent = 'Your Free plan includes 2 roadmaps. Upgrade to AI Plus for unlimited paths, phases, and step-level resources.';
      generated.classList.add('has-error');
      return;
    }
    activeRoadmap = await engine.generateRoadmap({ goal: goal.value, skillLevel: document.querySelector('#level').value, objective: document.querySelector('#objective').value, hoursPerWeek: document.querySelector('#time').value, format: document.querySelector('#format').value });
    window.clearInterval(thinkingTimer);
    engine.saveRoadmap(activeRoadmap);
    const stepCount = activeRoadmap.phases.reduce((sum, phase) => sum + phase.steps.length, 0);
    generated.querySelector('h2').textContent = activeRoadmap.title;
    generated.querySelector('p').textContent = activeRoadmap.status === 'ai-generated'
      ? `${PROVIDER_NAMES[activeRoadmap.generator?.provider] || 'AI'} built ${activeRoadmap.phases.length} phases and ${stepCount} steps, each with resources and a video.`
      : `Built offline: ${activeRoadmap.phases.length} phases and ${stepCount} steps. ${activeRoadmap.fallbackReason || ''}`.trim();
    renderRoadmap(activeRoadmap);
    renderSavedRoadmaps();
  } catch (error) { generated.querySelector('p').textContent = error.message; generated.classList.add('has-error'); } finally { window.clearInterval(thinkingTimer); button.disabled = false; button.textContent = original; }
};
document.querySelector('#generate').addEventListener('click', generate);
document.querySelectorAll('[data-topic-filter]').forEach((filter) => filter.addEventListener('click', () => { document.querySelectorAll('[data-topic-filter]').forEach((item) => item.classList.toggle('selected', item === filter)); document.querySelectorAll('[data-topic]').forEach((topic) => { topic.hidden = filter.dataset.topicFilter !== 'all' && topic.dataset.topic !== filter.dataset.topicFilter; }); }));
document.querySelectorAll('[data-topic-fill]').forEach((button) => button.addEventListener('click', () => { switchView('home'); goal.value = `I want to ${button.dataset.topicFill.toLowerCase()}`; goal.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); }));
document.querySelectorAll('[data-project-start]').forEach((button) => button.addEventListener('click', () => { button.textContent = 'Milestones saved ✓'; button.classList.add('saved'); }));
const resourceSearch = document.querySelector('#resource-search');
const resourceCategory = document.querySelector('#resource-category');
const resourceList = document.querySelector('#resource-library-list');
const renderResources = () => {
  if (!resourceList) return;
  const query = (resourceSearch?.value || '').toLowerCase().trim();
  const category = resourceCategory?.value || 'all';
  const visible = resources.all.filter((resource) => (category === 'all' || resource.category === category) && (!query || `${resource.title} ${resource.category}`.includes(query)));
  resourceList.innerHTML = visible.slice(0, 60).map((resource) => { resourceRegistry.set(resource.id, resource); const subjectLabel = resource.category ? `${resource.category} resource` : resource.type; return `<button class="resource-library-card" type="button" data-open-resource="${resource.id}"><b class="resource-library-icon" title="${escapeHTML(subjectLabel)}" aria-label="${escapeHTML(subjectLabel)}">${resourceIconMarkup(resource)}</b><span><strong>${escapeHTML(resource.title)}</strong><small>${escapeHTML(resource.category)} · YouTube discovery</small><em>${escapeHTML(resource.description)}</em></span><em>Details ↗</em></button>`; }).join('') || '<div class="library-empty-state"><strong>No matches yet.</strong><span>Try a broader topic or clear the search.</span></div>';
};
resources.categories.forEach((category) => { if (resourceCategory) resourceCategory.insertAdjacentHTML('beforeend', `<option value="${category}">${category[0].toUpperCase() + category.slice(1)}</option>`); });
resourceSearch?.addEventListener('input', renderResources); resourceCategory?.addEventListener('change', renderResources); renderResources();
const starterPanel = document.querySelector('#starter-library');
const starterSearch = document.querySelector('#starter-search');
const starterCategory = document.querySelector('#starter-category');
const starterList = document.querySelector('#starter-library-list');
const renderStarters = () => {
  if (!starterList) return;
  const query = (starterSearch?.value || '').toLowerCase().trim();
  const category = starterCategory?.value || 'all';
  const visible = starters.all.filter((starter) => (category === 'all' || starter.category === category) && (!query || `${starter.title} ${starter.category}`.toLowerCase().includes(query)));
  starterList.innerHTML = visible.slice(0, 60).map((starter) => `<button class="starter-card" data-starter-goal="${escapeHTML(starter.title)}"><small>${escapeHTML(starter.category)} · ROADMAP IDEA</small><strong>${escapeHTML(starter.title)}</strong><span>Analyze this goal →</span></button>`).join('');
  starterList.querySelectorAll('[data-starter-goal]').forEach((button) => button.addEventListener('click', () => { switchView('home'); goal.value = `I want to ${button.dataset.starterGoal.toLowerCase()}`; goal.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); }));
};
starters.categories.forEach((category) => { starterCategory?.insertAdjacentHTML('beforeend', `<option value="${category}">${category}</option>`); });
document.querySelector('[data-show-starters]')?.addEventListener('click', () => { starterPanel.hidden = !starterPanel.hidden; if (!starterPanel.hidden) renderStarters(); });
starterSearch?.addEventListener('input', renderStarters); starterCategory?.addEventListener('change', renderStarters);

const COMMUNITY_KEY = 'pathai.community.v1';
const communitySeed = [
  { id: 'seed-ux', author: 'Maya Chen', username: 'mayac', topic: 'Design', kind: 'Discussion', title: 'UX research, without the fog', body: 'What is one research question that helped you understand a real user problem better?', likes: 8, replies: [{ author: 'Theo', text: 'Start with the behavior you want to understand, not the feature you want to build.' }], createdAt: '2026-10-18T09:00:00.000Z', userCreated: false },
  { id: 'seed-web', author: 'Jordan Lee', username: 'jordanl', topic: 'Coding', kind: 'Project showcase', title: 'Ship your first web app', body: 'Bring a question, share a build, and learn in public. What are you building this week?', likes: 12, replies: [], createdAt: '2026-10-17T14:00:00.000Z', userCreated: false },
  { id: 'seed-reading', author: 'Nora Patel', username: 'norap', topic: 'Literature', kind: 'Study group', title: 'Read 12 great novels', body: 'A gentle reading path for curious people. Share the book you keep returning to and why.', likes: 5, replies: [{ author: 'Sam', text: 'I would love to join a monthly reading check-in.' }], createdAt: '2026-10-16T17:30:00.000Z', userCreated: false },
];
const readCommunityPosts = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(COMMUNITY_KEY) || 'null');
    return Array.isArray(saved) ? saved : communitySeed.map((post) => ({ ...post, replies: [...post.replies] }));
  } catch { return communitySeed.map((post) => ({ ...post, replies: [...post.replies] })); }
};
let communityPosts = readCommunityPosts();
const saveCommunityPosts = () => localStorage.setItem(COMMUNITY_KEY, JSON.stringify(communityPosts));
const communityDate = (value) => { const date = new Date(value); return Number.isNaN(date.getTime()) ? 'Just now' : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date); };
const communityPostMarkup = (post) => {
  const replies = Array.isArray(post.replies) ? post.replies : [];
  return `<article class="community-post ${post.userCreated ? 'community-post-user' : ''}"><header><span class="community-post-avatar">${escapeHTML(initialsFor(post.author))}</span><div><strong>${escapeHTML(post.author)}</strong><small>@${escapeHTML(post.username || 'learner')} · ${escapeHTML(post.topic)} · ${escapeHTML(post.kind)}</small></div><time>${communityDate(post.createdAt)}</time></header><h3>${escapeHTML(post.title)}</h3><p>${escapeHTML(post.body)}</p>${replies.length ? `<div class="community-replies">${replies.slice(-2).map((reply) => `<p><strong>${escapeHTML(reply.author)}</strong> ${escapeHTML(reply.text)}</p>`).join('')}</div>` : ''}<div class="community-post-actions"><button type="button" data-community-reply="${post.id}">Reply <span>${replies.length}</span></button><button type="button" data-community-like="${post.id}">♡ <span>${post.likes || 0}</span></button>${post.userCreated ? `<button type="button" class="community-delete" data-community-delete="${post.id}">Remove</button>` : ''}</div><form class="community-reply-form" data-community-reply-form="${post.id}" hidden><input name="reply" maxlength="240" placeholder="Write a reply..." required /><button class="outline" type="submit">Reply →</button></form></article>`;
};
const renderCommunity = () => {
  const feed = document.querySelector('#community-feed');
  if (!feed) return;
  feed.innerHTML = [...communityPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(communityPostMarkup).join('');
};
const communityForm = document.querySelector('#community-form');
communityForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#community-title').value.trim();
  const body = document.querySelector('#community-body').value.trim();
  if (!title || !body) return;
  communityPosts.push({ id: `post-${Date.now()}`, author: profile.displayName, username: profile.username, topic: document.querySelector('#community-topic').value, kind: document.querySelector('#community-kind').value, title, body, likes: 0, replies: [], createdAt: new Date().toISOString(), userCreated: true });
  saveCommunityPosts();
  communityForm.reset();
  document.querySelector('#community-body-count').textContent = '0';
  document.querySelector('#community-status').textContent = 'Post published.';
  renderCommunity();
});
document.querySelector('#community-body')?.addEventListener('input', (event) => { document.querySelector('#community-body-count').textContent = String(event.target.value.length); });
document.querySelector('#community-feed')?.addEventListener('click', (event) => {
  const replyButton = event.target.closest('[data-community-reply]');
  if (replyButton) { const form = document.querySelector(`[data-community-reply-form="${replyButton.dataset.communityReply}"]`); if (form) { form.hidden = !form.hidden; if (!form.hidden) form.querySelector('input').focus(); } return; }
  const likeButton = event.target.closest('[data-community-like]');
  if (likeButton) { const post = communityPosts.find((item) => item.id === likeButton.dataset.communityLike); if (post) { post.likes = (post.likes || 0) + 1; saveCommunityPosts(); renderCommunity(); } return; }
  const deleteButton = event.target.closest('[data-community-delete]');
  if (deleteButton) { communityPosts = communityPosts.filter((item) => item.id !== deleteButton.dataset.communityDelete); saveCommunityPosts(); renderCommunity(); }
});
document.querySelector('#community-feed')?.addEventListener('submit', (event) => {
  const form = event.target.closest('[data-community-reply-form]');
  if (!form) return;
  event.preventDefault();
  const post = communityPosts.find((item) => item.id === form.dataset.communityReplyForm);
  const input = form.querySelector('input');
  if (!post || !input.value.trim()) return;
  post.replies = Array.isArray(post.replies) ? post.replies : [];
  post.replies.push({ author: profile.displayName, text: input.value.trim() });
  saveCommunityPosts();
  renderCommunity();
});
renderCommunity();
renderSavedRoadmaps();
if (!goal.value && onboarding.goal && !engine.getRoadmaps().length) goal.value = onboarding.goal;
