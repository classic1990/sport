/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
      },
      colors: {
        dark: '#0a0a0a',
        darker: '#121212',
        card: '#1e1e1e',
        accent: '#ef4444',
      }
    },
  },
  plugins: [],
}
