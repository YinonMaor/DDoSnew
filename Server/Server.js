/**
 * Created by Yinon Cohen and Maor Shabtay on 18/12/2017.
 */
'use strict';

/**
 * Dependent modules
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

let PORT    = 3300;
let address = '127.0.0.1';

process.argv.forEach(function (val, index, array) {
    if (val === '--port' && array[index + 1]) {
        PORT = parseInt(array[index + 1]) || PORT;
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
        fileName = 'index.html';
    }
    if (isFileExistsInDirectory('.', fileName)) {
        if (_.includes(fileName, '.html')) {
            fs.readFile(`./${fileName}`, function (err, data) {
                if (err) {
                    throw err;
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            });
        }
        else if (req.url.match(/.jpg$/)) {
            let imgPath = path.join(__dirname, 'images', fileName);
            let imgStream = fs.createReadStream(imgPath);

            res.writeHead(200, {'Content-Type': 'image/jpeg'});

            imgStream.pipe(res);
        }

        else if (req.url.match(/.png$/)) {
            let imgPath = path.join(__dirname, 'images', fileName);
            let imgStream = fs.createReadStream(imgPath);

            res.writeHead(200, {'Content-Type': 'image/png'});

            imgStream.pipe(res);
        }
    } else {
        fileName = cleanFileName(fileName);
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
    address = add;
    server.listen(PORT, address);
    console.log(`Server is running on ip ${address}, port ${PORT}.`);
});

function isFileExistsInDirectory(dirPath, fileName) {
    let files = fs.readdirSync(dirPath, function(err) {
        if (err) {
            throw err;
        }
    });
    return _.includes(files, fileName);
}

function cleanFileName(fileName) {
    if (fileName.startsWith('/')) {
        fileName = fileName.substr(1);
    }
    if (fileName.startsWith('./')) {
        fileName = fileName.substr(2);
    }
    return fileName;
}