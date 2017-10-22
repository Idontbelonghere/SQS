var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/sqs',{useMongoClient:true});

exports.mongoose = mongoose;
