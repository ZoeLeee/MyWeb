const common = require('./webpack.common').config;
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-source-map',
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      //样式加载 css
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      //样式加载 less
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: false } },
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
              }
            },
          }
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve(__dirname, "../dist/*.bundle.js"),
        path.resolve(__dirname, "../dist/*.map"),
        path.resolve(__dirname, "../dist/*.css"),
        path.resolve(__dirname, "../dist/*.txt"),
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css',
    }),
    // new BundleAnalyzerPlugin({ analyzerPort: 8088 })
  ]
});