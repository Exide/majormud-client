const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const mainConfig = {
  entry: './src/main.ts',
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
    extensions: [ '.ts', '.js', '.json' ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: /src/
      },
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
  entry: './src/renderer.tsx',
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
    extensions: [ '.ts', '.js', '.tsx', '.jsx', '.json' ]
  },
  module: {
    rules: [
      {
        test: /\.([jt])s(x?)$/,
        exclude: /node_modules/,
        use: [ 'ts-loader' ]
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
