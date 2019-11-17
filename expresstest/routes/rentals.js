var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

/* GET users listing. */
router.post('/', function(req, res, next) {
  db().run(
    `INSERT INTO rentals (rid, vid, cellphone, fromDate, fromTime, toDate, toTime, odometer, cardName, cardNo, expDate, confNo)` +
    `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [req.body.rid, req.body.vid, req.body.cellphone, req.body.fromDate, req.body.fromTime, req.body.toDate,
      req.body.toTime, req.body.odometer, req.body.cardName, req.body.cardNo, req.body.expDate, req.body.confNo], function(err) {
      if (err) {
        return console.log(err.message);
      }
    });
});

router.get('/', function(req, res, next) {
  db().all('SELECT * FROM rentals;', function(err, rows) {
    res.send(rows);
  });
});

module.exports = router;
