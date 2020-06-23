var express = require('express');
var router = express.Router();
let controller = require('../controllers/users');

/* GET users listing. */
router.get('/api/users/getlist', controller.getlist);

router.put('/api/users/ice',controller.ice);

router.put('/api/users/thaw',controller.thaw);

router.delete('/api/users/delete',controller.delete);

module.exports = router;
