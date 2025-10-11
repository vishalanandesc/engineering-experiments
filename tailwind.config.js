// tailwind.config.js
module.exports = {
    theme: {
      extend: {},
    },
    plugins: [
      function ({ addUtilities }) {
        const dashedBorder = {
          '.dashed-border': {
            borderImage: 'repeating-linear-gradient(0deg, #CBCBCB 0, #CBCBCB 6px, transparent 6px, transparent 12px) 1',
          },
        };
        addUtilities(dashedBorder, ['responsive']);
      },
    ],
  };
  