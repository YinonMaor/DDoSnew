/**
 * Created by Yinon Cohen and Maor Shabtay on 18/12/2017.
 */
'use strict';

/**
 * Dependent modules
 */
const http = require('http');
const fs   = require('fs');
const _    = require('lodash');// eslint-disable-line no-unused-vars

let PORT          = 4400;
let serverPort    = 3300;
let serverAddress = '127.0.0.1';
let CDNaddress    = '127.0.0.1';
process.argv.forEach(function (val, index, array) {
    if (val === '--port' && array[index + 1]) {
        PORT = parseInt(array[index + 1]) || PORT;
    } else if (val === '--server' && array[index + 1]) {
        serverAddress = array[index + 1] || serverAddress;
    } else if (val === '--serverPort' && array[index + 1]) {
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
        fileName = cleanFileName(fileName);
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
            fileName = cleanFileName(fileName);
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
    CDNaddress = add;
    server.listen(PORT, CDNaddress);
    console.log(`CDN Server is running on ip ${CDNaddress}, port ${PORT}.`);
});


function cleanFileName(fileName) {
    if (fileName.startsWith('/')) {
        fileName = fileName.substr(1);
    }
    if (fileName.startsWith('./')) {
        fileName = fileName.substr(2);
    }
    return fileName;
}