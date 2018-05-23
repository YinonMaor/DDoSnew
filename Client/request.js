/**
 * Created by yinonc on 18/12/2017.
 */
'use strict';

/**
 * Dependent modules
 */
const _          = require('lodash');
const fs         = require('fs');
const http       = require('http');
const path       = require('path');
const validator  = require('../util/validator');


let PORT = 3300;
let ip   = '127.0.0.1';
let request = '/';
let dir  = 'files';

require('dns').lookup(require('os').hostname(), (err, add) => {
    if (err) {
        console.log(err);
    }
    ip = add;
});

if (_.includes(process.argv, '--help')) {
    console.log('Usage: node request [options]\n');
    console.log('Options:');
    console.log('\x1b[31m', 'M', '\x1b[0m', '- Mandatory');
    console.log('  -t        ', '\x1b[31m', 'M', '\x1b[0m', '      Define server\'s IP argument');
    console.log('  -p        ', '\x1b[31m', 'M', '\x1b[0m', '      Define server\'s port argument');
    console.log('  -f                   Define path of saving files argument (\'./\' by default)');
    console.log('  -ht                  Define requested path argument (\'/\' by default)');
    process.exit(0);
}

if (!_.includes(process.argv, '-t') || !_.includes(process.argv, '-p')) {
   console.error('\x1b[31m', '--------ERROR!--------\nClient module missing arguments:\nServer IP and port are mandatory arguments.\nYou can find more information at README.md file.');
   process.exit(1);
}

process.argv.forEach((val, index, array) => {
    if (val === '-t' && array[index + 1]) {
        if (!validator.isValidIp(array[index + 1])) {
            console.error('\x1b[31m', '--------ERROR!--------\nServer failed to load:\nInvalid given server\'s IP.');
            process.exit(2);
        }
        ip = array[index + 1] || ip;
    } else if (val === '-p' && array[index + 1]) {
        if (!validator.isValidPort(array[index + 1])) {
            console.error('\x1b[31m', '--------ERROR!--------\nCDN server failed to load:\nInvalid given server\'s port.');
            process.exit(2);
        }
        PORT = parseInt(array[index + 1]) || PORT;
    } else if (val === '-ht' && array[index + 1]) {
        request = array[index + 1] || request;
    } else if (val === '-f' && array[index + 1]) {
        dir = array[index + 1] || dir;
        dir = _.replace(dir, /\//ig, '');
    }
});
const amount = 1; // expand for real DoS

if (request === '/') {
    request = 'index.html';
}
if (!request.startsWith('/')) {
    request = '/'.concat(request);
}

const options = {
    hostname: ip,
    port: PORT,
    path: request,
    method: 'GET'
};

for (let i = 0; i < amount; i++) {
    const req = http.request(options, res => {
        let responseBody = '';
        res.on('data', chunk => {
            responseBody += chunk;
        });
        res.on('end', () => {
            if (!fs.existsSync(path.join(__dirname, dir))){
                fs.mkdirSync(path.join(__dirname, dir));
            }
            fs.writeFile(path.join(__dirname, dir, request), responseBody, err => {
                if (err) {
                    console.log(err);
                }
            });
        });
    });
    req.on('error', err => {
        console.log(`problem with request: ${err}`);
    });
    req.end();
}
