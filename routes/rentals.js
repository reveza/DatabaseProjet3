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

// DAILY RENTAL REPORT

//The entries are grouped by branch, and within each branch, the entries are grouped by vehicle category.
router.post('/daily/information', function(req, res, next) {
  let sql = 'SELECT DISTINCT v.location, v.vtname ' +
  'FROM rentals r, vehicle v WHERE r.vid = v.vid AND ' +
  'date(r.fromDate) <= date("now") <= date(r.toDate) ORDER BY v.location, v.vtname';
  db().all(sql, function(err, rows) {
    res.send(rows);
  });
});

//The report also displays the number of vehicles rented per category (e.g., 5 sedan rentals, 2 SUV rentals, etc.)
router.post('/daily/category', function(req, res, next) {
  let sql = 'SELECT DISTINCT v.vtname, COUNT(*) FROM rentals r, vehicle v WHERE ' +
  'r.vid = v.vid AND date(r.fromDate) <= date("now") <= date(r.toDate) GROUP BY v.vtname';
  db().all(sql, function(err, rows) {
    res.send(rows);
  });
});

//the number of rentals at each branch
router.post('/daily/branch', function(req, res, next) {
  let sql = 'SELECT DISTINCT v.location, COUNT(*) FROM rentals r, vehicle v WHERE ' +
  'r.vid = v.vid AND date(r.fromDate) <= date("now") <= date(r.toDate) GROUP BY v.location';
  db().all(sql, function(err, rows) {
    res.send(rows);
  });
});

//the total number of new rentals across the whole company
router.post('/daily/new', function(req, res, next) {
  let sql = 'SELECT COUNT(*) FROM rentals WHERE date(fromDate) = date("now");'
  db().all(sql, function(err, rows) {
    res.send(rows);
  });
});

// DAILY RENTAL BY BRANCH REPORT

//The entries are grouped by branch, and within each branch, the entries are grouped by vehicle category.
router.post('/branch/info', function(req, res, next) {
  let sql = 'SELECT DISTINCT v.vtname ' +
  'FROM rentals r, vehicle v WHERE r.vid = v.vid AND v.location = "' + req.body.name + 
  '" AND date(r.fromDate) <= date("now") <= date(r.toDate) ORDER BY v.vtname';
  db().all(sql, function(err, rows) {
    res.send(rows);
  });
});

//The report also displays the number of vehicles rented per category (e.g., 5 sedan rentals, 2 SUV rentals, etc.)
router.post('/branch/category', function(req, res, next) {
  let sql = 'SELECT DISTINCT v.vtname, COUNT(*) FROM rentals r, vehicle v WHERE v.location = "' + req.body.name +
  '" AND r.vid = v.vid AND date(r.fromDate) <= date("now") <= date(r.toDate) GROUP BY v.vtname';
  db().all(sql, function(err, rows) {
    res.send(rows);
  });
});

//the number of rentals at the branch
router.post('/branch/branch', function(req, res, next) {
  let sql = 'SELECT DISTINCT COUNT(*) FROM rentals r, vehicle v WHERE' + 
  ' r.vid = v.vid AND date(r.fromDate) <= date("now") <= date(r.toDate) AND v.location = "' + req.body.name + '";';
  db().all(sql, function(err, rows) {
    res.send(rows);
  });
});

//the total number of new rentals across the whole company
router.post('/branch/new', function(req, res, next) {
  let sql = 'SELECT DISTINCT COUNT(*) FROM rentals r, vehicle v WHERE r.vid = v.vid AND date(r.fromDate) = date("now") AND v.location = "' +
  req.body.name + '";';
  db().all(sql, function(err, rows) {
    res.send(rows);
  });
});

module.exports = router;
