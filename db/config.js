const mysql = require('mysql')
const connection = mysql.createConnection({
    host:'localhost',           //数据库地址
    user: 'root',               //用户名
    password: 'root',           //密码
    port : '3306',              //端口
    database: 'vue',           //库名
    multipleStatements:true     //允许执行多条语句
})