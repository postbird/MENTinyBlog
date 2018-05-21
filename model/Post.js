/**
 * @namespace /model/
 * @name Post.js
 * @description 文章模型
 * @author postbird
 * */

const db = require('../db');
const mongoose = require('mongoose');

const nowDate = Date.now();

const PostSchema = new  mongoose.Schema({
    title:String,
    content:String,
    description:String,
    created_at:{
        type:Number,
        default:nowDate
    },
    updated_at:{
        type:Number,
        default:nowDate
    },
    viewNum:{
        type:Number,
        default:0
    },
    likeNum:{
        type:Number,
        default:0
    }
});

const Post = mongoose.model('post',PostSchema,'posts');

module.exports = Post;