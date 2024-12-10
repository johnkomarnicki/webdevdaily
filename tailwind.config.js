/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "hero-bg": "url('/bg-home.png')",
        "discord-bg": "url('/bg-discord.png')",
      }),
      colors: {
        "font-color": "#292727",
        abbey: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4b4b4b",
          800: "#454545",
          900: "#3d3d3d",
          950: "#262626",
        },
        "primary-blue": {
          50: "#83A7ED",
          100: "#719AEB",
          200: "#4E81E6",
          300: "#2A68E1",
          400: "#1C55C6",
          500: "#1746A2",
          600: "#103171",
          700: "#091C40",
          800: "#02060F",
          900: "#000000",
          950: "#000000",
        },
      },
    },
    fontFamily: {
      Exo: ["Exo, sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      sm: "640px",
      tablet: "776px",
      md: "1032px",
      base: "1280px",
      lg: "1400px",
    },
  },
  plugins: [],
};
