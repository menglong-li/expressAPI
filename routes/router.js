var interceptors = require('./interceptors');
var usersRouter = require('./users');
var adminRouter = require('./admin');
var websetRouter = require('./webset');
let adminlogsRouter = require('./adminlogs');
let producttype = require('./producttype');



module.exports = function (app) {
    /****************** 路由 ******************************/
    app.use(interceptors);
    app.use(usersRouter);
    app.use(adminRouter);
    app.use('/api/webset',websetRouter);
    app.use('/api/adminlogs',adminlogsRouter);
    app.use(producttype);
    /****************** 路由 ******************************/
};