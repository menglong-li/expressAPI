let mysql = require('../db/config');
let date = require('moment');
let logs = require('./adminlogs')

module.exports = {
    getlist: async (req,res,next) => {
        let {username,current,size} = req.query;
        let where = '';
        if(username != undefined) {
            where = {username:username};
        }
        let data = await mysql.table('users').where(where).page(current,size).order('id desc').field('id,username,nickname,times,state,icetime').select()
        let total = await mysql.table('users').where(where).count();
        let result = {
            data: data,
            total: total
        }
        res.send(result);
    },
    ice: (req,res,next) => {
        let {id,username} = req.body;
        mysql.table('users').where({id:id}).update({state:1,icetime: date().format('YYYY-MM-DD HH:mm:ss')}).then(result=> {
            if(result > 0) {
                logs.inlogs('冻结会员' + username);
                res.send('ok');
            }else {
                res.send('操作失败',403);
            }
        })
    },
    thaw: (req,res,next) => {
        let {id,username} = req.body;
        mysql.table('users').where({id:id}).update({state:0,icetime: null}).then(result=> {
            if(result > 0) {
                logs.inlogs('解冻会员' + username);
                res.send('ok');
            }else {
                res.send('操作失败',403);
            }
        })
    },
    delete:(req,res,next) => {
        let {id,username} = req.query;
        mysql.table('users').where({id:['in',id]}).delete().then(result=> {
            if(result > 0) {
                if(username.split(',').length > 1) {
                    logs.inlogs('批量删除会员' + username);
                }else {
                    logs.inlogs('删除会员' + username);
                }
                res.send('ok');
            }else {
                res.send('操作失败',403);
            }
        })
    }
}