var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

/* GET users listing. */
router.post('/', function(req, res, next) {

  db().run(
    `INSERT INTO rentals (vid, cellphone, fromDate, fromTime, toDate, toTime, odometer, cardName, cardNo, expDate, confNo)` +
    `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [req.body.vid, req.body.cellphone, req.body.fromDate, req.body.fromTime, req.body.toDate,
      req.body.toTime, req.body.odometer, req.body.cardName, req.body.cardNo, req.body.expDate, req.body.confNo], function(err) {
        if (err) {
          res.send(err.message);
        }
    });
});

router.get('/', function(req, res, next) {
  db().all('SELECT * FROM rentals;', function(err, rows) {
    res.send(rows);
  });
});

// Daily Rental Report
router.post('/daily', function(req, res, next) {
  let daily_vid = [];
  let new_rental = 0;
  const currentDate = new Date();
  db().all('SELECT fromDate, toDate, vid FROM rentals;', function(err, rows) {
    rows.forEach( row => {
      var from_date = new Date(row.fromDate);
      var to_date =  new Date(row.toDate);

      if (currentDate > from_date && currentDate < to_date ){
        daily_vid += vid;
      } else if (currentDate == from_date) {
        //rental made today is considered a new rental
        new_rental += 1;
      }
    });
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
