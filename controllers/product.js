let mysql = require('../db/config');
let date = require('moment');
let logs = require('./adminlogs');

module.exports = {
    getlist: async (req,res) => {
        let {title,current,size} = req.query;
        let where = 'isSale=1';
        if(title != undefined) {
            where += ' and title like "%' + title + '%"';
        }
        let data = await mysql.table('product').where(where).page(current,size).order('sort desc,id desc').field('id,title,photo,price,inventory,isSale,sort,times').select();
        //因列表只显示头图，所以把photo数组取出来只返回[0];
        data.map((item,index) => {
            data[index].photo = JSON.parse(data[index].photo)[0];
        });
        let total = await mysql.table('product').where(where).count();
        let result = {
            list: data,
            total: total
        }
        res.send(result);
    },
    getdownlist: async (req,res) => {
        let {title,current,size} = req.query;
        let where = 'isSale=0';
        if(title != undefined) {
            where += ' and title like "%' + title + '%"';
        }
        let data = await mysql.table('product').where(where).page(current,size).order('sort desc,id desc').field('id,title,photo,price,inventory,isSale,sort,times').select();
        //因列表只显示头图，所以把photo数组取出来只返回[0];
        data.map((item,index) => {
            data[index].photo = JSON.parse(data[index].photo)[0];
        });
        let total = await mysql.table('product').where(where).count();
        let result = {
            list: data,
            total: total
        }
        res.send(result);
    },
    add: (req,res) => {
        let params = req.body;
        params.photo = JSON.stringify(params.photo);
        params.times = date().format('YYYY-MM-DD HH:mm:ss');
        mysql.table('product').add(params).then(result => {
            logs.inlogs('发布商品：' + params.title);
            res.send('ok');
        }).catch((err)=> {
            res.send(err,403);
        });
    },
    down:(req,res,next) => {
        let {id,title} = req.body;
        mysql.table('product').where({id:['in',id]}).update({isSale:0}).then(result=> {
            if(result > 0) {
                logs.inlogs('下架商品：' + JSON.stringify(req.body));
                res.send('ok');
            }else {
                res.send('操作失败',403);
            }
        })
    },
    up:(req,res,next) => {
        let {id,title} = req.body;
        console.log(req.body);
        mysql.table('product').where({id:['in',id]}).update({isSale:1}).then(result=> {
            if(result > 0) {
                logs.inlogs('重新上架商品：' + JSON.stringify(req.body));
                res.send('ok');
            }else {
                res.send('操作失败',403);
            }
        })
    },
    delete:(req,res,next) => {
        let {id,title} = req.query;
        mysql.table('product').where({id:['in',id]}).delete().then(result=> {
            if(result > 0) {
                if(title.split(',').length > 1) {
                    logs.inlogs('批量删除商品：' + JSON.stringify(req.query));
                }else {
                    logs.inlogs('删除商品：' + JSON.stringify(req.body));
                }
                res.send('ok');
            }else {
                res.send('操作失败',403);
            }
        })
    },
    getview:(req,res,next) => {
        let {id} = req.params;
        mysql.table('product').where({id:id}).find().then((result) => {
            if(JSON.stringify(result) != '{}') {
                res.send(result);
            }else {
                res.send('操作失败',403);
            }
        });
    },
    edit: (req,res,next) => {
        let model = req.body;
        model.photo = JSON.stringify(model.photo);
        mysql.table('product').where({id:model.id}).update(model).then(result=> {
            if(result > 0) {
                logs.inlogs(`编辑商品：{id:${model.id},title:${model.title}`);
                res.send('ok');
            }else {
                res.send('操作失败',403);
            }
        });
    },
}