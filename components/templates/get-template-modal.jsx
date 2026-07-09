'use client';

// =====================================================================
// Get Template modal — Hamza-style. Click "Get template" on any card and
// this sheet slides up with the cover, price, and the real paths to own
// it: buy (Contra) and/or remix (Framer).
//
// FREE templates: capture email inline (peak-intent), then reveal the
// Framer remix link in place — one motion, no new page.
// PAID templates: unchanged (buy on Contra / remix in Framer).
// =====================================================================

import { useEffect, useRef, useState } from 'react';
import { Cover } from '../home/sections-a';

export default function GetTemplateModal({ template, onClose }) {
  const closeRef = useRef(null);
  const open = Boolean(template);

  // Inline capture state (free templates only)
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [error, setError] = useState('');
  const [remixUrl, setRemixUrl] = useState('');

  // Lock scroll + focus + escape-to-close while open
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('modal-open');
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const id = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKey);
      cancelAnimationFrame(id);
    };
  }, [open, onClose]);

  // Reset capture state whenever a different template opens
  useEffect(() => {
    setEmail(''); setCompany(''); setStatus('idle'); setError(''); setRemixUrl('');
  }, [template?.id]);

  if (!open) return null;

  const t = template;
  const isFree = t.price === 0;
  const priceLabel = isFree ? 'Free' : `$${t.price}`;

  async function handleCapture() {
    if (status === 'loading') return;
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, slug: t.slug ?? t.id, company }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong — try again?');
        setStatus('error');
        return;
      }
      // Prefer the link from the API; fall back to the template's own remix link.
      setRemixUrl(data.remixUrl || t.remix || '');
      setStatus('done');
    } catch {
      setError("Couldn't reach the server — try again in a moment.");
      setStatus('error');
    }
  }

  return (
    <div
      className="gt-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Get the ${t.name} template`}
      onClick={onClose}
    >
      <div className="gt-sheet" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="gt-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="gt-body">
          <div className="gt-preview">
            <div className="gt-cover">
              <Cover t={t} />
            </div>
          </div>

          <div className="gt-info">
            <span className="gt-eyebrow">{t.id}</span>
            <h3 className="gt-name">{t.name}</h3>
            <div className="gt-priceline">
              <span className={`gt-price ${isFree ? 'is-free' : ''}`}>{priceLabel}</span>
              {!isFree && <span className="gt-price-sub">USD · one-time · lifetime updates</span>}
              {isFree && <span className="gt-price-sub">Remix free · lifetime updates</span>}
            </div>
            <p className="gt-desc">{t.description}</p>

            <div className="gt-actions">
              {/* PAID: unchanged buy/remix buttons */}
              {!isFree && t.buy && (
                <a className="btn btn-primary gt-btn" href={t.buy} target="_blank" rel="noopener noreferrer">
                  Buy for {priceLabel} <span className="btn-arrow">→</span>
                </a>
              )}
              {!isFree && t.remix && (
                <a
                  className={`btn ${t.buy ? 'btn-ghost' : 'btn-primary'} gt-btn`}
                  href={t.remix}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Remix in Framer <span className="btn-arrow">↗</span>
                </a>
              )}

              {/* FREE: inline email capture → reveal remix link in place */}
              {isFree && status !== 'done' && (
                <div className="gt-capture">
                  <label className="gt-capture-label" htmlFor="gt-email">
                    Enter your email and I&rsquo;ll send you the remix link.
                  </label>
                  <input
                    type="text"
                    className="gt-honeypot"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    placeholder="Company"
                  />
                  <div className="gt-capture-row">
                    <input
                      id="gt-email"
                      className="gt-capture-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCapture()}
                      placeholder="you@yourbusiness.com"
                    />
                    <button
                      type="button"
                      className="btn btn-primary gt-btn"
                      onClick={handleCapture}
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Sending…' : 'Get the template'} <span className="btn-arrow">↗</span>
                    </button>
                  </div>
                  {status === 'error' && <p className="gt-capture-error">{error}</p>}
                  <p className="gt-capture-fine">One email. No spam. Unsubscribe anytime.</p>
                </div>
              )}

              {/* FREE: success — link revealed in place */}
              {isFree && status === 'done' && (
                <div className="gt-capture gt-capture-done">
                  <p className="gt-capture-done-title">Check your inbox — link sent.</p>
                  {remixUrl && (
                    <a className="btn btn-primary gt-btn" href={remixUrl} target="_blank" rel="noopener noreferrer">
                      Remix free in Framer <span className="btn-arrow">↗</span>
                    </a>
                  )}
                </div>
              )}

              {t.preview && (
                <a className="gt-preview-link" href={t.preview} target="_blank" rel="noopener noreferrer">
                  Preview live demo first ↗
                </a>
              )}
            </div>

            <ul className="gt-includes">
              <li>Instant remix link — copies straight into your Framer account</li>
              <li>Fully responsive, CMS-wired, components documented</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
