var dbc = require('./config');

module.exports = {
    query: function (sql,callback) {
        dbc.getConnection(function(err, connection) {
            connection.query(sql, function(err, result) {
                if(err) {
                    callback(err);
                    // callback('error');
                }else{
                    callback(result);
                }
                // 释放连接
                connection.release();
            });
        });
    }
}