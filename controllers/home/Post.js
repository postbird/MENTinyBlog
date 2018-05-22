/**
 * @namespace /controllers/home
 * @name Post.js
 * @description 文章相关处理 服务前台
 * @author postbird
 * */
const markdown = require('markdown').markdown;
const Post = require('../../model/Post');
const {paginate} = require('../../config/app');
const {getPaginateSkip} = require('../../helpers/functions');

// 获取文章信息
function getPostInfo(req,res,next){
    Post.findById(req.params.id).then((doc)=>{
        if(!doc){
            req.flash(false,'文章信息不存在');
            return res.redirect('/');
        }
        doc.content = markdown.toHTML(doc.content);
        // doc.description = markdown.toHTML(doc.description);
        res.postInfo = doc;
        next();
    }).catch((err)=>{
        req.flash(false,'文章信息不存在');
        return res.redirect('/');
    });
}
// 计算分页的相关信息
function getPaginateInfo(req,res,next){
    const page = req.query.page || 1;
    Post.count().then((docs)=>{
        res.paginateInfo = {
            count :Math.ceil(docs / paginate),
            page
        };
        next();
    }).catch((err)=>{
        console.log(err);
        next();
    });
}
// 网站文章分页
function getPaginatePost(req,res,next){
    const page = req.query.page || 1;
    Post.find({},'_id title created_at description').sort({created_at:-1}).skip(getPaginateSkip(page,paginate)).limit(paginate).then((docs)=>{
        // docs.forEach((item)=>{
        //    item.description = markdown.toHTML(item.description);
        // });
        res.docs = docs;
        next();
    }).catch((err)=>{
        console.log(err);
        next();
    });
}

module.exports = {getPaginatePost,getPaginateInfo,getPostInfo};