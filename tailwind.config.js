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
      logo: [
        'Kaushan Script, cursive'
      ]
    },
    extend: {
      scrollbar: ['dark'],
      colors: {
        'dark-green': '#1e4040',
        "light-green": '#71d99e',
        'light-gray': '#FAFAFB'
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
        'login': "url('../src/assets/images/bg-stocks.jpeg')",
        'user': "url(../src/assets/images/person.png)",
        'random': `url(https://loremflickr.com/320/320/headshot/?random=${Math.random() * 100})`
      },
    },
  },
  variants: {
    extend: {
      // 啟用 scrollbar 的變體
      scrollbar: ['dark'],
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

