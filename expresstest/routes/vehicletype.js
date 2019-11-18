var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

/* GET vehicle listing. */
router.get('/', function(req, res, next) {
  db().all('SELECT * FROM vehicletype', function(err, rows) {
    let result = {};
    rows.forEach((row) => {
      console.log("TEST",row);
      result += '{' + row.vtname + ', ' + row.features + ', ' + row.wrate + ', ' +
      row.drate + ', ' + row.hrate + ', ' + row.wirate + ', ' + row.dirate + ', ' + row.hirate + ', ' +
      row.krate + '}';
    });

    res.send(result);
  });
});

module.exports = router;
