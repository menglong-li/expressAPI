let express = require('express')
let router = express.Router();
let controller = require('../controllers/product');

router.get('/api/product/getlist',controller.getlist);
router.post('/api/product/add',controller.add);

module.exports = router;