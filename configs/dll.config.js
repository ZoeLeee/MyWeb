
const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    'redux',
    // ...其它库
];

module.exports = {
    mode: "production",
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'dll.[name].js',
        library: 'dll_[name]',
    },
    entry: {
        "react": vendors,
        // "editor":["react-quill"]
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../dist/manifest.json'),
            name: 'dll_[name]',
            context: __dirname,
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, "../dist/dll.*.js"),
                path.resolve(__dirname, "../dist/dll.*.json"),
            ]
        })
    ]
};
