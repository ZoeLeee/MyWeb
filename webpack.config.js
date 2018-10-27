const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack=require('webpack');

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
        test: /\.[(png)|(obj)|(json)|(jpg)]$/,
        loader: "file-loader",
        options:{
          // publicPath:'./src/images'
        }
      },
       //字体加载 blueprint
       {
        test: /\.(woff|woff2|jpg|png)$/,
        use: {
            loader: 'url-loader',
            options: {
                name: 'imanges/[hash].[ext]',
                limit: 5000,
                mimetype: 'application/font-woff'
            }
        }
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
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".less", ".css"]
  },
  devtool: 'eval',
  devServer: {
    contentBase: path.resolve(__dirname, "./src"),
    compress: true,
    port: 8080,
    // host: '0.0.0.0',
    hot:true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Zoe',
      template: './index.html',
    }),
    new webpack.NamedModulesPlugin(),//Hot
    new webpack.HotModuleReplacementPlugin(),//Hot
  ]
};