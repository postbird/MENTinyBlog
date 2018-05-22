/**
 * @namespace /model/
 * @name admin.js
 * @description 管理员数据模型
 * @author postbird
 **/
const db = require('../db');
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name:String,
    password:String,
    nickname:String,
    site:String,
    email:String,
});

AdminSchema.query.byName = function(name){
    return this.findOne({name});
};

const Admin = mongoose.model('Admin',AdminSchema,'admin');


module.exports = Admin;

