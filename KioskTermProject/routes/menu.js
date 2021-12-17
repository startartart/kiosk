var express = require('express');
var router = express.Router();
var fs = require('fs');
var app = express();
const path = require('path');
const { Food } = require('../models');
const { Basket } = require('../models');
const { Op } = require('sequelize');
const { runInNewContext } = require('vm');

router.get('/menu', function(req, res, next) {
    let id = req.query.mode;
    
    Basket.findAll()
    .then( result2 => {
      var result_sum = result2.reduce((sum, value) => {
        return sum + value.price * value.quantity;
      }, 0);
      console.log(result_sum);
      if (id == 'best') {
        Food.findAll({
            where: {
                preference : { [Op.gt]: 100 }
            }
          }).then( result => {
            res.render('menu', {
              foods : result,
              mode : id,
              baskets : result2,
              sum : result_sum
            })
          })
    }
    else if (id == 'signature') {
        Food.findAll({
            where: {
              mark : id
            },
           
          }).then( result => {
            res.render('menu', {
              foods : result,
              mode : id,
              baskets : result2,
              sum : result_sum
            })
          })
    }
    else if (id == 'burger') {
        Food.findAll({
            where: {
              what : 'B'
            }
          }).then( result => {
            res.render('menu', {
              foods : result,
              mode : id,
              baskets : result2,
              sum : result_sum
            })
          })
    } 
    else if (id == 'side') {
        Food.findAll({
            where: {
              what : 'S'
            }
          }).then( result => {
            res.render('menu', {
              foods : result,
              mode : id,
              baskets : result2,
              sum : result_sum
            })
          })
    } 
    else if (id == 'drink') {
        Food.findAll({
            where: {
              what : 'J'
            }
          }).then( result => {
            res.render('menu', {
              foods : result,
              mode : id,
              baskets : result2,
              sum : result_sum
            })
          })
    } 
    else if (id == 'dessert') {
        Food.findAll({
            where: {
              what : 'D'
            }
          }).then( result => {
            res.render('menu', {
              foods : result,
              mode : id,
              baskets : result2,
              sum : result_sum
            })
          })
        }
      })  
    });

router.get('/choice', function(req, res, next) {
  let list = req.query.list;
  let name = req.query.name;
  let price = req.query.price;
  
  Basket.create({
     name: name,
     price: price,
     quantity: 1  
  }).catch((err) => {
    Basket.findAll({
      where: {
        name : name
      }
      }).then( result => {
        if (result[0].name == name) {
          Basket.update({quantity: result[0].quantity+1}, {
            where: {name: name}})
        } 
      })
  });
  res.redirect('/menu?mode=' + list);

});

router.get('/purchase', function(req, res, next) {
  Basket.findAll()
    .then( result2 => {
      var result_sum = result2.reduce((sum, value) => {
        return sum + value.price * value.quantity;
      }, 0);
      res.render('purchase', {
        baskets : result2,
        sum : result_sum
      });
    });
})

router.post('/purchase', function(req, res, next) {
  let checked = req.body.menu_check;
  for (let num of checked) {
    Basket.findAll({
      attributes: ['quantity', 'name'],
      where: { id : num }
    }).then ( result => {
      for (let call of result) {
          let count = call.name;
          Food.findAll({
            attributes: ['preference'],
            where: { name : count}
              }).then ( result2 => { 
                for (let call2 of result2) {
                  let count2 = call2.preference
                  Food.update({preference: count2 + call.quantity}, {
                    where: {name : call.name}
                  })
                }
              })
      }
    })
  }
  res.render('finish');
})

router.post('/menu', function(req, res, next) {
  let checked = req.body.menu_check;
  for (let num of checked) {
    Basket.destroy({
      where: { id: num }
    })
  }
  let id = req.query.mode;
    
    Basket.findAll()
    .then( result2 => {
      var result_sum = result2.reduce((sum, value) => {
        return sum + value.price * value.quantity;
      }, 0);
      console.log(result_sum);
      if (id == 'best') {
        Food.findAll({
            where: {
                preference : { [Op.gt]: 100 }
            }
          }).then( result => {
            res.render('menu', {
              foods : result,
              mode : id,
              baskets : result2,
              sum : result_sum
            })
          })
    } 
    else if (id == 'signature') {
        Food.findAll({
            where: {
              mark : id
            },
           
          }).then( result => {
            res.render('menu', {
              foods : result,
              mode : id,
              baskets : result2,
              sum : result_sum
            })
          })
    } 
    else if (id == 'burger') {
        Food.findAll({
            where: {
              what : 'B'
            }
          }).then( result => {
            res.render('menu', {
              foods : result,
              mode : id,
              baskets : result2,
              sum : result_sum
            })
          })
    } 
    else if (id == 'side') {
        Food.findAll({
            where: {
              what : 'S'
            }
          }).then( result => {
            res.render('menu', {
              foods : result,
              mode : id,
              baskets : result2,
              sum : result_sum
            })
          })
    } 
    else if (id == 'drink') {
        Food.findAll({
            where: {
              what : 'J'
            }
          }).then( result => {
            res.render('menu', {
              foods : result,
              mode : id,
              baskets : result2,
              sum : result_sum
            })
          })
    } 
    else if (id == 'dessert') {
        Food.findAll({
            where: {
              what : 'D'
            }
          }).then( result => {
            res.render('menu', {
              foods : result,
              mode : id,
              baskets : result2,
              sum : result_sum
            })
          })
    }
    })  
  });
module.exports = router;