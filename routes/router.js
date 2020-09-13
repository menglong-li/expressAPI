var interceptors = require('./interceptors');
var usersRouter = require('./users');
var adminRouter = require('./admin');
var websetRouter = require('./webset');
let adminlogsRouter = require('./adminlogs');
let producttype = require('./producttype');
let product = require('./product');
const files = require('./files');


module.exports = function (app) {
    /****************** 路由 ******************************/
    app.use(interceptors);
    app.use(usersRouter);
    app.use(adminRouter);
    app.use('/api/webset',websetRouter);
    app.use('/api/adminlogs',adminlogsRouter);
    app.use(producttype);
    app.use(product);
    app.use(files);
    /****************** 路由 ******************************/
};