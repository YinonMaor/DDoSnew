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
const utils     = require('../util/utils');
const cleaner   = require('../util/cleaner');
const validator = require('../util/validator');

let PORT          = 4400;
let serverPort    = 3300;
let CDN_Address   = '127.0.0.1';
let serverAddress = '127.0.0.1';
let givenServerIP = false;
let protectMode   = true;
let fileSizes     = {};
const database    = {};
const blocked     = {};

if (_.includes(process.argv, '--help')) {
    console.log('Usage: node CDN [options]\n');
    console.log('Options:');
    console.log('\x1b[31m', 'M', '\x1b[0m', '- Mandatory');
    console.log('  --port                     Define CDN server\'s port argument (4400 by default)');
    console.log('  --server         ', '\x1b[31m', 'M', '\x1b[0m', '     Define original server\'s IP argument');
    console.log('  --serverPort     ', '\x1b[31m', 'M', '\x1b[0m', '     Define original server\'s Port argument');
    console.log('  --no-protect     ', '\x1b[31m', 'M', '\x1b[0m', '     Disable CDN mitigation');
    process.exit(0);
}

// if (!_.includes(process.argv, '--serverPort') || !_.includes(process.argv, '--server')) {
//     console.error('\x1b[31m', '--------ERROR!--------\nCDN server failed to load:\nServer IP and port are mandatory arguments.\nYou can find more information at README.md file.');
//     process.exit(1);
// }

process.argv.forEach((val, index, array) => {
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
        givenServerIP = true;
        serverAddress = array[index + 1] || serverAddress;
    } else if (val === '--serverPort' && array[index + 1]) {
        if (!validator.isValidPort(array[index + 1])) {
            console.error('\x1b[31m', '--------ERROR!--------\nCDN server failed to load:\nInvalid given server\'s port.');
            process.exit(2);
        }
        serverPort = parseInt(array[index + 1]) || serverPort;
    } else if (val === '--no-protect') {
        protectMode = false;
    }
});

if (protectMode) {
    setInterval(() => {
        _.each(blocked, (value, key) => {
            if (value.degree > 0) {
                blocked[key].degree--;
            }
        });
    }, 180000);
}


/**
 * Creating the server and defining the specific service for various requests.
 */
const server = http.createServer((req, res) => {
    let fileName = req.url;
    const ip = req.connection.remoteAddress;

    if (protectMode && _.has(blocked, ip) && blocked[ip].degree > 0) {
        res.end('');
    } else if (protectMode && !utils.addClientToDatabaseAndReturnHisStatus(database, ip, fileName)) {
        if (!_.get(blocked, ip)) {
            blocked[ip] = {};
            blocked[ip].degree = 0;
            blocked[ip].expIncreament = -1;
        }
        blocked[ip].expIncreament++;
        console.log(`exp: ${blocked[ip].expIncreament}`);
        blocked[ip].degree = Math.pow(2, blocked[ip].expIncreament);
        res.end('');
    } else {
        console.log(`${req.method} request for ${fileName}`);
        console.log(`From: ${ip}`);
        if (_.includes(fileName, 'CDN.js') || _.includes(fileName, 'Server.js') || _.includes(fileName, 'sizes.json')) {
            res.writeHead(400, {'Content-type':'text/html'});
            res.end('You are not permitted requesting this file.');
        } else {
            if (fileName === '/' || fileName === 'index.html') {
                fileName = '/index.html';
            }
            const options = {
                hostname: serverAddress,
                port: serverPort,
                path: fileName,
                method: 'GET'
            };

            const request = http.request(options, result => {
                let responseBody = '';
                result.on('data', chunk => {
                    responseBody += chunk;
                });
                result.on('end', () => {
                    fileName = cleaner.cleanFileName(fileName);
                    fs.writeFileSync(`${__dirname}/${fileName}`, responseBody, err => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    if (_.includes(fileName, '.html')) {
                        fs.readFile(`${__dirname}/${fileName}`, (err, newData) => {
                            if (err) {
                                console.log(err);
                            }
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.end(newData);
                        });
                    } else if (fileName.match(/.jpg$/)) {
                        fs.readFile(path.join(__dirname, fileName), (err, data) => {
                            if (err) {
                                res.writeHead(400, {'Content-type': 'text/html'});
                                res.end('A trouble occurred with the file.');
                            } else {
                                res.writeHead(200, {'Content-Type': 'image/png'});
                                res.end(data);
                            }
                        });
                    } else if (fileName.match(/.png$/)) {
                        fs.readFile(path.join(__dirname, fileName), (err, data) => {
                            if (err) {
                                res.writeHead(400, {'Content-type': 'text/html'});
                                res.end('A trouble occurred with the file.');
                            } else {
                                res.writeHead(200, {'Content-Type': 'image/png'});
                                res.end(data);
                            }
                        });
                    } else {
                        fs.readFile(path.join(__dirname, fileName), (err, newData) => {
                            if (err) {
                                console.log(err);
                            }
                            res.writeHead(200, {'Content-Type': 'text/plain'});
                            res.end(newData);
                        });
                    }
                    if (fileName !== 'CDN.js' && fileName !== 'README.md') {
                        fs.unlink(path.join(__dirname, fileName), err => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                });

            });

            request.on('error', err => {
                console.log(`problem with request: ${err}`);
            });
            request.end();
        }
    }
});

/**
 * Defining the server's listener
 */
require('dns').lookup(require('os').hostname(), (err, add) => {
    if (err) {
        console.log(err);
    }
    CDN_Address = add;
    if (!givenServerIP) {
        serverAddress = CDN_Address;
    }

    const options = {
        hostname: serverAddress,
        port: serverPort,
        path: '/sizes.json',
        method: 'GET'
    };
    const req = http.request(options, res => {
        let responseBody = '';
        res.on('data', chunk => {
            responseBody += chunk;
        });
        res.on('end', () => {
            fs.writeFileSync(path.join(__dirname, options.path), responseBody);
            const text = fs.readFileSync(path.join(__dirname, options.path), 'utf8');
            fileSizes = JSON.parse(text);
            console.log(fileSizes); // ------------------------------------ to-delete after using. -------------------------
            fs.unlink(path.join(__dirname, options.path), err => {
                if (err) {
                    console.log(err);
                }
            });
            server.listen(PORT, CDN_Address);
            console.log(`CDN Server is running on ip ${CDN_Address}, port ${PORT}${protectMode ? ', Mitigation mode' : ''}.`);
        });
    });
    req.on('error', err => {
        console.log(`problem with request: ${err}`);
    });
    req.end();
});