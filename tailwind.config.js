/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#144f5a",
        secondary: "#2d5a61",
        'text-dark': "#101722",
        'text-main': "#18212f",
        'text-muted': "#506073",
        'bg-light': "#f6f8fb",
        'bg-lighter': "#eff4f7",
        'border-color': "#d7e0e7",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
