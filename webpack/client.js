const path = require('path')
const { common } = require('./common')

module.exports = {
    ...common,
    entry: {
        app: './client/main.tsx',
    },
    target: 'web',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', // injects CSS into the DOM
                    'css-loader', // translates CSS into CommonJS modules
                    'postcss-loader', // processes CSS with PostCSS
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets',
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        static: path.join(__dirname, '../dist/public'),
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: {
            index: 'index.html',
        },
    },
}
