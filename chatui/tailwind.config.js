const { sidebarColor, newChatColor, chineseBlack, chatColor } = require('./constants/AppColors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sidebarColor,
        newChatColor,
        chineseBlack,
        chatColor
      },
    },
    screens: {
      'sm': '360px',
      'md': '640px',
      'lg': '1024px'
    }
  },
  plugins: [],
};
