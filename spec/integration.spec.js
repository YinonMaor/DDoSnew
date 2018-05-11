'use strict';
const cp    = require('child_process');
const path  = require('path');
const utils = require('../util/utils');

let ip = '127.0.0.1';

require('dns').lookup(require('os').hostname(), (err, add) => {
    if (err) {
        throw err;
    }
    ip = add;
});

describe('Integration tests:', () => {// eslint-disable-line jasmine/no-disabled-tests

    describe('Client and Server connectivity:', () => {

        it('should transfer traffic.png file to client', () => {
            let basePath = __dirname.split('/');
            basePath.pop();
            basePath = basePath.join('/');

            const clientPath = path.join(basePath, 'Client');
            const execFile = path.join(clientPath, 'request');
            cp.execSync(`node ${execFile} -t ${ip} -p 3300 -f test/ -ht traffic.png`);
            const dirPath = path.join(clientPath, 'test');
            expect(utils.isFileExistsInDirectory(dirPath, 'traffic.png')).toBe(true);
        });

    });

    describe('Client, CDN and Server connectivity:', () => {

        it('should transfer index.html file to client trough CDN', () => {
            let basePath = __dirname.split('/');
            basePath.pop();
            basePath = basePath.join('/');

            const clientPath = path.join(basePath, 'Client');
            const execFile = path.join(clientPath, 'request');
            cp.execSync(`node ${execFile} -t ${ip} -p 4400 -f test/ -ht index.html`);

            const dirPath = path.join(clientPath, 'test');
            expect(utils.isFileExistsInDirectory(dirPath, 'index.html')).toBe(true);
        });

    });

});
