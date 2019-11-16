var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

/* GET users listing. */
router.get('/', function(req, res, next) {
  db().all('SELECT rowid AS id, info FROM lorem', function(err, rows) {
    let result = "";
    for(var row of rows) {
      result += row.id + ': ' + row.info + '<br/>';
    }
    res.send(result);
  });
});

module.exports = router;
