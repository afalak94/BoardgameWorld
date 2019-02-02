export let config = {
  plugins: [
    require('precss'),
    require('postcss-flexbugs-fixes'),
    require('postcss-nesting'),
    require('postcss-css-variables'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    })
  ]
};

module.exports = config;
