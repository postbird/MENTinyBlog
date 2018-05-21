/**
 * @name adminLoginRoutes.js
 * @description 管理员登录的路由控制，不需要验证登录状态
 * @author postbird
 * */
const express = require('express');
const router = express.Router();

const {loginAction} = require('../controllers/admin/Login');

router.get('/',(req,res)=>{
    res.render('./admin/login');
});

router.post('/',loginAction,(req,res)=>{
    res.redirect('/admin');
});

router.all('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/admin/login');
    });
});

module.exports = router;