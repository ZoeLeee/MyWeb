
const webpack = require('webpack');
const path=require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const vendors = [
    'react',
    'react-dom',
    // ...其它库
];
 
module.exports = {
    mode:"production",
    output: {
        path:path.resolve(__dirname, '../dist'),
        filename: '[hash].[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path:path.resolve(__dirname,'../dist/manifest.json'),
            name: '[name]',
            context: __dirname,
        }),
        new CleanWebpackPlugin([`./dist/*.lib.js`], { root: path.resolve(__dirname, "../") }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            minimize: true,
            cache: true,
            parallel: true
          })
    ]
  }
