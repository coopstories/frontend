module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Lusitana', 'sans'],
      serif: ['Open Sans', 'serif'],
    },

    extend: {
      colors: {
        'green-mid': '#83c5beff',
        'light-blue': '#edf6f9ff',

        primary: '#e29578ff',
        'light-primary': '#ffddd2ff',
        secondary: '#006d77ff',
      },
    },
  },
  plugins: [],
}
