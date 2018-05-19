'use strict';
const _     = require('lodash');
const fs    = require('fs');
const path  = require('path');
const utils = require('../util/utils');

describe('Utils function tests:', () => {

    describe('Utils getFilesizeInBytes tests:', () => {

        it('should return that file exists in dir', () => {
            fs.writeFileSync('to-delete.txt', 'test file.', err => {
                if (err) {
                    throw err;
                }
            });
            const fileExistsInDirectory = utils.isFileExistsInDirectory('.', 'to-delete.txt');
            fs.unlinkSync('to-delete.txt', err => {
                if (err) {
                    throw err;
                }
            });
            expect(fileExistsInDirectory).toBe(true);
        });

    });

    describe('Utils getFilesizeInBytes tests:', () => {

        it('should return right CDN directory files', () => {
            let paths = __dirname.split('/');
            paths.pop();
            paths = paths.join('/');
            const getCDNDir = path.join(paths, 'CDN');
            const originCDNDir = ['CDN.js', 'README.md'];
            expect(_.isEqual(utils.getWholeFilesInDir(getCDNDir).sort(), originCDNDir.sort())).toBe(true);
        });

    });

    describe('Utils getFilesizeInBytes tests:', () => {

        it('should return right size of traffic.png', () => {
            let paths = __dirname.split('/');
            paths.pop();
            paths = paths.join('/');
            const image = path.join(paths, 'Server', 'images', 'traffic.png');
            expect(utils.getFilesizeInBytes(image)).toBe(23412);
        });

    });

    describe('Utils addClientToDatabaseAndReturnHisStatus tests:', () => {

        it('should return true for non-attacker client', () => {
            const IP = '1.1.1.1';
            const database = {
                [IP]: {
                    'index.html': {
                        count: 1,
                        time: Date.now()
                    }
                }
            };
            expect(utils.addClientToDatabaseAndReturnHisStatus(database, IP, 'index.html')).toBe(true);
        });

        it('should return true for non-attacker client', () => {
            const IP = '1.1.1.1';
            const database = {
                [IP]: {
                    'index.html': {
                        count: 1,
                        time: Date.now()
                    },
                    'traffic.png': {
                        count: 2,
                        time: Date.now()
                    }
                }
            };
            expect(utils.addClientToDatabaseAndReturnHisStatus(database, IP, 'index.html')).toBe(true);
        });

        it('should return false for non-attacker client', () => {
            const IP = '1.1.1.1';
            const database = {
                [IP]: {
                    'index.html': {
                        count: 6,
                        time: Date.now()
                    }
                }
            };
            expect(utils.addClientToDatabaseAndReturnHisStatus(database, IP, 'index.html')).toBe(false);
        });
    });
});