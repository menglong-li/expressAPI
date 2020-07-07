var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var app = express();
global.admin = '';//注册全局变量，存储管理员账号

//设置允许跨域访问该服务.
app.use(cors({
    origin:['http://localhost:8080','http://192.168.1.100:8080'],
    methods:['GET','POST','PUT','DELETE','OPTIONS'],
    alloweHeaders:['X-Requested-With','Content-Type','Authorization'],
    credentials: true,//允许携带cookies
    maxAge:86400,//限制options24小时内缓存
}))

app.all('*', function (req, res, next) {
  if(req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));//上传图片保存路径

var route = require('./routes/router')(app);//注册路由,所在行位置不能错



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    if(err.code === 'LIMIT_UNEXPECTED_FILE') {
        res.send('文件类型错误',403)
        return
    }else  if (err.code === 'LIMIT_FILE_SIZE') {
        //处理上传文件size超限
        res.send('文件超过限制',403)
        return
    }else {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    }
});

app.listen(3000,'192.168.1.102')

module.exports = app;
