'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './QuizModal.module.css';

export default function QuizModal({
  customUrl = '/quiz',
  templateUrl = '/template-finder',
  scrollThreshold = 0.5,
  fallbackDelay = 18000,
  repeatDelay = 360000,
  maxShows = 2,
}) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const pathname = usePathname();

  const shows = useRef(0);
  const dismissed = useRef(false);
  const timers = useRef([]);
  const ticking = useRef(false);

  const close = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 320);
  }, []);

  const dismissForever = useCallback(() => {
    dismissed.current = true;
    sessionStorage.setItem('qm-dismissed', '1');
    close();
  }, [close]);

  const handleQuizClick = useCallback(() => {
    dismissed.current = true;
    sessionStorage.setItem('qm-dismissed', '1');
    setOpen(false);
    setClosing(false);
  }, []);

  const reveal = useCallback(() => {
    if (dismissed.current || shows.current >= maxShows) return;

    shows.current += 1;
    setClosing(false);
    setOpen(true);

    const repeatTimer = setTimeout(reveal, repeatDelay);
    timers.current.push(repeatTimer);
  }, [maxShows, repeatDelay]);

  useEffect(() => {
    if (sessionStorage.getItem('qm-dismissed') === '1') {
      dismissed.current = true;
      return;
    }

    // First appearance fires on whichever comes first: the visitor scrolling
    // past `scrollThreshold` of the page (a real engagement signal), or the
    // fallback timer for people who read without scrolling much. `fired`
    // guards against both triggers firing (e.g. scroll passes threshold
    // right before the fallback timer was already about to run).
    let fired = false;

    const fire = () => {
      if (fired) return;
      fired = true;
      clearTimeout(fallbackTimer);
      window.removeEventListener('scroll', onScroll);
      reveal();
    };

    const fallbackTimer = setTimeout(fire, fallbackDelay);
    timers.current.push(fallbackTimer);

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        ticking.current = false;

        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 1;

        if (progress >= scrollThreshold) fire();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [reveal, scrollThreshold, fallbackDelay]);

  useEffect(() => {
    setOpen(false);
    setClosing(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  if (!open) return null;

  const Arrow = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h9M8 3.5L12.5 8 8 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div
      className={`${styles.backdrop} ${closing ? styles.out : ''}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="qm-title"
    >
      <div className={styles.dialog}>
        <button className={styles.close} type="button" onClick={close} aria-label="Close">
          ×
        </button>

        <span className={styles.eyebrow}>§ — Not sure where to start?</span>

        <h2 className={styles.title} id="qm-title">
          Two paths.
          <br />
          Pick the <span className={styles.ital}>one</span> that fits.
        </h2>

        <p className={styles.sub}>
          Tell me a little about what you&rsquo;re building and I&rsquo;ll point
          you the right way — a site made exactly for you, or a template you can
          ship this week.
        </p>

        <div className={styles.paths}>
          <Link className={styles.path} href={customUrl} onClick={handleQuizClick}>
            <div>
              <div className={styles.pathTag}>≈ 90 sec · 8 questions</div>
              <div className={styles.pathName}>Quiz me for a custom website</div>
              <div className={styles.pathDesc}>
                Bespoke design &amp; build, tailored to your goals, timeline and budget.
              </div>
            </div>
          </Link>

          <Link className={`${styles.path} ${styles.alt}`} href={templateUrl} onClick={handleQuizClick}>
            <div>
              <div className={styles.pathTag}>≈ 30 sec · 4 questions</div>
              <div className={styles.pathName}>Find me the right template</div>
              <div className={styles.pathDesc}>
                A short quiz that matches you to a ready-to-ship template.
              </div>
            </div>
          </Link>
        </div>

        <div className={styles.foot}>
          <span className={styles.footNote}>No spam, ever</span>
          <button className={styles.dismiss} type="button" onClick={dismissForever}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}