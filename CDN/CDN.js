/**
 * Created by Yinon Cohen and Maor Shabtay on 18/12/2017.
 */
'use strict';

/**
 * Dependent modules
 */
const http        = require('http');
const fs          = require('fs');
const _           = require('lodash');
const cleaner     = require('../util/cleaner');
const validator   = require('../util/validator');

let PORT          = 4400;
let serverPort    = 3300;
let serverAddress = '127.0.0.1';
let CDN_Address    = '127.0.0.1';

if (_.includes(process.argv, '--help')) {
    console.log('Usage: node CDN [options]\n');
    console.log('Options:');
    console.log('\x1b[31m', 'M', '\x1b[0m' ,'- Mandatory');
    console.log('  --port                     Define CDN server\'s port argument (4400 by default)');
    console.log('  --server         ' , '\x1b[31m', 'M', '\x1b[0m', '     Define original server\'s IP argument');
    console.log('  --serverPort     ' , '\x1b[31m', 'M', '\x1b[0m', '     Define original server\'s Port argument');
    process.exit(0);
}

if (!_.includes(process.argv, '--serverPort') || !_.includes(process.argv, '--server')) {
    console.error('\x1b[31m', '--------ERROR!--------\nCDN server failed to load:\nServer IP and port are mandatory arguments.\nYou can find more information at README.md file.');
    process.exit(1);
}

process.argv.forEach(function (val, index, array) {
    if (val === '--port' && array[index + 1]) {
        if (!validator.isValidPort(array[index + 1])) {
            console.error('\x1b[31m', '--------ERROR!--------\nCDN server failed to load:\nInvalid given port.');
            process.exit(2);
        }
        PORT = parseInt(array[index + 1]) || PORT;
    } else if (val === '--server' && array[index + 1]) {
        if (!validator.isValidIp(array[index + 1])) {
            console.error('\x1b[31m', '--------ERROR!--------\nServer failed to load:\nInvalid given server\'s IP.');
            process.exit(2);
        }
        serverAddress = array[index + 1] || serverAddress;
    } else if (val === '--serverPort' && array[index + 1]) {
        if (!validator.isValidPort(array[index + 1])) {
            console.error('\x1b[31m', '--------ERROR!--------\nCDN server failed to load:\nInvalid given server\'s port.');
            process.exit(2);
        }
        serverPort = parseInt(array[index + 1]) || serverPort;
    }
});

/**
 * Creating the server and defining the specific service for various requests.
 */
let server = http.createServer(function (req, res) {
    console.log(`${req.method} request for ${req.url}`);
    console.log(req.connection.remoteAddress);
    let fileName = req.url;
    if (fileName === '/' || fileName === '/index.html' || fileName === 'index.html') {
        fileName = '/index.html';
    } else {
        fileName = cleaner.cleanFileName(fileName);
    }
    let options = {
        hostname: serverAddress,
        port: serverPort,
        path: fileName,
        method: 'GET'
    };

    let request = http.request(options, function (result) {
        let responseBody = '';
        result.on('data', function (chunk) {
            responseBody += chunk;
        });
        result.on('end', function () {
            fs.writeFileSync('./' + fileName, responseBody, function (err) {
                if (err) {
                    throw err;
                }
            });
            fs.readFile('./' + fileName, function(err, newData) {
                if (err) {
                    throw err;
                }
                res.writeHead(200, {'Content-Type': 'text/html'}); // know when you're writing with text/html or image or plain
                res.end(newData);
            });
            fileName = cleaner.cleanFileName(fileName);
            fs.unlink(fileName, function(err) {
                if (err) {
                    throw err;
                }
            });
        });

    });

    request.on('error', function (err) {
        console.log(`problem with request: ${err}`);
    });
    request.end();
});

/**
 * Defining the server's listener
 */
require('dns').lookup(require('os').hostname(), function (err, add) {
    CDN_Address = add;
    server.listen(PORT, CDN_Address);
    console.log(`CDN Server is running on ip ${CDN_Address}, port ${PORT}.`);
});