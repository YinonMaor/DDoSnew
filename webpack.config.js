const path = require('path');
const _ = require('lodash');
let global = {
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

let server = _.assign({}, global, {
    entry: [
        './Server/Server.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js',
    }
});
let client = _.assign({}, global, {
    entry: [
        './Client/request.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'request.js',
    }
});
let cdn = _.assign({}, global, {
    entry: [
        './CDN/CDN.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'cdn.js',
    }
});
module.exports = [
    server,
    client,
    cdn
];