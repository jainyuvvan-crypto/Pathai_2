const iconAssets = {
  arrow: 'arrow-right', arrowUp: 'arrow-up', book: 'book', check: 'check', compass: 'compass', external: 'external', grid: 'grid', layers: 'layers', lock: 'lock', menu: 'menu', play: 'play', settings: 'settings', spark: 'spark', close: 'close',
};

const icon = (name, size = 18) => {
  const paths = {
    arrow: `<path d="M4 12h15M13 6l6 6-6 6"/>`,
    arrowUp: `<path d="M12 19V5m-6 6 6-6 6 6"/>`,
    check: `<path d="m5 12 4 4L19 6"/>`,
    spark: `<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z"/>`,
    play: `<path d="m9 6 10 6-10 6V6Z"/>`,
    grid: `<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/>`,
    book: `<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z"/><path d="M4 5.5v15M8 7h8M8 11h8"/>`,
    compass: `<circle cx="12" cy="12" r="8.5"/><path d="m14.8 9.2-2 4-4 2 2-4 4-2Z"/>`,
    layers: `<path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/>`,
    settings: `<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.1h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1A1.7 1.7 0 0 0 8.4 15a1.7 1.7 0 0 0-1.6-1H6v-2.4h.8a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L8 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.1h2.4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1V14h-.1a1.7 1.7 0 0 0-1.6 1Z"/>`,
    close: `<path d="m6 6 12 12M18 6 6 18"/>`,
    menu: `<path d="M4 7h16M4 12h16M4 17h16"/>`,
    clock: `<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>`,
    lock: `<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>`,
    external: `<path d="M14 5h5v5M19 5l-8 8"/><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>`,
  };
  if (iconAssets[name]) return `<img class="pixel-glyph ui-icon" src="./public/assets/pathai-icons/${iconAssets[name]}.png" alt="" width="${size}" height="${size}" draggable="false" />`;
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.spark}</svg>`;
};

const brandMark = (size = '') => `<span class="brand-mark ${size}" aria-hidden="true"><img src="./public/assets/pathai-logo.png" alt="" draggable="false" /></span>`;

const roadmapNodes = [
  { id: '01', title: 'The mental model', meta: 'syntax · 25 min', type: 'completed', x: 8, y: 25 },
  { id: '02', title: 'Values & variables', meta: 'core concepts · 40 min', type: 'active', x: 34, y: 17 },
  { id: '03', title: 'Functions that click', meta: 'practice · 1 hr', type: 'locked', x: 60, y: 25 },
  { id: '04', title: 'Build a tiny thing', meta: 'project · 2 hrs', type: 'locked', x: 28, y: 61 },
  { id: '05', title: 'Ship your first app', meta: 'capstone · 3 hrs', type: 'locked', x: 65, y: 69 },
];

const pathTopics = [
  ['AI', 'spark'],
  ['Finance', 'grid'],
  ['Business', 'compass'],
  ['Coding', 'layers'],
  ['Literature', 'book'],
  ['Design', 'grid'],
  ['Science', 'spark'],
  ['Data', 'layers'],
];
const pathTopicGroups = Array.from({ length: 4 }, (_, index) => `<div class="ticker-group partner-group"${index ? ' aria-hidden="true"' : ''}>${pathTopics.map(([label, glyph]) => `<span class="partner"><i class="partner-mark" aria-hidden="true">${icon(glyph, 22)}</i>${label}</span>`).join('')}</div>`).join('');

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="site-shell">
    <div class="grain" aria-hidden="true"></div>
    <header class="topbar">
      <a class="brand" href="#top" aria-label="PathAI home">${brandMark()}<span>path<span class="brand-accent">AI</span></span></a>
      <nav class="topnav" aria-label="Main navigation">
        <a href="#how-it-works">How it works</a>
        <a href="#library">Roadmap library</a>
        <a href="#pricing">Pricing</a>
      </nav>
      <div class="top-actions">
        <button class="text-button" data-sign-in>Sign in</button>
        <button class="button button-dark button-small" data-start-learning>Start learning ${icon('arrow', 15)}</button>
      </div>
      <button class="mobile-menu" aria-label="Open menu">${icon('menu', 21)}</button>
    </header>

    <main id="top">
      <section class="hero section-grid">
        <div class="hero-copy reveal">
          <div class="eyebrow"><span class="eyebrow-dot"></span> AI-powered learning maps</div>
          <h1>Find your way<br /><span>forward.</span></h1>
          <p class="hero-lede">PathAI turns “I want to learn this” into a clear, visual path you can actually finish.</p>
          <div class="hero-actions">
            <button class="button button-lime" data-start-learning>Build my roadmap ${icon('arrow', 16)}</button>
            <button class="button button-ghost" data-scroll-workspace>${icon('play', 15)} See how it works</button>
          </div>
          <div class="hero-proof"><div class="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><span>Join 2,400+ curious learners</span></div>
        </div>
        <div class="hero-visual reveal reveal-delay">
          <div class="visual-note note-top">your next chapter<br /><span>starts here</span></div>
          <div class="roadmap-card hero-roadmap-card">
            <div class="card-topline"><span class="mono-label">ROADMAP / 001</span><span class="status-live"><i></i> live preview</span></div>
            <div class="roadmap-title"><span>Learn JavaScript</span><span class="mono-label">8 weeks</span></div>
            <div class="mini-map" aria-label="Roadmap preview">
              <svg viewBox="0 0 420 210" role="img" aria-label="A winding learning roadmap with five milestones">
                <path class="map-line map-line-muted" d="M34 62 C 100 62, 100 39, 170 39 S 235 76, 290 76 S 360 50, 395 50" />
                <path class="map-line" d="M34 62 C 100 62, 100 39, 170 39" />
                <path class="map-line map-line-muted" d="M170 39 C 235 39, 235 108, 290 108 S 360 140, 395 140" />
                <g class="map-node done" transform="translate(34 62)"><circle r="14"/><path d="m-5 0 4 4 7-8"/></g>
                <g class="map-node current" transform="translate(170 39)"><circle r="18"/><circle r="7"/></g>
                <g class="map-node" transform="translate(290 76)"><circle r="14"/><path d="M-4 0h8M0-4v8"/></g>
                <g class="map-node" transform="translate(290 108)"><circle r="14"/><path d="M-4 0h8M0-4v8"/></g>
                <g class="map-node" transform="translate(395 140)"><circle r="14"/><path d="M-4 0h8M0-4v8"/></g>
              </svg>
              <div class="map-label label-1"><b>01</b> the mental model</div>
              <div class="map-label label-2"><b>02</b> values & variables</div>
              <div class="map-label label-3"><b>03</b> build a tiny thing</div>
            </div>
            <div class="card-bottomline"><span>${icon('spark', 14)} generated just for you</span><span class="arrow-circle">${icon('arrowUp', 14)}</span></div>
          </div>
          <div class="visual-note note-side"><span class="scribble">↘</span> a little<br />more clarity</div>
          <div class="hero-pixel-cluster" aria-hidden="true"></div>
        </div>
      </section>

      <section class="ticker partner-banner" aria-label="PathAI learning topics"><div class="partner-banner-inner"><div class="partner-marquee"><div class="ticker-track">${pathTopicGroups}</div></div></div></section>

      <section class="why-section page-section" id="how-it-works">
        <div class="section-intro reveal"><span class="section-number">[ 01 ]</span><div><h2>A better way to<br /><em>begin.</em></h2><p>Big goals get easier when they have somewhere to go. PathAI gives your curiosity a shape.</p></div></div>
        <div class="feature-grid">
          <article class="feature-card feature-dark reveal"><span class="feature-index">01</span><div class="feature-icon">${icon('compass', 24)}</div><h3>Start anywhere</h3><p>Tell us what you want to learn in your own words. No syllabus required.</p><a href="#workspace" data-scroll-workspace class="feature-link">Try the prompt ${icon('arrow', 15)}</a></article>
          <article class="feature-card feature-lime reveal reveal-delay"><span class="feature-index">02</span><div class="feature-icon">${icon('layers', 24)}</div><h3>See the whole path</h3><p>AI breaks your goal into milestones, resources, and a pace that fits your life.</p><a href="#workspace" data-scroll-workspace class="feature-link">View a roadmap ${icon('arrow', 15)}</a></article>
          <article class="feature-card feature-paper reveal reveal-delay-2"><span class="feature-index">03</span><div class="feature-icon">${icon('spark', 24)}</div><h3>Keep your momentum</h3><p>Check off progress, save your best resources, and know what to do next.</p><a href="#workspace" data-scroll-workspace class="feature-link">Explore workspace ${icon('arrow', 15)}</a></article>
        </div>
      </section>

      <section class="workspace-section page-section" id="workspace">
        <div class="workspace-header reveal"><div><span class="section-number">[ 02 ]</span><h2>Your learning<br /><em>workspace.</em></h2></div><div class="workspace-intro"><span class="live-pill"><i></i> interactive preview</span><p>One calm place for your next step, your saved paths, and the resources that make it stick.</p></div></div>
        <div class="app-shell reveal reveal-delay">
          <aside class="app-sidebar">
            <div class="app-logo">${brandMark('small')}<span>path<span class="brand-accent">AI</span></span></div>
            <div class="app-profile"><div class="profile-avatar">AL</div><div><b>Alex</b><span>Free trial · 2 days</span></div><span class="profile-dot"></span></div>
            <nav class="app-nav" aria-label="Workspace navigation">
              <button class="app-nav-item active" data-tab="workspace">${icon('spark', 17)} Workspace</button>
              <button class="app-nav-item" data-tab="roadmaps">${icon('compass', 17)} My roadmaps <span class="nav-count">2</span></button>
              <button class="app-nav-item" data-tab="resources">${icon('book', 17)} Resources</button>
              <button class="app-nav-item" data-tab="community">${icon('grid', 17)} Community</button>
            </nav>
            <div class="sidebar-bottom"><button class="app-nav-item">${icon('settings', 17)} Settings</button><div class="trial-card"><span class="mono-label">TRIAL STATUS</span><b>2 days left</b><div class="trial-bar"><i></i></div><button>View plans ${icon('arrow', 13)}</button></div></div>
          </aside>
          <div class="app-main">
            <div class="app-topbar"><div><span class="mono-label">MONDAY / OCT 19</span><h3>Good morning, Alex<span class="lime-dot">.</span></h3></div><div class="app-top-actions"><button class="icon-button" aria-label="Notifications">${icon('spark', 17)}</button><button class="profile-avatar profile-avatar-top" aria-label="Open profile">AL</button></div></div>
            <div class="app-content">
              <div class="tab-panel active" data-panel="workspace">
                <div class="prompt-box"><div class="prompt-header"><span class="prompt-spark">${icon('spark', 16)}</span><span>What do you want to learn?</span><span class="prompt-hint">DEMO PROMPT</span></div><textarea id="goal-input" aria-label="What do you want to learn?" readonly>I want to learn the fundamentals of product design</textarea><div class="prompt-footer"><span class="prompt-context">PathAI is writing your first idea…</span><button class="button button-dark generate-button" id="generate-btn">Generate path ${icon('arrow', 15)}</button></div></div>
                <div class="workspace-grid"><div class="up-next-card"><div class="card-heading"><span>Up next</span><button class="kebab" aria-label="More options">•••</button></div><div class="up-next-main"><div class="lesson-icon">${icon('play', 18)}</div><div><span class="mono-label">MILESTONE 02 / 05</span><h4>Values & variables</h4><p>Learn the building blocks of JavaScript.</p></div><span class="lesson-time">40 min</span></div><div class="progress-line"><i style="width: 42%"></i></div><div class="card-foot"><span>42% complete</span><button class="text-button">Continue ${icon('arrow', 14)}</button></div></div><div class="streak-card"><span class="mono-label">CURRENT STREAK</span><strong>04</strong><span class="streak-days">days in a row <i>✳</i></span><div class="streak-week"><span class="done">M</span><span class="done">T</span><span class="done">W</span><span class="done">T</span><span>F</span><span>S</span><span>S</span></div></div></div>
                <div class="mini-section-heading"><span>Recent roadmaps</span><button class="text-button">See all ${icon('arrow', 14)}</button></div><div class="recent-list"><button class="recent-item" data-tab="roadmaps"><span class="recent-thumb thumb-lime">JS</span><span><b>JavaScript from scratch</b><small>8 milestones · 6 hrs</small></span><span class="recent-progress">36%</span>${icon('arrow', 15)}</button><button class="recent-item" data-tab="roadmaps"><span class="recent-thumb thumb-pink">AI</span><span><b>How AI products work</b><small>6 milestones · 4 hrs</small></span><span class="recent-progress">12%</span>${icon('arrow', 15)}</button></div>
              </div>
              <div class="tab-panel" data-panel="roadmaps"><div class="panel-heading"><div><span class="mono-label">YOUR LIBRARY</span><h3>My roadmaps</h3></div><button class="button button-dark button-small" data-focus-prompt>+ New roadmap</button></div><div class="roadmap-library"><div class="library-card"><div class="library-accent lime"></div><span class="mono-label">IN PROGRESS</span><h4>JavaScript from scratch</h4><p>8 milestones · 6 hours total</p><div class="progress-line"><i style="width: 36%"></i></div><span class="recent-progress">36% complete</span></div><div class="library-card"><div class="library-accent pink"></div><span class="mono-label">JUST STARTED</span><h4>How AI products work</h4><p>6 milestones · 4 hours total</p><div class="progress-line"><i style="width: 12%"></i></div><span class="recent-progress">12% complete</span></div><div class="library-card library-empty"><div class="empty-plus">+</div><h4>Build a new path</h4><p>Turn a curious thought into a clear next step.</p></div></div></div>
              <div class="tab-panel" data-panel="resources"><div class="panel-heading"><div><span class="mono-label">CURATED FOR YOU</span><h3>Resource shelf</h3></div><span class="filter-pill">All topics ${icon('arrow', 13)}</span></div><div class="resource-list"><a class="resource-item" href="#" aria-label="Open The JavaScript Way resource"><span class="resource-type video">VIDEO</span><div><h4>The JavaScript Way</h4><p>Build a strong mental model before you touch a framework.</p></div><span class="resource-meta">32 min ${icon('external', 14)}</span></a><a class="resource-item" href="#" aria-label="Open Don't Make Me Think resource"><span class="resource-type read">READ</span><div><h4>Don't Make Me Think</h4><p>A practical introduction to product design thinking.</p></div><span class="resource-meta">4 hrs ${icon('external', 14)}</span></a><a class="resource-item" href="#" aria-label="Open AI Engineering resource"><span class="resource-type course">COURSE</span><div><h4>AI Engineering 101</h4><p>How models, products, and people fit together.</p></div><span class="resource-meta">6 lessons ${icon('external', 14)}</span></a></div></div>
              <div class="tab-panel" data-panel="community"><div class="panel-heading"><div><span class="mono-label">FROM THE COMMUNITY</span><h3>Popular paths</h3></div><span class="filter-pill">Trending ${icon('arrow', 13)}</span></div><div class="community-grid"><div class="community-card"><span class="community-tag">DESIGN</span><h4>UX research, without the fog</h4><p>by maliha · 1.2k learners</p><button>Open roadmap ${icon('arrow', 14)}</button></div><div class="community-card dark-card"><span class="community-tag">TECH</span><h4>Ship your first web app</h4><p>by noah · 842 learners</p><button>Open roadmap ${icon('arrow', 14)}</button></div><div class="community-card"><span class="community-tag">CULTURE</span><h4>Read 12 great novels</h4><p>by priya · 636 learners</p><button>Open roadmap ${icon('arrow', 14)}</button></div></div></div>
            </div>
          </div>
        </div>
      </section>

      <section class="library-section page-section" id="library"><div class="library-copy reveal"><span class="section-number">[ 03 ]</span><h2>Made for the<br /><em>curious ones.</em></h2><p>Not every learning journey needs to look the same. Start with a template, remix it, or make your own.</p><button class="button button-dark" data-scroll-workspace>Browse the library ${icon('arrow', 15)}</button></div><div class="template-wall reveal reveal-delay"><div class="template-card template-one"><span class="template-label">DESIGN</span><strong>Learn<br />Figma</strong><span class="template-footer">12 steps <i>${icon('arrow', 14)}</i></span></div><div class="template-card template-two"><span class="template-label">BUILD</span><strong>Code with<br />Python</strong><span class="template-footer">9 steps <i>${icon('arrow', 14)}</i></span></div><div class="template-card template-three"><span class="template-label">BUILD</span><strong>Create a<br />mobile app</strong><span class="template-footer">10 steps <i>${icon('arrow', 14)}</i></span></div><div class="pixel-word">GO<br />MAKE<br />IT</div></div></section>

      <section class="pricing-section page-section" id="pricing"><div class="pricing-headline"><span class="section-number">[ 04 ]</span><h2>Plans that grow<br /><em>your curiosity.</em></h2><p>Start free. Upgrade when you’re ready to go deeper.</p><div class="billing-switch" role="group" aria-label="Choose a billing view"><button class="billing-mode selected" data-billing-mode="monthly">Monthly</button><button class="billing-mode" data-billing-mode="annual">Yearly</button><span class="savings-badge">Save 28%</span></div></div><div class="pricing-grid"><div class="price-card price-free"><span class="price-tag">ESSENTIALS</span><h3>Free</h3><p>Everything you need to take your first step.</p><div class="price-amount">$0 <small>forever</small></div><button class="button button-ghost" data-start-learning>Start for free ${icon('arrow', 15)}</button><ul><li>${icon('check', 14)} 2 active roadmaps</li><li>${icon('check', 14)} Core resources</li><li>${icon('check', 14)} Community templates</li><li>${icon('check', 14)} Basic progress tracking</li></ul></div><div class="price-card price-pro"><div class="popular-badge">MOST POPULAR</div><span class="price-tag">FULL ACCESS</span><h3>PathAI Pro</h3><p>Unlimited paths, smarter resources, and momentum that sticks.</p><div class="price-amount" id="pro-price">$6.99 <small>/ month</small></div><div class="billing-options" role="group" aria-label="Choose a Pro billing plan"><button class="billing-option selected" data-billing="monthly">Monthly <b>$6.99</b></button><button class="billing-option" data-billing="quarterly">3 months <b>$12.99</b></button><button class="billing-option" data-billing="annual">Annual <b>$59.99</b></button></div><button class="button button-lime" data-start-learning>Try 3 days free ${icon('arrow', 15)}</button><ul><li>${icon('check', 14)} Unlimited AI roadmaps</li><li>${icon('check', 14)} Smart resource curation</li><li>${icon('check', 14)} Progress insights & streaks</li><li>${icon('check', 14)} Save and remix community paths</li></ul><div class="billing-note">3-day free trial · Cancel anytime</div></div><div class="price-card price-annual"><span class="price-tag">BEST VALUE</span><h3>Pro Annual</h3><p>Everything in Pro with the lowest effective monthly price.</p><div class="price-amount">$59.99 <small>/ year</small></div><button class="button button-ghost" data-billing="annual">Choose annual ${icon('arrow', 15)}</button><ul><li>${icon('check', 14)} All Pro features included</li><li>${icon('check', 14)} Just $4.99 per month</li><li>${icon('check', 14)} One simple yearly payment</li><li>${icon('check', 14)} 3-day free trial included</li></ul><div class="billing-note">Save 28% vs monthly</div></div></div><div class="pricing-reassurance"><span>${icon('lock', 14)} No pressure. Start free, explore your first path, and upgrade only when it feels useful.</span><span>Secure checkout · Cancel anytime</span></div></section>
    </main>
    <footer class="footer"><a class="brand" href="#top">${brandMark()}<span>path<span class="brand-accent">AI</span></span></a><span>learning, with direction.</span><span class="footer-right">© 2026 PathAI · Built for curious people</span></footer>
  </div>

`;

