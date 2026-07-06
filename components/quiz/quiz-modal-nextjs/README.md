# Quiz popup — Next.js install

A two-path popup that invites visitors to take **either** the full
custom-website quiz **or** the short template-finder quiz. Ships as a Client
Component + a CSS Module — works in both the **App Router** and **Pages
Router**.

Files:

- `QuizModal.tsx` — the component (`'use client'`)
- `QuizModal.module.css` — scoped styles (colors baked in)

> Using plain JavaScript instead of TypeScript? Rename to `QuizModal.jsx` and
> delete the `type QuizModalProps = {…}` block and the `: QuizModalProps` /
> `: KeyboardEvent` annotations. Nothing else changes.

---

## 1. Where to put the files

Keep the two files **together** (the component imports the CSS module by
relative path):

```
your-app/
├── components/
│   ├── QuizModal.tsx
│   └── QuizModal.module.css
├── app/            ← App Router
│   └── layout.tsx
└── pages/          ← (or) Pages Router
    └── _app.tsx
```

`components/` is just convention — anywhere is fine as long as both files sit
side by side.

## 2. Render it once, globally

### App Router — `app/layout.tsx`

```tsx
import QuizModal from '@/components/QuizModal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <QuizModal customUrl="/quiz" templateUrl="/template-finder" />
      </body>
    </html>
  );
}
```

The layout can stay a Server Component — `QuizModal` is a Client Component, so
Next handles the boundary for you.

### Pages Router — `pages/_app.tsx`

```tsx
import type { AppProps } from 'next/app';
import QuizModal from '@/components/QuizModal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <QuizModal customUrl="/quiz" templateUrl="/template-finder" />
    </>
  );
}
```

> Want it only on the landing page? Render `<QuizModal />` inside that page's
> component instead of the global layout/_app.

## 3. Point it at your quiz routes

Set `customUrl` and `templateUrl` to your actual Next routes (they use
`next/link`, so navigation stays client-side):

```tsx
<QuizModal customUrl="/start" templateUrl="/templates/finder" />
```

`@/` assumes the `@/*` path alias from `tsconfig.json` / `jsconfig.json`. If you
don't use it, import with a relative path, e.g. `../components/QuizModal`.

---

## Props (all optional)

| Prop          | Default              | What it does                              |
| ------------- | -------------------- | ----------------------------------------- |
| `customUrl`   | `/quiz`              | Route for the custom-website quiz         |
| `templateUrl` | `/template-finder`   | Route for the template-finder quiz        |
| `firstDelay`  | `15000` (15s)        | Delay before the first popup, in ms       |
| `repeatDelay` | `360000` (6 min)     | Gap before the 2nd popup, in ms           |
| `maxShows`    | `2`                  | Max appearances per session               |

## Behaviour

- Appears **15s** after mount, then **once more 6 minutes later** (2× per
  session by default).
- **"Maybe later"** hides it for the rest of the session (via `sessionStorage`).
- Closes on the × button, clicking outside the card, or **Esc**. Locks body
  scroll while open.

## Fonts

Styles reference `Geist` / `Geist Mono` with safe fallbacks, so it looks right
out of the box. If your app already loads Geist (e.g. via `next/font`), the
modal automatically matches.
