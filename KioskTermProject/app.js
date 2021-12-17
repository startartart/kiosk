var express = require('express')
var path = require('path');
var usersRouter = require('./routes/index');
var sequelize = require('./models/index').sequelize;
const bodyParser = require('body-parser');

var app = express()
sequelize.sync();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var indexRouter = require('./routes/index');
app.use('/', indexRouter);
var MenuRouter = require('./routes/menu');
app.use('/', MenuRouter);

app.set('view engine', 'ejs'); //'ejs'탬플릿을 엔진으로 한다.
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);

app.listen(3000, function() {
    console.log("start! express server on port 3000")
})

module.exports = app;