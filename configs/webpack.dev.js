const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common').config;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require('webpack-merge');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  output: {
    publicPath: '/'
  },
  // stats: {
  //   assets: true,
  // },
  module: {
    rules: [
      //样式加载 css
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      //样式加载 less
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: 'css-loader', options: { sourceMap: false }
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
                strictMath: false,
                noIeCompat: true,
                javascriptEnabled: true,
              },
            },
          }
        ]
      },
    ]
  },
  // optimization: {
  //   usedExports: true,
  // },
  devServer: {
    historyApiFallback: true,
    static: path.join(__dirname, "../dist/"),
    compress: true,
    port: 8080,
    // host: '0.0.0.0',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),//Hot
  ]
});