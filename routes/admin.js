var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin');
/* GET users listing. */
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
