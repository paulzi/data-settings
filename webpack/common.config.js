const path = require('path');

module.exports = () => { return {
    entry: {
        'data-settings': './src/index.js',
    },
    stats: {
        children: false,
        modules: false,
        entrypoints: false,
        hash: false,
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        library: 'dataSettings',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    }
                ]
            }
        ]
    },
}};