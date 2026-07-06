'use client';

// =====================================================================
// Get Template modal — Hamza-style. Click "Get template" on any card and
// this sheet slides up with the cover, price, and the real paths to own
// it: buy (Contra) and/or remix (Framer). Free templates show remix only.
// =====================================================================

import { useEffect, useRef } from 'react';
import { Cover } from '../home/sections-a';

export default function GetTemplateModal({ template, onClose }) {
  const closeRef = useRef(null);
  const open = Boolean(template);

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

  if (!open) return null;

  const t = template;
  const isFree = t.price === 0;
  const priceLabel = isFree ? 'Free' : `$${t.price}`;

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
              {t.buy && (
                <a
                  className="btn btn-primary gt-btn"
                  href={t.buy}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy for {priceLabel} <span className="btn-arrow">→</span>
                </a>
              )}

              {t.remix && (
                <a
                  className={`btn ${t.buy ? 'btn-ghost' : 'btn-primary'} gt-btn`}
                  href={t.remix}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isFree ? 'Remix free in Framer' : 'Remix in Framer'} <span className="btn-arrow">↗</span>
                </a>
              )}

              {t.preview && (
                <a
                  className="gt-preview-link"
                  href={t.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Preview live demo first ↗
                </a>
              )}
            </div>

            <ul className="gt-includes">
              <li>Instant remix link — copies straight into your Framer account</li>
              <li>Fully responsive, CMS-wired, components documented</li>
              <li>Loom walkthrough + 30 days email support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
