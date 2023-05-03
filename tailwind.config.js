import defaultConfig from 'tailwindcss/defaultConfig';

/** @type {import('tailwindcss').Config} */
const config =  {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      backgroundImage : {
        wheelFeedback: "url('/images/spinwheel_bg.svg')",
      }
    },
    fontFamily: {
      sans: ['Inter', ...defaultConfig.theme.fontFamily.sans],
    }
  },
  plugins: [],
}

export default config;
