module.exports = {
  // prefix: 'aztw-',
  mode: 'jit',
    purge: {
      // enabled: true,
      //  mode: 'all',
      // preserveHtmlElements: true,
      content:[
      "./src/**/*.tsx",
      "./src/**/*.ts",
      "src/**/*.tsx",
      './src/components/**/*.{js,ts,jsx,tsx}',
    ]},
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {}
    },
    variants: {
      display:['group-hover'],
      extend: {
        backgroundColor: ['active'],
      }
    },
    plugins: []
  };
