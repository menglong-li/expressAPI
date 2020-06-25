let mysql = require('../db/config')

module.exports = {
    getlist: async (req,res,next)=>{
        let {title,current,size} = req.query;
        let where = '';
        if(title != undefined) {
            where = {title:['like','%' + title + '%']};
        }
        let data = await mysql.table('producttype').where(where).page(current,size).select();
        let total = await mysql.table('producttype').count();
        let result = {
            data: data,
            total: total
        }
        res.send(result);
    }
}