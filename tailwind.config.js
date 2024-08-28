/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        "burn-wht": {
         "0%": { transform: "rotate(200deg) skewX(30deg) scale(1.8)" },
          "20%": { transform: "rotate(200deg) skewX(20deg) scale(2)" },
          "40%": { transform: "rotate(200deg) skewX(35deg) scale(1.8)" },
          "60%": { transform: "rotate(200deg) skewX(30deg) scale(2)" },
          "100%": { transform: "rotate(200deg) skewX(35deg) scale(1.8)" },
        },
        "burn-ylw": {
         "0%": { transform: "rotate(200deg) skewX(30deg) scale(1.8)" },
          "20%": { transform: "rotate(200deg) skewX(20deg) scale(2)" },
          "40%": { transform: "rotate(200deg) skewX(35deg) scale(1.8)" },
          "60%": { transform: "rotate(200deg) skewX(35deg) scale(2)" },
          "100%": { transform: "rotate(200deg) skewX(30deg) scale(1.8)" },
        },
        "burn-orng": {
          "0%": { transform: "rotate(200deg) skewX(30deg) scale(1.8)" },
          "20%": { transform: "rotate(200deg) skewX(20deg) scale(2)" },
          "40%": { transform: "rotate(200deg) skewX(35deg) scale(1.8)" },
          "60%": { transform: "rotate(200deg) skewX(30deg) scale(2)" },
          "100%": { transform: "rotate(200deg) skewX(35deg) scale(1.8)" },
        },
        "burn-red": {
          "0%": { transform: "rotate(200deg) skewX(30deg) scale(1.8)" },
          "20%": { transform: "rotate(200deg) skewX(20deg) scale(2)" },
          "40%": { transform: "rotate(200deg) skewX(35deg) scale(1.8)" },
          "60%": { transform: "rotate(200deg) skewX(30deg) scale(2)" },
          "100%": { transform: "rotate(200deg) skewX(35deg) scale(1.8)" },
        },
        "burn-smoke": {
          "0%": { transform: "rotate(0deg) scale(1)", opacity: "1" },
          "100%": {
            transform: "rotate(360deg) scale(4)",
            opacity: "0",
            top: "0",
          },
        },
        "burn-smoke-rev": {
          "0%": { transform: "rotate(0deg) scale(1)", opacity: "1" },
          "100%": {
            transform: "rotate(-360deg) scale(5)",
            opacity: "0",
            top: "0",
          },
        },
      },
      animation: {
        "burn-wht": "burn-wht 1s ease-in-out infinite",
        "burn-ylw": "burn-ylw 1s ease-in-out infinite",
        "burn-orng": "burn-orng 1s ease-in-out infinite",
        "burn-red": "burn-red 1s ease-in-out infinite",
        "burn-smoke": "burn-smoke 1s ease-in-out infinite",
        "burn-smoke-rev": "burn-smoke-rev 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
