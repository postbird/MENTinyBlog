/***
 * @namespace /helpers/
 * @name flash.js
 * @description 实现一个session的闪存机制
 * @author postbird
 * */

module.exports = function flash(){
  return function (req,res,next){
      req.flash = _flash;
      next();
  }
};

/**
 * @name _flash
 * @param {Boolean} type 闪存信息的类型 true/success  false/error
 * @param {String} msg 闪存的信息
 * @private
 */
function _flash(type = false,msg = ''){
    if(msg.length ===0){
        this.session.flash = {};
    }else{
        const status = true;
        this.session.flash = {status,type,msg};
    }
    return this.session.flash;
}