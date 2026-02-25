/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          light: '#A78BFA',
          dark: '#5B21B6',
        },
        dark: {
          DEFAULT: '#0F0F0F',
          card: '#111111',
          border: '#1E1E1E',
          muted: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-violet': 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
      },
      boxShadow: {
        'violet': '0 0 30px rgba(124,58,237,0.3)',
        'violet-lg': '0 0 60px rgba(124,58,237,0.4)',
        'card': '0 8px 32px rgba(0,0,0,0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
