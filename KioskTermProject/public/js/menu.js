var express = require('express');
var router = express.Router();
var fs = require('fs');
var app = express();
const path = require('path');
const { Food } = require('../models');
const { Basket } = require('../models');
const { Op } = require('sequelize');

function test() {
  var obj_length = document.getElementsByName("check").length;
  for (var i=0; i<obj_length; i++) {
    if (document.getElementsByName("check")[i].checked == true) {
      alert(document.getElementsByName("check")[i].value);
    // Basket.destroy({
    //   where: { id: document.getElementsByName("fruit")[i].value}
    // });
    }
  }
}