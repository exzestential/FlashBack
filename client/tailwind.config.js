module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        110: "1600px", // Custom breakpoint for 110% zoom
      },
    },
  },
  plugins: [],
};
