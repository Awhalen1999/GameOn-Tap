/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  },
  theme: {
    extend: {
      fontFamily: {
        main: ['Be Vietnam Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
