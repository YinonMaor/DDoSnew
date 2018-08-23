'use strict';
const validator = require('../util/validator');

describe('IP Validator tests:', () => {

    describe('IP should be valid:', () => {

        it('should be valid ip - 1', () => {
            expect(validator.isValidIp('100.100.100.100')).toBe(true);
        });

        it('should be valid ip - 2', () => {
            expect(validator.isValidIp('255.255.255.255')).toBe(true);
        });

        it('should be valid ip - 3', () => {
            expect(validator.isValidIp('192.168.0.1')).toBe(true);
        });

        it('should be valid ip - 4', () => {
            expect(validator.isValidIp('127.0.0.1')).toBe(true);
        });

        it('should be valid ip - 5', () => {
            expect(validator.isValidIp('10.100.43.22')).toBe(true);
        });

        it('should be valid ip - 6', () => {
            expect(validator.isValidIp('8.8.8.8')).toBe(true);
        });

        it('should be valid ip - 7', () => {
            expect(validator.isValidIp('0.0.0.0')).toBe(true);
        });

    });

    describe('IP should be not valid:', () => {

        it('should be valid ip - 1', () => {
            expect(validator.isValidIp('100.100.100')).toBe(false);
        });

        it('should be valid ip - 2', () => {
            expect(validator.isValidIp('255.255.255.256')).toBe(false);
        });

        it('should be valid ip - 3', () => {
            expect(validator.isValidIp('192.168.300.100')).toBe(false);
        });

        it('should be valid ip - 4', () => {
            expect(validator.isValidIp('1')).toBe(false);
        });

        it('should be valid ip - 5', () => {
            expect(validator.isValidIp('-1.5.5.5')).toBe(false);
        });

        it('should be valid ip - 6', () => {
            expect(validator.isValidIp('8.8')).toBe(false);
        });

        it('should be valid ip - 7', () => {
            expect(validator.isValidIp('')).toBe(false);
        });

        it('should be valid ip - 8', () => {
            expect(validator.isValidIp('5000')).toBe(false);
        });

        it('should be valid ip - 9', () => {
            expect(validator.isValidIp('-1')).toBe(false);
        });

        it('should be valid ip - 10', () => {
            expect(validator.isValidIp(false)).toBe(false);
        });

        it('should be valid ip - 11', () => {
            expect(validator.isValidIp(null)).toBe(false);
        });

        it('should be valid ip - 12', () => {
            expect(validator.isValidIp(undefined)).toBe(false);
        });

        it('should be valid ip - 13', () => {
            expect(validator.isValidIp({})).toBe(false);
        });

        it('should be valid ip - 14', () => {
            expect(validator.isValidIp([])).toBe(false);
        });

        it('should be valid ip - 15', () => {
            expect(validator.isValidIp(['8.8.8.8'])).toBe(false);
        });

        it('should be valid ip - 16', () => {
            expect(validator.isValidIp({ip: '8.8.8.8'})).toBe(false);
        });

    });

});