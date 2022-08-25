/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "black",
        secondary: "white",
        danger: "red",
        info: "blue",
        success: "green",
        warning: "yellow",
      },
    },
  },
  plugins: [],
};
