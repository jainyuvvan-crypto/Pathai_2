const iconAssets = {
  arrow: 'arrow-right', arrowUp: 'arrow-up', back: 'back', book: 'book', check: 'check', close: 'close', compass: 'compass', external: 'external', google: 'google', grid: 'grid', layers: 'layers', lock: 'lock', menu: 'menu', microsoft: 'microsoft', play: 'play', settings: 'settings', spark: 'spark',
};

const icon = (name, size = 18) => {
  const paths = {
    arrow: `<path d="M4 12h15M13 6l6 6-6 6"/>`,
    back: `<path d="M19 12H5m6 6-6-6 6-6"/>`,
    check: `<path d="m5 12 4 4L19 6"/>`,
    spark: `<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z"/>`,
    lock: `<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>`,
    person: `<circle cx="12" cy="8" r="3"/><path d="M5 20a7 7 0 0 1 14 0"/>`,
    briefcase: `<rect x="4" y="7" width="16" height="12" rx="2"/><path d="M9 7V5h6v2M4 12h16M10 12v2h4v-2"/>`,
    compass: `<circle cx="12" cy="12" r="8.5"/><path d="m14.8 9.2-2 4-4 2 2-4 4-2Z"/>`,
    flag: `<path d="M6 21V4m0 1c4-3 8 3 12 0v8c-4 3-8-3-12 0"/>`,
    users: `<path d="M16 20v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM16 3.2a4 4 0 0 1 0 7.6M20 20v-1a4 4 0 0 0-3-3.87"/>`,
    play: `<path d="m9 6 10 6-10 6V6Z"/>`,
    search: `<circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4.3 4.3"/>`,
    more: `<circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/>`,
    layers: `<path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/>`,
    book: `<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z"/><path d="M4 5.5v15M8 7h8M8 11h8"/>`,
    code: `<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>`,
    finance: `<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>`,
    art: `<circle cx="12" cy="12" r="8.5"/><circle cx="8" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="7" r="1" fill="currentColor"/><path d="M16 17h.1"/>`,
    science: `<path d="M9 3h6M10 3v6l-5 8a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 17l-5-8V3M8 15h8"/>`,
    language: `<circle cx="12" cy="12" r="8.5"/><path d="M4 12h16M12 3.5c2 2.3 3 5.1 3 8.5s-1 6.2-3 8.5c-2-2.3-3-5.1-3-8.5s1-6.2 3-8.5Z"/>`,
    layout: `<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M10 10v10"/>`,
    google: `<path fill="currentColor" stroke="none" d="M21.6 12.23c0-.79-.07-1.56-.2-2.3H12v4.35h5.38a4.6 4.6 0 0 1-1.99 3.02v2.51h3.23c1.9-1.75 2.98-4.32 2.98-7.58Z"/><path fill="currentColor" stroke="none" d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.23-2.51c-.9.6-2.04.96-3.39.96-2.6 0-4.8-1.76-5.59-4.13H3.07v2.59A10 10 0 0 0 12 22Z"/><path fill="currentColor" stroke="none" d="M6.41 13.9a6.03 6.03 0 0 1 0-3.8V7.5H3.07a10 10 0 0 0 0 9l3.34-2.6Z"/><path fill="currentColor" stroke="none" d="M12 5.97c1.47 0 2.78.5 3.81 1.49l2.86-2.86C16.95 2.98 14.7 2 12 2a10 10 0 0 0-8.93 5.5l3.34 2.6C7.2 7.73 9.4 5.97 12 5.97Z"/>`,
    microsoft: `<path fill="currentColor" stroke="none" d="M3 3h8.5v8.5H3zM12.5 3H21v8.5h-8.5zM3 12.5h8.5V21H3zM12.5 12.5H21V21h-8.5z"/>`,
  };
  if (iconAssets[name]) return `<img class="pixel-glyph ui-icon" src="./public/assets/pathai-icons/${iconAssets[name]}.png" alt="" width="${size}" height="${size}" draggable="false" />`;
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.spark}</svg>`;
};

const pixelIcon = (name, size = 18) => {
  const pixels = {
    person: `<rect x="10" y="3" width="4" height="4"/><rect x="8" y="7" width="8" height="7"/><rect x="6" y="14" width="4" height="7"/><rect x="14" y="14" width="4" height="7"/>`,
    spark: `<rect x="10" y="3" width="4" height="4"/><rect x="8" y="7" width="8" height="8"/><rect x="10" y="15" width="4" height="5"/><rect x="3" y="10" width="5" height="4"/><rect x="16" y="10" width="5" height="4"/>`,
    lock: `<rect x="7" y="10" width="10" height="10"/><rect x="9" y="6" width="6" height="4"/><rect x="11" y="14" width="2" height="3"/>`,
    briefcase: `<rect x="4" y="8" width="16" height="11"/><rect x="8" y="5" width="8" height="3"/><rect x="4" y="11" width="16" height="3"/><rect x="10" y="11" width="4" height="4"/>`,
    compass: `<rect x="9" y="3" width="6" height="2"/><rect x="6" y="5" width="12" height="2"/><rect x="4" y="7" width="16" height="10"/><rect x="6" y="17" width="12" height="2"/><rect x="9" y="19" width="6" height="2"/><rect x="12" y="8" width="3" height="8" transform="rotate(45 12 12)"/>`,
    flag: `<rect x="5" y="3" width="3" height="18"/><rect x="8" y="4" width="11" height="3"/><rect x="16" y="7" width="3" height="6"/><rect x="8" y="13" width="11" height="3"/>`,
    users: `<rect x="5" y="4" width="5" height="5"/><rect x="14" y="5" width="5" height="5"/><rect x="3" y="12" width="9" height="8"/><rect x="12" y="13" width="9" height="7"/><rect x="10" y="11" width="4" height="3"/>`,
    play: `<rect x="7" y="4" width="5" height="3"/><rect x="10" y="7" width="5" height="3"/><rect x="13" y="10" width="5" height="4"/><rect x="10" y="14" width="5" height="3"/><rect x="7" y="17" width="5" height="3"/>`,
    search: `<rect x="6" y="4" width="8" height="3"/><rect x="4" y="7" width="12" height="10"/><rect x="7" y="17" width="7" height="3"/><rect x="15" y="15" width="3" height="3"/><rect x="18" y="18" width="3" height="3"/>`,
    more: `<rect x="3" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="17" y="10" width="4" height="4"/>`,
    layers: `<rect x="5" y="4" width="14" height="3"/><rect x="3" y="8" width="18" height="3"/><rect x="5" y="12" width="14" height="3"/><rect x="7" y="16" width="10" height="3"/>`,
    book: `<rect x="4" y="4" width="7" height="16"/><rect x="13" y="4" width="7" height="16"/><rect x="11" y="4" width="2" height="16"/><rect x="6" y="7" width="4" height="2"/><rect x="14" y="7" width="4" height="2"/>`,
    code: `<rect x="4" y="10" width="4" height="4"/><rect x="7" y="7" width="4" height="4"/><rect x="7" y="13" width="4" height="4"/><rect x="13" y="7" width="4" height="4"/><rect x="13" y="13" width="4" height="4"/><rect x="16" y="10" width="4" height="4"/>`,
    finance: `<rect x="4" y="14" width="4" height="6"/><rect x="10" y="9" width="4" height="11"/><rect x="16" y="4" width="4" height="16"/><rect x="3" y="20" width="18" height="2"/>`,
    art: `<rect x="6" y="4" width="12" height="3"/><rect x="4" y="7" width="16" height="10"/><rect x="7" y="17" width="10" height="3"/><rect x="8" y="9" width="3" height="3"/><rect x="14" y="9" width="3" height="3"/><rect x="12" y="14" width="3" height="2"/>`,
    science: `<rect x="9" y="3" width="6" height="3"/><rect x="10" y="6" width="4" height="7"/><rect x="7" y="13" width="10" height="3"/><rect x="5" y="16" width="14" height="4"/>`,
    language: `<rect x="9" y="3" width="6" height="2"/><rect x="6" y="5" width="12" height="2"/><rect x="4" y="7" width="16" height="10"/><rect x="6" y="17" width="12" height="2"/><rect x="9" y="19" width="6" height="2"/><rect x="11" y="7" width="2" height="12"/><rect x="4" y="11" width="16" height="2"/>`,
    layout: `<rect x="4" y="4" width="16" height="16"/><rect x="4" y="9" width="16" height="3"/><rect x="9" y="9" width="3" height="11"/>`,
    check: `<rect x="4" y="11" width="4" height="4"/><rect x="7" y="14" width="4" height="4"/><rect x="10" y="11" width="4" height="4"/><rect x="13" y="8" width="4" height="4"/><rect x="16" y="5" width="4" height="4"/>`,
  };
  return `<svg class="pixel-glyph" aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" shape-rendering="crispEdges">${pixels[name] || pixels.spark}</svg>`;
};

