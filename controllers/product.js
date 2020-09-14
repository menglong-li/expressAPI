let mysql = require('../db/config');
let date = require('moment');

module.exports = {
    getlist: async (req,res) => {
        let {title,current,size} = req.query;
        let where = 'isSale=1';
        if(title != undefined) {
            where += ' and like','%' + title + '%';
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
        params.times = date().format('YYYY-MM-DD HH:mm:ss');
        mysql.table('product').add(params).then(result => {
            res.send('ok');
        }).catch((err)=> {
            res.send(err,403);
        });
    }
}