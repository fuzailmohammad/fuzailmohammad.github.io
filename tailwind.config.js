/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gotham: {
          black: 'rgb(var(--color-gotham-black) / <alpha-value>)',
          dark: 'rgb(var(--color-gotham-dark) / <alpha-value>)',
          charcoal: 'rgb(var(--color-gotham-charcoal) / <alpha-value>)',
          surface: 'rgb(var(--color-gotham-surface) / <alpha-value>)',
          card: 'rgb(var(--color-gotham-card) / <alpha-value>)',
          border: 'rgb(var(--color-gotham-border) / <alpha-value>)',
          borderLight: 'rgb(var(--color-gotham-borderLight) / <alpha-value>)',
        },
        bat: {
          offwhite: 'rgb(var(--color-bat-offwhite) / <alpha-value>)',
          yellow: 'rgb(var(--color-bat-yellow) / <alpha-value>)',
          yellowDim: 'var(--color-bat-yellow-dim)',
          yellowGlow: 'var(--color-bat-yellow-glow)',
          muted: 'rgb(var(--color-bat-muted) / <alpha-value>)',
          subtle: 'rgb(var(--color-bat-subtle) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '"Syne"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '.2em',
        cinema: '.3em',
      },
      backgroundImage: {
        'halftone-pattern': 'var(--halftone-bg)',
        'dark-gradient': 'var(--hero-gradient)',
        'signal-glow': 'var(--signal-glow)',
      },
      boxShadow: {
        'bat-yellow': '0 0 20px rgba(var(--color-bat-yellow), 0.22)',
        'bat-sharp': '4px 4px 0px rgb(var(--color-bat-yellow))',
        'bat-card': 'var(--bat-card-shadow)',
      },
    },
  },
  plugins: [],
};