const choiceAssets = {
  person: 'person', spark: 'spark', lock: 'lock', briefcase: 'briefcase', compass: 'compass-choice', flag: 'flag', users: 'users', play: 'video', search: 'search', more: 'more', layers: 'learning-apps', check: 'check', book: 'book', code: 'code', finance: 'finance', art: 'art', science: 'science', language: 'language', layout: 'layout',
};

const assetIcon = (name, size = 18) => `<img class="pixel-glyph" src="./public/assets/pathai-icons/${choiceAssets[name] || name}.png" alt="" width="${size}" height="${size}" draggable="false" />`;

const brandMark = (size = '') => `<span class="brand-mark ${size}" aria-hidden="true"><img src="./public/assets/pathai-logo.png" alt="" draggable="false" /></span>`;

const steps = [
  { label: 'About you', title: 'First, a little<br /><em>about you.</em>', helper: 'This helps us make your learning path feel more personal.', type: 'options', question: 'Which option best describes you?', options: ['Woman', 'Man', 'Non-binary', 'Prefer not to say'], icons: ['person', 'person', 'spark', 'lock'] },
  { label: 'About you', title: 'When were<br /><em>you born?</em>', helper: 'Your birthday helps us tailor the pace and tone of your experience.', type: 'birthday' },
  { label: 'Your why', title: 'Why are you<br /><em>here?</em>', helper: 'There’s no wrong answer. Pick the one that feels closest.', type: 'options', question: 'I want PathAI to help me…', options: ['Build a new skill', 'Get better at my work', 'Stay curious and explore', 'Finally finish what I start'], icons: ['spark', 'briefcase', 'compass', 'flag'] },
  { label: 'Your story', title: 'How did you<br /><em>find us?</em>', helper: 'It helps us understand where curious people discover PathAI.', type: 'options', question: 'Where did you first hear about PathAI?', options: ['A friend or colleague', 'YouTube or a podcast', 'Instagram or TikTok', 'Search or an online article', 'Something else'], icons: ['users', 'play', 'spark', 'search', 'more'] },
  { label: 'The idea', title: 'A clearer way<br /><em>to learn.</em>', helper: 'PathAI turns a fuzzy ambition into a path you can actually follow.', type: 'promo' },
  { label: 'Your goal', title: 'What do you want<br /><em>to achieve?</em>', helper: 'We’ll use this to shape your first roadmap and the resources inside it.', type: 'textarea', question: 'In your own words, what would you love to learn?', placeholder: 'e.g. I want to understand how AI products are built…' },
  { label: 'Your habits', title: 'Have you tried<br /><em>another app?</em>', helper: 'Knowing what you’ve already tried helps us make PathAI feel different.', type: 'options', question: 'Have you used another learning app before?', options: ['Yes — I’m still using one', 'Yes — but I fell off', 'Not yet', 'I mostly use videos and articles'], icons: ['layers', 'check', 'spark', 'book'] },
  { label: 'Your interests', title: 'What do you love<br /><em>learning about?</em>', helper: 'Choose as many as you like. You can always change these later.', type: 'multi', question: 'Pick your favorite subjects', options: ['AI', 'Coding', 'Business', 'Finance', 'Literature', 'Art', 'Design', 'Science', 'Languages'], icons: ['spark', 'code', 'briefcase', 'finance', 'book', 'art', 'layout', 'science', 'language'] },
];

