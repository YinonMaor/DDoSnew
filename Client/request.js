/**
 * Created by yinonc on 18/12/2017.
 */
'use strict';

let http        = require('http');
let fs          = require('fs');
let _           = require('lodash');
const validator = require('../util/validator');


let PORT = 80;
let ip   = '127.0.0.1';
let path = '/';
let dir  = './';

if (_.includes(process.argv, '--help')) {
    console.log('Usage: node request [options]\n');
    console.log('Options:');
    console.log('\x1b[31m', 'M', '\x1b[0m' ,'- Mandatory');
    console.log('  -t        ' , '\x1b[31m', 'M', '\x1b[0m', '      Define server\'s IP argument');
    console.log('  -p        ' , '\x1b[31m', 'M', '\x1b[0m', '      Define server\'s port argument');
    console.log('  -f                   Define path of saving files argument (\'./\' by default)');
    console.log('  -ht                  Define requested path argument (\'/\' by default)');
    process.exit(0);
}

if (!_.includes(process.argv, '-t') || !_.includes(process.argv, '-p')) {
    console.error('\x1b[31m', '--------ERROR!--------\nClient module missing arguments:\nServer IP and port are mandatory arguments.\nYou can find more information at README.md file.');
    process.exit(1);
}

process.argv.forEach(function (val, index, array) {
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
        path = array[index + 1] || path;
    } else if (val === '-f' && array[index + 1]) {
        dir = array[index + 1] || dir;
    }
});

const amount = 1; // expand for real DoS

if (!path.startsWith('/')) {
    path = '/'.concat(path);
}

let options = {
    hostname: ip,
    port: PORT,
    path: path,
    method: 'GET'
};

if (path === '/') {
    path = 'index.html';
}

for (let i = 0; i < amount; i++) {
    let req = http.request(options, function (res) {
        let responseBody = '';
        res.on('data', function (chunk) {
            responseBody += chunk;
        });
        res.on('end', function () {
            fs.writeFile(path, responseBody, function (err) {
                if (err) {
                    throw err;
                }
            });
        });
    });
    req.on('error', function (err) {
        console.log(`problem with request: ${err}`);
    });
    req.end();
}