const demoPrompt = document.querySelector('#goal-input');
const demoPromptText = 'I want to learn the fundamentals of product design';
if (demoPrompt) {
  demoPrompt.value = '';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    demoPrompt.value = demoPromptText;
  } else {
    [...demoPromptText].forEach((character, index) => {
      window.setTimeout(() => { demoPrompt.value += character; }, 38 * index + 260);
    });
  }
}

const workspacePanel = app.querySelector('.tab-panel[data-panel="workspace"]');
workspacePanel.querySelector('.prompt-box').insertAdjacentHTML('afterend', `<section class="generated-roadmap" id="generated-roadmap" aria-live="polite" hidden><div class="generated-roadmap-head"><div><span class="mono-label">PATH GENERATED · PREVIEW</span><h3>Product design from scratch</h3><p>6 milestones · 4 weeks · paced for 3 hours a week</p></div><span class="generated-status">${icon('check', 13)} ready to explore</span></div><div class="roadmap-preview-track"><article class="roadmap-preview-step complete"><span class="roadmap-step-index">01</span><div><strong>Design foundations</strong><small>mental models · 35 min</small></div></article><i class="roadmap-preview-connector"></i><article class="roadmap-preview-step current"><span class="roadmap-step-index">02</span><div><strong>Understand your user</strong><small>research basics · 45 min</small></div></article><i class="roadmap-preview-connector"></i><article class="roadmap-preview-step"><span class="roadmap-step-index">03</span><div><strong>Make your first flow</strong><small>practice · 1 hr</small></div></article><i class="roadmap-preview-connector"></i><article class="roadmap-preview-step"><span class="roadmap-step-index">04</span><div><strong>Ship a tiny case study</strong><small>project · 2 hrs</small></div></article></div><div class="generated-roadmap-foot"><span>${icon('spark', 13)} generated from your prompt</span><button class="text-button" data-open-generated-roadmap>Open full roadmap ${icon('arrow', 14)}</button></div></section>`);

