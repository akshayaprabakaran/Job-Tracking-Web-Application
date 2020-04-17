var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const connectMongoDB = require("./server/config/initMongoDB");
var controller = require('./server/controller/charts');
var app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

connectMongoDB();

//View engine setup
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');
// initialize routes

app.get('/getJobGrowthChart', (req, res) => {
    res.render('jobGrowthLineChart');
});

app.listen(3000)