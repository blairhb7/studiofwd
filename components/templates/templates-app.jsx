'use client';

// =====================================================================
// Templates listing page
// =====================================================================

import { useState, useMemo, createContext, useContext } from 'react';
import { Reveal, useMagnet, Eyebrow } from '../home/hooks';
import { TEMPLATES } from '../home/data';
import { Nav, Cover } from '../home/sections-a'
import { Footer } from '../home/sections-b'
import GetTemplateModal from './get-template-modal'

// Lets any card open the modal without prop-drilling.
const ModalCtx = createContext(() => {});

function TemplateCard({ t }) {
  const openModal = useContext(ModalCtx);
  return (
    <article className="tpl-card">
      <div className="tpl-card-art">
        <Cover t={t} />
        {t.status === 'new' && (
          <span className="tpl-card-status is-new">New drop</span>
        )}
        {t.status === 'featured' && (
          <span className="tpl-card-status is-featured">Featured</span>
        )}
        {t.preview && (
          <a
            className="tpl-card-quicklook"
            href={t.preview}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Preview the ${t.name} demo`}
          >
            <span>Preview demo ↗</span>
          </a>
        )}
      </div>
      <div className="tpl-card-body">
        <div className="tpl-card-headrow">
          <div>
            <h3>{t.name}</h3>
            <div className="tpl-card-cat">{t.category}</div>
          </div>
          <div className={`tpl-card-price ${t.price === 0 ? 'is-free' : ''}`}>
            {t.price === 0 ? 'Free' : <>${t.price}<small>USD</small></>}
          </div>
        </div>
        <p className="tpl-card-desc">{t.description}</p>
        <div className="tpl-card-actions">
          {t.preview && (
            <a
              className="tpl-btn tpl-btn-ghost"
              href={t.preview}
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview <span aria-hidden="true">↗</span>
            </a>
          )}
          <button
            type="button"
            className="tpl-btn tpl-btn-solid"
            onClick={() => openModal(t)}
          >
            {t.price === 0 ? 'Get it free' : 'Buy template'} <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function TemplatesHero() {
  const magnet = useMagnet();
  return (
    <header className="tpl-hero">
      <div className="tpl-hero-grid"></div>
      <div className="wrap">
        <div className="tpl-hero-inner">
          <div>
            <Eyebrow>§ The shop — Framer templates</Eyebrow>
            <h1>
              Skip the<br/>
              <span className="ital">blank canvas.</span>
            </h1>
          </div>
          <div className="tpl-hero-right">
            <p>
              Production-ready Framer files for founders, studios and operators
              who'd rather be live by Friday. Every template is fully responsive,
              CMS-wired, and comes with a written handoff. Buy once, remix forever.
            </p>
            <div className="tpl-hero-ctas">
              <a ref={magnet} href="#listing" className="btn btn-primary">
                Browse all templates <span className="btn-arrow">→</span>
              </a>
              <a href="/template-finder" className="btn btn-ghost">
                Not sure which one? Find your template <span className="btn-arrow">↗</span>
              </a>
            </div>
            <div className="tpl-hero-stats">
              <div>
                <strong>{TEMPLATES.length}</strong>
                <span>Templates live</span>
              </div>
              <div>
                <strong>Free+</strong>
                <span>Starting price</span>
              </div>
              <div>
                <strong>∞</strong>
                <span>Free updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function FeaturedRow() {
  const featured = TEMPLATES.filter((t) => t.status === 'featured');
  if (!featured.length) return null;
  return (
    <section style={{ paddingTop: 100, paddingBottom: 40 }}>
      <div className="wrap">
        <Reveal className="section-head" style={{ marginBottom: 40 }}>
          <div>
            <Eyebrow>§ Featured</Eyebrow>
            <h2>The ones I'd<br/><span className="ital">point you to first.</span></h2>
          </div>
          <p>
            Hand-picked from the shop — the templates that ship the most often
            and that I'd recommend if you only had two minutes to look around.
          </p>
        </Reveal>

        <Reveal className="tpl-featured">
          {featured.map((t, i) => (
            <TemplateCard key={i} t={t} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function TemplatesListing() {
  const [active, setActive] = useState('All');

  const categories = useMemo(() => {
    const counts = new Map();
    TEMPLATES.forEach((t) => counts.set(t.category, (counts.get(t.category) || 0) + 1));
    return [
      { name: 'All', count: TEMPLATES.length },
      ...Array.from(counts.entries()).map(([name, count]) => ({ name, count })),
    ];
  }, []);

  const list = active === 'All' ? TEMPLATES : TEMPLATES.filter((t) => t.category === active);

  return (
    <section id="listing" style={{ paddingTop: 80 }}>
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <Eyebrow>§ The whole shop</Eyebrow>
            <h2>All templates,<br/>filtered <span className="ital">your way.</span></h2>
          </div>
          <p>
            Every drop in one place. Filter by category, or scroll the whole
            list — there's only six, and one of them is probably what you
            need.
          </p>
        </Reveal>

        <div className="tpl-filterbar">
          <div className="tpl-filter-chips">
            {categories.map((c) => (
              <button
                key={c.name}
                type="button"
                className={`tpl-filter-chip ${active === c.name ? 'is-on' : ''}`}
                onClick={() => setActive(c.name)}
              >
                {c.name}
                <span className="tpl-filter-chip-count">{c.count}</span>
              </button>
            ))}
          </div>
          <div className="tpl-filter-meta">
            Showing {list.length} of {TEMPLATES.length}
          </div>
        </div>

        <div className="tpl-list">
          {list.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.04}>
              <TemplateCard t={t} />
            </Reveal>
          ))}
        </div>

        <Reveal className="tpl-closing">
          <div>
            <Eyebrow>§ Still on the fence?</Eyebrow>
            <h2>Templates pay for<br/>themselves in <span className="ital">days.</span></h2>
            <p>
              You'd spend more on one freelance day than the priciest template
              in the shop — and you'd still be looking at wireframes. Buy a
              template today, ship by the weekend.
            </p>
            <a href="#listing" className="btn btn-primary">
              Pick your template <span className="btn-arrow">→</span>
            </a>
          </div>
          <div className="tpl-closing-right">
            <div className="tpl-closing-row">
              <span>License</span>
              <strong>Unlimited projects</strong>
            </div>
            <div className="tpl-closing-row">
              <span>Updates</span>
              <strong>Free, for life</strong>
            </div>
            <div className="tpl-closing-row">
              <span>Support</span>
              <strong>30 days, 1-business-day reply</strong>
            </div>
            <div className="tpl-closing-row">
              <span>Refund window</span>
              <strong>14 days, no questions</strong>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinderBand() {
  return (
    <section className="tpl-finder-band-sec">
      <div className="wrap">
        <Reveal className="tpl-finder-band">
          <div className="tpl-finder-band-left">
            <Eyebrow>§ Not sure which one?</Eyebrow>
            <h2>Let me <span className="ital">match</span><br/>you to one.</h2>
            <p>
              Six quick taps — what you're building, your vibe, your budget — and
              I'll point you to the best-fit template, plus two runner-ups.
            </p>
            <a href="/template-finder" className="btn btn-primary">
              Find my template <span className="btn-arrow">→</span>
            </a>
          </div>
          <div className="tpl-finder-band-right" aria-hidden="true">
            <div className="tpl-finder-chip">What are you building?</div>
            <div className="tpl-finder-opts">
              <span className="tpl-finder-opt">A studio site</span>
              <span className="tpl-finder-opt is-on">A portfolio</span>
              <span className="tpl-finder-opt">An online store</span>
            </div>
            <div className="tpl-finder-meta">
              <span>01 / 06</span>
              <span>~60s to a match</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TemplatesApp() {
  const [active, setActive] = useState(null);
  return (
    <ModalCtx.Provider value={setActive}>
      <Nav />
      <TemplatesHero />
      <FeaturedRow />
      <FinderBand />
      <TemplatesListing />
      <Footer />
      <GetTemplateModal template={active} onClose={() => setActive(null)} />
    </ModalCtx.Provider>
  );
}
