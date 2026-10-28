/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#000000', surface: '#222222', border: '#888888',
          text: '#FFFFFF', muted: '#E5E5E5', accent: '#FFFFFF',
        },
      },
      fontFamily: {
        space: ['Montserrat', 'sans-serif'],
        inter: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
