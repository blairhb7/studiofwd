'use client';

// =====================================================================
// Home — hooks + small shared components
// =====================================================================

import { useState, useEffect, useRef } from 'react';

// --- Reveal-on-scroll wrapper ----------------------------------------
export function Reveal({ as = 'div', className = '', delay, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { setShown(true); io.unobserve(el); }
      }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  const style = delay != null ? { '--delay': `${delay}s`, ...rest.style } : rest.style;
  return (
    <Tag
      ref={ref}
      {...rest}
      style={style}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}

// --- Magnetic button (any element) -----------------------------------
export function useMagnet(strength = 14) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top  + r.height / 2);
      el.style.transform = `translate(${(x / r.width) * strength}px, ${(y / r.height) * strength}px)`;
    };
    const leave = () => { el.style.transform = ''; };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);
  return ref;
}

// --- Live clock ------------------------------------------------------
export function useClock() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return '--:--:-- LOCAL';
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss} LOCAL`;
}

// --- Scroll-position-based nav state --------------------------------
export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

// --- Eyebrow ---------------------------------------------------------
export function Eyebrow({ children, style }) {
  return <span className="eyebrow" style={style}>{children}</span>;
}

// --- Button ---------------------------------------------------------
export function Button({ variant = 'ghost', as: As = 'a', magnetic, children, className = '', ...rest }) {
  const magnetRef = useMagnet();
  return (
    <As
      ref={magnetic ? magnetRef : undefined}
      className={`btn btn-${variant} ${className}`.trim()}
      {...rest}
    >
      {children}
    </As>
  );
}
