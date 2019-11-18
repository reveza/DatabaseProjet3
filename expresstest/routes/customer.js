var express = require('express');
var router = express.Router();
let db = require('../db').getDb;

/* Add a customer to Customer Table */
router.get('/', function(req, res, next) {
  db().run(
    'INSERT INTO customer(cellphone, name)'
    + ' VALUES(?,?)', [req.body.cellphone, req.body.name])
});

module.exports = router;
