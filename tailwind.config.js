module.exports = {
  content: [
    './resources/**/*.antlers.html',
    './resources/**/*.blade.php',
    './resources/**/*.vue',
    './content/**/*.md'
  ],
  theme: {
    extend: {
        colors: {
            'lighter-green': '#7EC070',
            'middle-green': '#64A855',
            'darker-green': '#598450',
            'light-yellow': '#FDF8EE',
            'dark-yellow': '#E6D172'
          },

    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