const state = { step: 0, answers: {}, selectedSubjects: new Set() };
const app = document.querySelector('#onboarding-app');
const auth = window.PathAIAuth;
const mode = new URLSearchParams(window.location.search).get('mode');

app.innerHTML = `
  <div class="onboarding-shell">
    <div class="onboarding-noise" aria-hidden="true"></div>
    <header class="onboarding-header"><button class="back-button" id="back-button" data-back type="button">${icon('back', 15)} Back</button><a class="brand" href="./index.html" aria-label="PathAI home">${brandMark()}<span>path<span class="brand-accent">AI</span></span></a><div class="header-meta"><span class="save-state">your progress saves automatically</span><span class="step-count" id="step-count">01 / 08</span></div></header>
    <div class="progress-track"><i id="progress-bar"></i></div>
    <section class="onboarding-content" id="onboarding-content"></section>
    <footer class="onboarding-footer"><span>PathAI onboarding</span><span>made for the curious</span></footer>
  </div>
`;

const content = document.querySelector('#onboarding-content');
const count = document.querySelector('#step-count');
const progress = document.querySelector('#progress-bar');

function optionMarkup(option, index, selected = false, optionIcon = 'spark') {
  return `<button class="choice ${selected ? 'selected' : ''}" data-choice="${option}" type="button"><span class="choice-icon pixel-icon">${assetIcon(optionIcon, 18)}</span><span>${option}</span><span class="choice-mark">${assetIcon('check', 14)}</span></button>`;
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const wheelMarkup = (id, label, values, selected) => `<div class="birthday-wheel" id="${id}" data-birthday-wheel="${id}" data-value="${selected || ''}" tabindex="0" role="listbox" aria-label="${label}">${values.map(([value, text]) => `<button class="wheel-option ${value === selected ? 'selected' : ''}" data-value="${value}" type="button" role="option" aria-selected="${value === selected}">${text}</button>`).join('')}</div>`;
const birthdayParts = () => {
  const [year = '', month = '', day = ''] = (state.answers.birthday || '').split('-');
  return { year, month, day };
};
const syncBirthday = () => {
  const year = content.querySelector('#birthday-year')?.dataset.value;
  const month = content.querySelector('#birthday-month')?.dataset.value;
  const day = content.querySelector('#birthday-day')?.dataset.value;
  if (year && month && day) state.answers.birthday = `${year}-${month}-${day}`;
};

const selectWheelValue = (wheel, value, shouldScroll = true) => {
  wheel.dataset.value = value;
  wheel.querySelectorAll('.wheel-option').forEach((option) => {
    const selected = option.dataset.value === value;
    option.classList.toggle('selected', selected);
    option.setAttribute('aria-selected', String(selected));
    if (selected && shouldScroll) option.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });
  syncBirthday();
};

function renderStep() {
  const item = steps[state.step];
  const current = state.step + 1;
  document.querySelector('#back-button').hidden = state.step === 0;
  count.textContent = `${String(current).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`;
  progress.style.width = `${(current / (steps.length + 2)) * 100}%`;
  if (item.type === 'promo') {
    content.innerHTML = `<div class="step-layout promo-layout"><div class="step-copy"><span class="step-label">${item.label} · ${String(current).padStart(2, '0')}</span><h1>${item.title}</h1><p>${item.helper}</p><button class="primary-cta" data-next type="button">Show me how ${icon('arrow', 16)}</button></div><div class="promo-visual"><div class="promo-card promo-input"><span class="mono-label">01 / YOUR THOUGHT</span><strong>I want to learn<br />product design</strong><div class="promo-cursor"></div></div><div class="promo-arrow">${icon('arrow', 23)}</div><div class="promo-card promo-output"><span class="mono-label">02 / YOUR PATH</span><strong>Product design<br />from scratch</strong><div class="promo-nodes"><i class="done">${icon('check', 11)}</i><i class="active">02</i><i>03</i><i>04</i></div><span class="promo-generated">${icon('spark', 12)} 8 milestones · 6 hrs</span></div><div class="promo-note">type a goal<br /><em>get a direction</em></div></div></div>`;
  } else if (item.type === 'birthday') {
    const parts = birthdayParts();
    const years = Array.from({ length: 87 }, (_, index) => { const year = String(2026 - index); return [year, year]; });
    const months = monthNames.map((month, index) => [String(index + 1).padStart(2, '0'), month]);
    const days = Array.from({ length: 31 }, (_, index) => { const day = String(index + 1).padStart(2, '0'); return [day, day]; });
    content.innerHTML = `<div class="step-layout"><div class="step-copy"><span class="step-label">${item.label} · ${String(current).padStart(2, '0')}</span><h1>${item.title}</h1><p>${item.helper}</p></div><div class="step-form birthday-form"><span class="birthday-label">Your birthday</span><div class="birthday-scroller" aria-label="Birthday selector"><div class="birthday-wheel-label">Month${wheelMarkup('birthday-month', 'Month', [['', 'Month'], ...months], parts.month)}</div><div class="birthday-wheel-label">Day${wheelMarkup('birthday-day', 'Day', [['', 'Day'], ...days], parts.day)}</div><div class="birthday-wheel-label">Year${wheelMarkup('birthday-year', 'Year', [['', 'Year'], ...years], parts.year)}</div></div><span class="form-hint">Scroll each wheel to choose your date.</span><button class="primary-cta" data-next type="button">Continue ${icon('arrow', 16)}</button></div></div>`;
  } else if (item.type === 'textarea') {
    content.innerHTML = `<div class="step-layout"><div class="step-copy"><span class="step-label">${item.label} · ${String(current).padStart(2, '0')}</span><h1>${item.title}</h1><p>${item.helper}</p></div><div class="step-form"><label for="goal">Your goal</label><textarea id="goal" placeholder="${item.placeholder}">${state.answers.goal || ''}</textarea><span class="form-hint">A sentence is enough. PathAI will help with the rest.</span><button class="primary-cta" data-next type="button">Continue ${icon('arrow', 16)}</button></div></div>`;
  } else if (item.type === 'multi') {
    content.innerHTML = `<div class="step-layout options-layout"><div class="step-copy"><span class="step-label">${item.label} · ${String(current).padStart(2, '0')}</span><h1>${item.title}</h1><p>${item.helper}</p></div><div class="choice-panel"><span class="question-label">${item.question}</span><div class="choices multi-choices">${item.options.map((option, index) => optionMarkup(option, index, state.selectedSubjects.has(option), item.icons?.[index])).join('')}</div><span class="form-hint">Choose as many as you like.</span><button class="primary-cta" data-next type="button">Continue ${icon('arrow', 16)}</button></div></div>`;
  } else {
    content.innerHTML = `<div class="step-layout options-layout"><div class="step-copy"><span class="step-label">${item.label} · ${String(current).padStart(2, '0')}</span><h1>${item.title}</h1><p>${item.helper}</p></div><div class="choice-panel"><span class="question-label">${item.question}</span><div class="choices">${item.options.map((option, index) => optionMarkup(option, index, state.answers[state.step] === option, item.icons?.[index])).join('')}</div><button class="primary-cta" data-next type="button">Continue ${icon('arrow', 16)}</button></div></div>`;
  }
  bindStepEvents();
  requestAnimationFrame(() => content.classList.add('is-visible'));
}

function bindStepEvents() {
  content.querySelectorAll('.choice').forEach((choice) => choice.addEventListener('click', () => {
    const option = choice.dataset.choice;
    if (steps[state.step].type === 'multi') {
      choice.classList.toggle('selected');
      state.selectedSubjects.has(option) ? state.selectedSubjects.delete(option) : state.selectedSubjects.add(option);
    } else {
      content.querySelectorAll('.choice').forEach((sibling) => sibling.classList.remove('selected'));
      choice.classList.add('selected');
      state.answers[state.step] = option;
    }
  }));
  content.querySelector('[data-next]')?.addEventListener('click', nextStep);
  content.querySelectorAll('.birthday-wheel').forEach((wheel) => {
    const selected = wheel.querySelector('.wheel-option.selected');
    if (selected) selected.scrollIntoView({ block: 'center' });
    wheel.querySelectorAll('.wheel-option').forEach((option) => option.addEventListener('click', () => selectWheelValue(wheel, option.dataset.value)));
    let scrollTimer;
    wheel.addEventListener('scroll', () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        const center = wheel.scrollTop + wheel.clientHeight / 2;
        const closest = [...wheel.querySelectorAll('.wheel-option')].reduce((current, option) => Math.abs(option.offsetTop + option.offsetHeight / 2 - center) < Math.abs(current.offsetTop + current.offsetHeight / 2 - center) ? option : current);
        selectWheelValue(wheel, closest.dataset.value, false);
      }, 80);
    }, { passive: true });
  });
  content.querySelector('textarea')?.addEventListener('input', (event) => { state.answers.goal = event.target.value; });
}