const auth = window.PathAIAuth;
const session = auth.getSession();
const signInButton = document.querySelector('[data-sign-in]');
if (session) signInButton.textContent = 'Dashboard';
signInButton.addEventListener('click', () => { window.location.href = session ? './workspace.html' : './onboarding.html?mode=signin'; });
document.querySelectorAll('[data-start-learning]').forEach((button) => button.addEventListener('click', () => { window.location.href = session && auth.isOnboarded() ? './workspace.html' : './onboarding.html'; }));

const switchTab = (tab) => {
  document.querySelectorAll('.app-nav-item[data-tab]').forEach((button) => button.classList.toggle('active', button.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === tab));
};
document.querySelectorAll('[data-tab]').forEach((button) => button.addEventListener('click', () => switchTab(button.dataset.tab)));

document.querySelectorAll('[data-scroll-workspace]').forEach((button) => button.addEventListener('click', (event) => {
  event.preventDefault(); document.querySelector('#workspace').scrollIntoView({ behavior: 'smooth' });
}));
document.querySelectorAll('[data-focus-prompt]').forEach((button) => button.addEventListener('click', () => { switchTab('workspace'); document.querySelector('#goal-input').focus(); }));
document.querySelectorAll('[data-fill]').forEach((button) => button.addEventListener('click', () => { document.querySelector('#goal-input').value = button.dataset.fill; document.querySelector('#goal-input').focus(); }));

