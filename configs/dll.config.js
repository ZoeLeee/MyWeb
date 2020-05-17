
const webpack = require('webpack');
const path=require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    'redux',
    // ...其它库
];
 
module.exports = {
    mode:"production",
    output: {
        path:path.resolve(__dirname, '../dist'),
        filename: 'dll.[name].js',
        library: 'dll',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path:path.resolve(__dirname,'../dist/manifest.json'),
            name: 'dll',
            context: __dirname,
        }),
        new CleanWebpackPlugin([`./dist/dll.*.js`,`./dist/*.json`], { root: path.resolve(__dirname, "../") }),
    ]
  }
