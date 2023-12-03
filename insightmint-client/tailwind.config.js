/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "roboto-condensed": "'Roboto Condensed', sans-serif;",
      },
      colors: {
        "orange-color": "#F5972F",
      },
    },
  },
  plugins: [require("daisyui")],
};
