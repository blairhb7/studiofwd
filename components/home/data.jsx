// =====================================================================
// Home — data
// Templates, testimonials, FAQs, services, marquee items, links.
// =====================================================================

// ---------------------------------------------------------------------
// LINKS — fill these in once and every button on the site points right.
// TODO(blair): replace the marketplace handle + per-template listing
// URLs with your real Framer Marketplace links.
// ---------------------------------------------------------------------
export const LINKS = {
  marketplace: 'https://www.framer.com/@astroshift/',   // ← your creator profile
  twitter:     'https://x.com/astroshift',               // ← your X handle
  agency:      'https://astroshift.agency',
  email:       'hello@studiofwd.agency',
};
// ---------------------------------------------------------------------
// CONTACT FORM DELIVERY (Web3Forms)
// Delivers to whatever address you registered the key with.
//   1. Go to https://web3forms.com, enter your NEW email, get a key.
//   2. Paste it below (or set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local).
// ---------------------------------------------------------------------
export const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'e2221330-15c7-4374-9cb5-29c9d4ddfc2d';
// ---------------------------------------------------------------------
// Per-template links — three kinds, each optional:
//   preview  → the live demo site (the "Preview" button)
//   remix    → Framer remix / marketplace listing (instant copy)
//   buy      → Contra (or other) payment link for paid templates
// The "Get template" modal shows whichever of remix/buy exist.
// A free template only needs `remix`. A Contra-sold template needs
// `buy`; add `remix` too if buyers get a remix link after paying.
// TODO(blair): fill these in — placeholders point at the profile.
// ---------------------------------------------------------------------

export const SERVICES = [
  {
    num: '01 / Bespoke',
    title: 'Custom design\n& build',
    body: "End-to-end engagements: discovery, art direction, design, and a fully handed-off Framer or coded site. For founders who need their site to do something specific — and do it better than the rest.",
    metaLeft: 'From $1.4k',
    metaRight: '3–6 weeks',
    glyph: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="3" width="15" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2.5 6.5h15" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="5" cy="4.75" r="0.6" fill="currentColor"/>
        <circle cx="7" cy="4.75" r="0.6" fill="currentColor"/>
        <path d="M7 17.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '02 / Templates',
    title: 'Framer templates\noff the shelf',
    body: 'Production-ready, fully responsive Framer files. CMS wired, components documented, motion baked in. Buy once, remix forever. New drops regularly — and the flagship is free.',
    metaLeft: 'From Free',
    metaRight: 'Instant remix',
    glyph: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="2.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="11.5" y="2.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="2.5" y="11.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="11.5" y="11.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" strokeDasharray="1.6 1.6"/>
      </svg>
    ),
  },
];

// ---------------------------------------------------------------------
// TEMPLATES — the real catalog.
// `url` should point at each template's own marketplace listing once
// live; until then everything routes to the creator profile.
// TODO(blair): confirm prices — placeholders except Obscura (free).
// ---------------------------------------------------------------------
export const TEMPLATES = [
  {
    id: 'TPL-01 / NIGHTLIFE', name: 'The Obscura', category: 'Bar & Nightlife',
    status: 'featured', tag: 'Free', price: 0, slug: 'obscura',
    meta: 'Cocktail bars · Speakeasies · One-page',
    art: 'cov-obscura', span: 'tpl-w3',
    image: '/img/templates/obscura.jpg',
    preview: 'https://enlivened-pentagon-113185.framer.app/',   // TODO: real preview URL
    remix:   'https://framer.link/278r08N?duplicateType=siteTemplate',
    buy:     null,
    description: 'Dark editorial one-pager for craft cocktail bars and speakeasies. Menu CMS, reservation form, hours and location — moody by default, live in an evening. Free to remix.',
  },
  {
    id: 'TPL-02 / PORTFOLIO', name: 'PhotoLens', category: 'Portfolio',
    status: 'featured', price: 49,
    meta: 'Photography · Dark · Galleries',
    art: 'cov-photolens', span: 'tpl-w3',
    image: '/img/templates/photolens.jpg',
    preview: 'https://physical-birthday-549306.framer.app/',  // TODO: real preview URL
    remix:   null,
    buy:     'https://contra.com/payment-link/HOivSsKR-photo-lens-dark-editorial-photography-template',
    description: 'Dark photography portfolio with full-bleed galleries, a project CMS, and typography that stays out of the frame.',
  },
  {
    id: 'TPL-03 / PORTFOLIO', name: 'Materia', category: 'Portfolio',
    status: null, tag: 'Free', price: 0, slug: 'materia',
    meta: 'Designers · Index-style · Graphite',
    art: 'cov-materia', span: 'tpl-w2',
    image: '/img/templates/materia.jpg',
    preview: 'https://inclusive-designs-958138.framer.app/',    // TODO: real preview URL
    remix:   'https://framer.link/9u8XyUO?duplicateType=siteTemplate',
    buy:     null,
    description: 'Minimal dark portfolio for designers — typographic work index, structured case pages, graphite-and-silver palette.',
  },
  {
    id: 'TPL-04 / WELLNESS', name: 'The Balance Room', category: 'Wellness',
    status: null, price: 0, 
    meta: 'Yoga · Studios · Schedule CMS',
    art: 'cov-balance', span: 'tpl-w2',
    image: '/img/templates/yoga.png',                                // TODO: drop cover image
    preview: 'https://smart-topic-294790.framer.app',// TODO: real preview URL
    remix:   'https://framer.com/projects/Balance-Room--Ivb6oadIQLqfjKGokz2P',                   // TODO: real remix link
    buy:     null,                                // TODO: Contra link if sold there
    description: 'Calm, sage-toned template for yoga and movement studios. Class schedule CMS, instructor profiles, pricing — built to Framer marketplace spec.',
  },
];

