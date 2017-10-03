var pkg = require('./package.json')

// "build": "bili"
module.exports = {
  resolve: false, // rollup-plugin-commonjs
  exports: 'named',
  moduleName: pkg.name,
  format: 'es,cjs',
  compress: 'cjs',
  banner: {
    name: 'handlebars2',
    version: pkg.version,
    author: pkg.author,
    license: pkg.license,
    year: 2016
  }
}