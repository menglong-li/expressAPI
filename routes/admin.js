var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin');
var custom = require('../controllers/custom');
var jwt = require('jsonwebtoken');
/* GET users listing. */

router.get('/login',(req,res,next) => {
    let {username,pass} = req.query;
    if(custom.isEmpty(username) || custom.isEmpty(pass)) res.send('用户名或密码错误',500);
    controller.login(req.query).then(data => {
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
            res.send('用户名或密码错误',500);
        }
    }).catch(err => {
        res.send('用户名或密码错误',500);
    })
})

router.get('/setting/getlist', function(req, res, next) {
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