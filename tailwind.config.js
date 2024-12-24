/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary)",
        "secondary-color": "var(--secondary)",
        "tertiary-color": "var(--tertiary)",
      }
    },
  },
  plugins: [],
}

