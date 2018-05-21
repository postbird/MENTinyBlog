/**
 * @namespace /middlewares/admin
 * @name sessionFlash.js
 * @description 服务 session Flash 的中间件
 * @author postbird
 * */

function sessionFlash(req, res, next) {
    // console.log(req.session.flash);
    if(!req.session.flash) return next();
    res.locals.errStatus = req.session.flash.status;
    req.session.flash.status = false;
    res.locals.errType = req.session.flash.type;
    req.session.flash.type = false;
    res.locals.errMsg = req.session.flash.msg;
    req.session.flash.msg = '';
    next();
}

module.exports = sessionFlash;