// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F8F8F8",
        secondary: "#62AB45",
        tertiary: "#ABD960",
        grey: "#F1F1F1",
        darkGrey: "#858585",
      },
      fontFamily: {
        poppins: ['Poppins'],
        montserrat: ['Montserrat'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  purge: {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    safelist: [
      'text-secondary', // Example of dynamically generated class
      'bg-custom-color', // Another example
      // Add other dynamically generated classes here as needed
    ],
  },
  plugins: [],
};
