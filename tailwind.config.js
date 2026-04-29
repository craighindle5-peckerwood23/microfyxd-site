/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter:   ["var(--font-inter)", "system-ui", "sans-serif"],
        grotesk: ["var(--font-grotesk)", "system-ui", "sans-serif"],
      },
      colors: {
        void:   "#08080D",
        intent: "rgba(0,243,255,0.15)",
      },
      animation: {
        "breathe":    "breathe 5s ease-in-out infinite",
        "pulse-dot":  "pulse-dot 2s ease-in-out infinite",
        "shimmer":    "shimmer-row 3s linear infinite",
        "float":      "float 6s ease-in-out infinite",
        "scanline":   "scanline 8s linear infinite",
        "fade-up":    "fadeUp 0.7s ease forwards",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { boxShadow: "0 0 12px rgba(0,243,255,0.15), 0 0 30px rgba(123,47,247,0.1)" },
          "50%":       { boxShadow: "0 0 28px rgba(0,243,255,0.3), 0 0 60px rgba(123,47,247,0.2)" },
        },
      },
      backdropBlur: { glass: "12px" },
    },
  },
  plugins: [],
};
