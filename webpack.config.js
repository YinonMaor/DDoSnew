const path = require('path');

module.exports = {
    entry: [
        './Server/Server.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    node: {
        fs: 'empty',
        dns: 'empty'
    },
    target: 'node'
};