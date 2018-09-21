const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliWebpackPlugin = require('babili-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

const plugin = new ExtractTextPlugin({
    filename: '[name].css',
    ignoreOrder: true,
});

module.exports = {
    devServer: {
        host: process.env.HOST, // Default localhost
        port: 1234, // process.env.PORT  // Default 8080
        // 在浏览器中显示错误
        overlay: {
            errors: true,
            warnings: true,
        },
    },
    devtool: 'source-map',
    performance: {
        hints: 'warning',
        maxEntrypointSize: 500000,
        maxAssetSize: 450000,
    },
    entry: {
        app: PATHS.app,
        vendor: ['react'],
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                },
            },
            {
                test:/\.css$/,
                exclude: /node_modules/,
                // styleLoader(cssLoader(input))
                use: plugin.extract({
                    use: {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    fallback : 'style-loader',
                }),
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'html-demo',
        }),
        plugin,
        new BabiliWebpackPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
        }),
    ],
};