function nextStep() {
  const item = steps[state.step];
  if (item.type === 'birthday' && (!state.answers.birthday || [...content.querySelectorAll('.birthday-wheel')].some((wheel) => !wheel.dataset.value))) { content.querySelector('.birthday-wheel')?.focus(); return; }
  if (item.type === 'textarea' && !state.answers.goal?.trim()) { content.querySelector('textarea')?.focus(); return; }
  if (item.type === 'options' && !state.answers[state.step]) return;
  if (item.type === 'multi' && !state.selectedSubjects.size) return;
  state.step += 1;
  if (state.step < steps.length) renderStep(); else renderReady();
}

function renderReady() {
  count.textContent = '09 / 10';
  progress.style.width = '82%';
  document.querySelector('#back-button').hidden = false;
  content.innerHTML = `<div class="center-step ready-step"><div class="success-mark">${icon('check', 23)}</div><span class="step-label">THANK YOU · 09</span><h1>Your path is<br /><em>ready to begin.</em></h1><p>We’ve got the signal. Next, choose how you want to unlock your full learning workspace.</p><button class="primary-cta" data-payment type="button">I’m ready to initiate ${icon('arrow', 16)}</button><span class="form-hint">You’ll get a 3-day free trial on every paid plan.</span></div>`;
  content.querySelector('[data-payment]').addEventListener('click', renderPayment);
  requestAnimationFrame(() => content.classList.add('is-visible'));
}

