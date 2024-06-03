/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montse': ['Montserrat']

      },
      animation: {
        fade: "fade 0.4s ease-in-out",
        slideDown: "slideDown .5s ease-in",
        spin: "spin 1s linear infinite",
        zoom: "zoom 0.4s linear",
      },
      keyframes: {
        fade: {
          "0%": {
            scale: 0,
            opacity: 0,
          },
          "100%": {
            opacity: 1,
            scale: 1,
          },
        },
        zoom: {
          "0%": {
            scale: 0,
            opacity: 0.5 ,
          },
          "100%": {
            opacity: 1,
            scale: 1,
          },
        },
        slideDown: {
          "0%": {
            transform: "translateY(-70px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
}