let express = require('express')
let router = express.Router();
let controller = require('../controllers/product');

router.get('/api/product/getlist',controller.getlist);
router.get('/api/product/getdownlist',controller.getdownlist);
router.get('/api/product/getview/:id',controller.getview);
router.post('/api/product/add',controller.add);
router.put('/api/product/down',controller.down);
router.put('/api/product/up',controller.up);
router.put('/api/product/edit',controller.edit);
router.delete('/api/product/delete',controller.delete);

module.exports = router;