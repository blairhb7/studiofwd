import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import localFont from "next/font/local"
import "./globals.css"
import QuizModal from '@/components/quiz/quiz-modal-nextjs/QuizModal';

const instrumentSerif = localFont({
  src: "./fonts/InstrumentSerif-Italic.ttf",
  style: "italic",
  weight: "400",
  variable: "--font-serif",
})

export const metadata = {
  title: "Studio/fwd — Custom sites & Framer templates",
  description:
    "Independent design practice. Custom builds when you need something exact — dark, editorial Framer templates when you need it yesterday.",
}

const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={GeistSans.className}>{children}</body>
      <QuizModal customUrl="/quiz" templateUrl="/template-finder" />
    </html>
  )
}
