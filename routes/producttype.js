let express = require('express')
let router = express.Router();
let controller = require('../controllers/productType');

router.get('/api/producttype/getlist',controller.getlist);

router.post('/api/producttype/add',controller.add);

router.get('/api/producttype/getview/:id',controller.getview);

router.put('/api/producttype/edit',controller.edit);

router.delete('/api/producttype/delete',controller.delete);

module.exports = router;