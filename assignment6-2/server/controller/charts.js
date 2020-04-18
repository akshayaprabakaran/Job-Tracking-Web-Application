var JobGrowth = require('./../models/JobGrowth');
var TotalEmp = require('./../models/TotalEmp');
var Women = require('./../models/Women');
var EarlySF = require('./../models/EarlySF');
var EarlySiliconValley = require('./../models/EarlySiliconValley');
var EarlyCA = require('./../models/EarlyCA');


exports.loadCSV = (csvData, modelName) => {

   let jobGrowthQuery = JobGrowth.find({});
   let sectorQuery = TotalEmp.find({});
   let womenQuery = Women.find({});
   var earlySFQuery = EarlySF.find({});
   var earlySiliconValleyQuery = EarlySiliconValley.find({});
   var earlyCAQuery = EarlyCA.find({});

   switch (modelName) {
      case 'jobGrowthModel':
         jobGrowthQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         })
         break;
      case 'totalEmpModel':
         sectorQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         })
         break;
      case 'womenModel':
         womenQuery.exec(function (err, modelData) {
            if (err) throw err;
            else saveData(modelData, csvData, modelName);
         })
         break;
      case 'earlySFModel':
         earlySFQuery.exec(function(error, modelData){
            if(error){
               console.log("Error with Early Seed San Francisco");
            }
            else{
               saveData(modelData(csvData, modelName));
            }
         })
         break;
      case 'earlySiliconValleyModel':
         earlySiliconValleyQuery.exec(function(error, modelData){
            if(error){
               console.log("Error with Early Seed Silicon Valley");
            }
            else{
               saveData(modelData(csvData, modelName));
            }
         })
         break;
      case 'earlyCAModel':
         earlyCAQuery.exec(function(error, modelData){
            if(error){
               console.log("Error with Early Seed California");
            }
            else{
               saveData(modelData(csvData, modelName));
            }
         })
         break;
   }
}

async function saveData(modelData, csvData, modelName) {
   if (modelData.length >= csvData.length) {
      console.log(modelName + ' dataset already exists!');
   } else {
      csvData.forEach((obj) => {
         let dataSet = null;
         switch (modelName) {
            case 'jobGrowthModel':
               dataSet = new JobGrowth({ quarter: obj.Quarter, jobs: parseInt(obj.Jobs) });
               break;
            case 'totalEmpModel':
               dataSet = new TotalEmp({ sector: obj.Sector, percentage: parseInt(obj.Percentage) });
               break;
            case 'womenModel':
               dataSet = new Women({ year: obj.Year, silicon: parseInt(obj.Silicon), san: parseInt(obj.San), cal: parseInt(obj.California) });
               break;
            case 'earlySFModel':
               dataSet = new EarlySF({years: obj.Years, numbers: parseInt(obj.Numbers)});
            case 'earlySiliconValleyModel':
               dataSet = new EarlySiliconValley({years: obj.Years, numbers: parseInt(obj.Numbers)});
            case 'earlyCAModel':
               dataSet = new earlyCA({years: obj.Years, numbers: parseInt(obj.Numbers)});
         }
         dataSet.save((err, res) => {
            if (err) throw err;
            else console.log('Dataset Saved.');
         });
      });
   }
}

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
