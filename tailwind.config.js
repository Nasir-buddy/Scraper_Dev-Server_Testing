/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Play', 'sans-serif'],
      },
      animation: {
        'spin-dash-array': 'spinDashArray 2s ease-in-out infinite',
        'spin': 'spin 8s ease-in-out infinite',
        'dash-offset': 'dashOffset 2s linear infinite',
      },
    },
  },
  plugins: [],
};