const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new ExtractTextPlugin({ filename: 'styles.css', allChunks: true })
    ],
    entry: {
        hardware: path.join(__dirname, '../src/hardware/CCID.ts'),
        ui: path.join(__dirname, '../src/ui/Index.tsx')
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js'
    },
    node: {
        net: 'empty',
        tls: 'empty',
        fs: 'empty',
        dns: 'empty',
        child_process: 'empty'
    },
    module: {
        noParse: [/aws\-sdk/],
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    typeCheck: true,
                    emitErrors: true
                 }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'standard-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use:[ MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 2,
                                localIdentName: '[name]_[local]_[hash:base64:5]'
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
            /*{
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'style-loader'
                  },
                  {
                    loader: 'css-loader'
                  }
                ]
              }
              */
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js','.scss']
    }
};
