/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./src/ui/**/*.{js,ts,jsx,tsx}",
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
