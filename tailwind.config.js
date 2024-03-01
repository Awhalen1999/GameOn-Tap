/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  },
  theme: {
    extend: {
      fontFamily: {
        micro: ['Micro 5', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mydark: {
          primary: '#eab308',
          'primary-content': '#111827',
          secondary: '#FF007F',
          'secondary-content': '#111827',
          accent: '#c09400', // Darker version of primary color for hover effect
          'accent-content': '#FFFFFF',
          neutral: '#111827',
          'neutral-content': '#F8F8FF',
          'base-100': '#000000',
          'base-200': '#000000',
          'base-300': '#000000',
          'base-content': '#F8F8FF',
          info: '#00a4e6',
          'info-content': '#FFFFFF',
          success: '#008a4b',
          'success-content': '#FFFFFF',
          warning: '#f97316',
          'warning-content': '#FFFFFF',
          error: '#ff70a0',
          'error-content': '#FFFFFF',
        },
      },
      {
        mylight: {
          primary: '#eab308',
          'primary-content': '#111827',
          secondary: '#FF007F',
          'secondary-content': '#F8F8FF',
          accent: '#c09400', // Darker version of primary color for hover effect
          'accent-content': '#FFFFFF',
          neutral: '#9ca3af',
          'neutral-content': '#111827',
          'base-100': '#F8F8FF',
          'base-200': '#F0F0F0',
          'base-300': '#E8E8E8',
          'base-content': '#111827',
          info: '#00a4e6',
          'info-content': '#FFFFFF',
          success: '#008a4b',
          'success-content': '#FFFFFF',
          warning: '#f97316',
          'warning-content': '#FFFFFF',
          error: '#ff70a0',
          'error-content': '#FFFFFF',
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
