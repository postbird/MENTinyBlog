/**
 * @name checkAdminLogin
 * @description 检查管理员登录状态
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function checkAdminLogin(req, res, next) {
    if(req.session.adminLogined && req.session.adminInfo){
    return next();
    }
    return res.redirect('/admin/login');
}

module.exports = checkAdminLogin;