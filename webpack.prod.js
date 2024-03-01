const { merge } = require('webpack-merge');
const webpackConfig = require ('./webpack.config');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(webpackConfig, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    }
});