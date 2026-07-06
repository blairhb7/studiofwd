'use client';

// =====================================================================
// Home — sections (Nav, Hero, Marquee, Services, Templates, QuizCTA)
// =====================================================================

import { Fragment, useEffect, useState } from 'react';
import { Reveal, useMagnet, useClock, useScrolled, Eyebrow } from './hooks';
import { SERVICES, TEMPLATES, MARQUEE_ITEMS, NAV_LINKS } from './data';
import { ThemeToggle } from './theme-toggle';

function getBookingMonth() {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());
}

// --- Template cover — one typographic "plate" per template -----------
// Each template renders in its own real palette + type language, so the
// color on this page comes from the work itself.
export function Cover({ t }) {
  // Photo cover when an image is set; typographic plate as the fallback.
  if (t.image) {
    return (
      <span
        className={`cov cov-photo ${t.labelDark ? 'is-light' : ''}`}
        style={{ backgroundImage: `url(${t.image})` }}
        aria-hidden="true"
      >
        <span className="cov-label">{t.id}</span>
        <span className="cov-shade" />
        <span className="cov-name">{t.name}</span>
        <span className="cov-sub">{t.meta}</span>
      </span>
    );
  }
  return (
    <span className={`cov ${t.art}`} aria-hidden="true">
      <span className="cov-label">{t.id}</span>
      <span className="cov-name">{t.name}</span>
      <span className="cov-sub">{t.meta}</span>
    </span>
  );
}

