// filepath: /Users/dix/Desktop/Di-New-Web/didiweb/tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          beige: {
            anchor: '#D4C566',
            shade: '#D8D2A9',
            base: '#F0EACA',
            tint1: '#F7F4DE',
            tint2: '#FCFAF1',
              },
          golden: {
            dark: '#8C5800', // Accessible on white
            },
     },
  },
}, 
  plugins: [],
}