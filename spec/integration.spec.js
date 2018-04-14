'use strict';
const exec = require('child_process').exec;
const ip = require('my-local-ip');
const utils = require('../util/utils');

xdescribe('Server and client connectivity:', () => {
    it('should transfer index.html file to client', () => {
        exec('node ../Server/Server --port 3300', (error) => {
            if (error) {
                console.log(`Error in Integration 1.1: ${error.code}`);
            }
        });
        exec(`node ../Client/request -t ${ip()} -p 3300`, (error) => {
            if (error) {
                console.log(`Error in Integration 1.1: ${error.code}`);
            }
        });
        expect(utils.isFileExistsInDirectory('../Client/', 'index.html')).toBe(true);
    });
});