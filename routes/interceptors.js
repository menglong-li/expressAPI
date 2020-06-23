var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken')
/*
 * 拦截器，验证token
 */
router.use((req,res,next) => {
    if(req.url.split('?')[0] == '/api/Login') {
        next(); //登录页面不需要验证token
    } else {
        if(req.headers['authorization'] == undefined || req.headers['authorization'] == '') {
            res.send('Error:token does not exist',401)
        }else {
            const token = req.headers['authorization'].split(' ').pop();
            jwt.verify(token,"limenglong",(err,data) => {
                if(err) {
                    res.send('请求失败：未验证的Token',401);
                }else {
                    global.admin = data.username;
                    next();
                }
            })
        }
    }
})

module.exports = router;