var mongoose = require("mongoose"),
    databasePath = 'mongodb://gardnr:gardnrApp123@ds048487.mongolab.com:48487/gardnr';

mongoose.connect(databasePath, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + databasePath + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + databasePath);
  }
});

