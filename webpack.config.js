var webpack = require('webpack')
module.exports = {
  entry : {
      a : './loadarc/a.js',
      b : './loadarc/b.js'

  },
  output: {
    path: './build/',
    filename : '[name].js',
  },
  module: {
      loaders : [
          {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
              presets: ['es2015','es2016',"stage-0"],
              plugins: ['transform-runtime'],
              cacheDirectory: './build/tmp'
            }
          }
      ]
  },
  watch : true
};