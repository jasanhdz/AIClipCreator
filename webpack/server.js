const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackNodeExternals = require('webpack-node-externals')
const { common } = require('./common')

module.exports = {
    entry: {
        server: './server/main.ts',
    },
    target: 'node',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(ts)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    externals: [webpackNodeExternals()],
    ...common,
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: 'public', to: 'public' }],
        }),
    ],
}