function renderPayment() {
  count.textContent = '10 / 10';
  progress.style.width = '91%';
  document.querySelector('#back-button').hidden = false;
  content.innerHTML = `<div class="payment-step"><div class="payment-copy"><span class="step-label">YOUR PATH · 10</span><h1>Choose the pace<br /><em>that fits you.</em></h1><p>Start with 3 days on us. Keep the plan that makes learning feel easier.</p><div class="trial-callout">${icon('spark', 17)} Try every Pro feature for 3 days. Cancel anytime.</div></div><div class="payment-panel"><div class="payment-tabs"><button class="payment-tab" data-payment-plan="monthly">Monthly</button><button class="payment-tab" data-payment-plan="quarterly">3 months</button><button class="payment-tab selected" data-payment-plan="annual">Annual <span>save 28%</span></button></div><div class="payment-choice" data-plan-card="monthly"><div><span class="price-kicker">FLEXIBLE</span><h3>Monthly</h3><p>For trying it out at your own pace.</p></div><strong>$6.99 <small>/ month</small></strong></div><div class="payment-choice" data-plan-card="quarterly"><div><span class="price-kicker">MOST POPULAR</span><h3>3 months</h3><p>Pay for 2 months, get the third month free.</p></div><strong>$12.99 <small>/ 3 months</small></strong></div><div class="payment-choice selected" data-plan-card="annual"><div><span class="price-kicker">BEST VALUE</span><h3>Annual</h3><p>The lowest effective monthly price.</p></div><strong>$59.99 <small>/ year</small></strong></div><button class="primary-cta" data-signin type="button">Continue to sign in ${icon('arrow', 16)}</button><button class="free-option" data-free-plan type="button">Continue with the free plan</button><div class="secure-note">${icon('lock', 13)} Secure checkout · No charge during trial</div></div></div>`;
  bindPaymentEvents();
  requestAnimationFrame(() => content.classList.add('is-visible'));
}

