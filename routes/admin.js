const  express = require('express');
const  router = express.Router();
const checkAdminLoginMiddleware = require('../middlewares/admin/checkAdminLogin');
const {addPostAction,getPostList,getPostInfo,editPostAction,deletePostAction} = require('../controllers/admin/Post');

router.use(checkAdminLoginMiddleware);

// index routes
router.get('/', (req, res) =>{
    res.render('./admin/index');
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
router.get('/posts',getPostList,(req,res)=>{
    res.render('./admin/post/posts',{'list':res.docs});
});


module.exports = router;
