const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const loading = {
  html: fs.readFileSync(path.join(__dirname, '../src/load/loading.html')),
  css: '<style>' + fs.readFileSync(path.join(__dirname, '../src/load/loading.css')) + '</style>'
}

exports.config = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: '[hash].bundle.js',
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        }
      },
      {
        test: /\.[(png)|(obj)|(json)|(jpg)]$/,
        loader: "file-loader",
        options: {
          // publicPath:'./src/images'
        }
      },
      //字体加载 blueprint
      {
        test: /\.(woff|woff2|jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        }
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".less", ".css"]
  },
  devtool: 'eval',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Zoe',
      template: './index.html',
      loading
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dist/manifest.json'),
    })
  ]
};
