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

// DAILY RETURN REPORT

//The entries are grouped by branch, and within each branch, the entries are grouped by vehicle category.
router.get('/daily/info', function(req, res, next) {
  let sql = 'SELECT DISTINCT v.location, v.vtname ' +
  'FROM returns r, vehicle v WHERE r.vid = v.vid AND ' +
  'date(r.date) = date("now") ORDER BY v.location, v.vtname';
  db().all(sql, function(err, rows) {
    res.send(rows);
  });
});

//the number of vehicles returned per category
router.post('/daily/category', function(req, res, next) {
  let sql = 'SELECT DISTINCT v.vtname, COUNT(*) FROM returns r, vehicle v WHERE ' +
  'r.vid = v.vid AND date(r.date) = date("now") GROUP BY v.vtname';
  db().all(sql, function(err, rows) {
    res.send(rows);
  });
});

//the number of rentals at each branch
router.post('/daily/branch', function(req, res, next) {
  let sql = 'SELECT DISTINCT v.location, COUNT(*) FROM returns r, vehicle v WHERE ' +
  'r.vid = v.vid AND date(r.fromDate) <= date("now") <= date(r.toDate) GROUP BY v.location';
  db().all(sql, function(err, rows) {
    res.send(rows);
  });
});

//the total number of new rentals across the whole company
router.post('/daily/new', function(req, res, next) {
  let sql = 'SELECT COUNT(*) FROM returns WHERE date(fromDate) = date("now");'
  db().all(sql, function(err, rows) {
    res.send(rows);
  });
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
