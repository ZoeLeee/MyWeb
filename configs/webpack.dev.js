const path = require('path');
const webpack=require('webpack');
const common=require('./webpack.common').config;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge=require('webpack-merge');

module.exports =merge(common,{
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      //样式加载 css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      //样式加载 less
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        },
        { loader: 'css-loader', options: { sourceMap: false } },
        {
          loader: "less-loader",
          options: {
            modifyVars: {
              'primary-color': '#1DA57A',
              'link-color': '#1DA57A',
              'border-radius-base': '2px',
            },
            strictMath: true,
            noIeCompat: true,
            javascriptEnabled: true,
          },
        }
        ]
      },
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "../dist/"),
    compress: true,
    port: 8080,
    // host: '0.0.0.0',
    hot:true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),//Hot
    new webpack.HotModuleReplacementPlugin(),//Hot
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]
});