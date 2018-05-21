/**
 * @namespace controllers/admin
 * @name Login.js
 * @description 处理管理员登录路由
 * @author postbird
 * */
const {getHmacString} = require('../../helpers/functions');
const Admin = require('../../model/Admin');

function loginAction(req,res,next){
    const name = req.body.name;
    const password = req.body.password;
    const hmacPassword = getHmacString(password);
    Admin.findOne({}).byName(name).exec().then((doc)=>{
        if(!doc) return res.redirect('/admin/login');
        if(doc.password !== hmacPassword) return res.redirect('/admin/login');

        req.session.adminLogined = true;
        req.session.adminInfo = doc;
        next();
    });
}

module.exports = {
    loginAction,
};