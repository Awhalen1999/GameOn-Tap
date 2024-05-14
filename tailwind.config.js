/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  },
  theme: {
    extend: {
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        pixel: ['VT323', 'monospace'],
        tech: ['Share Tech Mono', 'monospace'],
        pixel2: ['Silkscreen', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        myDark: {
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
          error: '#ff4d4d',
          'error-content': '#FFFFFF',
        },
      },
      {
        myLight: {
          primary: '#eab308',
          'primary-content': '#111827',
          secondary: '#FF007F',
          'secondary-content': '#FAFAFA',
          accent: '#c09400', // Darker version of primary color for hover effect
          'accent-content': '#FAFAFA',
          neutral: '#9ca3af',
          'neutral-content': '#111827',
          'base-100': '#FAFAFA',
          'base-200': '#E8E8E8',
          'base-300': '#E0E0E0',
          'base-content': '#111827',
          info: '#00a4e6',
          'info-content': '#FAFAFA',
          success: '#008a4b',
          'success-content': '#FAFAFA',
          warning: '#f97316',
          'warning-content': '#FAFAFA',
          error: '#ff4d4d',
          'error-content': '#FAFAFA',
        },
      },
    ],
  },
};
