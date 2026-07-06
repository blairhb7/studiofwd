'use client';

import { useEffect, useState } from 'react';

// Discreet sun/moon toggle. Reads the data-theme the inline head script
// already set (no flash), flips it, and remembers the choice.
export function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    setTheme(next);
  };

  // Render a stable placeholder until mounted to avoid a hydration mismatch
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Dark mode' : 'Light mode'}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb">
          {/* Sun */}
          <svg className="ic ic-sun" width="13" height="13" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          {/* Moon */}
          <svg className="ic ic-moon" width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M20 14.2A8 8 0 1 1 9.8 4a6.4 6.4 0 0 0 10.2 10.2z"
              stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
          </svg>
        </span>
      </span>
    </button>
  );
}