export function Nav() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingMonth, setBookingMonth] = useState(getBookingMonth());

  useEffect(() => {
    setBookingMonth(getBookingMonth());
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-menu-open', menuOpen);
    return () => document.body.classList.remove('nav-menu-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-open' : ''}`}>
      <a href="/" className="nav-brand" onClick={closeMenu}>
        <span className="nav-brand-mark">S</span>
        <span>Studio<span style={{ color: 'var(--muted)' }}>|</span>fwd</span>
      </a>

      <div className="nav-links">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>

      <div className="nav-actions">
        <ThemeToggle />
        <a href="/#contact" className="nav-cta" onClick={closeMenu}>
          <span>Booking {bookingMonth}</span>
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="nav-mobile-panel" aria-hidden={!menuOpen}>
        <div className="nav-mobile-links">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              style={{ '--delay': `${i * 55}ms` }}
            >
              <span>0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </div>
        <a href="/#contact" className="nav-mobile-cta" onClick={closeMenu}>
          Start a project · Booking {bookingMonth}
        </a>
      </div>
    </nav>
  );
}

export function Hero() {
  const clock = useClock();
  const magnet = useMagnet();
  return (
    <header className="hero">
      <div className="hero-grid"></div>
      <div className="wrap">
        <div className="hero-meta">
          <span>[ STUDIO/FWD — INDEX 2026 ]</span>
          <div className="hero-meta-right">
            <span className="hero-meta-dot">2 SLOTS · Q3</span>
            <span>{clock}</span>
          </div>
        </div>

        <h1>
          <span className="hero-line"><span>Websites that</span></span>
          <span className="hero-line"><span><i className="ital">earn</i> their keep.</span></span>
          <span className="hero-line"><span>Templates that<br/>ship by Friday.</span></span>
        </h1>

        {/* The rack — every live template, in its own palette */}
        <div className="hero-rack-head">
          <span>THE CURRENT RACK</span>
          <span>{TEMPLATES.length} TEMPLATES · <em className="free-mark">1 FREE</em></span>
        </div>
        <div className="hero-deck" aria-label="Live Framer templates" style={{ '--c': (TEMPLATES.length - 1) / 2 }}>
          {TEMPLATES.map((t, i) => (
            <a
              key={t.name}
              href="/templates"
              className="hero-card"
              style={{ '--i': i }}
              aria-label={`${t.name} — ${t.price === 0 ? 'free' : '$' + t.price} Framer template`}
            >
              <Cover t={t} />
              <span className="hero-card-meta">
                <strong>{t.name}</strong>
                <span>{t.price === 0 ? 'Free' : `$${t.price}`}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="hero-foot">
          <p className="hero-desc">
            Independent design practice for founders, studios and operators.
            Custom builds when you need something exact — Framer templates
            when you need it yesterday.
          </p>
          <div className="hero-ctas">
            <div className="hero-ctas-row">
              <a href="/templates" className="btn btn-ghost">
                Browse templates <span className="btn-arrow">↗</span>
              </a>
              <a ref={magnet} href="/quiz" className="btn btn-primary">
                Start the quiz <span className="btn-arrow">→</span>
              </a>
            </div>
            <Eyebrow style={{ marginTop: 8 }}>Takes 90 seconds</Eyebrow>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Marquee() {
  const items = (
    <span>
      {MARQUEE_ITEMS.flatMap((item, i) => [
        <i key={`i${i}`}>{item}</i>,
        <span key={`d${i}`} className="marquee-dot"></span>,
      ])}
    </span>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items}
        {items}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="work">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <Eyebrow>§ 01 — Practice</Eyebrow>
            <h2>Two ways<br/>to <span className="ital">work</span> together.</h2>
          </div>
          <p>
            Most projects fall into one of two buckets. Pick whichever fits — or take
            the quiz and I'll tell you which one suits you. No upsells.
          </p>
        </Reveal>

        <Reveal className="services">
          {SERVICES.map((s, i) => (
            <div className="service" key={i}>
              <div className="service-glyph" aria-hidden="true">{s.glyph}</div>
              <span className="service-num">{s.num}</span>
              <h3>{s.title.split('\n').map((line, j) => (
                <Fragment key={j}>{line}{j === 0 && <br />}</Fragment>
              ))}</h3>
              <p>{s.body}</p>
              <div className="service-meta">
                <span>From <strong>{s.metaLeft.replace('From ', '')}</strong></span>
                <span>{s.metaRight}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Templates() {
  return (
    <section id="templates" className="templates-band">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <Eyebrow>§ 02 — Shop</Eyebrow>
            <h2>Six templates.<br/><span className="ital">One of them is free.</span></h2>
          </div>
          <p>
            The current rack — dark editorial by instinct, each one in its own
            palette. Every template ships responsive, CMS-wired, with a written
            handoff. The Obscura, the flagship, is free to remix.
          </p>
        </Reveal>

        <Reveal className="templates-grid">
          {TEMPLATES.map((t, i) => (
            <a
              className={`tpl ${t.span}`}
              key={i}
              href="/templates"
            >
              <div className="tpl-art">
                <Cover t={t} />
                {t.tag && <span className={`tpl-tag ${t.labelDark ? 'is-dark' : ''}`}>{t.tag}</span>}
              </div>
              <div className="tpl-body">
                <div>
                  <h4>{t.name}</h4>
                  <p>{t.meta}</p>
                </div>
                <span className={`tpl-price ${t.price === 0 ? 'is-free' : ''}`}>
                  {t.price === 0 ? 'Free' : <>${t.price}<small>USD</small></>}
                </span>
              </div>
            </a>
          ))}
        </Reveal>

        <Reveal className="templates-foot">
          <a href="/templates" className="btn btn-ghost">
            See the full shop <span className="btn-arrow">↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function QuizCTA() {
  const magnet = useMagnet();
  return (
    <section id="quiz">
      <div className="wrap">
        <Reveal className="quiz-cta">
          <div className="quiz-cta-left">
            <Eyebrow>§ 03 — Not sure what you need?</Eyebrow>
            <h2>Take the <span className="ital">2-minute</span><br/>fit quiz.</h2>
            <p>
              Eight questions on what you're shipping, your timeline, budget and
              vibe. At the end I'll tell you straight: template, custom build, or
              something else entirely.
            </p>
            <a ref={magnet} href="/quiz" className="btn btn-primary">
              Start the quiz <span className="btn-arrow">→</span>
            </a>
            <div className="quiz-cta-stats">
              <div className="quiz-cta-stat"><strong>8</strong><span>Questions</span></div>
              <div className="quiz-cta-stat"><strong>~90s</strong><span>Average time</span></div>
              <div className="quiz-cta-stat"><strong>0</strong><span>Spam · ever</span></div>
            </div>
          </div>

          <div className="quiz-cta-card" aria-hidden="true">
            <div className="quiz-cta-card-head">
              <span>STEP 04 / 08</span>
              <span>QUIZ.FWD</span>
            </div>
            <div className="quiz-cta-progress"></div>
            <div className="quiz-cta-q">What vibe are you reaching for?</div>
            <div className="quiz-cta-opts">
              <div className="quiz-cta-opt">Warm minimal</div>
              <div className="quiz-cta-opt is-on">Editorial &amp; serif</div>
              <div className="quiz-cta-opt">Bold &amp; modern</div>
              <div className="quiz-cta-opt">Clean corporate</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
