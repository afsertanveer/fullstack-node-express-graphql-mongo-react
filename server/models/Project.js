const mongoose = require('mongoose')

const ProjectSchema = mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  description:{
    type:String,
    require:true
  },
  status:{
    type:String,
    enum:['Not Started','In Progress','Completed'],
    require:true
  },
  clientId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }
})

module.exports = mongoose.model('Project',ProjectSchema);