var express = require('express');
var router = express.Router();
let db = require('../db').getDb;
confNumber = 1;
/* GET confirmation number. */

router.get('/', function(req, res,next) {
  // confNumber = db().run('SELECT * FROM reservation') + 1;
  res.send("1");
})


// router.post('/reservation', function(req, res,next) {
//   db().run(
//     'INSERT INTO reservation (confNo, vtname, cellphone, fromDate, fromTime, '
//     + 'toDate, toTime)' + ' VALUES(confNumber, ?, ?, ?, ?, ?, ?)',
//     [req.body.vtname, req.body.cellphone, req.body.fromDate, req.body.fromTime,
//     req.body.toDate, req.body.toTime], function(err) {
//     if (err) {
//       return console.log(err.message);
//     }}
//   );
// });




module.exports = router;
