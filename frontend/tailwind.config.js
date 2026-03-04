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
          DEFAULT: '#3E362E',
          dark: '#2D271F',
          light: '#5F5449',
        },
        secondary: {
          DEFAULT: '#865D36',
          dark: '#6B4A2B',
          light: '#A87A4F',
        },
        accent: {
          DEFAULT: '#93785B',
          dark: '#7A6249',
          light: '#B0967C',
        },
        neutral: {
          DEFAULT: '#AC8968',
          dark: '#8E6F53',
          light: '#C4A78A',
        },
        muted: {
          DEFAULT: '#A69080',
          dark: '#8A786A',
          light: '#C2B0A0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(134, 93, 54, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(134, 93, 54, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}