'use strict';

var express = require('express');
var router = express.Router();
var url = require('url');
var qs = require('querystring');
var SQS = require('../models/sqs.js');
var mongoose = require('mongoose');


router.post('/saveScore', (req, res, next) => {
  var data = req.body;
  let sEntity = new SQS.score(data);;
  sEntity.save((err, doc) => {
    let resObj = {};
    if (err) {
      resObj = {
        ok: 0,
        result: err
      }
    } else {
      resObj = {
        ok: 1,
        result: doc
      }
    }
    res.send(resObj);
  })
})


router.get('/searchScore', (req, res, next) => {
  let qsurl = url.parse(req.url).query;
  let id = qs.parse(qsurl)['id'];
  let resObj = {};
  SQS.score.find({
    'id': id
  }, (err, doc) => {
    if (err) {
      resObj.ok = 0;
      resObj.result = 'something error';
    } else {
      resObj.ok = 1;
      resObj.result = doc;
    }
    res.send(resObj);
  })

})


router.get('/signup', function(req, res, next) {
  var qsurl = url.parse(req.url).query;
  var username = qs.parse(qsurl)['username'];
  var em = qs.parse(qsurl)['em'];
  var pw = qs.parse(qsurl)['pw'];
  var ic = qs.parse(qsurl)['ic'];
  // pw = encodePW(em,pw);

  if (ic) {
    Ezl.ic.findOne({
      value: ic
    }, (err, d) => {
      if (err) {
        console.log('Find Ic [' + ic + '] in DB occurs Error:' + err);
      } else {
        if (d) {
          var tEntity = new Ezl.account({
            'account': em,
            'password': pw,
            'role': 'manager',
            'name': username
          });
          tEntity.save((err, doc) => {
            if (err) {
              let obj = {
                ok: 0,
                result: err
              }
              res.send(obj);
            } else {
              let obj = {
                ok: 1,
                result: doc
              }
              res.send(obj);
              Ezl.ic.deleteOne({
                value: ic
              }, (err) => {
                if (err) {
                  console.log('ic[' + ic + '] delete error:' + err)
                }
              });
            }
          });
        } else {
          console.log('Invitation_code [' + ic + '] doesn\'t exsist.');
          res.send({
            "ok": 0,
            "result": "Invitation_code ['+ic+'] doesn\'t exsist."
          })
        }
      }
    })
  } else {
    var sEntity = new Ezl.account({
      account: em,
      password: pw,
      role: 'normal',
      name: username
    });
    sEntity.save((err, doc) => {
      if (err) {
        let obj = {
          ok: 0,
          result: err
        }
        res.send(obj)
      } else {
        let obj = {
          ok: 1,
          result: doc
        }
        res.send(obj)
      }
    })
  }
});



router.get('/login', function(req, res, next) {
  var qsurl = url.parse(req.url).query;
  var em = qs.parse(qsurl)['em'];
  var pw = qs.parse(qsurl)['pw'];
  var r = qs.parse(qsurl)['isT'];
  // pw = encodePW(em,pw);
  if (r == 'true') {
    Ezl.teacher.findOne({
      account: em
    }, (err, d) => {
      var result;
      if (d && d.password == pw) {
        result = {
          "status": 'ok',
          "data": d
        };
      } else {
        result = {
          "status": 'err'
        };
      }
      res.send(result);
    })
  } else {
    Ezl.student.findOne({
      account: em
    }, (err, d) => {
      var result;
      if (d && d.password == pw) {
        result = {
          "status": 'ok',
          "data": d
        };
      } else {
        result = {
          "status": 'err'
        };
      }
      res.send(result);
    })
  }
});
module.exports = router;
