module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        'encode-sans': ['Encode Sans Semi Expanded', 'sans-serif'],
        'nuosu-sil': ['Nuosu SIL', 'sans-serif'],
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'albert-sans': ['Albert sans', 'sans-serif'],
        'futura': ['Futura', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
