var express = require('express');
var router = express.Router();
var dbc = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  const sql = 'select * from users';
  dbc.query(sql).then(data => {
    console.log(data);
    res.render('index', { title: JSON.stringify(data) });
  })
  
});

module.exports = router;
