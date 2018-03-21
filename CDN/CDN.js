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

let PORT = 4400;
let serverAddress = "127.0.0.1";
let CDNaddress =    "127.0.0.1";

process.argv.forEach(function (val, index, array) {
    if (val === '--port' && array[index + 1]) {
        PORT = parseInt(array[index + 1]) || PORT;
    } else if (val === '--server' && array[index + 1]) {
        serverAddress = parseInt(array[index + 1]) || PORT;
    }
});
let requests = [];
/**
 * Creating the server and defining the specific service for various requests.
 */
let server = http.createServer(function (req, res) {
    let requestPacket = {
        dataRequested: req.url,
        applicationMethod: req.method,
        requestedIp: req.connection.remoteAddress
    };

    console.log(`${requestPacket.applicationMethod} request for ${requestPacket.dataRequested}`);
    console.log(requestPacket.requestedIp);

    let options = {
        hostname: serverAddress,
        port: PORT,
        path: requestPacket.dataRequested,
        method: "GET"
    };

    let request = http.request(options, function (result) {
        let responseBody = "";
        result.on("data", function (chunk) {
            responseBody += chunk;
        });
        result.on("end", function () {
            res.writeHead(200, {'Content-Type': result.headers['Content-Type']}); // lodash?
            res.end(result);
        });
    });

    request.on("error", function (err) {
        console.log(`problem with request: ${err}`);
    });

});

/**
 * Defining the server's listener
 */
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    CDNaddress = add;
    server.listen(PORT, CDNaddress);
    console.log(`CDN Server is running on ip ${CDNaddress}, port ${PORT}.`);
});
