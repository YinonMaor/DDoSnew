'use strict';
const fs    = require('fs');
const utils = require('../util/utils');

describe('Utils function tests:', () => {

    it('should return that file exists in dir', () => {
        fs.writeFileSync('to-delete.txt', 'test file.', (err) => {
            if (err) {
                throw err;
            }
        });
        const fileExistsInDirectory = utils.isFileExistsInDirectory('.', 'to-delete.txt');
        fs.unlinkSync('to-delete.txt', (err) => {
            if (err) {
                throw err;
            }
        });
        expect(fileExistsInDirectory).toBe(true);
    });

});