/**
 * Created by Yinon Cohen and Maor Shabtay on 5/4/2017.
 */
'use strict';
const _ = require('lodash');
module.exports = {

    isValidIp: ip => {
        if (!_.isString(ip)) {
            return false;
        }
        const arr = _.split(ip, '.');
        if (arr.length !== 4) {
            return false;
        }
        let allElementsAreValidNumbers = true;
        _.each(arr, value => {
            allElementsAreValidNumbers = allElementsAreValidNumbers && !isNaN(value) && value >= 0 && value <= 255;
        });
        return allElementsAreValidNumbers;
    },

    isValidPort: port => {
        return !_.includes(port, '.') && !isNaN(port) && port >= 1024 && port <= 65535;
    }
};