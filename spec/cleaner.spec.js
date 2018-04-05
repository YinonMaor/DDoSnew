'use strict';
const cleaner = require('../util/cleaner');

describe('Should return a clean file name:', () => {

    it('should return a clean file name - 1', () => {
        expect(cleaner.cleanFileName('./index.html')).toBe('index.html');
    });

    it('should return a clean file name - 2', () => {
        expect(cleaner.cleanFileName('/index.html')).toBe('index.html');
    });

    it('should return a clean file name - 3', () => {
        expect(cleaner.cleanFileName('./myImage.jpg')).toBe('myImage.jpg');
    });

    it('should return a clean file name - 4', () => {
        expect(cleaner.cleanFileName('/myImage.jpg')).toBe('myImage.jpg');
    });

});