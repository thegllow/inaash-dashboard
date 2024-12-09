import fluid, { extract, screens, fontSize } from "fluid-tailwind"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./index.html", "./src/**/*.{html,js,ts,tsx}"],
    extract,
  },

  theme: {
    screens, // Tailwind's default screens, in `rem`
    fontSize, // Tailwind's default font sizes, in `rem` (including line heights)

    extend: {
      screens: {
        xs: "20rem",
      },

      fontFamily: { custom: ["MyCustomFont", "sans-serif"] },
      container: {
        center: true,
        padding: "1.5rem",
      },
      colors: {
        primary: "var(--mantine-color-primary-7)",
        secondary: "var(--mantine-color-secondary-7)",
      },
    },
  },

  plugins: [fluid],
}
