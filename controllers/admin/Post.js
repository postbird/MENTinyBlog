/**
 * @namespace /controllers/admin/
 * @name Post.js
 * @description 负责 post 的相关操作
 * @author postbird
 ***/
const Post = require('../../model/Post');

// 添加文章操作
function addPostAction(req,res,next){
    const title = req.body.title;
    const content = req.body.content;
    const description = content.substr(0,100);
    Post.create({title,content,description}).then((doc)=>{
        if(doc){
            req.flash(true,'添加成功');
        }else{
            req.flash(false,'添加失败');
        }
        next();
    }).catch((err)=>{
        req.flash(false,'发生异常,添加文章失败');
        return res.redirect('/admin/posts');
    })
}
// 获取文章列表
function getPostList(req,res,next){
    Post.find().then((docs)=>{
       res.docs = docs;
       next();
    }).catch((err)=>{
        req.flash(false,'出现异常,获取列表失败');
        return res.redirect('/admin');
    });
}
// 获取文章信息
function getPostInfo(req,res,next){
    Post.findById(req.params.id).then((doc)=>{
        if(!doc){
            req.flash(false,'文章信息不存在');
            return res.redirect('/admin/posts');
        }
        res.postInfo = doc;
        next();
    }).catch((err)=>{
        req.flash(false,'文章信息不存在');
        return res.redirect('/admin/posts');
    });
}
// 编辑文章操作
function editPostAction(req,res,next){
    // 首先调用了 getPostInfo ,其中 res.postInfo 已经存在数据，证明没问题
    Post.updateOne({_id:req.params.id},{$set:{title:req.body.title,updated_at:Date.now(),content:req.body.content}}).then((doc)=>{
        if(doc.ok){
            req.flash(true,'更新成功');
        }else{
            req.flash(false,'更新失败');
        }
        next();
    }).catch((err)=>{
        req.flash(false,'出现异常：文章更新失败');
        return res.redirect('/admin/post/edit/'+req.params.id);
    })
}
// 删除文章操作
// ajax 请求
function deletePostAction(req,res){
    Post.deleteOne({_id:req.params.id}).then((doc)=>{
        if(doc.ok){
            req.flash(false,'删除成功');
            res.json({code:0,msg:'删除成功',data:{}});
        }else{
            res.json({code:0,msg:'删除失败',data:{}});
        }
    }).catch((err)=>{
        res.json({code:0,msg:'删除失败',data:{}});
    })
}
module.exports = {addPostAction,getPostList,getPostInfo,editPostAction,deletePostAction};