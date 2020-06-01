var mysql = require('../db/config');

module.exports = {
    login: function (params) {
        let {username,pass} = params;
        return mysql.table('admin').where({username:username,password:pass}).find();
    },
    getlist: function(req,res,next) {
        let params = req.query;
        return mysql.table('admin').limit(params.size * (params.current - 1),params.size * params.current).select()
    }
}