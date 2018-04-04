const path = require('path')
const commonConfig = require('./poi.common.config')

module.exports = Object.assign(commonConfig, {
  entry: path.resolve('website/index.js'),
  outDir: path.resolve('website/dist'),
  staticFolder: path.resolve('website')
})