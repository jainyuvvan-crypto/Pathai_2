(() => {
  const STORAGE_KEY = 'pathai.roadmaps.v2';

  const resources = {
    python: { title: 'The Python Tutorial', provider: 'Python.org', type: 'Official documentation', url: 'https://docs.python.org/3/tutorial/', description: 'A structured introduction to Python syntax, control flow, functions, and data structures.', difficulty: 'Beginner', duration: '6–8 hrs', verificationStatus: 'curated-official' },
    youtubePython: { title: 'Python beginner lessons', provider: 'YouTube search', type: 'Video search', url: 'https://www.youtube.com/results?search_query=python+beginner+tutorial+freecodecamp', description: 'Visual tutorials for seeing Python concepts explained and demonstrated.', difficulty: 'Beginner', duration: 'Varies', verificationStatus: 'provider-search' },
    numpy: { title: 'NumPy: Quickstart tutorial', provider: 'NumPy', type: 'Official documentation', url: 'https://numpy.org/doc/stable/user/quickstart.html', description: 'Learn the array concepts used throughout scientific Python and machine learning.', difficulty: 'Beginner', duration: '90 min', verificationStatus: 'curated-official' },
    pandas: { title: 'Getting started tutorials', provider: 'pandas', type: 'Official documentation', url: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/', description: 'Work through real examples of loading, cleaning, selecting, and analysing data.', difficulty: 'Beginner', duration: '2–3 hrs', verificationStatus: 'curated-official' },
    ml: { title: 'Machine Learning Crash Course', provider: 'Google', type: 'Course', url: 'https://developers.google.com/machine-learning/crash-course', description: 'Practical lessons on regression, classification, data, and model evaluation.', difficulty: 'Intermediate', duration: '15 hrs', verificationStatus: 'curated-official' },
    youtubeML: { title: 'Machine learning visual lessons', provider: 'YouTube search', type: 'Video search', url: 'https://www.youtube.com/results?search_query=machine+learning+beginner+visual+explanation', description: 'Visual explanations and walkthroughs for machine-learning fundamentals.', difficulty: 'Intermediate', duration: 'Varies', verificationStatus: 'provider-search' },
    sklearn: { title: 'Supervised learning', provider: 'scikit-learn', type: 'Official documentation', url: 'https://scikit-learn.org/stable/supervised_learning.html', description: 'Reference and examples for building supervised machine-learning models.', difficulty: 'Intermediate', duration: '2 hrs', verificationStatus: 'curated-official' },
    hf: { title: 'Hugging Face Course', provider: 'Hugging Face', type: 'Course', url: 'https://huggingface.co/learn/nlp-course/chapter1/1', description: 'Understand transformers and build practical natural-language applications.', difficulty: 'Intermediate', duration: '12+ hrs', verificationStatus: 'curated-official' },
    fastapi: { title: 'First steps with FastAPI', provider: 'FastAPI', type: 'Official documentation', url: 'https://fastapi.tiangolo.com/tutorial/first-steps/', description: 'Create a small API that can serve your model or application.', difficulty: 'Intermediate', duration: '60 min', verificationStatus: 'curated-official' },
    arduino: { title: 'Arduino Documentation', provider: 'Arduino', type: 'Official documentation', url: 'https://docs.arduino.cc/learn/', description: 'Start with boards, sketches, inputs, outputs, and sensor projects.', difficulty: 'Beginner', duration: '3 hrs', verificationStatus: 'curated-official' },
    youtubeRobotics: { title: 'Robotics project walkthroughs', provider: 'YouTube search', type: 'Video search', url: 'https://www.youtube.com/results?search_query=arduino+robotics+beginner+project', description: 'Watch build demonstrations that make sensors, motors, and prototypes tangible.', difficulty: 'Beginner', duration: 'Varies', verificationStatus: 'provider-search' },
    ros: { title: 'ROS 2 Documentation', provider: 'Open Robotics', type: 'Official documentation', url: 'https://docs.ros.org/en/jazzy/index.html', description: 'Learn the core concepts behind robot software, nodes, topics, and tools.', difficulty: 'Intermediate', duration: '4 hrs', verificationStatus: 'curated-official' },
    yclibrary: { title: 'Startup Library', provider: 'Y Combinator', type: 'Learning library', url: 'https://www.ycombinator.com/library', description: 'Practical guidance on finding a problem, talking to users, and building a company.', difficulty: 'Beginner', duration: '3 hrs', verificationStatus: 'curated-provider' },
    youtubeStartup: { title: 'Startup fundamentals visual lessons', provider: 'YouTube search', type: 'Video search', url: 'https://www.youtube.com/results?search_query=startup+customer+discovery+beginner', description: 'Visual talks and examples for customer discovery and early product thinking.', difficulty: 'Beginner', duration: 'Varies', verificationStatus: 'provider-search' },
    strategy: { title: 'Business strategy resources', provider: 'MIT OpenCourseWare', type: 'University materials', url: 'https://ocw.mit.edu/search/?d=Management', description: 'Explore open university materials for strategy, management, and entrepreneurship.', difficulty: 'Intermediate', duration: 'Varies', verificationStatus: 'curated-provider' },
    finance: { title: 'Finance and capital markets', provider: 'Khan Academy', type: 'Course', url: 'https://www.khanacademy.org/economics-finance-domain', description: 'Build general financial literacy through approachable lessons and practice.', difficulty: 'Beginner', duration: 'Varies', verificationStatus: 'curated-provider' },
    math: { title: 'OpenStax mathematics', provider: 'OpenStax', type: 'Open textbook', url: 'https://openstax.org/subjects/math', description: 'Free, structured mathematics textbooks and practice across foundational topics.', difficulty: 'Beginner', duration: 'Varies', verificationStatus: 'curated-provider' },
    literature: { title: 'MIT Literature OpenCourseWare', provider: 'MIT OpenCourseWare', type: 'University materials', url: 'https://ocw.mit.edu/search/?d=Literature', description: 'Open university materials for reading, interpretation, and literary context.', difficulty: 'Intermediate', duration: 'Varies', verificationStatus: 'curated-provider' },
    design: { title: 'Nielsen Norman Group', provider: 'NN/g', type: 'Research library', url: 'https://www.nngroup.com/articles/', description: 'Research-backed guidance for user research, usability, and interaction design.', difficulty: 'Intermediate', duration: 'Varies', verificationStatus: 'curated-provider' },
    science: { title: 'Khan Academy science', provider: 'Khan Academy', type: 'Course library', url: 'https://www.khanacademy.org/science', description: 'Accessible science lessons with explanations and practice.', difficulty: 'Beginner', duration: 'Varies', verificationStatus: 'curated-provider' },
    psychology: { title: 'OpenStax Psychology 2e', provider: 'OpenStax', type: 'Open textbook', url: 'https://openstax.org/details/books/psychology-2e', description: 'A broad, free introduction to psychological concepts and research.', difficulty: 'Beginner', duration: 'Varies', verificationStatus: 'curated-provider' },
    english: { title: 'British Council LearnEnglish', provider: 'British Council', type: 'Learning library', url: 'https://learnenglish.britishcouncil.org/', description: 'Practice materials for English grammar, vocabulary, listening, and communication.', difficulty: 'Beginner', duration: 'Varies', verificationStatus: 'curated-provider' },
  };

  const catalog = Object.values(resources);
  const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const uid = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const LANGUAGES = ['spanish', 'french', 'german', 'italian', 'portuguese', 'japanese', 'chinese', 'mandarin', 'cantonese', 'korean', 'arabic', 'hindi', 'urdu', 'bengali', 'punjabi', 'tamil', 'russian', 'turkish', 'dutch', 'greek', 'swahili', 'polish', 'swedish', 'norwegian', 'danish', 'finnish', 'hebrew', 'vietnamese', 'thai', 'indonesian', 'tagalog', 'persian', 'farsi', 'ukrainian', 'irish', 'latin', 'sign language'];
  const detectLanguage = (text) => LANGUAGES.find((language) => new RegExp(`\\b${language}\\b`).test(text));
  const detectDomain = (goal) => {
    const text = goal.toLowerCase();
    if (detectLanguage(text)) return 'language';
    if (/robot|arduino|electronics|embedded|sensor/.test(text)) return 'robotics';
    if (/startup|business|entrepreneur|marketing|company/.test(text)) return 'business';
    if (/\baccount(ing|ant)?\b|bookkeeping|ledger|audit/.test(text)) return 'accounting';
    if (/financ|invest|economics|budget/.test(text)) return 'finance';
    if (/\bai\b|artificial intelligence|machine learning|deep learning|neural|\bllms?\b|ai agents?/.test(text)) return 'ai';
    if (/literature|novel|poetry|poem|reading|\bbooks?\b/.test(text)) return 'literature';
    if (/english|grammar|vocabulary|speaking|writing/.test(text)) return 'english';
    if (/\bmaths?\b|mathematics|algebra|calculus|statistics|probability|geometry/.test(text)) return 'mathematics';
    if (/design|\bux\b|user experience|figma|interface/.test(text)) return 'design';
    if (/science|biology|physics|chemistry|research/.test(text)) return 'science';
    if (/psychology|psychological|cognitive|behavior|behaviour/.test(text)) return 'psychology';
    if (/\bcod(e|ing)\b|program|python|javascript|typescript|software|web dev|developer|\bapps?\b|\bhtml\b|\bcss\b|\bsql\b|java\b|\brust\b|golang|swift/.test(text)) return 'coding';
    return 'topic';
  };
  const topicFrom = (goal) => {
    const topic = goal.trim()
      .replace(/^(i\s+)?(really\s+)?(want|would like|wanna|hope|need|plan|am trying)\s+to\s+/i, '')
      .replace(/^(learn|study|understand|master|get (better|good) at|become (good|better) at|know|explore)\s+(about\s+|how to\s+)?/i, '')
      .replace(/^(the\s+)?(basics|fundamentals)\s+of\s+/i, '')
      .replace(/[.!?]+$/, '').trim();
    return topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : 'Your topic';
  };
  const youtubeSearch = (query, difficulty = 'Beginner') => ({ title: `Video lessons: ${query}`, provider: 'YouTube search', type: 'Video search', url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, description: `YouTube results for “${query}”.`, difficulty, duration: 'Varies', verificationStatus: 'provider-search' });
  const link = (title, provider, url, type, description, difficulty = 'Beginner', duration = 'Varies') => ({ title, provider, url, type, description, difficulty, duration, verificationStatus: 'curated-provider' });
  const step = (title, description, minutes, resourceKeys, exercise, prerequisites = []) => ({ id: uid('step'), title, description, estimatedDuration: `${minutes} min`, prerequisites, completionStatus: 'not-started', learningObjectives: [description], resources: resourceKeys.map((key, index) => ({ ...(typeof key === 'string' ? resources[key] : key), id: uid('resource'), relevanceReason: `Directly supports ${title.toLowerCase()}.`, recommendedOrder: index + 1 })), exercise: { id: uid('exercise'), title: exercise, instructions: `Apply ${title.toLowerCase()} in a small, focused practice task.`, successCriteria: 'You can explain the idea, complete the task, and describe what you would improve next.' } });
  const phase = (title, description, steps) => ({ id: uid('phase'), title, description, orderIndex: 0, steps });

  const analyzePrompt = (goal) => {
    const text = goal.trim();
    const lower = text.toLowerCase();
    const domain = detectDomain(text);
    const keywords = [...new Set(lower.match(/[a-z][a-z-]{3,}/g) || [])].slice(0, 8);
    const outcome = /build|ship|create|launch|make|develop/.test(lower) ? 'Build a tangible project' : /career|job|become|professional/.test(lower) ? 'Build job-ready confidence' : 'Build durable understanding';
    const constraints = [
      /beginner|start|from scratch|basics/.test(lower) ? 'Beginner-friendly sequence' : null,
      /week|weekly|hour|hours|month|months/.test(lower) ? 'Time-aware pacing' : null,
      /video|visual|watch/.test(lower) ? 'Visual resources' : null,
    ].filter(Boolean);
    return { domain, keywords, outcome, constraints };
  };

  const addSteps = (currentPhase, extraSteps) => {
    currentPhase.steps.push(...extraSteps);
    return currentPhase;
  };

  function expandRoadmap(roadmap, domain) {
    const p = roadmap.phases;
    if (domain === 'ai') {
      addSteps(p[0], [
        step('Read and write files', 'Use Python files, modules, exceptions, and simple command-line inputs to make work repeatable.', 150, ['python', 'youtubePython'], 'Build a small command-line note organiser.', ['Work with arrays and data'] ),
        step('Build a data pipeline', 'Move from a raw input to a clean, documented dataset that another person can reproduce.', 180, ['pandas', 'numpy'], 'Create a three-stage cleaning pipeline and record its assumptions.', ['Read and write files'] ),
      ]);
      addSteps(p[1], [
        step('Compare models', 'Choose a baseline, compare alternatives, and explain the trade-off between accuracy and simplicity.', 180, ['sklearn', 'ml'], 'Run two models on the same split and write a comparison.', ['Build a first model'] ),
        step('Tune and explain results', 'Use validation thoughtfully and communicate which features influenced the result.', 180, ['sklearn', 'youtubeML'], 'Create a one-page model card with metrics and limitations.', ['Compare models'] ),
      ]);
      addSteps(p[2], [
        step('Evaluate model outputs', 'Design examples, edge cases, and human checks for an AI feature before trusting it.', 180, ['hf', 'youtubeML'], 'Build a ten-example evaluation set and score the outputs.', ['Explore transformers'] ),
        step('Design prompt experiments', 'Treat prompts as testable interfaces with clear inputs, outputs, and failure cases.', 150, ['hf', 'youtubeML'], 'Run three prompt variants and document the difference.', ['Evaluate model outputs'] ),
      ]);
      addSteps(p[3], [
        step('Add tests and observability', 'Protect an AI application with input checks, tests, logs, and a repeatable demo flow.', 210, ['fastapi', 'hf'], 'Add five tests and a simple log of model inputs and outputs.', ['Serve an AI feature'] ),
        step('Publish a useful README', 'Explain the user, setup, architecture, examples, and known limitations of the project.', 120, ['fastapi'], 'Write a README that lets a new person run your app in ten minutes.', ['Add tests and observability'] ),
      ]);
      p.push(phase('Evaluation, safety, and responsibility', 'Learn how to make an AI system more reliable, transparent, and respectful of people.', [
        step('Map failure modes', 'Identify where an AI system can be wrong, biased, unsafe, or misleading.', 150, ['ml', 'hf'], 'Create a failure-mode table with a mitigation for each risk.', ['Design prompt experiments']),
        step('Protect data and privacy', 'Choose sensible data handling, retention, access, and redaction practices.', 120, ['fastapi'], 'Write a plain-language data handling note for your project.', ['Map failure modes']),
        step('Run a safety review', 'Test your feature with adversarial, ambiguous, and sensitive examples before sharing it.', 180, ['hf', 'youtubeML'], 'Run a safety checklist and fix the two highest-risk issues.', ['Protect data and privacy']),
        step('Make evaluation repeatable', 'Turn quality checks into a small benchmark that can be rerun after every change.', 180, ['ml', 'sklearn'], 'Create a benchmark sheet with a pass threshold and a changelog.', ['Run a safety review']),
      ]));
      p.push(phase('Portfolio and next horizon', 'Turn your learning into evidence and choose the next level deliberately.', [
        step('Scope the capstone', 'Choose one audience, one problem, and one measurable outcome for a final build.', 120, ['yclibrary', 'strategy'], 'Write a one-page capstone brief with a clear “done” definition.', ['Make evaluation repeatable']),
        step('Build in public-sized slices', 'Deliver a small vertical slice before adding complexity or polish.', 300, ['fastapi', 'hf'], 'Ship a working slice and collect feedback from two people.', ['Scope the capstone']),
        step('Document the evidence', 'Show your decisions, experiments, results, and limitations so the work is credible.', 150, ['fastapi'], 'Publish a project write-up with screenshots and evaluation results.', ['Build in public-sized slices']),
        step('Choose your next specialization', 'Use the project evidence to decide between research, product, data, or platform work.', 90, ['ml', 'hf'], 'Write a next-90-days plan with one skill, one project, and one community.', ['Document the evidence']),
      ]));
    }
    if (domain === 'robotics') {
      addSteps(p[0], [
        step('Use version control', 'Save experiments safely and make hardware changes easy to compare.', 90, ['arduino', 'youtubeRobotics'], 'Create a repository and commit a working sensor sketch.', ['Program the microcontroller']),
        step('Calibrate a sensor', 'Measure noise, range, and repeatability before using a sensor in a decision.', 150, ['arduino', 'youtubeRobotics'], 'Record ten readings and choose a calibration rule.', ['Read sensors and control outputs']),
      ]);
      addSteps(p[1], [
        step('Model movement', 'Represent position, speed, and control signals so motion can be reasoned about.', 180, ['ros', 'youtubeRobotics'], 'Draw a state diagram for one robot behaviour.', ['Understand robot software concepts']),
        step('Test behaviour in simulation', 'Use repeatable tests to catch problems before risking the physical build.', 210, ['ros'], 'Write three simulated test cases and record expected outputs.', ['Simulate a simple robot']),
      ]);
      addSteps(p[2], [
        step('Manage power and safety', 'Plan power, wiring, emergency stops, and safe test conditions.', 150, ['arduino', 'ros'], 'Create a power and safety checklist for your prototype.', ['Design a robot system']),
        step('Iterate from test evidence', 'Use logs and observations to make one deliberate hardware or software improvement.', 180, ['arduino', 'youtubeRobotics'], 'Run a before-and-after test and explain the change.', ['Complete a first robot project']),
      ]);
      p.push(phase('Perception and autonomy', 'Combine sensing, decision-making, and feedback into an increasingly capable system.', [
        step('Fuse multiple sensors', 'Combine imperfect signals to make a more reliable estimate of the environment.', 210, ['ros', 'arduino'], 'Compare one-sensor and two-sensor behaviour in a table.', ['Calibrate a sensor']),
        step('Plan a robot behaviour', 'Turn a goal into states, transitions, and recovery actions.', 180, ['ros'], 'Create a state machine for obstacle avoidance.', ['Model movement']),
        step('Test edge cases', 'Design tests for low light, noisy inputs, blocked paths, and unexpected events.', 150, ['ros', 'youtubeRobotics'], 'Run five edge cases and rank the failures.', ['Plan a robot behaviour']),
        step('Explain the system', 'Document how sensing, control, power, and safety work together.', 120, ['arduino', 'ros'], 'Create a labelled system diagram and a two-minute demo script.', ['Test edge cases']),
      ]));
      p.push(phase('Final robot build', 'Finish with a safe, measurable prototype that proves what you learned.', [
        step('Define the demo', 'Choose a narrow task with a repeatable success metric.', 90, ['ros', 'arduino'], 'Write the demo procedure and pass criteria.', ['Explain the system']),
        step('Build the vertical slice', 'Assemble the smallest end-to-end behaviour before adding features.', 300, ['arduino', 'ros', 'youtubeRobotics'], 'Build and record the first complete run.', ['Define the demo']),
        step('Measure and improve', 'Use evidence to make one change that improves reliability or clarity.', 180, ['arduino', 'ros'], 'Compare three runs before and after the change.', ['Build the vertical slice']),
        step('Share the build', 'Present the result, constraints, and next experiment clearly.', 120, ['youtubeRobotics'], 'Publish a build log with diagrams, video, and next steps.', ['Measure and improve']),
      ]));
    }
    if (domain === 'business') {
      addSteps(p[0], [
        step('Map the user journey', 'See where a customer feels friction before deciding what to build.', 120, ['yclibrary', 'youtubeStartup'], 'Map one user journey and circle its highest-friction moment.', ['Explore customer problems']),
        step('Write an evidence brief', 'Separate facts, assumptions, and open questions so the idea stays grounded.', 90, ['yclibrary'], 'Create an evidence table from your interviews.', ['Choose a focused opportunity']),
      ]);
      addSteps(p[1], [
        step('Prototype the promise', 'Represent the core value with the cheapest believable prototype.', 210, ['strategy', 'youtubeStartup'], 'Make a clickable, service, or landing-page prototype.', ['Design the business model']),
        step('Test willingness to act', 'Ask for a meaningful action instead of relying only on opinions.', 180, ['yclibrary'], 'Design one test with a measurable action and threshold.', ['Build a tiny experiment']),
      ]);
      addSteps(p[2], [
        step('Create a repeatable sales loop', 'Practise a respectful process for finding, helping, and learning from early customers.', 180, ['strategy', 'youtubeStartup'], 'Write a simple outreach and follow-up sequence.', ['Talk to the market']),
        step('Track the right signals', 'Choose a few measures that show whether the product is creating real value.', 120, ['strategy'], 'Create a weekly scorecard with three leading indicators.', ['Plan the next 30 days']),
      ]);
      p.push(phase('Product iteration', 'Turn feedback into focused improvements without losing the original problem.', [
        step('Prioritise the backlog', 'Rank requests by user value, evidence, effort, and strategic fit.', 120, ['strategy'], 'Prioritise ten requests and explain the top three.', ['Track the right signals']),
        step('Run an experiment sprint', 'Plan, ship, and review one product experiment in a short cycle.', 210, ['yclibrary', 'strategy'], 'Run a seven-day experiment and record the outcome.', ['Prioritise the backlog']),
        step('Improve the user experience', 'Remove friction from the first useful action a customer takes.', 150, ['strategy'], 'Observe one user and make three small improvements.', ['Run an experiment sprint']),
        step('Decide what not to build', 'Protect focus by making explicit trade-offs and communicating them clearly.', 90, ['yclibrary'], 'Write a “not now” list with reasons and revisit dates.', ['Improve the user experience']),
      ]));
      p.push(phase('Launch loop', 'Build a sustainable rhythm for learning, operating, and choosing the next bet.', [
        step('Plan a focused launch', 'Set audience, promise, channel, timing, and a clear learning question.', 120, ['strategy', 'youtubeStartup'], 'Create a launch brief with one primary metric.', ['Decide what not to build']),
        step('Gather post-launch evidence', 'Use feedback and behaviour to distinguish signal from noise.', 180, ['yclibrary'], 'Review ten user responses and identify two patterns.', ['Plan a focused launch']),
        step('Review economics', 'Understand basic cost, pricing, revenue, and sustainability trade-offs.', 150, ['finance', 'strategy'], 'Model three simple scenarios in a spreadsheet.', ['Gather post-launch evidence']),
        step('Write the next-quarter plan', 'Convert learning into a small set of measurable bets.', 120, ['strategy'], 'Write three bets, owners, measures, and review dates.', ['Review economics']),
      ]));
    }
    if (domain === 'finance') {
      addSteps(p[0], [
        step('Build a cash-flow view', 'See when money comes in, goes out, and needs to stay available.', 150, ['finance'], 'Create a fictional twelve-month cash-flow forecast.', ['Understand money and budgets']),
        step('Understand interest and inflation', 'Learn how time changes the value and cost of money.', 120, ['finance'], 'Compare three fictional savings and borrowing scenarios.', ['Read financial statements']),
      ]);
      addSteps(p[1], [
        step('Compare risk and return', 'Use simple examples to understand uncertainty, volatility, and time horizon.', 150, ['finance'], 'Write a risk comparison for three fictional choices.', ['Understand markets']),
        step('Read a market story critically', 'Check claims, sources, incentives, and uncertainty before accepting a conclusion.', 120, ['finance'], 'Annotate one public finance article with facts and assumptions.', ['Compare risk and return']),
      ]);
      p.push(phase('Financial modelling', 'Use simple models to reason through business and personal finance scenarios.', [
        step('Build a three-statement model', 'Connect profit, assets, liabilities, and cash in a simplified company model.', 240, ['finance'], 'Create a fictional company model with linked statements.', ['Build a cash-flow view']),
        step('Run sensitivity checks', 'See how a model changes when assumptions change.', 150, ['finance'], 'Run three scenarios and identify the most sensitive assumption.', ['Build a three-statement model']),
        step('Communicate uncertainty', 'Present a range and the assumptions behind it instead of false precision.', 120, ['finance'], 'Write an executive summary with a base, upside, and downside case.', ['Run sensitivity checks']),
        step('Know when to ask for advice', 'Recognise the boundary between general learning and personalised financial advice.', 90, ['finance'], 'Write a checklist of questions to take to a qualified professional.', ['Communicate uncertainty']),
      ]));
      p.push(phase('Case study project', 'Apply the full finance workflow to a clear, fictional case.', [
        step('Choose the case', 'Define a company, household, or market question that can be researched responsibly.', 90, ['finance'], 'Write the case question, context, and decision-maker.', ['Know when to ask for advice']),
        step('Collect and clean inputs', 'Trace data to its source and record assumptions and missing information.', 180, ['finance'], 'Create a source log and cleaned input sheet.', ['Choose the case']),
        step('Make the recommendation', 'Balance evidence, risk, alternatives, and uncertainty in a clear recommendation.', 180, ['finance'], 'Write a two-page case memo with an alternative option.', ['Collect and clean inputs']),
        step('Present and reflect', 'Explain what you learned and which question you would investigate next.', 120, ['finance'], 'Record a five-minute presentation and a reflection note.', ['Make the recommendation']),
      ]));
    }
    if (domain === 'coding') {
      addSteps(p[0], [
        step('Work with files and data', 'Read, transform, and save structured data so programs can solve useful problems.', 180, ['python', 'youtubePython'], 'Build a CSV summary tool.', ['Learn programming basics']),
        step('Use tests and version control', 'Make changes safely with small tests and a clear history of your work.', 150, ['python'], 'Add tests for three edge cases and commit the project.', ['Practise debugging']),
      ]);
      addSteps(p[1], [
        step('Connect a simple API', 'Understand requests, responses, validation, and errors at an application boundary.', 210, ['fastapi', 'youtubePython'], 'Build an API for your tracker or quiz.', ['Create a small application']),
        step('Deploy a usable version', 'Move from local code to a repeatable build that another person can try.', 210, ['fastapi'], 'Write a deployment checklist and share a working demo.', ['Connect a simple API']),
      ]);
      p.push(phase('Application foundations', 'Learn the habits that make software easier to use, maintain, and extend.', [
        step('Design the data model', 'Choose simple data structures and boundaries that match the problem.', 150, ['python'], 'Draw your application data model and explain two trade-offs.', ['Work with files and data']),
        step('Handle errors and edge cases', 'Make the expected path clear while treating invalid input with care.', 150, ['python', 'fastapi'], 'Add validation for five invalid inputs.', ['Use tests and version control']),
        step('Improve accessibility and clarity', 'Make the interface understandable for more people and contexts.', 150, ['fastapi'], 'Run an accessibility and copy review on your project.', ['Deploy a usable version']),
        step('Refactor with a reason', 'Improve structure only when it makes a real change easier or safer.', 120, ['python'], 'Refactor one module and document the before-and-after.', ['Handle errors and edge cases']),
      ]));
      p.push(phase('Portfolio project', 'Turn the fundamentals into one complete, explainable piece of work.', [
        step('Choose a real user problem', 'Choose a small problem where a working tool can be tested by another person.', 90, ['yclibrary'], 'Write a user story and a definition of done.', ['Improve accessibility and clarity']),
        step('Build the first slice', 'Deliver one end-to-end path before adding optional features.', 300, ['python', 'fastapi', 'youtubePython'], 'Build and demo the first slice.', ['Choose a real user problem']),
        step('Test with people', 'Observe use, ask clear questions, and turn findings into changes.', 150, ['python'], 'Run two usability tests and write the top three findings.', ['Build the first slice']),
        step('Publish the case study', 'Explain the problem, architecture, decisions, trade-offs, and next steps.', 150, ['python', 'fastapi'], 'Publish a README and a five-minute demo.', ['Test with people']),
      ]));
    }
    return roadmap;
  }

  const templates = {
    ai: (goal) => ({ title: 'AI engineering from first principles', description: `A practical path toward: ${goal}`, phases: [phase('Programming foundations', 'Build enough Python fluency to work confidently with data and APIs.', [step('Learn Python essentials', 'Understand syntax, variables, control flow, functions, and data structures.', 180, ['python', 'youtubePython'], 'Write a command-line tool that transforms a small text file.'), step('Work with arrays and data', 'Use NumPy and pandas to load, inspect, clean, and transform data.', 150, ['numpy', 'pandas'], 'Analyse a small public dataset and write three observations.', ['Learn Python essentials'])]), phase('Machine learning fundamentals', 'Learn how models learn, how to evaluate them, and where they fail.', [step('Understand the machine-learning workflow', 'Learn features, labels, training, validation, testing, and leakage.', 180, ['ml', 'youtubeML'], 'Draw a data-to-prediction workflow and identify one source of leakage.', ['Work with arrays and data']), step('Build a first model', 'Practise regression, classification, and evaluation with scikit-learn.', 210, ['sklearn', 'ml'], 'Train a small classifier and compare two evaluation metrics.', ['Understand the machine-learning workflow'])]), phase('Deep learning and generative AI', 'Move from classical models to neural networks and transformer applications.', [step('Understand neural networks', 'Learn the core ideas behind layers, parameters, loss, and training.', 180, ['ml', 'youtubeML'], 'Explain a neural network in your own words and sketch a forward pass.', ['Build a first model']), step('Explore transformers', 'Understand the role of tokenisation, attention, and pretrained models.', 240, ['hf'], 'Use a pretrained model on one small, clearly scoped task.', ['Understand neural networks'])]), phase('Ship an AI application', 'Turn your knowledge into a useful, documented product.', [step('Serve an AI feature', 'Connect a model to an application interface and think about safety.', 210, ['fastapi'], 'Build an endpoint that accepts input and returns a model response.', ['Explore transformers']), step('Complete a portfolio project', 'Plan, build, test, document, and share one small AI application.', 300, ['fastapi', 'hf'], 'Ship a small AI app with a README, limitations, and example inputs.', ['Serve an AI feature'])]) ]}),
    robotics: (goal) => ({ title: 'Robotics from first principles', description: `A practical path toward: ${goal}`, phases: [phase('Control and programming basics', 'Learn the code and logic that make a machine respond to its world.', [step('Program the microcontroller', 'Understand sketches, variables, loops, and inputs on a small board.', 180, ['arduino', 'youtubeRobotics'], 'Make an LED respond to a button or sensor.', []), step('Read sensors and control outputs', 'Connect sensor readings to motors, lights, or simple decisions.', 210, ['arduino', 'youtubeRobotics'], 'Build a temperature or distance monitor.', ['Program the microcontroller'])]), phase('Robot software', 'Structure robot behaviour into readable, testable components.', [step('Understand robot software concepts', 'Learn nodes, messages, topics, and the role of a robot operating system.', 180, ['ros'], 'Map the data flow between three robot components.', ['Read sensors and control outputs']), step('Simulate a simple robot', 'Use a simulator or small environment to test movement and sensing.', 240, ['ros', 'youtubeRobotics'], 'Create a repeatable movement test and record what happened.', ['Understand robot software concepts'])]), phase('Build and test', 'Combine sensing, control, and iteration into a real prototype.', [step('Design a robot system', 'Break a robot into power, sensing, control, and actuation subsystems.', 150, ['arduino', 'ros'], 'Draw a system diagram and list three risks.', ['Simulate a simple robot']), step('Complete a first robot project', 'Build, test, document, and improve a small robot.', 360, ['arduino', 'ros', 'youtubeRobotics'], 'Create a checklist and demonstrate one reliable behaviour.', ['Design a robot system'])]) ]}),
    business: (goal) => ({ title: 'Build a startup with evidence', description: `A practical path toward: ${goal}`, phases: [phase('Find a real problem', 'Learn to separate an interesting idea from a problem people will act to solve.', [step('Explore customer problems', 'Learn problem interviews, observation, and evidence gathering.', 150, ['yclibrary', 'youtubeStartup'], 'Write ten interview questions and speak to three people.', []), step('Choose a focused opportunity', 'Compare pain, frequency, access, and willingness to try a solution.', 120, ['yclibrary', 'strategy'], 'Score three opportunities and explain your choice.', ['Explore customer problems'])]), phase('Shape the offer', 'Turn a validated problem into a clear promise and first experiment.', [step('Design the business model', 'Map users, value, channels, costs, and possible revenue.', 180, ['strategy'], 'Draft a one-page business model and identify its riskiest assumption.', ['Choose a focused opportunity']), step('Build a tiny experiment', 'Create the smallest test that can produce useful evidence.', 240, ['yclibrary', 'youtubeStartup'], 'Launch a landing page, prototype, or concierge test.', ['Design the business model'])]), phase('Launch and learn', 'Practise product, marketing, sales, and simple operating discipline.', [step('Talk to the market', 'Learn messaging, feedback loops, and ethical early distribution.', 180, ['strategy', 'yclibrary'], 'Write three messages and test them with real people.', ['Build a tiny experiment']), step('Plan the next 30 days', 'Use evidence to set a narrow product, learning, and finance plan.', 120, ['strategy'], 'Create a weekly experiment plan with success criteria.', ['Talk to the market'])]) ]}),
    finance: (goal) => ({ title: 'Finance fundamentals for informed decisions', description: `A general education path toward: ${goal}`, phases: [phase('Build financial literacy', 'Understand the language used in everyday and business finance.', [step('Understand money and budgets', 'Learn income, expenses, saving, debt, and trade-offs.', 120, ['finance'], 'Build a fictional monthly budget and identify three trade-offs.', []), step('Read financial statements', 'Learn the purpose of an income statement, balance sheet, and cash flow.', 180, ['finance'], 'Annotate a simple fictional company statement.', ['Understand money and budgets'])]), phase('Markets and risk', 'Learn general concepts without turning education into personal advice.', [step('Understand markets', 'Learn how assets, markets, diversification, and risk are described.', 180, ['finance'], 'Compare two fictional portfolios by risk and time horizon.', ['Read financial statements']), step('Make a learning plan', 'Know which questions require more research or qualified advice.', 90, ['finance'], 'Write a personal finance question list and sources to investigate.', ['Understand markets'])]) ]}),
    coding: (goal) => ({ title: 'Coding foundations that lead to projects', description: `A practical path toward: ${goal}`, phases: [phase('Core programming', 'Learn the concepts that transfer across programming languages.', [step('Learn programming basics', 'Understand values, control flow, functions, and data structures.', 210, ['python'], 'Build a small command-line quiz or calculator.', []), step('Practise debugging', 'Learn to read errors, isolate problems, and test small changes.', 150, ['python'], 'Break a small program on purpose, then debug it systematically.', ['Learn programming basics'])]), phase('Build for the web', 'Turn code into something people can use.', [step('Create a small application', 'Learn the basic structure of a web interface and its interactions.', 240, ['python'], 'Build a simple tracker or interactive page.', ['Practise debugging']), step('Ship and document it', 'Learn to explain your choices, limitations, and next steps.', 180, ['python'], 'Publish a README and a short demo of your project.', ['Create a small application'])]) ]}),
  };

  const createLongTemplate = (goal, title, resourceKey, phases) => ({ title, description: `A practical path toward: ${goal}`, phases: phases.map((currentPhase, phaseIndex) => phase(currentPhase.title, currentPhase.description, currentPhase.steps.map((stepTitle, stepIndex) => step(stepTitle, currentPhase.lesson, 90 + (stepIndex * 30), [resourceKey], currentPhase.exercise, stepIndex ? [currentPhase.steps[stepIndex - 1]] : phaseIndex ? [phases[phaseIndex - 1].steps[phases[phaseIndex - 1].steps.length - 1]] : [])))) });
  templates.literature = (goal) => createLongTemplate(goal, 'Read literature with depth and context', 'literature', [
    { title: 'Build a reading practice', description: 'Create a sustainable way to read attentively and remember what matters.', lesson: 'Learn how attention, annotation, and context improve literary reading.', exercise: 'Annotate ten pages and write three questions.', steps: ['Choose a reading lens', 'Create a reading rhythm', 'Annotate with purpose', 'Keep a question log'] },
    { title: 'Read the form', description: 'Notice how structure, voice, image, and point of view shape meaning.', lesson: 'Identify how literary form guides a reader’s experience.', exercise: 'Mark one passage for structure, voice, and image.', steps: ['Study narrative structure', 'Follow point of view', 'Notice style and imagery', 'Compare two passages'] },
    { title: 'Read the context', description: 'Connect a work to its time, place, genre, and cultural conversation.', lesson: 'Research context without reducing a work to its context.', exercise: 'Make a context sheet with three reliable sources.', steps: ['Research the author', 'Place the work historically', 'Study the genre', 'Test a contextual claim'] },
    { title: 'Make an interpretation', description: 'Move from observations to a clear, evidence-based argument.', lesson: 'Turn patterns in the text into a nuanced interpretation.', exercise: 'Write a claim with three quoted or paraphrased moments.', steps: ['Find a recurring pattern', 'Draft an interpretation', 'Consider a counter-reading', 'Revise for precision'] },
    { title: 'Share the reading', description: 'Communicate what you learned so another reader can follow your thinking.', lesson: 'Present literary ideas with evidence, clarity, and curiosity.', exercise: 'Create a short review or reading presentation.', steps: ['Plan a critical response', 'Write the first draft', 'Discuss the work', 'Publish a reading note'] },
  ]);
  templates.english = (goal) => createLongTemplate(goal, 'English communication from foundations to fluency', 'english', [
    { title: 'Build a baseline', description: 'Understand your current strengths and choose a useful communication goal.', lesson: 'Use a simple baseline to focus learning instead of guessing.', exercise: 'Record a two-minute introduction and review it.', steps: ['Set a communication goal', 'Check grammar patterns', 'Build a core vocabulary', 'Track recurring errors'] },
    { title: 'Understand the language', description: 'Learn how sentences, sounds, and common phrases work together.', lesson: 'Notice patterns in grammar, pronunciation, and everyday usage.', exercise: 'Rewrite ten sentences in two different forms.', steps: ['Practise sentence structure', 'Work on verb patterns', 'Train pronunciation', 'Learn useful phrases'] },
    { title: 'Understand other people', description: 'Improve listening and reading so real communication feels less effortful.', lesson: 'Use context, prediction, and repetition to understand meaning.', exercise: 'Listen to a short clip twice and summarise it.', steps: ['Practise active listening', 'Read for the main idea', 'Infer unknown words', 'Summarise accurately'] },
    { title: 'Express yourself', description: 'Speak and write with structure, confidence, and an appropriate tone.', lesson: 'Plan a message before choosing the words and grammar.', exercise: 'Write and record a clear explanation of a topic you know.', steps: ['Organise an explanation', 'Write a useful email', 'Practise conversation', 'Give a short presentation'] },
    { title: 'Make fluency durable', description: 'Create a feedback loop that keeps your English improving after the roadmap.', lesson: 'Build habits that combine input, output, feedback, and reflection.', exercise: 'Create a four-week English practice plan.', steps: ['Get feedback', 'Review your errors', 'Use English in real life', 'Plan the next level'] },
  ]);
  templates.mathematics = (goal) => createLongTemplate(goal, 'Mathematics through intuition and practice', 'math', [
    { title: 'Build the foundations', description: 'Strengthen number sense, notation, and the habits needed for mathematical thinking.', lesson: 'Connect symbols to quantities and explain each step.', exercise: 'Solve ten problems and annotate your reasoning.', steps: ['Review number sense', 'Practise algebraic notation', 'Estimate before calculating', 'Explain a solution'] },
    { title: 'Represent relationships', description: 'Use equations, graphs, and diagrams to see how quantities relate.', lesson: 'Move between symbolic, visual, and verbal representations.', exercise: 'Represent one relationship three ways.', steps: ['Read a graph', 'Build an equation', 'Use a table of values', 'Compare representations'] },
    { title: 'Reason with uncertainty', description: 'Learn probability and statistics as tools for making better claims.', lesson: 'Distinguish variation, signal, probability, and evidence.', exercise: 'Analyse a small fictional dataset.', steps: ['Describe distributions', 'Understand probability', 'Compare samples', 'Question a conclusion'] },
    { title: 'Change and structure', description: 'See how calculus, geometry, or discrete ideas describe change and form.', lesson: 'Build intuition before relying on procedures.', exercise: 'Explain one abstract idea with a real-world model.', steps: ['Study change', 'Explore shape', 'Model a system', 'Solve a multi-step problem'] },
    { title: 'Think mathematically', description: 'Develop persistence, proof, and the ability to communicate a result.', lesson: 'Use definitions, assumptions, and counterexamples carefully.', exercise: 'Write a short proof or a complete problem solution.', steps: ['Break down a problem', 'Find a counterexample', 'Write a proof sketch', 'Create a practice set'] },
  ]);
  templates.design = (goal) => createLongTemplate(goal, 'Product design from research to prototype', 'design', [
    { title: 'Understand the problem', description: 'Learn to observe needs and frame a useful design question.', lesson: 'Separate a user need from a solution assumption.', exercise: 'Write a problem brief and three research questions.', steps: ['Map the audience', 'Plan research', 'Run an interview', 'Frame the opportunity'] },
    { title: 'Find the signal', description: 'Synthesize research into insights, patterns, and priorities.', lesson: 'Turn observations into evidence-backed design decisions.', exercise: 'Cluster notes and write three insight statements.', steps: ['Organise research notes', 'Find patterns', 'Map the journey', 'Choose a priority'] },
    { title: 'Shape the interaction', description: 'Design flows and structures that help a person achieve a goal.', lesson: 'Use hierarchy, affordance, and feedback to reduce friction.', exercise: 'Sketch a task flow and test it with a peer.', steps: ['Map the task flow', 'Sketch wireframes', 'Choose content hierarchy', 'Design feedback states'] },
    { title: 'Prototype and test', description: 'Make an idea tangible, observe use, and improve it quickly.', lesson: 'Test behaviour and comprehension before polishing visuals.', exercise: 'Run three usability tests and record findings.', steps: ['Build a prototype', 'Write a test script', 'Observe a user', 'Prioritise changes'] },
    { title: 'Build the case study', description: 'Explain the design process, trade-offs, and measurable outcome.', lesson: 'Tell a design story that makes decisions and evidence visible.', exercise: 'Publish a case study with before-and-after evidence.', steps: ['Document decisions', 'Create a visual system', 'Explain trade-offs', 'Present the outcome'] },
  ]);
  templates.science = (goal) => createLongTemplate(goal, 'Scientific thinking from question to evidence', 'science', [
    { title: 'Ask a strong question', description: 'Turn curiosity into a question that can actually be investigated.', lesson: 'Separate a broad topic from a testable claim.', exercise: 'Write one testable question and three alternatives.', steps: ['Choose a topic', 'Define variables', 'Find background evidence', 'Write a hypothesis'] },
    { title: 'Design the investigation', description: 'Plan methods, measures, controls, and ethical boundaries.', lesson: 'Make an investigation clear enough to reproduce.', exercise: 'Create a method and list its limitations.', steps: ['Choose a method', 'Define a measure', 'Plan controls', 'Check the risks'] },
    { title: 'Work with evidence', description: 'Collect, organise, and inspect data without overstating what it says.', lesson: 'Use data quality checks and transparent assumptions.', exercise: 'Clean a small dataset and make one honest chart.', steps: ['Record observations', 'Clean the data', 'Visualise the pattern', 'Check for bias'] },
    { title: 'Reason and communicate', description: 'Connect evidence to a claim while keeping uncertainty visible.', lesson: 'Distinguish result, interpretation, limitation, and next question.', exercise: 'Write a short results section with a limitation.', steps: ['Compare hypotheses', 'Write a conclusion', 'Name uncertainty', 'Plan a follow-up'] },
    { title: 'Complete a research brief', description: 'Present a small investigation clearly enough for another person to learn from it.', lesson: 'Make a research story concise, sourced, and reproducible.', exercise: 'Create a research poster or five-minute talk.', steps: ['Draft the brief', 'Add sources', 'Invite critique', 'Share the work'] },
  ]);
  templates.psychology = (goal) => createLongTemplate(goal, 'Psychology through research and real examples', 'psychology', [
    { title: 'Map the field', description: 'Learn the major questions, methods, and perspectives in psychology.', lesson: 'Use a field map to place new ideas in context.', exercise: 'Make a one-page map of five psychology areas.', steps: ['Survey major fields', 'Learn key terms', 'Compare perspectives', 'Choose a question'] },
    { title: 'Understand the mind', description: 'Explore cognition, memory, emotion, and behaviour with careful examples.', lesson: 'Connect psychological concepts to observable situations.', exercise: 'Explain one concept with an example and a non-example.', steps: ['Study cognition', 'Study memory', 'Study emotion', 'Study behaviour'] },
    { title: 'Read the evidence', description: 'Understand studies, samples, measures, and the difference between correlation and causation.', lesson: 'Ask what a study can and cannot support.', exercise: 'Annotate one study summary with methods and limits.', steps: ['Read a research question', 'Inspect a sample', 'Check a measure', 'Question a claim'] },
    { title: 'Apply responsibly', description: 'Use psychology ideas with humility, context, and respect for individual differences.', lesson: 'Avoid turning population research into certainty about one person.', exercise: 'Write an application with caveats and alternatives.', steps: ['Choose an application', 'Name the limits', 'Consider culture', 'Avoid overclaiming'] },
    { title: 'Make a case study', description: 'Synthesize concepts and evidence into a clear learning artifact.', lesson: 'Communicate psychological thinking without diagnosis or false certainty.', exercise: 'Create a case study or teaching guide.', steps: ['Choose a case', 'Collect sources', 'Build the explanation', 'Reflect on next questions'] },
  ]);
  templates.accounting = (goal) => createLongTemplate(goal, 'Accounting from transactions to insight', 'finance', [
    { title: 'Learn the language', description: 'Build a foundation in accounts, transactions, and the accounting equation.', lesson: 'See how business events change financial records.', exercise: 'Classify twenty fictional transactions.', steps: ['Learn account types', 'Use the equation', 'Classify transactions', 'Check a balance'] },
    { title: 'Record the activity', description: 'Practise journals, ledgers, adjustments, and a trial balance.', lesson: 'Move from a transaction to a reliable record.', exercise: 'Record a month of fictional activity.', steps: ['Write journal entries', 'Post to ledgers', 'Make adjustments', 'Prepare a trial balance'] },
    { title: 'Read the statements', description: 'Understand what the income statement, balance sheet, and cash flow reveal.', lesson: 'Connect statements to business operations and decisions.', exercise: 'Annotate a fictional company’s statements.', steps: ['Read income', 'Read assets and liabilities', 'Follow cash', 'Compare periods'] },
    { title: 'Analyse the business', description: 'Use ratios, margins, and trends to ask better questions.', lesson: 'Treat metrics as clues, not complete answers.', exercise: 'Write three insights and three questions from a dataset.', steps: ['Study margins', 'Compare liquidity', 'Inspect efficiency', 'Challenge a conclusion'] },
    { title: 'Complete a close', description: 'Bring the full workflow together in a small, documented accounting case.', lesson: 'Work carefully, check assumptions, and explain what the numbers mean.', exercise: 'Complete a fictional month-end close pack.', steps: ['Prepare the records', 'Check the statements', 'Write the summary', 'Present the case'] },
  ]);

  const chainPhases = (plan) => {
    let previous = null;
    return plan.map((currentPhase) => phase(currentPhase.title, currentPhase.description, currentPhase.steps.map(([title, description, minutes, links, exercise]) => {
      const created = step(title, description, minutes, links, exercise, previous ? [previous] : []);
      previous = title;
      return created;
    })));
  };
  const languageExtras = {
    spanish: [link('SpanishDict grammar guide', 'SpanishDict', 'https://www.spanishdict.com/guide', 'Grammar reference', 'Clear explanations and examples for every core Spanish grammar topic.'), link('Dreaming Spanish', 'Dreaming Spanish', 'https://www.dreamingspanish.com/', 'Comprehensible input', 'Graded video input from complete beginner to advanced, organised by level.')],
    french: [link('Lawless French grammar', 'Lawless French', 'https://www.lawlessfrench.com/grammar/', 'Grammar reference', 'Free lessons covering French grammar, pronunciation, and usage.'), link('Apprendre avec TV5MONDE', 'TV5MONDE', 'https://apprendre.tv5monde.com/en', 'Comprehensible input', 'Video-based French lessons organised by CEFR level.')],
    german: [link('Learn German', 'Deutsche Welle', 'https://learngerman.dw.com/en/overview', 'Grammar reference', 'A free structured German course from A1 to C1 with grammar, video, and exercises.'), link('Nicos Weg', 'Deutsche Welle', 'https://learngerman.dw.com/en/nicos-weg/c-36519789', 'Comprehensible input', 'A story-based video course that teaches German through an ongoing series.')],
    japanese: [link('Tofugu Japanese guides', 'Tofugu', 'https://www.tofugu.com/japanese/', 'Grammar reference', 'In-depth guides to kana, kanji, grammar, and pronunciation.'), link('Easy Japanese', 'NHK World', 'https://www.nhk.or.jp/lesson/en/', 'Comprehensible input', 'Free audio and video lessons with a story-driven beginner course.')],
  };
  templates.language = (goal) => {
    const key = detectLanguage(goal.toLowerCase());
    const name = key.replace(/\b\w/g, (letter) => letter.toUpperCase());
    const extras = languageExtras[key] || [];
    const video = (query) => youtubeSearch(`learn ${name} ${query}`);
    const grammar = extras.find((item) => item.type === 'Grammar reference') || link(`${name} grammar overview`, 'Wikipedia', `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(`${name} grammar`)}`, 'Grammar reference', `An overview of how ${name} sentences, verbs, and word forms work.`);
    const input = extras.find((item) => item.type === 'Comprehensible input') || youtubeSearch(`${name} comprehensible input for beginners`);
    const transfer = link('Language Transfer', 'Language Transfer', 'https://www.languagetransfer.org/', 'Audio course', 'A free audio course that teaches you to build sentences by thinking, not memorising.');
    const forvo = link('Forvo pronunciation dictionary', 'Forvo', 'https://forvo.com/', 'Pronunciation', 'Hear real native speakers pronounce any word.');
    const anki = link('Anki flashcards', 'Anki', 'https://apps.ankiweb.net/', 'Practice tool', 'Free spaced-repetition flashcards for remembering vocabulary long term.');
    const tandem = link('Tandem language exchange', 'Tandem', 'https://www.tandem.net/', 'Conversation practice', 'Find native speakers who want to learn your language in exchange.');
    const cefr = link('CEFR common reference levels', 'Council of Europe', 'https://www.coe.int/en/web/common-european-framework-reference-languages', 'Framework', 'The A1–C2 scale used worldwide to describe language ability.');
    return { title: `${name} from first words to real conversations`, description: `A practical path toward: ${goal}`, phases: chainPhases([
      { title: 'Sounds and survival phrases', description: `Get comfortable with how ${name} sounds before memorising lots of words.`, steps: [
        ['Learn the sound system', `Hear and reproduce the core sounds, letters, and stress patterns of ${name}.`, 60, [video('pronunciation for beginners'), forvo], 'Record yourself reading 20 words and compare with native audio.'],
        ['Greet people and introduce yourself', 'Say hello, give your name and where you are from, and ask the same of someone else.', 45, [video('greetings and introductions'), transfer], 'Write and record a 30-second self-introduction.'],
        ['Numbers, days, and time', 'Count, tell the time, and talk about dates and prices.', 60, [video('numbers days and time'), anki], 'Read aloud ten prices and five times of day.'],
        ['Your first 100 words', 'Build a high-frequency starter vocabulary with spaced repetition.', 90, [anki, video('most common words')], 'Create a 100-card deck and review it for five days.'],
      ] },
      { title: 'Core grammar', description: 'Learn the patterns that let you build your own sentences instead of memorising phrases.', steps: [
        ['Sentence structure and word order', `See how ${name} orders subjects, verbs, and objects.`, 90, [grammar, transfer, video('sentence structure')], 'Build ten sentences from a subject, verb, and object.'],
        ['Present-tense verbs', 'Conjugate the most common verbs and use them to describe your day.', 120, [grammar, video('present tense verbs')], 'Conjugate ten common verbs and use each in a sentence.'],
        ['Ask and answer questions', 'Form questions and respond naturally in a short exchange.', 60, [transfer, video('how to ask questions')], 'Write ten questions you would ask a new friend.'],
        ['Talk about the past and future', 'Describe what happened and what you plan to do.', 150, [grammar, video('past and future tense')], 'Describe yesterday and tomorrow in five sentences each.'],
      ] },
      { title: `Understand real ${name}`, description: 'Train your ear and eyes with input just above your level.', steps: [
        ['Daily comprehensible input', 'Watch and listen to material you mostly understand, every day.', 120, [input, video('comprehensible input beginner')], 'Watch 20 minutes of beginner input daily for a week.'],
        ['Read short graded stories', 'Read simple stories and note the words you meet more than once.', 90, [video('short stories for beginners'), anki], 'Read three short stories and add 15 new words to your deck.'],
        ['Shadow native speakers', 'Repeat audio immediately after a speaker to copy rhythm and intonation.', 60, [video('shadowing practice'), forvo], 'Shadow one two-minute clip five times and record the last attempt.'],
        ['Grow vocabulary in context', 'Learn new words from sentences you have understood, not from lists.', 90, [anki, input], 'Mine 20 sentence cards from your listening and reading.'],
      ] },
      { title: 'Speak and write', description: 'Turn what you understand into your own words, out loud and on paper.', steps: [
        ['Handle everyday situations', 'Order food, ask for directions, and make plans.', 90, [video('everyday conversation'), tandem], 'Role-play three everyday situations out loud.'],
        ['Find a conversation partner', 'Practise with a real person in short, regular sessions.', 60, [tandem, video('conversation practice')], 'Hold two 15-minute conversations with a partner.'],
        ['Keep a short journal', 'Write a few sentences daily using the grammar you have learned.', 90, [grammar, anki], 'Write five journal entries of five to eight sentences.'],
        ['Recover from misunderstandings', 'Ask people to repeat, slow down, or explain a word.', 45, [video('phrases when you do not understand'), tandem], 'Learn ten repair phrases and use three in a conversation.'],
      ] },
      { title: 'Toward fluency', description: 'Measure your level and build a routine that keeps you improving.', steps: [
        ['Immerse with native media', 'Move from learner material to podcasts, shows, and articles made for native speakers.', 150, [input, video('podcast for intermediate learners')], 'Follow one native show or podcast for two weeks.'],
        ['Tell stories and give opinions', 'Speak at length about experiences and views.', 90, [video('expressing opinions'), tandem], 'Tell a two-minute story about a memorable day.'],
        ['Check your level', 'Self-assess listening, reading, speaking, and writing against the CEFR scale.', 60, [cefr, video('CEFR level test')], 'Rate each skill A1–C2 with an example as evidence.'],
        ['Plan your next 90 days', 'Choose the input, speaking, and review habits for your next level.', 45, [cefr, anki], 'Write a weekly plan with targets for each skill.'],
      ] },
    ]) };
  };
  templates.topic = (goal) => {
    const topic = topicFrom(goal);
    const video = (query) => youtubeSearch(`${topic} ${query}`);
    const wiki = link(`${topic}: overview`, 'Wikipedia', `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(topic)}`, 'Reference', `Background, key terms, and history of ${topic}.`);
    const ocw = link(`${topic} university materials`, 'MIT OpenCourseWare', `https://ocw.mit.edu/search/?q=${encodeURIComponent(topic)}`, 'University materials', `Free university courses and lecture notes related to ${topic}.`, 'Intermediate');
    const khan = link(`${topic} lessons`, 'Khan Academy', `https://www.khanacademy.org/search?page_search_query=${encodeURIComponent(topic)}`, 'Course library', `Free lessons and practice related to ${topic}.`);
    return { title: `${topic}: a guided path`, description: `A practical path toward: ${goal}`, phases: chainPhases([
      { title: 'Orientation', description: `Understand what ${topic} involves and where to begin.`, steps: [
        ['Map the landscape', `Get an overview of ${topic}: its main areas, history, and why people study it.`, 45, [wiki, video('explained for beginners')], 'Draw a one-page map of the main areas and how they connect.'],
        ['Learn the core vocabulary', `Collect the 20 terms every ${topic} beginner hears first.`, 60, [wiki, video('key terms for beginners')], 'Write a glossary of 20 terms in your own words.'],
        ['Set a concrete goal', 'Decide what you want to be able to do, and by when.', 30, [video('how to get started'), wiki], 'Write one measurable goal and three milestones.'],
      ] },
      { title: 'Fundamentals', description: `Build the foundations of ${topic} through clear explanations and worked examples.`, steps: [
        ['Learn the first principles', `Study the core ideas that everything else in ${topic} builds on.`, 120, [khan, video('fundamentals')], 'Explain each core idea in three sentences without notes.'],
        ['Study worked examples', 'Follow experts step by step and note why each step is taken.', 90, [video('step by step tutorial'), ocw], 'Reproduce two worked examples from memory.'],
        ['Practise the basic skills', 'Do short, focused practice on the skills beginners use most.', 120, [video('beginner practice'), khan], 'Complete five short practice sessions this week.'],
        ['Check your understanding', 'Test yourself to find gaps before moving on.', 60, [ocw, wiki], 'Write ten quiz questions and answer them a day later.'],
      ] },
      { title: 'Deliberate practice', description: 'Improve faster with feedback, repetition, and learning from mistakes.', steps: [
        ['Build a practice routine', 'Schedule short, regular sessions with a clear focus each time.', 45, [video('practice routine'), wiki], 'Plan two weeks of 30-minute sessions.'],
        ['Get feedback', 'Share your work with someone more experienced or compare against a model answer.', 60, [video('common beginner mistakes'), ocw], 'Collect feedback on one piece of work and list three changes.'],
        ['Fix common mistakes', 'Target the errors beginners make most often.', 90, [video('common mistakes'), khan], 'Redo one exercise focusing only on your biggest mistake.'],
        ['Learn from experts', 'Study how skilled people approach the same problems.', 90, [video('expert tips'), ocw], 'Summarise three habits experts share.'],
      ] },
      { title: 'Apply it', description: `Use ${topic} on a real project that proves what you can do.`, steps: [
        ['Plan a small project', 'Choose a project that uses most of what you have learned.', 45, [video('project ideas for beginners'), wiki], 'Write a one-page project brief with a definition of done.'],
        ['Do the project', 'Work through the project in small, finished pieces.', 240, [video('project walkthrough'), khan], 'Complete the project and document each step.'],
        ['Reflect and improve', 'Review what worked, what was hard, and what to change.', 60, [ocw, video('how to improve')], 'Write a short retrospective and make one improvement.'],
      ] },
      { title: 'Go deeper', description: 'Choose where to specialise and keep learning with others.', steps: [
        ['Explore an advanced area', `Pick one advanced part of ${topic} that interests you.`, 120, [ocw, video('advanced')], 'Summarise one advanced resource in a page of notes.'],
        ['Join a community', 'Find people learning the same thing to share progress and questions.', 30, [video('community'), wiki], 'Introduce yourself and ask one question in a community.'],
        ['Plan your next 90 days', 'Set the next goal, resources, and routine.', 45, [ocw, khan], 'Write a 90-day plan with weekly targets.'],
      ] },
    ]) };
  };

  function validateRoadmap(roadmap) {
    if (!roadmap?.title || !Array.isArray(roadmap.phases) || !roadmap.phases.length) throw new Error('The roadmap did not include any learning phases. Try a more specific goal.');
    roadmap.phases.forEach((currentPhase, phaseIndex) => {
      if (!currentPhase.title || !Array.isArray(currentPhase.steps) || !currentPhase.steps.length) throw new Error(`Phase ${phaseIndex + 1} is missing learning steps.`);
      currentPhase.orderIndex = phaseIndex;
      currentPhase.steps.forEach((currentStep, stepIndex) => {
        if (!currentStep.title || !currentStep.description || !Array.isArray(currentStep.resources)) throw new Error(`Step ${currentStep.title || stepIndex + 1} is incomplete.`);
        currentStep.orderIndex = stepIndex;
        currentStep.resources = currentStep.resources.filter((resource) => resource.url && resource.title && resource.provider);
      });
    });
    return roadmap;
  }

  const getRoadmaps = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const saveRoadmap = (roadmap) => { const saved = getRoadmaps().filter((item) => item.id !== roadmap.id); saved.unshift(roadmap); localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); return roadmap; };
  const updateRoadmap = (roadmap) => saveRoadmap({ ...roadmap, updatedAt: new Date().toISOString() });

  const API_BASE = (window.PATHAI_API_URL || '/api').replace(/\/$/, '');

  async function requestAIRoadmap(input) {
    try {
      const response = await fetch(`${API_BASE}/roadmaps/generate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
      const body = await response.json().catch(() => ({}));
      if (response.ok) return { roadmap: body };
      return { error: body.error || `The AI service responded with ${response.status}.`, notConfigured: body.code === 'ai-not-configured' || response.status === 404 || response.status === 501 };
    } catch {
      return { error: 'The AI service is unreachable. Start the app with npm run dev.', notConfigured: true };
    }
  }

  async function generateRoadmap(input) {
    const goal = input.goal.trim();
    if (goal.length < 8) throw new Error('Tell PathAI a little more about what you want to learn.');
    const base = { id: uid('roadmap'), goal, skillLevel: input.skillLevel || 'Beginner', objective: input.objective || 'Skill', hoursPerWeek: input.hoursPerWeek || '3 hrs / week', format: input.format || 'Mixed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const ai = await requestAIRoadmap({ ...input, goal });
    if (ai.roadmap) return validateRoadmap({ ...base, ...ai.roadmap, id: base.id });
    const analysis = analyzePrompt(goal);
    const generated = expandRoadmap(templates[analysis.domain](goal), analysis.domain);
    return validateRoadmap({ ...base, analysis, title: generated.title, description: generated.description, status: 'offline-template', fallbackReason: ai.error, aiNotConfigured: ai.notConfigured, phases: generated.phases });
  }

  window.PathAIEngine = { catalog, analyzePrompt, generateRoadmap, validateRoadmap, getRoadmaps, saveRoadmap, updateRoadmap, slug, getStatus: () => fetch(`${API_BASE}/status`).then((response) => (response.ok ? response.json() : null)).catch(() => null) };
})();
