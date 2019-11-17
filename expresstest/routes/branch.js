var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

/* GET branch listing. */
router.get('/', function(req, res, next) {
  db().all('SELECT * FROM branch', function(err, rows) {
    let result = {};
    rows.forEach((row) => {
      console.log("TEST",row);
      result += '{' + row.location + ',' + row.city + '}, ';
    });

    res.send(result);
  });
});

module.exports = router;
