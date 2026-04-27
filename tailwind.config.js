/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* YOUR EXISTING FONTS */
      fontFamily: {
        inter: ['var(--font-inter)'],
        grotesk: ['var(--font-grotesk)'],
      },

      /* YOUR EXISTING ANIMATIONS */
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'reverse-spin': 'reverse-spin 12s linear infinite',
        'hudfloat': 'hudfloat 8s ease-in-out infinite',
        'scanlines': 'scanlines 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',

        /* NEW Quiet Intelligence animation */
        crystallize: "crystallize 2s ease-out forwards",
      },

      /* YOUR EXISTING KEYFRAMES */
      keyframes: {
        'reverse-spin': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'hudfloat': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'scanlines': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },

        /* NEW Quiet Intelligence keyframe */
        crystallize: {
          "0%": { boxShadow: "0 0 0 rgba(0,243,255,0)", borderColor: "rgba(124,77,255,0)" },
          "20%": { boxShadow: "0 0 25px rgba(124,77,255,0.4)", borderColor: "rgba(124,77,255,0.7)" },
          "60%": { boxShadow: "0 0 25px rgba(0,243,255,0.4)", borderColor: "rgba(0,243,255,0.7)" },
          "100%": { boxShadow: "0 0 0 rgba(0,243,255,0)", borderColor: "rgba(255,255,255,0.6)" },
        },
      },

      /* NEW Quiet Intelligence design tokens */
      colors: {
        coreVoid: "#08080D",
        coreVoidElevated: "#0A0A0F",
        intentCyan: "#00F3FF",
        intentViolet: "#7C4DFF",
      },
      boxShadow: {
        intentGlow: "0 0 15px rgba(0,243,255,0.15)",
      },
      borderRadius: {
        frame: "18px",
        card: "14px",
      },
    },
  },
  plugins: [],
};