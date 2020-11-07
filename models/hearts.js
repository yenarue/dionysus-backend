const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  // showId: mongoose.Schema.Types.ObjectId,
  showId: String,
  userId: String,
});

module.exports = mongoose.model('hearts', schema);