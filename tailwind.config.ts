import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px'
    },
    extend: {
      colors: {
        brand: {
          bg: '#f4ede3',
          dark: '#241811',
          brown: '#3a2a1d',
          gold: '#c69a6d',
          cream: '#f7f1e8'
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif']
      }
    }
  }
}
