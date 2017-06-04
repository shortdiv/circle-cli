var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: {
    'circle-cli': './src/js/index.js'
  },
  output: {
    path: path.join(__dirname, './dist/'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      './package.json': path.resolve(__dirname, './package.json')
    },
    modules: [
      path.resolve('./src/js'),
      "node_modules"
    ]
  },
  target: 'node',
  plugins: [
    new webpack.BannerPlugin({banner: '#!/usr/bin/env node --harmony', raw: true})
  ]
}
