// =====================================================================
// Template Finder — data + scoring
// A short quiz that matches a client to the best-fit Framer template.
// Shared globals (loaded via <script> before finder-app.jsx).
// =====================================================================

// --- The templates we're matching against ---------------------------
// art / glyph mirror the cards used on the Templates page so the
// result feels like the same shop.
export const FINDER_TEMPLATES = {
  compendium: {
    id: 'compendium', name: 'Compendium', category: 'Editorial', price: 89,
    art: 'art-1', glyph: <>Aa<span style={{ fontFamily: "'Times New Roman',serif", color: 'var(--tf-fg-dim)' }}>é</span></>,
    tagline: 'A type-driven magazine layout',
    blurb: 'Long-form, editorial layout for writers, journalists and brands with something to say. Article CMS, author profiles, full editorial component library.',
  },
  atelier: {
    id: 'atelier', name: 'Atelier', category: 'Studio', price: 79,
    art: 'art-2', labelDark: true, glyph: <>studio<span style={{ fontFamily: "'Times New Roman',serif", fontStyle: 'italic' }}>/</span></>,
    tagline: 'Warm, light-mode studio portfolio',
    blurb: 'A warm, light studio portfolio for small agencies and independent designers. Case-study CMS, services list, and a generous about page.',
  },
  helio: {
    id: 'helio', name: 'Helio', category: 'SaaS', price: 99,
    art: 'art-3', glyph: '◐',
    tagline: 'Twelve-page SaaS marketing site',
    blurb: 'Pricing, changelog, customer stories and docs scaffolding. Built for product teams that want to ship a real site, not just a landing page.',
  },
  crosshatch: {
    id: 'crosshatch', name: 'Cross-hatch', category: 'Agency', price: 69,
    art: 'art-4', glyph: 'A/05',
    tagline: 'Case-study-first agency template',
    blurb: 'Confident, case-study-first agency site. Big imagery, structured project pages, and a process section that doesn\u2019t read like a sales deck.',
  },
  liftoff: {
    id: 'liftoff', name: 'Liftoff', category: 'Launch', price: 59,
    art: 'art-5', glyph: '→ ship',
    tagline: 'One-page launch & coming-soon site',
    blurb: 'A one-page launch site to validate fast: hero, value props, email capture, FAQ. Drop in a Mailchimp or ConvertKit endpoint and you\u2019re live.',
  },
  index: {
    id: 'index', name: 'Index', category: 'Portfolio', price: 69,
    art: 'art-6', glyph: <>portfolio<span style={{ fontFamily: "'Times New Roman',serif", fontStyle: 'italic' }}>·</span></>,
    tagline: 'Minimal, index-style personal portfolio',
    blurb: 'Minimal index-style portfolio for designers and writers. Linkable work list, dual-mode color, MDX-friendly writing section.',
  },
  goods: {
    id: 'goods', name: 'Goods', category: 'Commerce', price: 129,
    art: 'art-1', glyph: '$ / item',
    tagline: 'Editorial commerce for small-batch makers',
    blurb: 'Editorial commerce template for small-batch makers. Product detail pages, lookbook section, simple cart, Shopify-compatible.',
  },
};

