/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '525px',
      'custom': '1140px',
    },
    extend: {},
  },
  plugins: [],
}

