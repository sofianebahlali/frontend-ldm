/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#1C64F2',
          700: '#1A56DB',
        }
      }
    },
  },
  plugins: [],
}