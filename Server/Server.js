/**
 * Created by Yinon Cohen and Maor Shabtay on 18/12/2017.
 */
'use strict';

/**
 * Dependent modules
 */
const http      = require('http');
const fs        = require('fs');
const path      = require('path');
const _         = require('lodash');
const utils     = require('../util/utils');
const validator = require('../util/validator');
const cleaner   = require('../util/cleaner');


let PORT    = 3300;
let address = '127.0.0.1';

if (_.includes(process.argv, '--help')) {
    console.log('Usage: node CDN [options]\n');
    console.log('Options:');
    console.log('  --port        Define CDN server\'s port argument (3300 by default)');
    process.exit(0);
}

process.argv.forEach(function (val, index, array) {
    if (val === '--port' && array[index + 1]) {
        if (!validator.isValidPort(array[index + 1])) {
            console.error('\x1b[31m', '--------ERROR!--------\nServer failed to load:\nInvalid given port.');
            process.exit(2);
        }
        PORT = parseInt(array[index + 1]) || PORT;
    }
});

/**
 * Creating the server and defining the specific service for various requests.
 */
const server = http.createServer(function (req, res) {
    console.log(`${req.method} request for ${req.url}`);
    console.log(req.connection.remoteAddress);
    let fileName = req.url;
    if (fileName === '/' || fileName === '/index.html' || fileName === 'index.html') {
        fileName = 'index.html';
    }
    if (utils.isFileExistsInDirectory('.', fileName)) {
        if (_.includes(fileName, '.html')) {
            fs.readFile(`./${fileName}`, function (err, data) {
                if (err) {
                    throw err;
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            });
        } else if (req.url.match(/.jpg$/)) {
            const imgPath = path.join(__dirname, 'images', fileName);
            const imgStream = fs.createReadStream(imgPath);

            res.writeHead(200, {'Content-Type': 'image/jpeg'});

            imgStream.pipe(res);
        } else if (req.url.match(/.png$/)) {
            const imgPath = path.join(__dirname, 'images', fileName);
            const imgStream = fs.createReadStream(imgPath);

            res.writeHead(200, {'Content-Type': 'image/png'});

            imgStream.pipe(res);
        }
    } else {
        fileName = cleaner.cleanFileName(fileName);
        fs.writeFileSync(fileName, 'File Not Found. Please check your request.\n', function (err) {
            if (err) {
                throw err;
            }
        });
        fs.readFile(`./${fileName}`, function (err, data) {
            if (err) {
                throw err;
            }
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(data);
        });
    }
});

/**
 * Defining the server's listener
 */
require('dns').lookup(require('os').hostname(), function (err, add) {
    if (err) {
        throw err;
    }
    address = add;
    server.listen(PORT, address);
    console.log(`Server is running on ip ${address}, port ${PORT}.`);
});