/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#72B01D",
        dimWhite: "#F3EFF5",
        gray: "#454955",
        darkPrimary: "#3F7D20",
        darkGray: "#0D0A0B",
        red: "#F2635F",
        brown: "#AD7B59",
        yellow: "#F2C14E",
        blue: "#016EAF"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        comfortaa: ["Comfortaa", "cursive"],
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1080px",
      lg: "1200px",
      xl: "1360px",
    },
  },
  plugins: [],
}