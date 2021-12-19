var express = require('express');
var router = express.Router();
var fs = require('fs');
var app = express();
const path = require('path');
const multer = require('multer');
const { Food, Basket } = require('../models');
const { INTEGER } = require('sequelize/dist');
var cron = require('node-cron');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/pictures/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
    }
  })
  var upload = multer({ stoarge : storage})

router.get('/', function(req, res, next) {
  cron.schedule('1 * * * * *', function() {
    console.log('매 5초 마다 실행');
})
  Basket.destroy({ 
    where: {},
    truncate: true
  });
    res.render('index', { title: 'Express' });
  });

  router.get('/admin', function(req, res, next) {
    res.render('admin');
  });

  router.get('/input', function(req, res, next) {
    res.render('input');
  });
  router.post('/input',function(req,res) {
    var name = req.body.name;
    var what = req.body.what;
    var single_price = req.body.single_price;
    var set_price = req.body.set_price;
    var preference = req.body.preference;
    var mark = req.body.mark;
    // var price_picture = `/pictures/${req.file.filename}`;
    Food.create({
        name: name,
        what: what,
        // picture: price_picture,
        single_price: single_price,
        set_price: set_price,
        preference: preference,
        mark: mark
    })
    res.redirect('/');
  });
  router.get('/info', function(req, res, next) {
    res.render('info', { title: 'Express' });
  });
  router.get('/finish', function(req, res, next) {
    res.render('info', { title: 'Express' });
  });
  router.get('/coll', function(req, res, next) {
    res.render('coll', { title: 'Express' });
  });

  router.get('/status', function(req, res, next) {
    Food.findAll({
      order: [['preference', 'DESC']]
    })
    .then(result => {
      const sum2 = result.length;
      var sum = 0;
      for (var i=0; i<sum2;i++) {
        value = parseInt(result[i].single_price) * parseInt(result[i].preference);
        sum += value;
      }
      console.log(sum);
      console.log(sum2);
      res.render('status', {
        foods: result,
        count: 1,
        total_sales: sum,
        total_num: sum2,
        sig: "SIG"
      })
    })
  });

  router.get('/input', function(req, res, next) {
    res.render('input', { title: 'Express' });
  });

  router.get('/signature', function(req, res, next) {
    let id = req.query.id;
    Food.update({mark: "signature"}, {where: {id: id}})
    .then(result => {
      res.render('admin');
    })
  });

  router.get('/cancel', function(req, res, next) {
    let id = req.query.id;
    Food.update({mark: ""}, {where: {id: id}})
    .then(result => {
      res.render('admin');
    })
  });

  module.exports = router;