var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

router.post('/check', function(req, res, next){
  // let sql = 'EXISTS(SELECT * FROM customer WHERE cellphone = ' + [req.body.cellphone] + ')';
  let sql = 'SELECT COUNT(*) FROM customer WHERE cellphone = ' + [req.body.cellphone];
  db().all(sql,
  function(err, rows) {
    if (rows[0]["COUNT(*)"] == 0){
      // console.log("DOESN'T EXIST", rows[0]["COUNT(*)"]);
      res.send("NOT EXISTS");

    } else{
      // console.log("EXISTS", rows[0]["COUNT(*)"]);
      res.send("exists");
    }
  });
});

router.post('/test', function(req, res, next) {
  let sqlINSERT = 'INSERT OR IGNORE INTO customer(cellphone, name, address, dlicense)' + ' VALUES(?,?,?,?)';
  db().all(
    sqlINSERT, [req.body.cellphone, req.body.name, req.body.address, req.body.dlicense], function(err, rows){
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
