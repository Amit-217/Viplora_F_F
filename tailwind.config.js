/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0e3d3e", // Dark Teal (NGO vibe from design)
        secondary: "#FF9F1C", // Keeping secondary for accent
        "background-light": "#f6f8f8",
        "background-dark": "#131f1f",
      },
    },
  },
  plugins: [],
}
