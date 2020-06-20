var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var interceptors = require('./routes/interceptors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var websetRouter = require('./routes/webset');

var app = express();

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


/****************** 路由 ******************************/
app.use(interceptors);
app.use('/api', indexRouter);
app.use('/users', usersRouter);
app.use('/api/admin',adminRouter);
app.use('/api/webset',websetRouter);
/****************** 路由 ******************************/



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000,'192.168.1.100')

module.exports = app;