const billingData = {
  monthly: { amount: '$6.99', suffix: '/ month' },
  quarterly: { amount: '$12.99', suffix: '/ 3 months' },
  annual: { amount: '$59.99', suffix: '/ year' },
};
document.querySelectorAll('[data-billing]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-billing]').forEach((option) => option.classList.remove('selected'));
  if (button.classList.contains('billing-option')) button.classList.add('selected');
  const price = billingData[button.dataset.billing];
  if (price) document.querySelector('#pro-price').innerHTML = `${price.amount} <small>${price.suffix}</small>`;
}));

document.querySelectorAll('[data-billing-mode]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-billing-mode]').forEach((option) => option.classList.remove('selected'));
  button.classList.add('selected');
  const billing = button.dataset.billingMode === 'annual' ? 'annual' : 'monthly';
  document.querySelector(`[data-billing="${billing}"]`)?.click();
}));

document.querySelector('#generate-btn').addEventListener('click', () => {
  const button = document.querySelector('#generate-btn');
  const input = document.querySelector('#goal-input');
  const preview = document.querySelector('#generated-roadmap');
  if (!input.value.trim()) { input.focus(); return; }
  button.disabled = true; button.innerHTML = `Mapping your path <span class="loading-dots">•••</span>`;
  setTimeout(() => { button.disabled = false; button.innerHTML = `Path generated ${icon('check', 15)}`; button.classList.add('button-lime'); button.classList.remove('button-dark'); preview.hidden = false; preview.classList.add('is-ready'); preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 1200);
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
