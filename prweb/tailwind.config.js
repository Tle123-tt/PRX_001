/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        main: "1220px",
      },
      backgroundColor: {
      
      },colors:{
        
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [
    "@tailwindcss/line-clamp"
  ],
};
