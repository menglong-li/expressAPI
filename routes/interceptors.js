var express = require('express');
var router = express.Router();
var custom = require('../controllers/custom');
var jwt = require('jsonwebtoken');

/*
 * 拦截器，验证token
 */
router.use((req,res,next) => {
    if(req.url.split('?')[0] == '/api/Login') {
        next(); //登录页面不需要验证token
    } else {
        const token = req.headers['authorization'].split(' ').pop();
        if(custom.isEmpty(token)) res.send('请求失败：未验证的Token',403);
        jwt.verify(token,'Bearer ',(err,data) => {
            if(err) {
                res.send('请求失败：未验证的Token',403);
            }else {
                next();
            }
        })
    }
})

module.exports = router;