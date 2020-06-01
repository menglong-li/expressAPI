var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin');
var custom = require('../controllers/custom');
var jwt = require('jsonwebtoken');
/* GET users listing. */

/**
 * 后台登录
 */
router.post('/login',(req,res,next) => {
    let {username,pass} = req.body;
    if(custom.isEmpty(username) || custom.isEmpty(pass)) res.send('用户名或密码错误',500);
    controller.login(req.body).then(data => {
        if(data.id > 0){
            let tokenInfo = {
                iss: '鹅这个彪崽',//签发人
                id:data.id,
                username:data.username
            }
            let token = jwt.sign(tokenInfo,'Bearer ',{expiresIn:3600},(err,token) => {
                if(err) throw err;
                res.json({
                    token:'Bearer ' + token
                },200)
            });
        }else {
            res.send('用户名或密码错误',403);
        }
    }).catch(err => {
        res.send('用户名或密码错误',403);
    })
})

/**
 * 新增管理员
 */
router.post('/admin/register',(req,res,next) => {
    let {username,password,name,qx} = req.body;
    if(custom.isEmpty(username) || custom.isEmpty(password)) res.send('用户名或密码不能为空',400);
    //验证用户名是否存在并插入
    controller.thenAdd(req.body).then(result => {
        if(result.type == 'exist') {
            res.send('用户名已存在',403);
        }else {
            res.send('ok');
        }
    })
});

/**
 * 编辑或查看
 */
router.get('/admin/getview/:id',(req,res,next) => {
    controller.getView(req.params.id).then(result => {
        if(result.id > 0) {
            res.send(result);
        }else {
            res.send('信息不存在',403);
        }
    });
});

/**
 * 更新
 */
router.put('/admin/edit', (req,res,next) => {
    controller.edit(req.body).then(result => {
        if(result > 0) {
            res.send('ok');
        }else {
            res.send(result,403);
        }
    });
});

/**
 * 获取列表
 */
router.get('/admin/getlist', function(req, res, next) {
    controller.getlist(req,res,next).then(data => {
        let results = {
            list: data,
            total: data.length
        }
        res.send(results);
    }).catch(err => {
        res.send(err);
    });
});

module.exports = router;