/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B4332", // Trust Green
        secondary: "#FB8500", // Action Orange
        accent: "#95D5B2", // Soft Leaf
        "background-light": "#F8F9FA", // Off-white
        "background-dark": "#131f1f",
      },
    },
  },
  plugins: [],
}
