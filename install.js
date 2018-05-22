/***
 * @description 安装文件，主要是为了向数据库写入初始用户
 * @author postbird
 **/

const Admin = require('./model/Admin');
const db = require('./db');
const initAdmin = require('./config/initAdmin');

Admin.find({}).count().then((doc)=>{
    if(doc>0){
        // 如果存在信息 则不允许再次插入数据
        console.log(new Error('[error] 管理员信息已经存在,不允许再次插入'));
        db.close();
        return false;
    }else{
        Admin.create(initAdmin).then((doc)=>{
            console.log("[ok] 管理员信息创建成功");
            db.close();
        });
    }
});