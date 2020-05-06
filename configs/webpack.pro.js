const common = require('./webpack.common').config;
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const resolve = dir => path.join(__dirname, dir);

const smp = new SpeedMeasurePlugin();
const pgs = smp.wrap({
  plugins: [
    new CleanWebpackPlugin(['./dist/*.bundle.js', './dist/*.map', './dist/*.css'], {
      root: path.resolve(__dirname, '../')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ]
})

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
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
        include: [ // 表示只解析以下目录，减少loader处理范围
          resolve('../src'),
        ],
        use: [MiniCssExtractPlugin.loader,
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
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 244 * 1024,
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
    },
    minimizer: [
      new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyJS: {
          output: {
            beautify: false,
            comments: false
          },
          warnings: false,
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        }
      }),
      new OptimizeCssAssetsPlugin()//压缩css
    ]
  },
  plugins: [
    new AddAssetHtmlPlugin({ filepath: './dist/dll.lib.js' }),
    new CleanWebpackPlugin(['./dist/*.bundle.js', './dist/*.map', './dist/*.css'], {
      root: path.resolve(__dirname, '../')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    // new BundleAnalyzerPlugin({ analyzerPort: 8081 })
  ]
});