/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Adding fonts & colors to tailwind config (Day-2)
      fontFamily:{
        rubik:['Rubik-Regular', 'sans-serif'],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
      },
      // For colors look for Figma design
      colors:{
        "primary": {
          100: '#0061FF0A',
          200: '#0061FF1A',
          300: '#0061FF',
        },
        accent: {
          100: '#FBFBFD',
        },
        black: {
          DEFAULT:'#000000',
          100:'#8C8E98',
          200: '#666876',
          300: '#191D31'
        },
         danger: '#F75555'
      }
    },
  },
  plugins: [],
}