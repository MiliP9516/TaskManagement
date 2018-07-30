const mongoose = require('mongoose');

const user = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   username: {type: String},
   email: {type: String, required: true},
   password: {type: String, required: true}
  //  taskId: {type: Array}
});

module.exports = mongoose.model('User', user);