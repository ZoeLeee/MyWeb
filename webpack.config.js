const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './src/index'),
  output: {
    filename: '[hash].bundle.js',
    path: path.resolve(__dirname, './dist')
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
        test: /\.[(png)|(obj)|(json)]$/,
        loader: "file-loader"
      },
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
            strictMath: true,
            noIeCompat: true
          }
        }
        ]
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js",".less",".css"]
  },
  devtool: 'eval',
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress:true,
    port:8080,
    host:'0.0.0.0'
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Zoe',
      template: './index.html',
    })
  ]
};