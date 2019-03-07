const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.minimize;
const path = require('path');
const env = require('yargs').argv.env;
let libraryName = 'game-lib';

let plugins = [], outputFile;

if (env === 'build') {
    //plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + '.min.js';
} else {
    outputFile = libraryName + '.js';
}
const config = {
    entry: ['./app/index.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: outputFile
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
                options: {
                    presets: ["es2015"]
                },
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    devServer: {
        port: 3000,
        contentBase: __dirname + '/build',
        inline: true
    },
    //plugins: plugins
}
module.exports = config;