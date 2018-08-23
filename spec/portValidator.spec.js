'use strict';
const _     = require('lodash');
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

        it('should be invalid port - 6', () => {
            expect(validator.isValidPort([])).toBe(false);
        });

        it('should be invalid port - 7', () => {
            expect(validator.isValidPort({})).toBe(false);
        });

        it('should be invalid port - 8', () => {
            expect(validator.isValidPort()).toBe(false);
        });

        it('should be invalid port - 9', () => {
            expect(validator.isValidPort({port: '2200'})).toBe(false);
        });

        it('should be invalid port - 10', () => {
            expect(validator.isValidPort(null)).toBe(false);
        });

        it('should be invalid port - 11', () => {
            expect(validator.isValidPort(undefined)).toBe(false);
        });

        it('should be invalid port - 12', () => {
            expect(validator.isValidPort(false)).toBe(false);
        });

        it('should be invalid port - 13', () => {
            expect(validator.isValidPort(true)).toBe(false);
        });

        it('should be invalid port - 14', () => {
            expect(validator.isValidPort(5)).toBe(false);
        });

        it('should be invalid port - 15', () => {
            expect(validator.isValidPort(_.noop)).toBe(false);
        });

    });

});