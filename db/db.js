class dbc {
    static getInstance() {
        if (!dbc.instance) {
            dbc.instance = new dbc();
        }
        return dbc.instance;
    }

    constructor() {
        this.mysql = require('mysql');
        this.connection = this.mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '116938310',
            database: 'vue'
        });
        this.connection.connect();
    }

    query(sql) {
        return new Promise((resolve,reject) => {
            this.connection.query(sql,(error,result,fields) => {
                if(error) {
                    console.log(error.message);
                    reject(error.message);
                }else {
                    this.connection.end();
                    resolve(result);
                }
            })
        })
    }
}

module.exports = dbc.getInstance();