let mysql = require('../db/config');
let date = require('moment');

module.exports = {
    getlist: async (req,res) => {
        let {title,current,size} = req.query;
        let where = '';
        if(title != undefined) {
            where = {title:['like','%' + title + '%']};
        }
        let data = await mysql.table('product').where(where).page(current,size).order('sort desc,id desc').field('id,title,isSale,sort,times').select()
        let total = await mysql.table('product').where(where).count();
        let result = {
            list: data,
            total: total
        }
        res.send(result);
    },
    add: (req,res) => {
        let params = req.body;
        params.times = date().format('YYYY-MM-DD HH:mm:ss');
        mysql.table('product').add(params).then(result => {
            res.send('ok');
        }).catch((err)=> {
            res.send(err,403);
        });
    }
}