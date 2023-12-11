const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true,
      trim: true,
    },
    middle: {
      type: String,
      trim: true,
    },
    last: {
      type: String,
      required: true,
      trim: true,
    },
  },
  main_role: {
    type: String,
    required: true,
    trim: true,
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Assuming a reference to the Project model
  }],
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task', // Assuming a reference to the Task model
  }],
  profile_picture: {
    type: String,
    trim: true,
  },
  user_name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    // You may want to add additional password constraints here
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // You may want to add additional email constraints here
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;