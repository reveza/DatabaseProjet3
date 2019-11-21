var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

/* GET vehicle listing. */
router.get('/', function(req, res, next) {
  db().all('SELECT * FROM vehicle ORDER BY city, location, vtname', function(err, rows) {
    res.send(rows);
  });
});

router.post('/available', function (req, res, next) {
  let count = 'SELECT COUNT(*) FROM vehicle';
    if (req.body.location) {
      count += ' WHERE location = "' + req.body.location + '"';
    }
    if (req.body.vtname) {
      if (req.body.location) {
        count += ' AND vtname = "' + req.body.vtname + '"';
      } else {
        count += ' WHERE vtname = "' + req.body.vtname + '"';
      }
    }

  if (req.body.fromDate && req.body.toDate) {
      let rentedvehicles = 'SELECT COUNT(vid) FROM rentals WHERE fromDate >= DATE(' + [req.body.fromDate] +
       ') AND toDate <= DATE(' + [req.body.toDate] + ')';
        rentedvehicles = count - rentedvehicles;
    }
  db().all(count, function(err, rows) {
    let count_answer = rows[0]["COUNT(*)"].toString();
    res.send(count_answer);
  });
});

router.post('/view_available', function (req, res, next) {
    let sql = 'SELECT vid FROM vehicle';
      if (req.body.location) {
        sql += ' WHERE location = "' + req.body.location + '"';
      }
      if (req.body.vtname) {
        if (req.body.location) {
          sql += ' AND vtname = "' + req.body.vtname + '"';
        } else {
          sql += ' WHERE vtname = "' + req.body.vtname + '"';
        }
      }

      if (req.body.fromDate && req.body.toDate) {
          let rentedvehicles = 'SELECT vid FROM rentals WHERE fromDate >= DATE(' + [req.body.fromDate] +
           ') AND toDate <= DATE(' + [req.body.toDate] + ')';
          sql = sql + ' EXCEPT ' + rentedvehicles;
        }
        sql = 'SELECT * FROM vehicle WHERE vid IN (' + sql + ')';
    sql += " ORDER BY city, location, vtname";
    console.log(sql);
    db().all(sql, function(err, rows) {
      res.send(rows);
    });
});

module.exports = router;
