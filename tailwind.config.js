/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0E0E0E',
        fg: '#ECE7DD',
        'fg-dim': '#BFB9AD',
        muted: '#7E7B74',
        accent: 'oklch(78% 0.135 70)',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'Inter', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
