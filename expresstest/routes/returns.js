var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

/* GET users listing. */
router.post('/', function(req, res, next) {
  db().run(
    `INSERT INTO returns (rid, date, time, odometer, fullTank, value)` +
    `VALUES (?, ?, ?, ?, ?, ?)`, [req.body.rid, req.body.date, req.body.time, req.body.odometer, req.body.fullTank, req.body.value], function(err) { 
      if (err) {
        res.send(err.message);
      }
    });
});

router.post('/daily', function(req, res, next) {
  // db().run();
});

router.post('/branch', function(req, res, next) {
  // db().run();
});

router.get('/', function(req, res, next) {
  db().all('SELECT * FROM returns;', function(err, rows) {
    res.send(rows);
  });
});

module.exports = router;
