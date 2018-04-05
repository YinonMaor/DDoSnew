/**
 * Created by yinonc on 18/12/2017.
 */
'use strict';

let http = require('http');
let fs = require('fs');

let PORT = 80;
let ip   = '127.0.0.1';
let path = '/';
let dir  = './';

process.argv.forEach(function (val, index, array) {
    if (val === '-t') {
        ip = array[index + 1] || ip;
    }
    else if (val === '-p') {
        PORT = parseInt(array[index + 1]) || PORT;
    }
    else if (val === '-ht') {
        path = array[index + 1] || path;
    }
    else if (val === '-f') {
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

//let count = 0;
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
