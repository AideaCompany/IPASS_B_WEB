module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      gold: '#D2B782',
      black: '#000000',
      'light-black': '#222222',
      white: '#ffffff',
      gray: '#CCCCCC'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    },
    extend: {
      fontFamily: {
        Butler: ['Butler_Regular'],
        Gothic: ['Century Gothic'],
        Helvetica: ['Helvetica Neue']
      }
    }
  },
  plugins: []
}
