(() => {
  const youtubeQueries = {
    ai: ['AI fundamentals', 'machine learning explained visually', 'neural networks from scratch', 'transformers attention explained', 'prompt engineering experiments', 'AI evaluation and testing', 'AI agents beginner project', 'generative AI product design', 'responsible AI safety', 'AI engineering portfolio project'],
    coding: ['Python beginner course', 'Python functions and data structures', 'Python debugging for beginners', 'Git and GitHub beginner workflow', 'JavaScript fundamentals visual guide', 'HTML CSS responsive layout', 'APIs explained for beginners', 'web app testing basics', 'software architecture for beginners', 'coding portfolio project'],
    business: ['customer discovery interviews', 'how to find a startup problem', 'business model canvas explained', 'lean startup experiments', 'product market fit explained', 'startup landing page teardown', 'early stage startup sales', 'growth loops for beginners', 'startup metrics explained', 'founder pitch deck walkthrough'],
    finance: ['financial literacy for beginners', 'how to make a budget', 'cash flow explained', 'income statement balance sheet cash flow', 'compound interest explained visually', 'investing risk and diversification', 'financial modelling tutorial', 'valuation fundamentals', 'accounting basics for beginners', 'finance case study walkthrough'],
    accounting: ['accounting fundamentals', 'debits and credits explained', 'journal entries practice', 'trial balance walkthrough', 'accounts receivable and payable', 'inventory accounting basics', 'financial statement analysis', 'cash flow statement tutorial', 'management accounting basics', 'accounting spreadsheet project'],
    literature: ['how to read literature closely', 'literary analysis for beginners', 'narrative structure explained', 'modern literature reading guide', 'poetry analysis techniques', 'character and point of view', 'comparative literature essay', 'how to annotate a novel', 'literary theory introduction', 'build a reading habit'],
    english: ['English grammar for beginners', 'English speaking practice', 'English listening practice', 'English writing structure', 'vocabulary learning system', 'pronunciation practice English', 'business English communication', 'English presentation skills', 'reading comprehension practice', 'English conversation roleplay'],
    mathematics: ['math foundations for adults', 'algebra fundamentals explained', 'geometry visual explanation', 'calculus intuition', 'probability for beginners', 'statistics explained visually', 'linear algebra visual guide', 'discrete mathematics basics', 'mathematical proof for beginners', 'math problem solving strategies'],
    design: ['product design fundamentals', 'UX research for beginners', 'user interviews UX', 'wireframing and prototyping', 'design systems explained', 'visual hierarchy UI design', 'accessibility in product design', 'usability testing walkthrough', 'Figma beginner project', 'design portfolio case study'],
    science: ['how to think like a scientist', 'scientific method explained', 'research question design', 'reading research papers', 'data visualization fundamentals', 'experiment design for beginners', 'science communication skills', 'critical thinking and evidence', 'biology fundamentals visual', 'physics fundamentals visual'],
    psychology: ['psychology fundamentals course', 'cognitive psychology explained', 'learning science techniques', 'motivation psychology explained', 'decision making biases', 'social psychology fundamentals', 'research methods psychology', 'memory and learning explained', 'behavior change science', 'psychology case study'],
    career: ['career planning for beginners', 'how to build a portfolio', 'interview preparation skills', 'resume writing walkthrough', 'public speaking practice', 'networking for introverts', 'how to learn a new skill', 'project based learning', 'career change roadmap', 'personal productivity system'],
  };

  const pretty = (value) => value.replace(/\b\w/g, (letter) => letter.toUpperCase());
  const all = Object.entries(youtubeQueries).flatMap(([category, queries]) => queries.map((query, index) => ({
    id: `yt-${category}-${index + 1}`,
    title: pretty(query),
    category,
    provider: 'YouTube discovery',
    type: 'Video search',
    url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
    description: `A focused visual-learning search for ${query}. Review the results and choose a creator whose explanations match your level.`,
    difficulty: index < 3 ? 'Beginner' : index < 7 ? 'Intermediate' : 'All levels',
    duration: 'Varies',
    verificationStatus: 'provider-search',
  })));

  const categories = [...new Set(all.map((resource) => resource.category))];
  window.PathAIResourceLibrary = { all, categories, count: all.length };
})();
