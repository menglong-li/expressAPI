var mysql = require('../db/config');
var md5 = require('md5-node');
var moment = require('moment');

module.exports = {
    /**
     * 登录
     * @param params 用户名及密码
     * @returns {Promise|*}
     */
    login: async function (params) {
        let {username,pass} = params;
        pass = md5(pass);
        let retu = await mysql.table('admin').where({username:username,password:pass}).find().then(result => {
            //如果用户存在，标记登录成功，替换上次登录时间，并更新当前登录时间
            result.lasttime = result.signtime;
            result.signtime = moment().format('YYYY-MM-DD HH:mm:ss');
            return mysql.table('admin').where({id:result.id}).update(result).then(num => {
                if(num > 0) {
                    return result;
                }else {
                    return '';
                }
            });
        });
        return new Promise((resolve,reject) => {
            if(retu == '') {
                reject('');
            }else {
                resolve(retu);
            }
        });
    },
    /**
     * 新增数据，同时验证用户名是否存在
     * @param params
     * @returns {*|Bluebird.Promise|Promise}
     */
    thenAdd: (params) => {
        //密码转md5
        params.password = md5(params.password);
        params.times = moment().format('YYYY-MM-DD HH:mm:ss');
        return mysql.table('admin').thenAdd(params,{username:params.username},true);
    },
    /**
     * 修改信息
     * @param params
     * @returns {Promise.<*>}
     */
    edit: async (params) => {
        //由于await不能获得reject，所以需要try抓捕一下
        try{
            //先取出原数据
            let old = await mysql.table('admin').where({id:params.id}).find();
            if(JSON.stringify(old) != '{}') {
                //需要更新密码
                if(old.password != params.password) {
                    params.password = md5(params.password);
                }

                let newdata = Object.assign(old,params);
                //更新
                return mysql.table('admin').where({id:old.id}).update(newdata);//update返回影响行数
            }else {
                throw new Error('信息不存在');
            }

        }catch (err) {
            return err.message;
        }
    },
    /**
     * 获取信息
     * @param id
     * @returns {Promise|*}
     */
    getView: id => {
        return mysql.table('admin').where({id:id}).find();
    },
    getlist: async (params) => {
        let {current,size,username} = params;
        let where = '';
        if(username) {
            where = {username:['LIKE',"%"+ username +"%"]};
        }
        let result = {
            list:[],
            total: 0
        }
        result.list = await mysql.table('admin').where(where).page(current,size).select();
        result.total = await mysql.table('admin').where(where).count();
        return result;
    },
    delete: id=> {
        return mysql.table('admin').where({id:['IN',id]}).delete();
    }
}