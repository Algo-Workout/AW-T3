const config = {
  plugins: [
    'tailwindcss',
    'postcss-flexbugs-fixes',
    'postcss-preset-env',
    [
      'postcss-normalize',
      {
        allowDuplicates: false,
      },
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
        defaultExtractor: (/** @type {string} */ content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      },
    ],
    'autoprefixer',
  ],
};

module.exports = config;
