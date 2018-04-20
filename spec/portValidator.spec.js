'use strict';
const validator = require('../util/validator');

describe('IP Validator tests:', () => {

    describe('Port should be valid:', () => {

        it('should be valid port - 1', () => {
            expect(validator.isValidPort('1024')).toBe(true);
        });

        it('should be valid port - 2', () => {
            expect(validator.isValidPort('65535')).toBe(true);
        });

        it('should be valid port - 3', () => {
            expect(validator.isValidPort('3300')).toBe(true);
        });

        it('should be valid port - 4', () => {
            expect(validator.isValidPort('10000')).toBe(true);
        });

    });

    describe('Port should be invalid:', () => {

        it('should be invalid port - 1', () => {
            expect(validator.isValidPort('3000.')).toBe(false);
        });

        it('should be invalid port - 2', () => {
            expect(validator.isValidPort('1023')).toBe(false);
        });

        it('should be invalid port - 3', () => {
            expect(validator.isValidPort('65536.')).toBe(false);
        });

        it('should be invalid port - 4', () => {
            expect(validator.isValidPort('port')).toBe(false);
        });

        it('should be invalid port - 5', () => {
            expect(validator.isValidPort('0')).toBe(false);
        });

    });

});