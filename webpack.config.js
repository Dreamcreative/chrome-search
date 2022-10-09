const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
module.exports = {
  mode: 'production',
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    historyApiFallback: true
  },
  entry: {
    popup: path.resolve(__dirname, './src/index-popup.js')
    // options: path.resolve(__dirname, './src/index-options.js'),
    // panel: path.resolve(__dirname, './src/index-panel.js'),
    // devtools: path.resolve(__dirname, './src/index-devtools.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                {
                  plugins: ['@babel/plugin-proposal-class-properties']
                }
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/popup.html',
      chunks: ['popup']
      // inject: 'body'
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/*.json', to: '[name][ext]' },
        { from: 'src/background.js', to: '[name][ext]' },
        // { from: 'src/inject_script.js', to: '[name][ext]' },
        { from: 'src/images/*', to: 'images/[name][ext]' }
      ]
    }),
    new WebpackBar(),
    new CleanWebpackPlugin()
  ]
};
