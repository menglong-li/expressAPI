var mysql = require('../db/config');
let logs = require('./adminlogs')

module.exports = {
    getView: () => {
        return mysql.table('webset').where({id:1}).find();
    },
    put: async (req,res,next) => {
        let old = await mysql.table('webset').where({id:1}).find();
        if(JSON.stringify(old) != '{}') {
            logs.inlogs('修改参数设置')
            return mysql.table('webset').where({id:1}).update(req.body);
        }else {
            logs.inlogs('新增参数设置')
            return mysql.table('webset').add(req.body);
        }
    }
}