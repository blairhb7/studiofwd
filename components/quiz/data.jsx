// Quiz content + state shape.

export const QUIZ_INITIAL = {
  // contact
  name: '',
  email: '',
  business: '',

  // project basics
  projectType: '',  // 'new' | 'redesign' | 'landing'
  existingUrl: '',

  // goals
  goals: [],

  // scope
  pages: [],
  pagesOther: '',
  pageCount: 6,
  features: [],
  copywriting: '',  // 'have' | 'some' | 'need'

  // timeline + budget
  timeline: '',     // 'asap' | '1to2' | '3to6' | 'flex'
  budget: [5000, 12000],

  // direction
  vibes: [],

  // closing
  inspiration: ['', ''],
  notes: '',
};

export const QUIZ_STEPS = [
  { id: 'welcome', kind: 'welcome', eyebrow: 'Intro',          title: 'New project intake' },
  { id: 'about',   kind: 'form',    eyebrow: 'About you',      title: 'First, the basics.' },
  { id: 'type',    kind: 'form',    eyebrow: 'Project',        title: 'What kind of project is this?' },
  { id: 'goals',   kind: 'form',    eyebrow: 'Goals',          title: 'What are you hoping to achieve?', sub: 'Pick anything that applies.' },
  { id: 'pages',   kind: 'form',    eyebrow: 'Pages',          title: 'What pages will your site have?', sub: 'A rough idea is fine — we\u2019ll finalize together.' },
  { id: 'features',kind: 'form',    eyebrow: 'Features',       title: 'Anything beyond static pages?',   sub: 'Only pick what you\u2019re sure you need.' },
  { id: 'content', kind: 'form',    eyebrow: 'Copy',           title: 'Where are you with your copy?' },
  { id: 'money',   kind: 'form',    eyebrow: 'Timing & budget',title: 'Timeline and budget.' },
  { id: 'vibe',    kind: 'form',    eyebrow: 'Direction',      title: 'Pick a direction (or two).', sub: 'Gut reactions only — no wrong answers.' },
  { id: 'refs',    kind: 'form',    eyebrow: 'Last thoughts',  title: 'Anything else?' },
  { id: 'summary', kind: 'summary', eyebrow: 'Done', title: 'Thanks — here\u2019s what you sent.' },
];

export const PROJECT_TYPES = [
  { id: 'new',      label: 'A brand-new site',          hint: 'Starting from scratch.' },
  { id: 'redesign', label: 'Redesign of my current site', hint: 'You have a site — time for a rebuild.' },
  { id: 'landing',  label: 'A single landing page',     hint: 'One focused page for a launch or campaign.' },
];

export const GOAL_OPTIONS = [
  'Get more clients or customers',
  'Show off my work',
  'Sell products or services online',
  'Look more credible & professional',
  'Launch a new business or product',
  'Make the site easier to update myself',
];

export const PAGE_OPTIONS = [
  'Home', 'About', 'Services', 'Portfolio',
  'Pricing', 'Contact', 'Blog', 'Shop',
];

export const FEATURE_OPTIONS = [
  { id: 'cms',        label: 'Edit content myself (CMS)' },
  { id: 'ecom',       label: 'Online store / payments' },
  { id: 'booking',    label: 'Booking or scheduling' },
  { id: 'newsletter', label: 'Newsletter signup' },
  { id: 'blog',       label: 'Blog or journal' },
  { id: 'animations', label: 'Custom animations' },
];

export const COPYWRITING = [
  { id: 'have', label: 'I have my copy',          hint: 'Mostly written and ready.' },
  { id: 'some', label: 'Some of it — need polish', hint: 'Bones exist, needs sharpening.' },
  { id: 'need', label: 'I\u2019ll need help with it',hint: 'Start from a blank page.' },
];

export const TIMELINES = [
  { id: 'asap', label: 'ASAP',          hint: 'Under 4 weeks. Rush fee may apply.' },
  { id: '1to2', label: '1–2 months',     hint: 'Standard for most projects.' },
  { id: '3to6', label: '3–6 months',     hint: 'Larger scope or phased launch.' },
  { id: 'flex', label: 'Flexible',       hint: 'No hard deadline.' },
];

// Visual direction cards — each is a stand-in moodboard.
export const VIBES = [
  { id: 'editorial', label: 'Editorial',       desc: 'Magazine-like. Type-led, restrained.',    abstract: 'edito' },
  { id: 'warm',      label: 'Warm & minimal',  desc: 'Off-whites, soft tones, lots of space.',  abstract: 'warm'  },
  { id: 'bold',      label: 'Bold & modern',   desc: 'High contrast, big type, confident.',     abstract: 'bold'  },
  { id: 'boutique',  label: 'Boutique',        desc: 'Soft, romantic, hand-crafted details.',   abstract: 'bout'  },
  { id: 'corporate', label: 'Corporate',        desc: 'Trustworthy, structured, blue-leaning.',  abstract: 'corp'  },
  { id: 'playful',   label: 'Playful',         desc: 'Friendly color, unexpected shapes.',      abstract: 'play'  },
];

// Validation: returns array of missing-field messages.
export function validateStep(state, stepId) {
  const errs = [];
  switch (stepId) {
    case 'about':
      if (!state.name.trim())     errs.push('Your name');
      if (!state.email.trim())    errs.push('Email');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) errs.push('A valid email');
      if (!state.business.trim()) errs.push('Business or project name');
      break;
    case 'type':
      if (!state.projectType) errs.push('Project type');
      break;
    case 'goals':
      if (state.goals.length === 0) errs.push('At least one goal');
      break;
    case 'pages':
      if (state.pages.length === 0) errs.push('At least one page');
      break;
    case 'content':
      if (!state.copywriting) errs.push('Copy status');
      break;
    case 'money':
      if (!state.timeline) errs.push('Timeline');
      break;
    case 'vibe':
      if (state.vibes.length === 0) errs.push('At least one direction');
      break;
    default:
      break;
  }
  return errs;
}
