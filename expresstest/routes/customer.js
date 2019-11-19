var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

/* GET branch listing. */
router.get('/', function(req, res, next) {
  db().all('SELECT * FROM customer', function(err, rows) {
    res.send(rows);
  });
});

module.exports = router;

