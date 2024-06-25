/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
        'custom-2': 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;',
      },
      colors: {
        primary: "#F8F8F8",
        secondary: "#62AB45",
        tertiary: "#ABD960",
        grey: "#F1F1F1",
        darkGrey: "#858585",
      },

      fontFamily: {
        poppins: ["Poppins"],
        montserrat: ["Montserrat"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  important:true,
  // corePlugins: {
  //   preflight: false,
  // },
};
