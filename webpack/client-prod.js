const clientDev = require('./client')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    ...clientDev,
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
}
