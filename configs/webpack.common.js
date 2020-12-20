const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const WebpackBar = require('webpackbar');

const loading = {
  html: fs.readFileSync(path.join(__dirname, '../src/load/loading.html')),
  css: '<style>' + fs.readFileSync(path.join(__dirname, '../src/load/loading.css')) + '</style>'
};
const resolve = dir => path.join(__dirname, dir);

exports.config = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: '[contenthash].[id].bundle.js',
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '/blog/'
  },
  stats: {
    assets: true,
    timings: true,

    builtAt: false,
    cachedAssets: false,
    hash: false,
    modules: false,
    performance: false,
    entrypoints: false,

    // 添加 children 信息
    children: false,
    // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
    chunks: false,
    // 将构建模块信息添加到 chunk 信息
    chunkModules: false,
    // 添加 chunk 和 chunk merge 来源的信息
    chunkOrigins: false,

    reasons: false,
    source: false
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '../node_modules/.temp_cache')
  },
  module: {
    noParse: /jquery|loadsh/,
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: true
              }),
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        }
      },
      {
        test: /\.[(png)|(obj)|(json)|(jpg)]$/,
        loader: "file-loader",
        options: {
          esModule: false,
        }
      },
      //字体加载 blueprint
      {
        test: /\.(woff|woff2|jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            name: 'images/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        }
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".less", ".css"],
    modules: [ // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
      resolve('../src'),
      resolve('../node_modules'),
    ],
    alias: {
      "@": resolve('../src'), // 缓存src目录为@符号，避免重复寻址
    }
  },
  devtool: 'eval',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Zoe',
      template: './index.html',
      loading,
      favicon: path.resolve(__dirname, '../favicon.ico')
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dist/manifest.json'),
    }),
    // new AddAssetHtmlPlugin(
    //   { filepath: './dist/dll.react.js' },
    // ),
    new WebpackBar(),
  ]
};
