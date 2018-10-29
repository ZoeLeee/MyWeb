const common=require('./webpack.common').config;
const merge=require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path=require('path');

module.exports =merge(common,{
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist'],{
      root:path.resolve(__dirname,'../')
    })
  ]
});