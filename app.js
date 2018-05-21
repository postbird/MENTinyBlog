const createError = require('http-errors');
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const path = require('path');
const adminRoutes = require('./routes/admin');
const adminLoginRoutes = require('./routes/adminLogin');
const initFilters = require('./helpers/nunjucksFilters');
const flash = require('./helpers/flash');
const sessionFlashMiddleware = require('./middlewares/admin/sessionFlash');

const app = new express();



// body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// static path
app.use(express.static(path.join(__dirname, 'public')));
// session and cookie
app.use(cookieParser());
app.use(expressSession({
    secret:'postbird',
    resave:false,
    saveUninitialized:false
}));
// 应用 flash 闪存方法
app.use(flash());
// 全局应用 sessionFlash 中间件
app.use(sessionFlashMiddleware);

// view engine
const nunjucksEnv = nunjucks.configure('views',{autoescape:true,autocomplete:true,express:app});
// 设置自定义过滤器 传入 env变量
initFilters(nunjucksEnv);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','njk');



// routes
app.get('/',(req,res)=>{
    res.render('./home/index');
});
// admin login router
app.use('/admin/login',adminLoginRoutes);
// admin router
app.use('/admin',adminRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = err;
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000,()=>{
   console.log("[ok] server start at point 3000");
});