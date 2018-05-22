/**
 * @namespace /helpers
 * @name functions.js
 * @description 全局助手函数
 * @author postbird
 * **/
const crypto = require('crypto');
const {hmacKey} = require('../config/app');

/**
 * @name getHmacString
 * @description 得到 hamc 后的字符串
 * @param str
 */
module.exports.getHmacString = (str)=>{
    const hmacStr = crypto.createHmac('sha256',hmacKey);
    hmacStr.update(str);
    return hmacStr.digest('hex');
};

/**
 * @name getPaginatesSkip
 * @description 计算分页起始位置
 * @param {Number} page // 当前页数
 * @param {Number} num // 每页显示的数量
 */
module.exports.getPaginateSkip = (page = 1,num = 10)=>{
    const skip = (page - 1 ) * num;
    return skip;
};
