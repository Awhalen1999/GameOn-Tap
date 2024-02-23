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
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mydark: {
          primary: '#000000',
          'primary-focus': '#your-color',
          'primary-content': '#ffffff',
          secondary: '#f6d860',
          'secondary-focus': '#your-color',
          'secondary-content': '#ffffff',
          accent: '#37cdbe',
          'accent-focus': '#your-color',
          'accent-content': '#ffffff',
          neutral: '#3d4451',
          'neutral-focus': '#your-color',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#your-color',
          'base-300': '#your-color',
          'base-content': '#your-color',
          info: '#your-color',
          success: '#your-color',
          warning: '#your-color',
          error: '#your-color',
        },
      },
      {
        mylight: {
          primary: '#your-color',
          'primary-focus': '#your-color',
          'primary-content': '#your-color',
          secondary: '#your-color',
          'secondary-focus': '#your-color',
          'secondary-content': '#your-color',
          accent: '#your-color',
          'accent-focus': '#your-color',
          'accent-content': '#your-color',
          neutral: '#your-color',
          'neutral-focus': '#your-color',
          'neutral-content': '#your-color',
          'base-100': '#your-color',
          'base-200': '#your-color',
          'base-300': '#your-color',
          'base-content': '#your-color',
          info: '#your-color',
          success: '#your-color',
          warning: '#your-color',
          error: '#your-color',
        },
      },
      'lemonade',
      'coffee',
      'sunset',
    ],
  },
};
