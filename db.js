/**
 * @name db.js
 * @description mongoose 数据库连接
 * @author postbird
 */
const mongoose = require('mongoose');
const dbConfig = require('./config/database');

const connect = dbConfig.noAuth ? `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}` : `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

mongoose.connect(connect);

const db = mongoose.connection;

db.on('error',(err)=>{console.log('[fail] database connect error.',err)});

db.on('open',()=>{console.log('[ok] connect success')});

module.exports = db;