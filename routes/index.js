'use strict';

var express = require('express');
var router = express.Router();
var SQS = require('../models/sqs.js');
var mongoose = require('mongoose');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('intro', { title: 'SQS - Scores Query System' });
});

router.get('/back', function(req, res, next) {
  res.render('index', { title: 'SQS - Scores Query System' });
});

router.get('/search', function(req, res, next) {
  res.render('search', { title: 'SQS Search' });
});

module.exports = router;
