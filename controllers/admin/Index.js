/**
 * @namespace controllers/admin
 * @name Index.js
 * @description 后台管理首页相关控制器
 * @author postbird
 * */

const Post = require('../../model/Post');

function getLatestPost(req,res,next){
    Post.find({}).sort({created_at:1}).skip(0).limit(10).then((docs)=>{
      res.latestPost = docs;
      return next();
    }).catch((err)=>{
        next();
    })
}

function getPostCount(req,res,next){
    Post.find({}).count().then((doc)=>{
        res.postCount = doc;
        next();
    }).catch((err)=>{
        next();
    })
}

module.exports = {getLatestPost,getPostCount};