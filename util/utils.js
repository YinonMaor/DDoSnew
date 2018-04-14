/**
 * Created by Yinon Cohen and Maor Shabtay on 5/4/2017.
 */

'use strict';
const fs = require('fs');
const _ = require('lodash');

module.exports = {

    isFileExistsInDirectory: (dirPath, fileName) => {
        const files = fs.readdirSync(dirPath, function(err) {
            if (err) {
                throw err;
            }
        });
        return _.includes(files, fileName);
    }

};