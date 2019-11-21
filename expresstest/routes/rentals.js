var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

/* GET users listing. */
router.post('/', function(req, res, next) {
  let result = {rid: null, err: null};
  db().run(
    `INSERT INTO rentals (vid, cellphone, fromDate, fromTime, toDate, toTime, odometer, cardName, cardNo, expDate, confNo)` +
    `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [req.body.vid, req.body.cellphone, req.body.fromDate, req.body.fromTime, req.body.toDate,
      req.body.toTime, req.body.odometer, req.body.cardName, req.body.cardNo, req.body.expDate, req.body.confNo], function(err, rows) {
        if (err) {
          result['err'] = err.message;
        } else {
          result['rid'] = this.lastID;
        }
        res.send(result);
    });
});

router.get('/', function(req, res, next) {
  db().all('SELECT * FROM rentals;', function(err, rows) {
    res.send(rows);
  });
});

// // Daily Rental Report
// router.post('/daily', function(req, res, next) {
//   let sql = 'SELECT * FROM rentals r, vehicle v WHERE date(r.fromDate) <= date("now") <= date(r.toDate) GROUP BY v.location';
//   db().all(sql, function(err, rows) {
//     console.log(rows);
//   });
// });

router.get('/daily', function(req, res, next) {
  let sql = 'SELECT DISTINCT v.location, v.vtname, COUNT(v.vtname) FROM rentals r, vehicle v WHERE r.vid = v.vid AND date(r.fromDate) <= date("now") <= date(r.toDate) GROUP BY v.location';
  db().all(sql, function(err, rows) {
    console.log(rows);
    res.send(rows);
  });
});

// Daily Rental by Branch Report
router.post('/branch', function(req, res, next) {
  console.log("branch id", req.body.bid);
  db().all('SELECT * FROM rentals;', function(err, rows) {
    console.log("branch id", req.body.bid);
    if (err) {
      return console.log(err.message);
    }
  });
});

module.exports = router;
