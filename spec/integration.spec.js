'use strict';
const cp    = require('child_process');
const ip    = require('my-local-ip');
const utils = require('../util/utils');

describe('Server and client connectivity:', () => {
    //
    // let originalTimeout;
    // let server;
    //
    // beforeEach(function(done) {
    //     server = cp.fork('Server/Server');
    //     originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    //     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    //     done();
    // });

    it('should transfer index.html file to client', done => {
        const client = cp.fork('Client/request', ['-t', ip(), '-p', 3300], { silent: true });
        let currentPath = __dirname.split('/');
        currentPath.pop();
        currentPath = currentPath.join('/');
        setTimeout(() => {
            expect(utils.isFileExistsInDirectory(currentPath, 'index.html')).toBe(true);
            done();
        }, 2000);
        client.on('data', data => {
            console.log(data);
        });
    });

    // afterEach(function() {
    //     jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    // });

});


// expect(true).toBe(true);

//     it('should transfer index.html file to client1', () => {
//         const server = cp.fork('Server/Server', [], { silent: true });
//         const client = cp.fork('Client/request', ['-t', ip(), '-p', 3300]);
//         server.stdout.on('data', function (data) {
//             console.log("blabla");
//         });
//         expect(true).toBe(true);
//         //expect(isFileExistsInDirectory('Client/', 'index.html')).toBe(true);
//     });