/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#121012',
        bg: '#ffffff',
        'bg-soft': '#f6f5f1',
        'mute-strong': 'rgba(18,16,18,0.78)',
        mute: 'rgba(18,16,18,0.56)',
        rule: 'rgba(18,16,18,0.10)',
        mint: '#c6e6c0',
        yellow: '#fff1a3',
        pink: '#ffb8c7',
        coral: '#ff8a94',
        sky: '#bfd9ff',
        lavender: '#dcc7ff',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
      },
      fontFamily: {
        brand: ['var(--font-brand)', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      borderRadius: {
        pill: '9999px',
        card: '20px',
      },
      boxShadow: {
        card: '0 1px 4px rgba(18,16,18,0.07),0 2px 12px rgba(18,16,18,0.05)',
        'card-hover': '0 4px 20px rgba(18,16,18,0.12),0 1px 4px rgba(18,16,18,0.06)',
        none2: 'none',
        subtle: '0 1px 3px rgba(0,0,0,0.08)',
        medium: '0 4px 12px rgba(0,0,0,0.12)',
        dramatic: '0 8px 30px rgba(0,0,0,0.18)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(.2,.7,.3,1) forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(.2,.7,.3,1) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(.2,.7,.3,1) forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}


