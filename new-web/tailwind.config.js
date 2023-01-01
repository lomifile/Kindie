/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Ubuntu"],
    },
    extend: {
      screens: {
        xs: { max: "640px" },
      },
      colors: {
        primary: "#68A7AD",
        secondary: "white",
        accent: "#3F3D56",
        cream: "#EEE4AB",
        danger: "red",
        info: "blue",
        success: "green",
        warning: "yellow",
      },
    },
  },
  plugins: [],
};
