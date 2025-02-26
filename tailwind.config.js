/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",  // Custom blue
        secondary: "#9333EA", // Custom purple
        accent: "#F59E0B",  // Custom orange
        dark: "#1F2937",  // Dark mode color
        light: "#F3F4F6", // Light gray
      },
    },
  },
  plugins: [],
};
