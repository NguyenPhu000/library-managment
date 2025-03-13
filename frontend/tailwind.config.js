/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "##1e1e1e",
        secondary: "#97bc62",
      },
    },
  },
  plugins: [],
};
