const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const common = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, '../server'),
            '@config': path.resolve(__dirname, '../server/config/index'),
            '@routes': path.resolve(__dirname, '../server/routes/index'),
            app: path.resolve(__dirname, '../client'),
        },
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
        new Dotenv(),
        new CopyWebpackPlugin({
            patterns: [{ from: 'public', to: 'public' }],
        }),
    ],
}

module.exports = {
    common,
}
