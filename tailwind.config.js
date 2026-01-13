// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",   // Indigo-600
        accent: "#7C3AED",    // Violet-600
        bg: "#F8FAFC"         // Slate-50
      }
    }
  },
  plugins: []
}
