/**
 * Created by Yinon Cohen and Maor Shabtay on 5/4/2017.
 */

'use strict';
const fs = require('fs');
const _ = require('lodash');

module.exports = {

    isFileExistsInDirectory: (dirPath, fileName) => {
        const files = fs.readdirSync(dirPath, err => {
            if (err) {
                throw err;
            }
        });
        return _.includes(files, fileName);
    },

    addClientToDatabase: (database, ip, fileName) => {
        if (!_.isUndefined(_.get(database, [ip, fileName]))) {
            database[ip][fileName]++;
        } else if (_.get(database, ip) && !_.get(database, [ip, fileName])) {
            database[ip][fileName] = 1;
        } else {
            database[ip] = {};
            database[ip][fileName] = 1;
        }
    }

};