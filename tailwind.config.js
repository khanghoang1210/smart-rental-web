/** @type {import('tailwindcss').Config} */
export default{
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      blue: {
        10: '#03045E',
        40: '#0077B6',
        60: '#00B4D8',
        80: '#90E0EF',
        95: '#CAF0F8',
        98: '#EAFBFF',
      },
      gray:{
        20: '#49454F',
        40: '#878787',
        60: '#A4A2A7',
        80: '#DADADB',
        90: '#F2F2F2'

      }
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], 
      },
    },
  plugins: [],
  }
}


