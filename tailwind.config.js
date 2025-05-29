/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'plum': {
          50: '#faf5f9',
          100: '#f5ebf3',
          200: '#e9d7e7',
          300: '#d9b8d3',
          400: '#c593bc',
          500: '#b06ea5',
          600: '#9d558c',
          700: '#834473',
          800: '#6c385f',
          900: '#5a2f4f',
        },
        'burgundy': '#800020',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 