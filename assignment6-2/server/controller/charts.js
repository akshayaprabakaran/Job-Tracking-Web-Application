var fs = require('fs');
var JobGrowth = require('./../models/JobGrowth');
var TotalEmp = require('./../models/TotalEmp');
var Women = require('./../models/Women');

exports.getJobGrowth = (req, res) => {
   JobGrowth.find({}).sort('quarter').exec(function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else res.render('jobGrowthLineChart', { jobs: data });
      console.log(data);
      return;
   })
}
exports.getTotalEmp = (req, res) => {
   TotalEmp.find({}, (err, data) => {
      if (err) console.log(err, err.stack); // an error occurred
      else res.render('piepie', { percentage: data });
      console.log(data);
      return;
   })
}
exports.getWomen = (req, res) => {
   Women.find({}).sort('year').exec(function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else res.render('womenChart', { womenData: data });
      console.log(data);
      return;
   })
}
