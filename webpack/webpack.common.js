const webpack = require('webpack');
const path = require('path');

module.exports = {
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
                test: /\.css/,
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
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
};
