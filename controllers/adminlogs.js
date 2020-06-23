let express = require('express')
let router = express.Router()
let mysql = require('../db/config')
let date = require('moment');

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
    inlogs: (logs) => {
        console.log(global.admin);
        console.log(logs);
        console.log(date().format('YYYY-MM-DD HH:mm:ss'))
        mysql.table('adminlogs').add({admin:global.admin,logs:logs,times:date().format('YYYY-MM-DD HH:mm:ss')});
    }
}

