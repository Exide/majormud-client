const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const mainConfig = {
  entry: './src/main.js',
  target: 'electron-main',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: [ '.js', '.json' ]
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|ico|icns|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  }
};

const rendererConfig = {
  entry: './src/renderer.jsx',
  target: 'electron-renderer',
  output: {
    filename: 'renderer.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: [ '.js', '.json', '.jsx' ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: [ '@babel/env', '@babel/react' ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      },
      {
        test: /\.(png|svg|ico|icns|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'MajorMUD Client',
      template: 'resources/index.html'
    })
  ]
};

module.exports = [ mainConfig, rendererConfig ];
