/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mo: "Montserrat",
      },
      colors: {
        night: "#333",
      },
    },
  },
  plugins: [],
};
