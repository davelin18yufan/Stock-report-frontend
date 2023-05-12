/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true
    },
    fontFamily: {
      sans: [
        "Inter var, Noto Sans TC",
        { fontFeatureSettings: '"cv11", "ss01"' },
      ],
    },
    extend: {
      colors: {
        'dark-green': '#1e4040',
        "light-green": "#71d99e"
      },
      flexBasis: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      backgroundImage: {
        'main': "url('../public/images/main.png')",
        'login': "url('../src/assets/images/bg-stocks.jpeg')"
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

