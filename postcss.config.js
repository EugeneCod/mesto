const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.export = {
  plugins: [
    autoprefixer,
    cssnano({preset: 'default'})
  ]
};