// Honest process-proof — replaces invented testimonials until real ones exist.
// Each item is how the work actually runs, stated plainly. No fake names/quotes.
export const PROCESS = [
  {
    step: '01', title: 'Audit first',
    body: <>Every build starts with the system — type scale, color, spacing, motion tokens. <em>Nothing decorative</em> until the foundation is right.</>,
  },
  {
    step: '02', title: 'Build in the open',
    body: <>Editorial-grade layouts, wired and documented. You see progress as it happens, not a <em>big reveal</em> at the end.</>,
  },
  {
    step: '03', title: 'Ship & hand off',
    body: <>Live on your domain in days, not months — with a walkthrough so <em>you own it</em>, not me.</>,
  },
];

export const FAQS = [
  {
    q: "What's the difference between a template and a custom build?",
    a: "Templates are pre-designed Framer files you customize yourself — fastest path to a live, professional site. Custom builds are bespoke, from-scratch engagements where I run discovery, art-direct, design and build to your exact requirements. Not sure? Take the quiz.",
  },
  {
    q: "How long does a custom project take?",
    a: "Most marketing sites land between 3 and 6 weeks. Bigger brand sites or anything with custom CMS structures, integrations or animations stretch toward 8. I share a week-by-week timeline at kickoff and you'll know where we are at any moment.",
  },
  {
    q: "Is The Obscura really free?",
    a: "Yes. It's the flagship — a full dark editorial template for cocktail bars and speakeasies, free to remix from the Framer marketplace. If it fits your project, take it. If you want it tailored to your brand, that's what custom engagements are for.",
  },
  {
    q: "Do you build on Framer only, or other platforms too?",
    a: "Framer is the default — it's the fastest path to a beautiful, maintainable marketing site for most clients. I also build HTML, and Next.js when the project calls for it. Migrations from one platform to another are very welcome.",
  },
  {
    q: "What's included with a template purchase?",
    a: "A fully responsive Framer site, components and variants documented, a Loom walkthrough. 30 days of email support.",
  },
  {
    q: "Can you help me write copy too?",
    a: "Yes — copy direction is part of custom engagements. I won't pretend to be a brand copywriter, but I'll write a strong first pass, sharpen what you have, and partner with a writer in my network when the project warrants it.",
  },
  {
    q: "How do payments work?",
    a: "Custom projects: 50% to start, 50% on handoff. Retainers: invoiced on the 1st of each month. Templates: paid in full at checkout on the Framer marketplace. Stripe, wire, or ACH all good for custom work.",
  },
];

export const MARQUEE_ITEMS = [
  'Custom builds', 'Framer dev', 'Design systems', 'Landing pages',
  'Brand sites', 'Migrations from Webflow', 'Editorial layouts',
  'Motion & micro-interactions', 'SEO + analytics setup',
];

export const NAV_LINKS = [
  { href: '/#work',         label: 'Work' },
  { href: '/templates',     label: 'Templates' },
  { href: '/#quiz',         label: 'Quiz' },
  { href: '/#process',      label: 'Process' },
  { href: '/#faq',          label: 'FAQ' },
];

export const CONTACT_CHIPS = ['Custom build', 'A template', 'Retainer', 'Just saying hi'];
