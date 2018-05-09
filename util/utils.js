/**
 * Created by Yinon Cohen and Maor Shabtay on 5/4/2017.
 */

'use strict';
const fs = require('fs');
const _ = require('lodash');

const timesForFile = 5; // need to be object for each file
const timeForSameFileRequest = 5000;

module.exports = {

    isFileExistsInDirectory: (dirPath, fileName) => {
        const files = fs.readdirSync(dirPath, err => {
            if (err) {
                throw err;
            }
        });
        return _.includes(files, fileName);
    },

    addClientToDatabaseAndReturnHisStatus: (database, ip, fileName) => {
        if (!_.isUndefined(_.get(database, [ip, fileName]))) {
            // for two and plus times for this ip and file
            if (Date.now() - database[ip][fileName].time > timeForSameFileRequest) {
                database[ip][fileName].time = Date.now();
                database[ip][fileName].count = 1;
            } else {
                database[ip][fileName].count++;
                if (database[ip][fileName].count >= timesForFile) {
                    return false;
                }
            }
        } else if (_.get(database, ip) && !_.get(database, [ip, fileName])) {
            // first time of this file
            database[ip][fileName] = {};
            database[ip][fileName].count = 1;
            database[ip][fileName].time = Date.now();
        } else {
            // first time request from this ip
            database[ip] = {};
            database[ip][fileName] = {};
            database[ip][fileName].count = 1;
            database[ip][fileName].time = Date.now();
        }
        return true;
    }

};