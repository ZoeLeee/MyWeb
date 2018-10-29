const path = require('path');
const webpack=require('webpack');
const common=require('./webpack.common').config;
const merge=require('webpack-merge');

module.exports =merge(common,{
  mode: 'development',
  devtool: 'eval',
  devServer: {
    contentBase: path.resolve(__dirname, "../dist/"),
    compress: true,
    port: 8080,
    // host: '0.0.0.0',
    hot:true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),//Hot
    new webpack.HotModuleReplacementPlugin(),//Hot
  ]
});