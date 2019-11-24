var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

/* GET home page. */
router.get('/', function(req, res, next) {
  db().all('SELECT name FROM  sqlite_master WHERE type ="table" AND name NOT LIKE "sqlite_%";', function(err, rows) {
    res.send(rows);
  });
});

router.post('/update', function(req, res, next) {
  sql = 'UPDATE ' + req.body.tableName + ' SET ' + req.body.update + ' WHERE ' + req.body.primary_key;
  db().all(sql, function(err, rows) {
    res.send(rows);
  });
});

router.post('/delete', function(req, res, next) {
  console.log(req.body.tableName, " ", req.body.delete);
  sql = 'DELETE FROM ' + req.body.tableName + ' WHERE ' + req.body.delete;
  db().run(sql, function(err, rows) {
    res.send(rows);
  });
});

router.post('/insert', function(req, res, next) {
  sql = 'INSERT INTO ' + req.body.tableName + req.body.columns + ' VALUES ' + req.body.values;
  db().run(sql, function(err, rows) {
    res.send(rows);
  });
});

module.exports = router;
