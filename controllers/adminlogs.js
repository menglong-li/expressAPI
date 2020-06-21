let mysql = require('../db/config')
let date = require('moment');
var jwt = require('jsonwebtoken');

module.exports = {
    getList: async (params)=> {
        let {admin,times,current,size} = params;
        let where = {};
        if(admin != undefined) {
            console.log(admin)
            where.admin = admin;
        }
        if(times != undefined) {
            where.times = ['LIKE',times + '%'];
        }
        let result = {
            data: [],
            total:0,
        }
        result.data = await mysql.table('adminlogs').where(where).page(current,size).order('id desc').select();
        result.total = await mysql.table('adminlogs').where(where).count();
        return result;
    },
    inlogs: (req,logs) => {
        const token = req.headers['authorization'].split(' ').pop();
        jwt.verify(token,'limenglong',(err,data) => {
            mysql.table('adminlogs').add({admin:data.username,logs:logs,times:date().format('YYYY-MM-DD HH:mm:ss')});
        },"limenglong")
    },
    login: (admin)=> {
        mysql.table('adminlogs').add({admin:admin,logs:'登录',times:date().format('YYYY-MM-DD HH:mm:ss')});
    }
}

