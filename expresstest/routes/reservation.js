var express = require('express');
var router = express.Router();
let db = require('../db').getDb;
/* GET confirmation number. */

router.post('/checkAvailibility', function(req, res, next) {
  let sql = 'SELECT COUNT(*) FROM rentals WHERE vid = ' + [req.body.vid]
  + ' AND ( (toDate <= "' + req.body.toDate + '"'
  + ' AND fromDate >= "' + req.body.fromDate + '")'
  + ' OR (toDate <= "' + req.body.toDate + '"'
  + ' AND toDate >= "' + req.body.fromDate + '")'
  + ' OR (fromDate <= "' + req.body.toDate + '"'
  + ' AND fromDate >= "' + req.body.fromDate + '"))';
  db().all(sql, function(err, rows){
    if (rows[0]["COUNT(*)"] == 0){
      res.send("Available");
    } else{
      res.send("Not Available");
  }});
});

router.post('/test', function(req, res,next) {
  let result = {confNo: null};
  db().run(
    'INSERT INTO reservation (vid, cellphone, fromDate, fromTime, '
        + 'toDate, toTime)' + ' VALUES(?, ?, ?, ?, ?, ?)',
        [req.body.vid, req.body.cellphone, req.body.fromDate, req.body.fromTime,
        req.body.toDate, req.body.toTime], function(err, rows) {
          if (err) {
            return console.log(err.message);
          } else {
            result['confNo'] = this.lastID;
            res.send(result);
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
