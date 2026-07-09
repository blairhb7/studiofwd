'use client';

// =====================================================================
// Home — sections (Process, FAQ, Contact, Footer) + page composer
// =====================================================================

import { useEffect, useState } from 'react';
import { Reveal, useMagnet, useClock, Eyebrow } from './hooks';
import { PROCESS, FAQS, CONTACT_CHIPS, LINKS, WEB3FORMS_KEY } from './data';
import { Nav, Hero, Marquee, Services, Templates, QuizCTA } from './sections-a';

function getBookingMonth() {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());
}

export function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <Eyebrow>§ 04 — How it works</Eyebrow>
            <h2>No case studies<br/>yet — <span className="ital">here&rsquo;s the process.</span></h2>
          </div>
          <p>
            I&rsquo;m taking on founding clients right now, so instead of recycled
            quotes, here&rsquo;s exactly how a project runs.
          </p>
        </Reveal>

        <div className="testimonial-rail">
          {PROCESS.map((p, i) => (
            <Reveal className="testimonial" key={i} delay={i * 0.06}>
              <div className="testimonial-mark">{p.step}</div>
              <div className="testimonial-body">
                <div className="testimonial-name" style={{ marginBottom: 10 }}>{p.title}</div>
                {p.body}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="process-cta">
          <p>
            Founding clients get closer collaboration and founding-client pricing —
            first come, first served.
          </p>
          <a href="/quiz" className="btn btn-primary">
            Take the fit quiz <span className="btn-arrow">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  const toggle = (i) => setOpenIdx((cur) => (cur === i ? -1 : i));
  return (
    <section id="faq">
      <div className="wrap" style={{ maxWidth: 980 }}>
        <Reveal className="section-head">
          <div>
            <Eyebrow>§ 05 — Common questions</Eyebrow>
            <h2>The things<br/>everyone <span className="ital">asks.</span></h2>
          </div>
          <p>
            If your question isn't here, ask it in the form below — answered within
            one business day, usually faster.
          </p>
        </Reveal>

        <Reveal className="faq">
          {FAQS.map((f, i) => (
            <div className={`faq-item ${openIdx === i ? 'is-open' : ''}`} key={i}>
              <button
                className="faq-q"
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={openIdx === i}
              >
                <span className="faq-q-idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq-q-text">{f.q}</span>
                <span className="faq-q-sign"></span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', msg: '' });
  const [picks, setPicks] = useState(() => new Set());
  const [note, setNote] = useState({ text: 'Replies in < 24 hrs · No funnels', color: 'var(--muted)' });
  const magnet = useMagnet();
  const [bookingMonth, setBookingMonth] = useState(getBookingMonth());

  useEffect(() => {
    setBookingMonth(getBookingMonth());
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const togglePick = (chip) => setPicks((cur) => {
    const next = new Set(cur);
    next.has(chip) ? next.delete(chip) : next.add(chip);
    return next;
  });

  const [submitting, setSubmitting] = useState(false);
  const keyMissing = !WEB3FORMS_KEY || WEB3FORMS_KEY === 'YOUR-WEB3FORMS-ACCESS-KEY-HERE';

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setNote({ text: '⚠  Name and email are required', color: 'var(--accent)' });
      return;
    }

    if (keyMissing) {
      setNote({
        text: '⚠  Form not connected yet — add your Web3Forms key',
        color: 'var(--accent)',
      });
      return;
    }

    setSubmitting(true);
    setNote({ text: 'Sending…', color: 'var(--muted)' });

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New enquiry from ${form.name.trim()} — Studio/fwd`,
          from_name: 'Studio/fwd website',
          name: form.name,
          email: form.email,
          company: form.company || '—',
          budget: form.budget || '—',
          interested_in: [...picks].join(', ') || '—',
          message: form.msg || '—',
          botcheck: '',
        }),
      });
      const data = await res.json();

      if (data.success) {
        setNote({
          text: `✓  Sent — talk soon, ${form.name.trim().split(' ')[0]}`,
          color: '#6ECB7A',
        });
        setForm({ name: '', email: '', company: '', budget: '', msg: '' });
        setPicks(new Set());
      } else {
        setNote({
          text: '⚠  Something went wrong — email me directly instead',
          color: 'var(--accent)',
        });
      }
    } catch (err) {
      setNote({
        text: '⚠  Network error — please email me directly',
        color: 'var(--accent)',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="wrap">
        <Reveal className="contact">
          <div className="contact-left">
            <Eyebrow>§ 06 — Let's talk</Eyebrow>
            <h2>Start something <span className="ital">good.</span></h2>
            <p>
              Fill this out and I'll be back to you within a business day. If
              you'd rather take the quiz first, that works too.
            </p>
            <div className="contact-meta">
              <div className="contact-meta-item">
                <span>Email</span>
                <strong>{LINKS.email}</strong>
              </div>
              <div className="contact-meta-item">
                <span>Hours</span>
                <strong>Mon–Thu · 9–5 PT</strong>
              </div>
              <div className="contact-meta-item">
                <span>Availability</span>
                <strong>Booking {bookingMonth} onward</strong>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <div className="cf-row">
              <div className="cf-field">
                <label className="cf-label" htmlFor="cf-name">Name</label>
                <input className="cf-input" id="cf-name" type="text"
                       placeholder="Jane Doe" autoComplete="name"
                       value={form.name} onChange={set('name')} />
              </div>
              <div className="cf-field">
                <label className="cf-label" htmlFor="cf-email">Email</label>
                <input className="cf-input" id="cf-email" type="email"
                       placeholder="jane@company.com" autoComplete="email"
                       value={form.email} onChange={set('email')} />
              </div>
            </div>

            <div className="cf-row">
              <div className="cf-field">
                <label className="cf-label" htmlFor="cf-company">Company</label>
                <input className="cf-input" id="cf-company" type="text"
                       placeholder="Optional"
                       value={form.company} onChange={set('company')} />
              </div>
              <div className="cf-field">
                <label className="cf-label" htmlFor="cf-budget">Budget</label>
                <input className="cf-input" id="cf-budget" type="text"
                       placeholder="$ — $$$$"
                       value={form.budget} onChange={set('budget')} />
              </div>
            </div>

            <div className="cf-field">
              <label className="cf-label">I'm interested in</label>
              <div className="cf-chips">
                {CONTACT_CHIPS.map((chip) => (
                  <button
                    type="button"
                    key={chip}
                    className={`cf-chip ${picks.has(chip) ? 'is-on' : ''}`}
                    onClick={() => togglePick(chip)}
                  >{chip}</button>
                ))}
              </div>
            </div>

            <div className="cf-field">
              <label className="cf-label" htmlFor="cf-msg">Tell me a bit</label>
              <textarea className="cf-textarea" id="cf-msg"
                        placeholder="What are you working on? What's the deadline pressure look like?"
                        value={form.msg} onChange={set('msg')} />
            </div>

            <div className="cf-submit">
              {/* Spam honeypot — real people never fill this; bots do */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: 'none' }}
              aria-hidden="true"
            />

            <div className="cf-submit">
              <span className="cf-submit-note" style={{ color: note.color }}>{note.text}</span>
              <button ref={magnet} type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send it over'} <span className="btn-arrow">→</span>
              </button>
            </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const clock = useClock();
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              Studio<span className="ital" style={{ fontFamily: "'Times New Roman',serif", color: 'var(--muted)' }}>/</span>fwd
            </div>
            <p className="foot-tag">
              An independent design practice. Custom sites and Framer templates,
              built by one designer with a slow inbox and a fast keyboard.
            </p>
          </div>
          <div className="foot-col">
            <h5>Work</h5>
            <ul>
              <li><a href="/#work">Services</a></li>
              <li><a href="/templates">Templates</a></li>
              <li><a href="/#quiz">The quiz</a></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Elsewhere</h5>
            <ul>
              <li><a href={LINKS.marketplace} target="_blank" rel="noopener noreferrer">Framer marketplace ↗</a></li>
              <li><a href={LINKS.twitter} target="_blank" rel="noopener noreferrer">X / Twitter ↗</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Legal</h5>
            <ul>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/terms">Terms</a></li>
              <li><a href="/refunds">Refunds</a></li>
              <li><a href="/disclaimer">Disclaimer</a></li>
              <li><a href="/cookies">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="foot-mega" aria-hidden="true">
          studio<span className="ital">|</span>fwd
        </div>

        <div className="foot-bottom">
          <span>© 2026 STUDIO/FWD · ALL RIGHTS RESERVED</span>
          <span>{clock}</span>
        </div>
      </div>
    </footer>
  );
}

export function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Templates />
      <QuizCTA />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
