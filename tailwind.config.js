/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#333B8C",
        secondary: "#29A073",
        terciary: "#363A3F",
      },
    },
    fontFamily: {
      roboto: ["Roboto", "monospace"],
    },
  },
  plugins: [],
};
