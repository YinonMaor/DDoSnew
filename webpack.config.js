const _      = require('lodash');
const path   = require('path');
const global = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    node: {
        fs: 'empty',
        dns: 'empty'
    },
    target: 'node'
};

const server = _.assign({}, global, {
    entry: [
        './Server/Server.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js'
    }
});
const client = _.assign({}, global, {
    entry: [
        './Client/request.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'request.js'
    }
});
const cdn = _.assign({}, global, {
    entry: [
        './CDN/CDN.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'cdn.js'
    }
});
module.exports = [
    server,
    client,
    cdn
];