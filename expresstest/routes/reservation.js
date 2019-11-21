var express = require('express');
var router = express.Router();
let db = require('../db').getDb;
/* GET confirmation number. */

router.post('/test', function(req, res,next) {
  console.log("done");
  confNumber = db().run('SELECT COUNT(*) FROM reservation') + 1;
  console.log(confNumber);
  // res.sendStatus(200);
  db().run(
    'INSERT INTO reservation (vtname, cellphone, fromDate, fromTime, '
        + 'toDate, toTime)' + ' VALUES(?, ?, ?, ?, ?, ?)',
        [req.body.vtname, req.body.cellphone, req.body.fromDate, req.body.fromTime,
        req.body.toDate, req.body.toTime], function(err, rows) {
          if (err) {
            return console.log(err.message);
          } else {
            return console.log("last row id: " + this.lastID)
          }
        }
  );
});

router.get('/', function(req, res, next) {
  db().all('SELECT * FROM reservation;', function(err, rows) {
    res.send(rows);
  });
});


module.exports = router;
