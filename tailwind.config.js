/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/views/index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f8fafc",
        secondary: "#0f172a",
        third: "#2b3c62ff",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
