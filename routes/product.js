let express = require('express')
let router = express.Router();
let controller = require('../controllers/product');
let uploadimg = require('../controllers/upload');


router.post('/api/product/uploadimg',uploadimg.img,controller.uploadimg);

module.exports = router;