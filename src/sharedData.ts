import { Resource, ScheduleSession, FAQItem } from './types';

export const CHANNELS = [
  { name: '3Blue1Brown', benefit: 'Best visual explanations of AI — stunning animations', url: 'https://www.youtube.com/@3blue1brown' },
  { name: 'Two Minute Papers', benefit: 'Latest AI research in 2 minutes', url: 'https://www.youtube.com/@TwoMinutePapers' },
  { name: 'AI Explained', benefit: 'Deep dives into new AI models', url: 'https://www.youtube.com/@AIExplained' },
  { name: 'Matt Wolfe', benefit: 'Latest AI tools, news, hands-on demos', url: 'https://www.youtube.com/@mattwolfe' },
  { name: 'The AI Advantage', benefit: 'Business automation with AI', url: 'https://www.youtube.com/@TheAIAdvantage' },
  { name: 'Jeff Su', benefit: 'Practical AI for productivity', url: 'https://www.youtube.com/@JeffSu' }
];

export const RESOURCES: Resource[] = [
  // Week 1 — Understanding AI
  {
    id: 'w1v1',
    type: 'video',
    title: 'Artificial Intelligence In 5 Minutes',
    source: 'Simplilearn',
    week: 1,
    topic: 'Intro to AI',
    url: 'https://www.youtube.com/watch?v=ad79nYk2keg'
  },
  {
    id: 'w1v2',
    type: 'video',
    title: 'What Is AI?',
    source: 'IBM Technology',
    week: 1,
    topic: 'Fundamentals',
    url: 'https://www.youtube.com/watch?v=2ePf9rue1Ao'
  },
  {
    id: 'w1v3',
    type: 'video',
    title: 'Generative AI Explained in 2 Minutes',
    source: 'Google Cloud',
    week: 1,
    topic: 'GenAI',
    url: 'https://www.youtube.com/watch?v=HfO8M2S7Sps'
  },
  {
    id: 'w1v4',
    type: 'video',
    title: 'What Is Agentic AI?',
    source: 'IBM Technology',
    week: 1,
    topic: 'Agentic AI',
    url: 'https://www.youtube.com/watch?v=Yf7E6GkbyK4'
  },
  {
    id: 'w1v5',
    type: 'video',
    title: 'Large Language Models Explained',
    source: '3Blue1Brown',
    week: 1,
    topic: 'LLMs',
    url: 'https://www.youtube.com/watch?v=wjZofJX0v4M'
  },
  {
    id: 'w1v6',
    type: 'video',
    title: 'How ChatGPT Actually Works',
    source: 'Computerphile',
    week: 1,
    topic: 'Transformers',
    url: 'https://www.youtube.com/watch?v=O5xeyoRL95U'
  },
  {
    id: 'w1a1',
    type: 'article',
    title: 'A Brief History of AI',
    source: 'Visual Capitalist',
    week: 1,
    topic: 'History',
    url: 'https://www.visualcapitalist.com/history-of-ai/'
  },
  {
    id: 'w1a2',
    type: 'article',
    title: 'Types of AI',
    source: 'IBM Think Article',
    week: 1,
    topic: 'Classification',
    url: 'https://www.ibm.com/blog/types-of-ai/'
  },
  {
    id: 'w1a3',
    type: 'article',
    title: 'LLMs Explained With Minimum Math',
    source: 'UnderstandingAI.org',
    week: 1,
    topic: 'Under the Hood',
    url: 'https://www.understandingai.org/'
  },

  // Week 2 — Prompt Engineering
  {
    id: 'w2v1',
    type: 'video',
    title: 'Prompt Engineering 101 — Crash Course',
    source: 'freeCodeCamp',
    week: 2,
    topic: 'Basics',
    url: 'https://www.youtube.com/watch?v=_ZvnD73m40g'
  },
  {
    id: 'w2v2',
    type: 'video',
    title: 'Prompt Engineering Tutorial — Full Course',
    source: 'freeCodeCamp',
    week: 2,
    topic: 'Core Techniques',
    url: 'https://www.youtube.com/watch?v=xs6zP5nK6mE'
  },
  {
    id: 'w2v3',
    type: 'video',
    title: 'Prompt Engineering Guide — Beginner to Advanced',
    source: 'YouTube',
    week: 2,
    topic: 'Methodology',
    url: 'https://www.youtube.com/results?search_query=prompt+engineering+guide'
  },
  {
    id: 'w2a1',
    type: 'article',
    title: 'The Prompt Engineering Guide',
    source: 'promptingguide.ai',
    week: 2,
    topic: 'Handbook',
    url: 'https://www.promptingguide.ai/'
  },
  {
    id: 'w2a2',
    type: 'article',
    title: "Anthropic's Official Prompting Guide",
    source: 'docs.anthropic.com',
    week: 2,
    topic: 'Claude Guides',
    url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview'
  },
  {
    id: 'w2a3',
    type: 'article',
    title: 'Context Engineering Guide',
    source: 'github.com/dair-ai',
    week: 2,
    topic: 'Sourcing Data',
    url: 'https://github.com/dair-ai/Prompt-Engineering-Guide'
  },

  // Week 3 — AI Agents & Automation
  {
    id: 'w3v1',
    type: 'video',
    title: 'AI Agents, Clearly Explained',
    source: 'Jeff Su',
    week: 3,
    topic: 'Core Agent Concepts',
    url: 'https://www.youtube.com/watch?v=-p8tNlW4678'
  },
  {
    id: 'w3v2',
    type: 'video',
    title: 'AI Agents Explained Like You Are 5',
    source: 'YouTube',
    week: 3,
    topic: 'Simple Guide',
    url: 'https://www.youtube.com/watch?v=F8NKy9L_Ceg'
  },
  {
    id: 'w3v3',
    type: 'video',
    title: 'Andrew Ng: The Rise of AI Agents — BUILD 2024',
    source: 'BUILD 2024',
    week: 3,
    topic: 'Agentic Workflows',
    url: 'https://www.youtube.com/watch?v=sal78ACtGTc'
  },
  {
    id: 'w3v4',
    type: 'video',
    title: 'n8n Tutorial for Beginners — AI Automations FREE',
    source: 'Automation Pro',
    week: 3,
    topic: 'Workflow Tool',
    url: 'https://www.youtube.com/watch?v=W0Y9p2m30bQ'
  },
  {
    id: 'w3v5',
    type: 'video',
    title: 'The ONLY n8n Tutorial You Need — Beginners',
    source: 'Dev Tutorial',
    week: 3,
    topic: 'Workflows',
    url: 'https://www.youtube.com/watch?v=1o-8H_V8vO4'
  },
  {
    id: 'w3v6',
    type: 'video',
    title: 'What is RAG? Retrieval Augmented Generation Explained',
    source: 'IBM Technology',
    week: 3,
    topic: 'RAG Architecture',
    url: 'https://www.youtube.com/watch?v=T-D1OfcDW1M'
  },
  {
    id: 'w3v7',
    type: 'video',
    title: 'Multi-Agent AI Systems',
    source: 'IBM Technology',
    week: 3,
    topic: 'Swarm Intelligence',
    url: 'https://www.youtube.com/watch?v=mDbeWclp7zE'
  },
  {
    id: 'w3a1',
    type: 'article',
    title: 'What Are AI Agents?',
    source: 'IBM Think Article',
    week: 3,
    topic: 'Autonomy',
    url: 'https://www.ibm.com/blog/what-are-ai-agents/'
  },
  {
    id: 'w3a2',
    type: 'article',
    title: 'n8n Official Tutorial',
    source: 'docs.n8n.io',
    week: 3,
    topic: 'Documentation',
    url: 'https://docs.n8n.io/courses/'
  },
  {
    id: 'w3a3',
    type: 'article',
    title: 'What is RAG?',
    source: 'IBM Think Article',
    week: 3,
    topic: 'Knowledge Retreival',
    url: 'https://www.ibm.com/topics/retrieval-augmented-generation'
  },

  // Week 4 — Ethics, Future & Careers
  {
    id: 'w4v1',
    type: 'video',
    title: 'The Ethical Dilemma of AI',
    source: 'TED Talk',
    week: 4,
    topic: 'Societal Impact',
    url: 'https://www.ted.com/talks/ai'
  },
  {
    id: 'w4v2',
    type: 'video',
    title: 'AI Bias Explained Simply',
    source: 'Crash Course AI',
    week: 4,
    topic: 'Algorithmic Fairness',
    url: 'https://www.youtube.com/watch?v=gV0_1mNXuMc'
  },
  {
    id: 'w4v3',
    type: 'video',
    title: 'The Future of AI — What to Expect in 5 Years',
    source: 'Tech Deep Dive',
    week: 4,
    topic: 'Emerging Horizons',
    url: 'https://www.youtube.com/results?search_query=future+of+ai+5+years'
  },
  {
    id: 'w4v4',
    type: 'video',
    title: 'AI Career Paths Explained — 2026',
    source: 'Career Navigator',
    week: 4,
    topic: 'Workforce Prep',
    url: 'https://www.youtube.com/results?search_query=ai+career+paths'
  },
  {
    id: 'w4a1',
    type: 'article',
    title: 'AI Ethics for Students',
    source: 'hood.libguides.com',
    week: 4,
    topic: 'Ethics Guide',
    url: 'https://hood.libguides.com/ethics_of_ai'
  },
  {
    id: 'w4a2',
    type: 'article',
    title: 'Future of Jobs with AI',
    source: 'World Economic Forum',
    week: 4,
    topic: 'Global Employment',
    url: 'https://www.weforum.org/publications/the-future-of-jobs-report-2023/'
  }
];

