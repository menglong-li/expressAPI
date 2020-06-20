var mysql = require('../db/config');

module.exports = {
    getView: () => {
        return mysql.table('webset').where({id:1}).find();
    },
    put: async (params) => {
        let old = await mysql.table('webset').where({id:1}).find();
        if(JSON.stringify(old) != '{}') {
            console.log('存在')
            return mysql.table('webset').where({id:1}).update(params);
        }else {
            console.log('不存在')
            return mysql.table('webset').add(params);
        }
    }
}