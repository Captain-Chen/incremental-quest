const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/src/index.tsx',
    output: {
        path: path.join(__dirname, '/dist/client'),
        filename: 'bundle.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './client/src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            [
                                '@babel/preset-react', 
                                {runtime: 'automatic'}
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.(png|svg|jp?eg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "/img/[name][ext]"
                }
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
}