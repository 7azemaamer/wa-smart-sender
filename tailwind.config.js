import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff8ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1C75BC', // Main brand color
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      fontFamily: {
        sans: ['Cairo', ...fontFamily.sans],
        cairo: ['Cairo', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [
    // Add logical properties plugin for RTL support
    function({ addUtilities }) {
      addUtilities({
        // Margin logical properties
        '.ms-auto': { 'margin-inline-start': 'auto' },
        '.me-auto': { 'margin-inline-end': 'auto' },
        '.ms-0': { 'margin-inline-start': '0' },
        '.me-0': { 'margin-inline-end': '0' },
        '.ms-1': { 'margin-inline-start': '0.25rem' },
        '.me-1': { 'margin-inline-end': '0.25rem' },
        '.ms-2': { 'margin-inline-start': '0.5rem' },
        '.me-2': { 'margin-inline-end': '0.5rem' },
        '.ms-3': { 'margin-inline-start': '0.75rem' },
        '.me-3': { 'margin-inline-end': '0.75rem' },
        '.ms-4': { 'margin-inline-start': '1rem' },
        '.me-4': { 'margin-inline-end': '1rem' },
        '.ms-6': { 'margin-inline-start': '1.5rem' },
        '.me-6': { 'margin-inline-end': '1.5rem' },
        '.ms-8': { 'margin-inline-start': '2rem' },
        '.me-8': { 'margin-inline-end': '2rem' },

        // Padding logical properties
        '.ps-0': { 'padding-inline-start': '0' },
        '.pe-0': { 'padding-inline-end': '0' },
        '.ps-1': { 'padding-inline-start': '0.25rem' },
        '.pe-1': { 'padding-inline-end': '0.25rem' },
        '.ps-2': { 'padding-inline-start': '0.5rem' },
        '.pe-2': { 'padding-inline-end': '0.5rem' },
        '.ps-3': { 'padding-inline-start': '0.75rem' },
        '.pe-3': { 'padding-inline-end': '0.75rem' },
        '.ps-4': { 'padding-inline-start': '1rem' },
        '.pe-4': { 'padding-inline-end': '1rem' },
        '.ps-6': { 'padding-inline-start': '1.5rem' },
        '.pe-6': { 'padding-inline-end': '1.5rem' },
        '.ps-8': { 'padding-inline-start': '2rem' },
        '.pe-8': { 'padding-inline-end': '2rem' },

        // Text alignment
        '.text-start': { 'text-align': 'start' },
        '.text-end': { 'text-align': 'end' },

        // Border logical properties
        '.border-s': { 'border-inline-start-width': '1px' },
        '.border-e': { 'border-inline-end-width': '1px' },
        '.border-s-2': { 'border-inline-start-width': '2px' },
        '.border-e-2': { 'border-inline-end-width': '2px' },

        // Positioning
        '.start-0': { 'inset-inline-start': '0' },
        '.end-0': { 'inset-inline-end': '0' },
        '.start-4': { 'inset-inline-start': '1rem' },
        '.end-4': { 'inset-inline-end': '1rem' },

        // Rounded corners for RTL
        '.rounded-s': { 'border-start-start-radius': '0.25rem', 'border-end-start-radius': '0.25rem' },
        '.rounded-e': { 'border-start-end-radius': '0.25rem', 'border-end-end-radius': '0.25rem' },
        '.rounded-s-lg': { 'border-start-start-radius': '0.5rem', 'border-end-start-radius': '0.5rem' },
        '.rounded-e-lg': { 'border-start-end-radius': '0.5rem', 'border-end-end-radius': '0.5rem' },
      })
    }
  ],
}