function bindPaymentEvents() {
  const tabs = content.querySelectorAll('.payment-tab');
  const cards = content.querySelectorAll('[data-plan-card]');
  let selectedPlan = 'annual';
  const selectPlan = (plan) => {
    selectedPlan = plan;
    tabs.forEach((tab) => tab.classList.toggle('selected', tab.dataset.paymentPlan === plan));
    cards.forEach((card) => card.classList.toggle('selected', card.dataset.planCard === plan));
  };
  tabs.forEach((tab) => tab.addEventListener('click', () => selectPlan(tab.dataset.paymentPlan)));
  cards.forEach((card) => card.addEventListener('click', () => selectPlan(card.dataset.planCard)));
  content.querySelector('[data-signin]').addEventListener('click', () => { localStorage.setItem('pathai.plan', 'plus'); localStorage.setItem('pathai.billingCycle', selectedPlan); renderSignin(); });
  content.querySelector('[data-free-plan]').addEventListener('click', () => { localStorage.setItem('pathai.plan', 'free'); localStorage.removeItem('pathai.billingCycle'); renderSignin(); });
}

const goToDashboard = () => window.location.replace('./workspace.html');

const signinPanel = (hint) => `<div class="signin-panel"><div class="google-signin" data-google-signin><button class="provider-button" type="button" disabled>${icon('google', 17)} Loading Google sign-in…</button></div><p class="signin-error" data-signin-error role="alert" hidden></p><div class="or-divider"><span>or use your email</span></div><form data-email-signin novalidate><label for="email">Email address</label><input id="email" type="email" autocomplete="email" placeholder="you@example.com" required /><button class="primary-cta" type="submit">Continue with email ${icon('arrow', 16)}</button></form><span class="form-hint">${hint}</span></div>`;

