const webpack = require('webpack');

module.exports = {

  target: 'node',

  entry: {
    app: [
      'webpack/hot/dev-server',
      __dirname + '/src/renderer.js'
    ]
  },

  output: {
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/'
  },

  devServer: {
    contentBase: __dirname + '/resources',
    publicPath: 'http://localhost:8080/'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

};
