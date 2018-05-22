/**
 * @namespace /controllers/admin
 * @name Info.js
 * @description 负责用户信息的行为操作
 * @author postbird
 **/
const Admin = require('../../model/Admin');
const {getHmacString} = require('../../helpers/functions');

// 编辑用户信息操作
function editPostInfo(req,res){
    const name = req.body.name;
    const nickname = req.body.nickname;
    const email = req.body.email;
    const site = req.body.site;
    const update = {name,nickname,email,site};
    Admin.updateOne({_id:req.session.adminInfo._id},update).then((doc)=>{
        if(name !== req.session.adminInfo.name){
            // 修改用户名，重新登录
            res.redirect('/admin/login/logout');
        }
        req.session.adminInfo = Object.assign({},update,{_id:req.session.adminInfo._id});
        req.flash(true,'信息修改成功');
        res.redirect('/admin/info')
    }).catch((err)=>{
        req.flash(false,'信息修改失败');
        res.redirect('/admin/info')
    });
}
// 修改用户密码
function changePasswordAction(req,res){
    const old = req.body.oldpassword;
    const newPassword = req.body.newpassword;
    const check = req.body.checkpassword;
    if(newPassword !== check) {
        req.flash(false,'两次密码不相等');
        res.redirect('/admin/info');
    }
    Admin.findById(req.session.adminInfo._id).then((doc)=>{
        if(!doc || doc.password !== getHmacString(old)){
            req.flash(false,'旧密码错误');
            res.redirect('/admin/info');
        }
        Admin.updateOne({_id:req.session.adminInfo._id},{password:getHmacString(newPassword)}).then((doc)=>{
            res.redirect('/admin/login/logout');
        }).catch((err)=>{
            req.flash(false,'发生异常,修改失败');
            res.redirect('/admin/info');
        })
    });
}


module.exports = {editPostInfo,changePasswordAction};
