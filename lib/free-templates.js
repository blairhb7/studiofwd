// lib/free-templates.js
// One entry per free template → each gets a page at /free/<slug> automatically.
export const FREE_TEMPLATES = [
  {
    slug: 'obscura',
    index: 'TPL-01 / NIGHTLIFE',
    name: 'The Obscura',
    audience: 'Cocktail bars · Speakeasies · One-page',
    headline: 'a dark, editorial cocktail bar site you can launch this weekend.',
    subhead:
      'Built for bars and small venues that want to look like a flagship, not a form-template. Free to remix, yours to make your own.',
    // ↓ Swap in your REAL Framer remix link WITH your referral attribution.
    remixUrl: 'https://framer.com/YOUR-OBSCURA-REMIX-LINK',
  },
  {
    slug: 'materia',
    index: 'TPL-03 / PORTFOLIO',
    name: 'Materia',
    audience: 'Designers · Index-style · Graphite',
    headline: 'an index-style portfolio in graphite. Quietly confident.',
    subhead:
      'For designers who want the work to speak first. Free to remix, CMS-wired, documented.',
    remixUrl: 'https://framer.com/YOUR-MATERIA-REMIX-LINK',
  },
];

export function getFreeTemplate(slug) {
  return FREE_TEMPLATES.find((t) => t.slug === slug) ?? null;
}
