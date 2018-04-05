/**
 * Created by Yinon Cohen and Maor Shabtay on 5/4/2017.
 */

'use strict';

module.exports = {

    cleanFileName: fileName => {
        if (fileName.startsWith('/')) {
            fileName = fileName.substr(1);
        }
        if (fileName.startsWith('./')) {
            fileName = fileName.substr(2);
        }
        return fileName;
    }

};