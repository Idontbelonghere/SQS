var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var scoreSchema = new Schema({
  id:{
    type:'String',
    require:true
  },
  name:{
    type:'String',
    require:true
  },
  class:{
    type:'String',
    require:true
  },
  total:{
    type:'Number',
    require:true
  },
  hearing:{
    type:'Number',
    require:true
  },
  reading:{
    type:'Number',
    require:true
  },
  writing:{
    type:'Number',
    require:true
  }
})

var Score = mongodb.mongoose.model('score',scoreSchema);

exports.score = Score;
