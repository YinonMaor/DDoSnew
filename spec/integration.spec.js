'use strict';
const cp    = require('child_process');
const IP    = require('ip');
const utils = require('../util/utils');

xdescribe('Integration tests:', () => {// eslint-disable-line jasmine/no-disabled-tests

    describe('Client and Server connectivity:', () => {

        it('should transfer traffic.png file to client', () => {
            let basePath = __dirname.split('/');
            basePath.pop();
            basePath = basePath.join('/');

            const clientPath = basePath + '/Client';
            cp.execSync(`node ${clientPath}/request -t ${IP.address()} -p 3300 -f test/ -ht traffic.png`);
            const dirPath = `${clientPath}/test`;
            expect(utils.isFileExistsInDirectory(dirPath, 'traffic.png')).toBe(true);
        });

    });

    describe('Client, CDN and Server connectivity:', () => {

        it('should transfer index.html file to client trough CDN', () => {
            let basePath = __dirname.split('/');
            basePath.pop();
            basePath = basePath.join('/');

            const clientPath = basePath + '/Client';

            cp.execSync(`node ${clientPath}/request -t ${IP.address()} -p 4400 -f test/ -ht index.html`);

            const dirPath = `${clientPath}/test`;
            expect(utils.isFileExistsInDirectory(dirPath, 'index.html')).toBe(true);
        });

    });

});
