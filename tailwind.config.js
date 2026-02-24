/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        void: {
          950: '#020408',
          900: '#040810',
          800: '#070d1a',
          700: '#0d1628',
          600: '#162035',
        },
        aurora: {
          cyan: '#00d4ff',
          blue: '#4f8dff',
          violet: '#a855f7',
          pink: '#f472b6',
          green: '#34d399',
        },
        glass: {
          white: 'rgba(255,255,255,0.06)',
          light: 'rgba(255,255,255,0.10)',
          border: 'rgba(255,255,255,0.12)',
          hover: 'rgba(255,255,255,0.14)',
        },
      },
      backgroundImage: {
        'aurora-1': 'radial-gradient(ellipse at 20% 50%, rgba(79,141,255,0.15) 0%, transparent 60%)',
        'aurora-2': 'radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.12) 0%, transparent 55%)',
        'aurora-3': 'radial-gradient(ellipse at 60% 80%, rgba(0,212,255,0.10) 0%, transparent 50%)',
        'aurora-4': 'radial-gradient(ellipse at 10% 90%, rgba(52,211,153,0.08) 0%, transparent 45%)',
      },
      backdropBlur: {
        glass: '20px',
        'glass-sm': '12px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass-hover': '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
        'glow-cyan': '0 0 20px rgba(0,212,255,0.3)',
        'glow-violet': '0 0 20px rgba(168,85,247,0.3)',
        'glow-blue': '0 0 20px rgba(79,141,255,0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-down': 'slideDown 0.3s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
