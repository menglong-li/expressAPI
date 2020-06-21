let express = require('express');
let router = express.Router();
let controllers = require('../controllers/adminlogs')

router.get('/getlist',(req,res,next) => {
    controllers.getList(req.query).then(result => {
        res.send(result);
    });
});

module.exports = router;