var express = require('express');
var router = express.Router();
var controller = require('../controllers/webset');

router.get('/',(req,res,next) => {
    controller.getView().then(result=> {
        res.send(result);
    })
});

router.put('/put',(req,res,next) => {
        controller.put(req,res,next).then(result=> {
        if(result > 0) {
            res.send('操作成功');
        }else {
            res.send('操作失败',403);
        }
    })
})

module.exports = router;