// --- The questions --------------------------------------------------
// Each option carries a `scores` map: templateId -> weight.
export const FINDER_QUESTIONS = [
  {
    id: 'type',
    eyebrow: 'What you\u2019re building',
    title: 'What are you building?',
    sub: 'The big one. Pick the closest fit.',
    options: [
      { id: 'portfolio', label: 'A personal portfolio',     hint: 'Show off your own work',          scores: { index: 3, atelier: 1 } },
      { id: 'studio',    label: 'A studio or agency site',   hint: 'A team, with clients & cases',     scores: { atelier: 3, crosshatch: 2 } },
      { id: 'store',     label: 'An online store',           hint: 'Selling products',                 scores: { goods: 3 } },
      { id: 'saas',      label: 'A SaaS or product site',    hint: 'Software, pricing, docs',          scores: { helio: 3, liftoff: 1 } },
      { id: 'launch',    label: 'A launch / coming-soon',    hint: 'One page, validate fast',          scores: { liftoff: 3 } },
      { id: 'blog',      label: 'A blog or publication',     hint: 'Words first',                      scores: { compendium: 3, index: 1 } },
    ],
  },
  {
    id: 'industry',
    eyebrow: 'Your world',
    title: 'What\u2019s your world?',
    sub: 'What do you actually do?',
    options: [
      { id: 'creative', label: 'Design & creative',     hint: 'Designers, studios, makers',     scores: { atelier: 2, index: 2, crosshatch: 1 } },
      { id: 'media',    label: 'Writing & media',       hint: 'Journalists, publishers, writers', scores: { compendium: 3, index: 1 } },
      { id: 'tech',     label: 'Software & tech',       hint: 'Product & engineering teams',     scores: { helio: 2, liftoff: 1 } },
      { id: 'retail',   label: 'Retail & makers',       hint: 'Selling physical goods',          scores: { goods: 3 } },
      { id: 'services', label: 'Services & consulting',  hint: 'Selling expertise',               scores: { crosshatch: 2, helio: 1 } },
      { id: 'other',    label: 'Something else',         hint: 'A bit of everything',             scores: { atelier: 1, index: 1, helio: 1 } },
    ],
  },
  {
    id: 'vibe',
    eyebrow: 'Direction',
    title: 'Pick a vibe.',
    sub: 'Gut reaction — no wrong answer.',
    options: [
      { id: 'editorial', label: 'Editorial & serif',  hint: 'Magazine-like, type-led',     scores: { compendium: 3, index: 1 } },
      { id: 'warm',      label: 'Warm & minimal',      hint: 'Off-whites, soft, spacious',  scores: { atelier: 3, index: 1 } },
      { id: 'bold',      label: 'Bold & modern',       hint: 'High contrast, confident',    scores: { crosshatch: 2, helio: 2 } },
      { id: 'boutique',  label: 'Boutique & crafted',  hint: 'Soft, romantic details',      scores: { goods: 2, atelier: 1 } },
      { id: 'corporate', label: 'Clean & corporate',   hint: 'Trustworthy, structured',     scores: { helio: 2 } },
      { id: 'playful',   label: 'Playful',             hint: 'Friendly, unexpected',        scores: { liftoff: 2 } },
    ],
  },
  {
    id: 'mode',
    eyebrow: 'Mood',
    title: 'Light or dark?',
    sub: 'How should it feel?',
    options: [
      { id: 'light',  label: 'Light & airy',  hint: 'Bright, paper-like',          scores: { atelier: 2, index: 1, goods: 1 } },
      { id: 'dark',   label: 'Dark & moody',  hint: 'Cinematic, high-contrast',    scores: { compendium: 1, helio: 1, crosshatch: 1, liftoff: 1 } },
      { id: 'either', label: 'Either works',  hint: 'No strong preference',        scores: {} },
    ],
  },
  {
    id: 'size',
    eyebrow: 'Scale',
    title: 'How big a site?',
    sub: 'Roughly how many pages?',
    options: [
      { id: 'one',    label: 'One focused page',   hint: 'A single, sharp page',     scores: { liftoff: 3 } },
      { id: 'few',    label: 'A handful (3–6)',     hint: 'A small, tidy site',       scores: { index: 2, atelier: 1, crosshatch: 1 } },
      { id: 'full',   label: 'A full site (7+)',    hint: 'Lots of pages & sections', scores: { helio: 2, compendium: 1, goods: 1 } },
    ],
  },
  {
    id: 'budget',
    eyebrow: 'Budget',
    title: 'Budget comfort?',
    sub: 'Templates run $59–$129.',
    options: [
      { id: 'low',  label: 'Under $70',          hint: 'Keep it lean',              scores: { liftoff: 2, crosshatch: 2, index: 1 } },
      { id: 'mid',  label: '$70 – $100',          hint: 'Room for a richer build',   scores: { atelier: 1, compendium: 1, helio: 1 } },
      { id: 'high', label: '$100+ / best fit',    hint: 'Whatever suits best',       scores: { goods: 1, helio: 1 } },
    ],
  },
];

// --- Scoring --------------------------------------------------------
// answers: { [questionId]: optionId }. Returns templates ranked by fit.
export function scoreFinder(answers) {
  const totals = {};
  Object.keys(FINDER_TEMPLATES).forEach((id) => { totals[id] = 0; });

  FINDER_QUESTIONS.forEach((q) => {
    const pick = answers[q.id];
    if (!pick) return;
    const opt = q.options.find((o) => o.id === pick);
    if (!opt) return;
    Object.entries(opt.scores).forEach(([tid, pts]) => {
      totals[tid] = (totals[tid] || 0) + pts;
    });
  });

  const maxScore = Math.max(1, ...Object.values(totals));
  // Preserve template declaration order for stable tie-breaking.
  const order = Object.keys(FINDER_TEMPLATES);
  const ranked = order
    .map((id) => ({
      ...FINDER_TEMPLATES[id],
      score: totals[id],
      fit: Math.round((totals[id] / maxScore) * 100),
    }))
    .sort((a, b) => b.score - a.score || order.indexOf(a.id) - order.indexOf(b.id));

  return ranked;
}
