var express = require('express')
var path = require('path');
var usersRouter = require('./routes/index');
var sequelize = require('./models/index').sequelize;
const bodyParser = require('body-parser');
var cron = require('node-cron');

var app = express()
sequelize.sync();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var indexRouter = require('./routes/index');
app.use('/', indexRouter);
var MenuRouter = require('./routes/menu');
app.use('/', MenuRouter);

cron.schedule('1,2,3,4,5 * * * *', function() {
    console.log('매 1, 2, 3, 4, 5분 마다 실행');
})

app.set('view engine', 'ejs'); //'ejs'탬플릿을 엔진으로 한다.
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);

app.listen(3000, function() {
    console.log("start! express server on port 3000")
})

module.exports = app;