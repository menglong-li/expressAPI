var Mysql = require('node-mysql-promise');
var mysql = Mysql.createConnection({
    host:'localhost',           //数据库地址
    user: 'root',               //用户名
    password: '116938310',           //密码
    port : '3306',              //端口
    database: 'vue',           //库名
    timezone: "08:00",          //解决时间带T及8小时问题
    multipleStatements:true     //允许执行多条语句
});
module.exports = mysql;