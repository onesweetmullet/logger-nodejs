var express = require('express');
var router = express.Router();
var objectToMarkdownTable = require('../lib/objectToMarkdownTable.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('marked', { title: 'Express' });
});

module.exports = router;
