/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'back-bg': '#ced6e0',
        'main-bg': '#ffffff',
        'main-color': '#fed330',
        'button': '#3867d6',
        'blur-background': '#bdc3c770',
         'icon':'#57606f'
      },
      fontFamily: {
        'main': ['Montserrat', 'sans-serif'],
        'secondary': ['Poppins', 'sans-serif'],

      },
      boxShadow:{
        'input_shadow':'4px -6px 15px 2px black'
      }
    },
  },
  plugins: [],
}