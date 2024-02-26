/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  },
  theme: {
    extend: {
      fontFamily: {
        electrolize: ['Electrolize', 'sans-serif'],
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mydark: {
          primary: '#eab308',

          secondary: '#f3f4f6',

          accent: '#d1d5db',

          neutral: '#111827',

          'base-100': '#000000',

          info: '#00a4e6',

          success: '#008a4b',

          warning: '#f97316',

          error: '#ff70a0',
        },
      },
      {
        mylight: {
          primary: '#eab308',

          secondary: '#111827',

          accent: '#374151',

          neutral: '#9ca3af',

          'base-100': '#f3f4f6',

          info: '#00a4e6',

          success: '#008a4b',

          warning: '#f97316',

          error: '#ff70a0',
        },
      },
      'retro',
      'cyberpunk',
      'coffee',
      'aqua',
      'synthwave',
    ],
  },
};
