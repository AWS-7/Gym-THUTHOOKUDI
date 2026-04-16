/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-red': '#ff2020',
        'electric-orange': '#ff6b00',
        'gold': '#d4a017',
        'gold-light': '#f0c040',
        'charcoal': '#111111',
        'charcoal-light': '#1a1a1a',
        'charcoal-mid': '#222222',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'pulse-glow-gold': 'pulseGlowGold 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px #ff2020, 0 0 20px #ff2020' },
          '50%': { boxShadow: '0 0 25px #ff2020, 0 0 50px #ff202066' },
        },
        pulseGlowGold: {
          '0%, 100%': { boxShadow: '0 0 10px #d4a017, 0 0 20px #d4a01766' },
          '50%': { boxShadow: '0 0 25px #d4a017, 0 0 50px #d4a01766' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
