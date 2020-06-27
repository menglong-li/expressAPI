let mysql = require('../db/config');
let date = require('moment')

module.exports = {
    getlist: (req,res,next)=>{
        let {title} = req.query;
        let where = '';
        if(title != undefined) {
            where = {title:['like','%' + title + '%']};
        }
        mysql.table('producttype').where(where).order('pid asc,sort asc').select().then(result=> {
            res.send(result);
        });
    },
    add: (req,res,next) => {
        let params = req.body;
        params.times = date().format('YYYY-MM-DD HH:mm:ss')
        mysql.table('producttype').add(params).then(result => {
            res.send('ok');
        }).catch((err)=> {
            res.send(err,403);
        });
    },
    getview: (req,res,next) => {
        let id = req.params.id;
        mysql.table('producttype').where({id:id}).find().then(result=> {
            res.send(result);
        }).catch(error => {
            res.send(error,403);
        });
    },
    edit: (req,res,next) => {
        let model = req.body;
        mysql.table('producttype').where({id:model.id}).update(model).then(result=> {
            if(result > 0) {
                res.send('ok');
            }else {
                res.send('操作失败',403);
            }
        });
    },
    delete: (req,res) => {
        //如果包含子级类别，提示请先删除子级类别
    }
}