var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

/* GET vehicle listing. */
router.get('/', function(req, res, next) {
  db().all('SELECT * FROM vehicle', function(err, rows) {
    res.send(rows);
  });
});

module.exports = router;
