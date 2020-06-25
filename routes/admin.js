var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin');
var custom = require('../controllers/custom');
let logs = require('../controllers/adminlogs');
var jwt = require('jsonwebtoken');
/* GET users listing. */

/**
 * 后台登录
 */
router.post('/api/Login',(req,res,next) => {
    let {username,pass} = req.body;
    if(custom.isEmpty(username) || custom.isEmpty(pass)) res.send('用户名或密码错误',500);
    controller.login(req.body).then(data => {
        if(data.id > 0){
            let tokenInfo = {
                iss: '鹅这个彪崽',//签发人
                id:data.id,
                username:data.username
            }
            let token = jwt.sign(tokenInfo,"limenglong",{expiresIn:3600});
            global.admin = data.username;
            logs.inlogs('登录');
            res.json({
                token: token
            },200);
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
router.post('/api/admin/register',(req,res,next) => {
    let {username,password,name,qx} = req.body;
    if(custom.isEmpty(username) || custom.isEmpty(password)) res.send('用户名或密码不能为空',400);
    //验证用户名是否存在并插入
    controller.thenAdd(req.body).then(result => {
        if(result.type == 'exist') {
            res.send('用户名已存在',403);
        }else {
            logs.inlogs('新增管理员' + username);
            res.send('ok');
        }
    })
});

/**
 * 编辑或查看
 */
router.get('/api/admin/getview/:id',(req,res,next) => {
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
router.put('/api/admin/edit', (req,res,next) => {
    controller.edit(req.body).then(result => {
        if(result > 0) {
            logs.inlogs('修改' + req.body.username + '管理员信息')
            res.send('ok');
        }else {
            res.send(result,403);
        }
    });
});

/**
 * 获取列表
 */
router.get('/api/admin/getlist', function(req, res, next) {
    controller.getlist(req.query).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    });
});

router.delete('/api/admin/delete',function (req,res,next) {
    controller.delete(req.query.id).then(result => {
        if(result > 0) {
            logs.inlogs('删除管理员');
            res.send('ok');
        }else {
            res.send(result,403);
        }
    })
})

module.exports = router;