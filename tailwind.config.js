/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // TRC Corporate Colors
        primary: {
          50: '#e6f2f3',
          100: '#cce5e7',
          200: '#99cbcf',
          300: '#66b1b7',
          400: '#33979f',
          500: '#15585e', // Main teal
          600: '#114649',
          700: '#0d3537',
          800: '#082325',
          900: '#041112',
        },
        success: {
          50: '#e8f5ed',
          100: '#d1ebdb',
          200: '#a3d7b7',
          300: '#75c393',
          400: '#67a783', // Light green
          500: '#4d8766', // Medium green
          600: '#3e6c52',
          700: '#2e513d',
          800: '#1f3629',
          900: '#0f1b14',
        },
        warning: {
          50: '#fef7e6',
          100: '#fdeecc',
          200: '#fbdd99',
          300: '#f9cc66',
          400: '#f7bb33',
          500: '#ba8a00', // Gold
          600: '#956e00',
          700: '#705300',
          800: '#4a3700',
          900: '#251c00',
        },
        danger: {
          50: '#fce8e4',
          100: '#f9d1c9',
          200: '#f3a393',
          300: '#ed755d',
          400: '#e74727',
          500: '#de3f18', // Red-orange
          600: '#b23213',
          700: '#85260e',
          800: '#59190a',
          900: '#2c0d05',
        },
        dark: {
          50: '#e5e5e5',
          100: '#cccccc',
          200: '#999999',
          300: '#666666',
          400: '#4d4d4d',
          500: '#2c2c2c', // Very dark gray
          600: '#232323',
          700: '#1a1a1a',
          800: '#121212',
          900: '#090909',
        },
      },
    },
  },
  plugins: [],
}
