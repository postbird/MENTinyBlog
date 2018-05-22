/**
 * @namespace /routes/
 * @name index.js
 * @description 负责首页路由功能
 * @author postbird
 * */
const {getPaginatePost,getPaginateInfo,getPostInfo} = require('../controllers/home/Post');

const  express = require('express');
const  router = express.Router();

// index routes
router.get('/',getPaginateInfo,getPaginatePost,(req, res) =>{
    res.render('./home/index',{list:res.docs,paginateInfo:res.paginateInfo});
});
router.get('/post/:id',getPostInfo,(req,res)=>{
    res.render('./home/post',{postInfo:res.postInfo});
});

module.exports = router;