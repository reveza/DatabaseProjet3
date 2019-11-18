var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

/* GET vehicle listing. */
router.get('/', function(req, res, next) {
  db().all('SELECT * FROM vehicle', function(err, rows) {
    let result = {};
    rows.forEach((row) => {
      console.log("TEST",row);
      result += '{' + row.vid + ', ' + row.vlicense + ', ' + row.make + ', ' + row.model +
      ', ' + row.year + ', ' + row.color + ', ' + row.odometer + ', ' + row.status + ', ' +
      row.vtname + ', ' + row.location + ', ' + row.city + '}';
    });

    res.send(result);
  });
});

module.exports = router;
