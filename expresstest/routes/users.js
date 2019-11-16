var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

/* GET users listing. */
router.get('/', function(req, res, next) {
  db().all('SELECT rowid AS id, info FROM lorem', function(err, rows) {
    let result = {};
    rows.forEach((row) => {
      result += '{' + row.id + ': ' + row.info + '}';
    });

    res.send([1,2,3]);
  });
});

module.exports = router;
