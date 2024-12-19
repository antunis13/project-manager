/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/views/index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f8fafc",
        secondary: "#0f172a",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
