module.exports = {
  entry: './renderer.js',
  output: {
    filename: 'bundle.js'
  },
  target: 'node',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
};
