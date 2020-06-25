let express = require('express')
let router = express.Router();
let controller = require('../controllers/productType');

router.get('/api/producttype/getlist',controller.getlist);

module.exports = router;