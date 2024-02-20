/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  },
  theme: {
    extend: {
      skew: {
        '-60': '-60deg',
      },
      rotate: {
        0: '0deg',
        30: '30deg',
        60: '60deg',
        90: '90deg',
        120: '120deg',
        150: '150deg',
        180: '180deg',
        210: '210deg',
        240: '240deg',
        270: '270deg',
        300: '300deg',
        330: '330deg',
      },
    },
  },
  plugins: [],
};
