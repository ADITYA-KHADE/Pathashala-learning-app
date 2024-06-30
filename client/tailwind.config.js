/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        playwrite: ['"Playwrite US Trad"', "cursive"],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
