const  express = require('express');
const  router = express.Router();
const checkAdminLoginMiddleware = require('../middlewares/admin/checkAdminLogin');
const {addPostAction,getPostList,getPostInfo,editPostAction,deletePostAction,getPaginatePost,getPaginateInfo} = require('../controllers/admin/Post');
const {getLatestPost,getPostCount} = require('../controllers/admin/Index');
const {editPostInfo,changePasswordAction} = require('../controllers/admin/Info');

router.use(checkAdminLoginMiddleware);

// index routes
router.get('/', getLatestPost,getPostCount,(req, res) =>{
    res.render('./admin/index',{latestPost:res.latestPost,postCount:res.postCount});
});

// posts routes
router.get('/post/add',(req,res)=>{
   res.render('./admin/post/add');
});
router.post('/post/add',addPostAction,(req,res)=>{
    res.redirect('/admin/posts');
});
router.post('/post/add',addPostAction,(req,res)=>{
    res.redirect('/admin/posts');
});
router.get('/post/edit/:id',getPostInfo,(req,res)=>{
    res.render('./admin/post/edit',res.postInfo);
});
router.post('/post/edit/:id',getPostInfo,editPostAction,(req,res)=>{
    res.redirect('/admin/posts');
});
router.all('/post/delete/:id',deletePostAction,(req,res)=>{
});
router.get('/posts',getPaginatePost,getPaginateInfo,(req,res)=>{
    res.render('./admin/post/posts',{'list':res.docs,paginateInfo:res.paginateInfo});
});

// 用户信息路由
router.get('/info',(req,res)=>{
   res.render('./admin/info',{info:req.session.adminInfo});
});
router.post('/info',editPostInfo);
router.post('/password',changePasswordAction);



module.exports = router;
