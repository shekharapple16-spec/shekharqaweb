/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F9FAFB', // Light gray background
        'secondary': '#6B7280', // Gray text
        'accent': '#3B82F6', // Muted blue accent
      },
    },
  },
  plugins: [],
}
