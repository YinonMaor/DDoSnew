/**
 * Created by Yinon Cohen and Maor Shabtay on 18/12/2017.
 */
'use strict';

/**
 * Dependent modules
 */
const _         = require('lodash');
const fs        = require('fs');
const http      = require('http');
const path      = require('path');
const util      = require('util');
const utils     = require('../util/utils');
const cleaner   = require('../util/cleaner');
const validator = require('../util/validator');


let PORT    = 3300;
let address = '127.0.0.1';
const interactions = [];
const currentInteraction = {count: 0};

setInterval(() => {
    currentInteraction.time = utils.getDateTime();
    console.log(currentInteraction);
    interactions.push(_.cloneDeep(currentInteraction));
    currentInteraction.count = 0;
}, 5000);

if (_.includes(process.argv, '--help')) {
    console.log('Usage: node CDN [options]\n');
    console.log('Options:');
    console.log('  --port        Define CDN server\'s port argument (3300 by default)');
    process.exit(0);
}

process.argv.forEach((val, index, array) => {
    if (val === '--port' && array[index + 1]) {
        if (!validator.isValidPort(array[index + 1])) {
            console.error('\x1b[31m', '--------ERROR!--------\nServer failed to load:\nInvalid given port.');
            process.exit(1);
        }
        PORT = parseInt(array[index + 1]) || PORT;
    }
});

let allFiles = utils.getWholeFilesInDir(__dirname);
allFiles = _.remove(allFiles, element => {
    return element !== 'Server.js' && element !== 'sizes.json';
});
const fileSizes = _.reduce(allFiles, (acc, file) => {
    acc[file] = utils.getFilesizeInBytes(path.join(__dirname, file));
    return acc;
}, {});
fs.writeFileSync(path.join(__dirname, 'sizes.json'), JSON.stringify(fileSizes), 'utf-8');

/**
 * Creating the server and defining the specific service for various requests.
 */
const server = http.createServer((req, res) => {
    currentInteraction.count++;
    console.log(currentInteraction);
    console.log(`${req.method} request for ${req.url}`);
    console.log(`From: ${req.connection.remoteAddress}`);
    let fileName = req.url;
    if (fileName === '/' || fileName === '/index.html') {
        fileName = 'index.html';
    }
    fileName = cleaner.cleanFileName(fileName);
    if (fileName === 'Server.js') {
        res.writeHead(400, {'Content-type':'text/html'});
        res.end('You are not permitted requesting this file.');
    } else if (utils.isFileExistsInDirectory(__dirname, fileName)) {
        if (_.includes(fileName, '.html')) {
            fs.readFile(path.join(__dirname, fileName), (err, data) => {
                if (err) {
                    res.writeHead(400, {'Content-type':'text/html'});
                    res.end('A trouble occurred with the file.');
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                }
            });
        } else {
            fs.readFile(`${__dirname}/${fileName}`, (err, data) => {
                if (err) {
                    res.writeHead(400, {'Content-type':'text/html'});
                    res.end('A trouble occurred with the file.');
                } else {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end(data);
                }
            });
        }
    } else if (utils.isFileExistsInDirectory(path.join(__dirname, 'images'), fileName)) {
        if (fileName.match(/.jpg$/)) {
            fs.readFile(path.join(__dirname, 'images', fileName), (err, data) => {
                if (err) {
                    res.writeHead(400, {'Content-type':'text/html'});
                    res.end('A trouble occurred with the file.');
                } else {
                    res.writeHead(200, {'Content-Type': 'image/jpeg'});
                    res.end(data);
                }
            });
        } else if (fileName.match(/.png$/)) {
            fs.readFile(path.join(__dirname, 'images', fileName), (err, data) => {
                if (err) {
                    res.writeHead(400, {'Content-type':'text/html'});
                    res.end('A trouble occurred with the file.');
                } else {
                    res.writeHead(200, {'Content-Type': 'image/png'});
                    res.end(data);
                }
            });
        }
    } else {
        fs.writeFileSync(path.join(__dirname, fileName), 'File Not Found. Please check your request.\n', err => {
            if (err) {
                throw err;
            }
        });
        fs.readFile(path.join(__dirname, fileName), (err, data) => {
            if (err) {
                res.writeHead(400, {'Content-type':'text/html'});
                res.end('A trouble occurred with the file.');
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(data);
                fs.unlink(path.join(__dirname, fileName), err => {
                    if (err) {
                        throw err;
                    }
                });
            }
        });

    }
});

/**
 * Defining the server's listener
 */
require('dns').lookup(require('os').hostname(), (err, add) => {
    if (err) {
        throw err;
    }
    address = add;
    server.listen(PORT, address);
    process.stdout.write(`Server is listening on ip ${address}, port ${PORT}.\n`);
});

process.on('SIGINT', () => {
    fs.writeFileSync(path.join(__dirname, 'interactions.json'), util.inspect(interactions) , 'utf-8');
    fs.unlink(path.join(__dirname, 'sizes.json'), err => {
        if (err) {
            throw err;
        }
    });
    process.exit(2);
});