'use strict';
const cp    = require('child_process');
const ip    = require('my-local-ip');
const utils = require('../util/utils');

describe('Server and client connectivity:', () => {// eslint-disable-line jasmine/no-disabled-tests

    it('should transfer index.html file to client', () => {
        let basePath = __dirname.split('/');
        basePath.pop();
        basePath = basePath.join('/');

        const clientPath = basePath + '/Client';

        cp.execSync('node ' + clientPath + '/request', ['-t', ip(), '-p', 3300]);

        expect(utils.isFileExistsInDirectory(clientPath, 'index.html')).toBe(true);
    });

});