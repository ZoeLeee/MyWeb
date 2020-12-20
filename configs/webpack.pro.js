const common = require('./webpack.common').config;
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
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
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          name: 'commons'
        }
      },
      //最小的文件大小 超过之后将不予打包
      minSize: {
        javascript: 1024 * 500,
        style: 1024 * 500
      },
      //最大的文件 超过之后继续拆分
      maxSize: {
        javascript: 1024 * 1024, //故意写小的效果更明显
        style: 3000
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
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