export const SCHEDULE: ScheduleSession[] = [
  // Week 1 — Understanding AI
  {
    weekNum: 1,
    theme: 'Understanding AI — AI history, types, LLMs, model comparisons, AI spotting',
    day: 'Monday',
    sessionName: 'Introduction to Artificial Intelligence & Course Foundations',
    dailyPractice: 'Setting up environments & building a collaborative AI history path.',
    colorTheme: 'orange'
  },
  {
    weekNum: 1,
    theme: 'Understanding AI — AI history, types, LLMs, model comparisons, AI spotting',
    day: 'Tuesday',
    sessionName: 'Under the Hood: How Computers Actually "Learn"',
    dailyPractice: 'Analyzing neural nets interactively & spotting AI in local web apps.',
    colorTheme: 'orange'
  },
  {
    weekNum: 1,
    theme: 'Understanding AI — AI history, types, LLMs, model comparisons, AI spotting',
    day: 'Wednesday',
    sessionName: 'The Battle of the Brains: ChatGPT vs. Claude vs. Gemini',
    dailyPractice: 'Live benchmarking & evaluating models on reasoning, writing & math.',
    colorTheme: 'orange'
  },
  {
    weekNum: 1,
    theme: 'Understanding AI — AI history, types, LLMs, model comparisons, AI spotting',
    day: 'Thursday',
    sessionName: 'Prompt Engineering Foundations & Generative AI Output Spotting',
    dailyPractice: 'Deconstructing ChatGPT responses & spotting hallucinated answers.',
    colorTheme: 'orange'
  },

  // Week 2 — Prompt Engineering
  {
    weekNum: 2,
    theme: 'Prompt Engineering — prompt anatomy, role/CoT/few-shot, context, templates',
    day: 'Monday',
    sessionName: 'The Anatomy of a Perfect Prompt: Framework Rules',
    dailyPractice: 'Formulating prompts with specific rules (Persona, Goal, Constraints, Tone).',
    colorTheme: 'navy'
  },
  {
    weekNum: 2,
    theme: 'Prompt Engineering — prompt anatomy, role/CoT/few-shot, context, templates',
    day: 'Tuesday',
    sessionName: 'Advanced Prompts: Zero-Shot, Few-Shot & Chain-of-Thought Reasoning',
    dailyPractice: 'Providing text reasoning patterns & forcing step-by-step calculations.',
    colorTheme: 'navy'
  },
  {
    weekNum: 2,
    theme: 'Prompt Engineering — prompt anatomy, role/CoT/few-shot, context, templates',
    day: 'Wednesday',
    sessionName: 'Designing Professional Custom Chatbots & System Instructions',
    dailyPractice: 'Creating a personalized Tutor AI using custom markdown system instructions.',
    colorTheme: 'navy'
  },
  {
    weekNum: 2,
    theme: 'Prompt Engineering — prompt anatomy, role/CoT/few-shot, context, templates',
    day: 'Thursday',
    sessionName: 'Context Splicing, Prompt Templates & Variable Injection',
    dailyPractice: 'Building reusable prompt templates for sales emails and study guides.',
    colorTheme: 'navy'
  },

  // Week 3 — AI Agents & n8n
  {
    weekNum: 3,
    theme: 'AI Agents & n8n — agent concepts, n8n workflows, RAG, multi-agent systems',
    day: 'Monday',
    sessionName: 'Decoupling Prompts: Introducing the World of Autonomous AI Agents',
    dailyPractice: 'Understanding loops, system tools & creating logical agent block diagrams.',
    colorTheme: 'teal'
  },
  {
    weekNum: 3,
    theme: 'AI Agents & n8n — agent concepts, n8n workflows, RAG, multi-agent systems',
    day: 'Tuesday',
    sessionName: 'Setting Up Visual Automations with n8n Nodes',
    dailyPractice: 'Building a working automated email alert system using trigger/action nodes.',
    colorTheme: 'teal'
  },
  {
    weekNum: 3,
    theme: 'AI Agents & n8n — agent concepts, n8n workflows, RAG, multi-agent systems',
    day: 'Wednesday',
    sessionName: 'Retrieval-Augmented Generation (RAG): Connecting Custom Data',
    dailyPractice: 'Uploading custom PDF guidelines & chatting with a grounded local knowledge base.',
    colorTheme: 'teal'
  },
  {
    weekNum: 3,
    theme: 'AI Agents & n8n — agent concepts, n8n workflows, RAG, multi-agent systems',
    day: 'Thursday',
    sessionName: 'Swarm Orchestration: Building a Multi-Agent Virtual Workforce',
    dailyPractice: 'Instantiating a content agency: Writer Agent, Editor Agent, and SEO Agent.',
    colorTheme: 'teal'
  },

  // Week 4 — Ethics + Demo Day
  {
    weekNum: 4,
    theme: 'Ethics + Demo Day — bias, privacy, careers, future of AI, capstone, graduation',
    day: 'Monday',
    sessionName: 'The Dark Side of AI: Hallucinations, Fair Bias, & Plagiarism',
    dailyPractice: 'Analyzing algorithmic bias & formulating personal and study AI honor codes.',
    colorTheme: 'gold'
  },
  {
    weekNum: 4,
    theme: 'Ethics + Demo Day — bias, privacy, careers, future of AI, capstone, graduation',
    day: 'Tuesday',
    sessionName: 'Exploring AI Career Paths & Self-Enhancing Future Workflows',
    dailyPractice: 'Mapping your high school/college path utilizing AI productivity loops.',
    colorTheme: 'gold'
  },
  {
    weekNum: 4,
    theme: 'Ethics + Demo Day — bias, privacy, careers, future of AI, capstone, graduation',
    day: 'Wednesday',
    sessionName: 'Capstone Project Hackathon: Building the No-Code Masterpiece',
    dailyPractice: 'One-on-one reviews, polishing presentation pitches & completing projects.',
    colorTheme: 'gold'
  },
  {
    weekNum: 4,
    theme: 'Ethics + Demo Day — bias, privacy, careers, future of AI, capstone, graduation',
    day: 'Thursday',
    sessionName: 'Grand Demo Day & Graduation ceremony!',
    dailyPractice: 'Pitching student capstone agents live & receiving official graduation certificates.',
    colorTheme: 'gold'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'Do I need any prior coding or programming experience to attend?',
    answer: 'Absolutely not. This is a strict "No-Code" intensive. The entire camp focuses on graphical user interfaces, conversational prompting design, and automated workflow builders like n8n. If you can use a web browser, you have all the technical skills needed to excel.'
  },
  {
    id: 'f2',
    question: 'What kind of laptop or device do I need to bring?',
    answer: 'Any basic, working laptop (Windows, Mac, or Chromebook) with an active Wi-Fi connection and a modern web browser (Google Chrome, Microsoft Edge, or Safari) is perfectly fine. All computing is done in the cloud, so you do not need a gaming computer or specialized hardware.'
  },
  {
    id: 'f3',
    question: 'Will I receive a formal certificate upon completing the camp?',
    answer: 'Yes! Students who maintain active attendance (at least 14 of the 16 sessions) and present a functional capstone agent on Demo Day will receive a formal physical Certificate of Completion from the Bright Mind Institute of Education.'
  },
  {
    id: 'f4',
    question: 'Can parents/guardians attend the sessions, especially on Demo Day?',
    answer: 'While regular daily classes are student-only to promote focused study and collaboration, parents and guardians are warmly invited and strongly encouraged to attend the grand Graduation and Capstone Demo Day on the final Thursday.'
  },
  {
    id: 'f5',
    question: 'What happens if a student misses a session due to illness or travel?',
    answer: 'All lecture slides and tutorial steps are uploaded to our student resource hub immediately after each class. Furthermore, we support peer-study circles and maintain dedicated office hours for quick catch-ups before the next morning\'s session.'
  }
];
