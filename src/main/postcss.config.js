module.exports = {
  plugins: [
    require('precss'),
    require('postcss-import'),
    require('postcss-url'),
    require('postcss-nesting'),
    require('autoprefixer'),
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
      stage: 0
    })
  ]
};
