/**
 * @namespace /helpers
 * @name functions.js
 * @description 全局助手函数
 * @author postbird
 * **/
const crypto = require('crypto');
const {hmacKey} = require('../config/app');

module.exports.getHmacString = (str)=>{
    const hmacStr = crypto.createHmac('sha256',hmacKey);
    hmacStr.update(str);
    return hmacStr.digest('hex');
};