function bindSignin(onSignedIn) {
  const error = content.querySelector('[data-signin-error]');
  const showError = (message) => { error.textContent = message; error.hidden = false; };
  auth.renderGoogleButton(content.querySelector('[data-google-signin]'), { onSignedIn, onError: (failure) => showError(failure.message) });
  content.querySelector('[data-email-signin]').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = content.querySelector('#email');
    if (!email.value.trim() || !email.checkValidity()) { showError('Enter a valid email address.'); email.focus(); return; }
    const button = event.currentTarget.querySelector('button');
    button.innerHTML = `You’re in ${icon('check', 16)}`;
    button.classList.add('complete');
    button.disabled = true;
    const session = auth.startSession({ provider: 'email', email: email.value.trim() });
    setTimeout(() => onSignedIn(session), 400);
  });
}

function finishOnboarding() {
  localStorage.setItem('pathai.onboarding.v1', JSON.stringify({ goal: state.answers.goal?.trim() || '', interests: [...state.selectedSubjects], completedAt: new Date().toISOString() }));
  auth.markOnboarded();
}

function renderSignin() {
  finishOnboarding();
  if (auth.getSession()) { goToDashboard(); return; }
  document.querySelector('#back-button').hidden = true;
  progress.style.width = '100%';
  content.innerHTML = `<div class="center-step signin-step"><span class="step-label">WELCOME TO PATHAI · DONE</span><h1>Save your path<br /><em>and keep going.</em></h1><p>Sign in to keep your roadmap, progress, and resources in one place.</p>${signinPanel('By continuing, you agree to PathAI’s terms and privacy policy.')}</div>`;
  bindSignin(goToDashboard);
  requestAnimationFrame(() => content.classList.add('is-visible'));
}

function renderEntrySignin() {
  if (auth.getSession()) { if (auth.isOnboarded()) goToDashboard(); else renderStep(); return; }
  document.querySelector('#back-button').hidden = true;
  count.textContent = 'SIGN IN';
  progress.style.width = '0%';
  content.innerHTML = `<div class="center-step signin-step"><span class="step-label">WELCOME BACK · PATHAI</span><h1>Pick up<br /><em>where you left off.</em></h1><p>Sign in to open your dashboard. New here? We’ll ask a few quick questions first.</p>${signinPanel('Your roadmaps and progress stay connected to this account.')}</div>`;
  bindSignin(() => { if (auth.isOnboarded()) goToDashboard(); else { content.classList.remove('is-visible'); renderStep(); } });
  requestAnimationFrame(() => content.classList.add('is-visible'));
}

document.addEventListener('click', (event) => {
  if (event.target.closest('[data-back]') && state.step > 0) { state.step -= 1; renderStep(); }
});

if (mode === 'signin') renderEntrySignin(); else renderStep();
