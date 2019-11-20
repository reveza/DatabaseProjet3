var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

router.post('/test', function(req, res, next) {
  let sqlINSERT = 'INSERT OR IGNORE INTO customer(cellphone, name)' + ' VALUES(?,?)';
  db().all(
    sqlINSERT, [req.body.cellphone, req.body.name], function(err, rows){
      if (err) {
        return console.log(err.message);
      } else {
        return console.log("last row id: " + [req.body.cellphone] + ',' + [req.body.name]);
      }
    })
  });

router.get('/', function(req, res, next) {
  db().all('SELECT * FROM customer;', function(err, rows) {
    res.send(rows)
  });
});

module.exports = router;
