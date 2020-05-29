// const mysql = require('mysql')
// const connection = mysql.createPool({
//     host:'localhost',           //数据库地址
//     user: 'root',               //用户名
//     password: '116938310',           //密码
//     port : '3306',              //端口
//     database: 'vue',           //库名
//     multipleStatements:true     //允许执行多条语句
// })
//
// module.exports = connection;


var Mysql = require('node-mysql-promise');
var mysql = Mysql.createConnection({
    host:'localhost',           //数据库地址
    user: 'root',               //用户名
    password: '116938310',           //密码
    port : '3306',              //端口
    database: 'vue',           //库名
    multipleStatements:true     //允许执行多条语句
});
module.exports = mysql;