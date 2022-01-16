const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient




var taskSchema = new mongoose.Schema({

//const TasSchema = MongoClient.Schema;

//const taskSchema = new TasSchema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },

  description: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },

  /*enum priority {
    high,
    mid,
    low
  }*/


  priority: {
    type: String ,
    required: true,
    unique: true,
    trim: true,
  },

  validation: {
    type: Boolean,
  },



 /* startingdate: {
    type: Date,
    required: true,
  },

  endingdate: {
    type: Date,
    required: true,
  }, */


}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;