const path = require('path');
const { merge } = require('webpack-merge');
const webpackConfig = require ('./webpack.config');

module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, '../dist/client'),
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    }
});