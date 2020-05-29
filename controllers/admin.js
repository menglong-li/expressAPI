var mysql = require('../db/config');

module.exports = {
    getlist: function(req,res,next) {
        let params = req.query;
        return mysql.table('admin').limit(params.size * (params.current - 1),params.size * params.current).select()
    }
}