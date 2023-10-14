import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  safelist: [
    {
      pattern: /(bg|text|border|fill)-(red|yellow|lime|blue|pink)-(600|900)/,
      variants: ['hover', 'focus', 'before']
    }
  ],
  theme: {
    extend: {
      screens: {
        xsm: '320px'
      },
      colors: {
        background_color_lightTheme: '#FAFAFA',
        shape_color_lightTheme: '#EEEEEE',
        text_color_lightTheme: '#616161',
        contrast_color_lightTheme: '#212121',

        background_color_darkTheme: '#050505',
        shape_color_darkTheme: '#111111',
        text_color_darkTheme: '#9E9E9E',
        contrast_color_darkTheme: '#DEDEDE'
      }
    }
  },
  plugins: []
}
export default config
