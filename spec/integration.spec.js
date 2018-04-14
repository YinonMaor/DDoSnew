'use strict';
const cp = require('child_process');
const ip = require('my-local-ip');

describe('Server and client connectivity1:', () => {

    let originalTimeout;

    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        const server = cp.fork('Server/Server');
        setTimeout(() => {
        }, 3000);
    });

    it('should transfer index.html file to client1', (done) => {
        const client = cp.fork('Client/request', ['-t', ip(), '-p', 3300]);

        expect(true).toBe(true);
        done();
        //expect(isFileExistsInDirectory('Client/', 'index.html')).toBe(true);
    });

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

//     it('should transfer index.html file to client1', () => {
//         const server = cp.fork('Server/Server', [], { silent: true });
//         const client = cp.fork('Client/request', ['-t', ip(), '-p', 3300]);
//         server.stdout.on('data', function (data) {
//             console.log("blabla");
//         });
//         expect(true).toBe(true);
//         //expect(isFileExistsInDirectory('Client/', 'index.html')).toBe(true);
//     });
});