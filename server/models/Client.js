const mongoose = require('mongoose')

const ClientSchema = mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  phone:{
    type:String,
    require:true
  },
})

module.exports = mongoose.model('Client',ClientSchema);