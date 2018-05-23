/**
 * Created by Yinon Cohen and Maor Shabtay on 5/4/2017.
 */

'use strict';
const _    = require('lodash');
const fs   = require('fs');
const path = require('path');

const timesForFile = 5; // need to be object for each file
const timeForSameFileRequest = 5000;

function getWholeFilesInDir(dir, fileList) {
    const files = fs.readdirSync(dir);
    fileList = fileList || [];
    files.forEach(file => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            fileList = getWholeFilesInDir(path.join(dir, file), fileList);
        } else {
            fileList.push(file);
        }
    });
    return fileList;
}

module.exports = {

    isFileExistsInDirectory: (dirPath, fileName) => {
        const files = fs.readdirSync(dirPath);
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
    },

    getFilesizeInBytes: filePath => {
        if ((_.endsWith(filePath, 'png') || _.endsWith(filePath, 'jpg')) && !_.includes(filePath, 'images/')) {
            const pathByArr = filePath.split('/');
            const file = pathByArr.pop();
            filePath = path.join(pathByArr.join('/'), 'images', file);
        }
        const stats = fs.statSync(filePath);
        return stats.size;
    },

    getWholeFilesInDir,

    getDateTime: () => {
        const date = new Date();

        let hour = date.getHours();
        hour = (hour < 10 ? '0' : '') + hour;

        let min  = date.getMinutes();
        min = (min < 10 ? '0' : '') + min;

        let sec  = date.getSeconds();
        sec = (sec < 10 ? '0' : '') + sec;

        return hour + ':' + min + ':' + sec;

    }
};