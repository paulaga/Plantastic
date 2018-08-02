const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const wishSchema = new Schema({
  text: String,
  author:{type:Schema.Types.ObjectId, ref:'User'}
});

const Wish = mongoose.model('Wish', wishSchema);
module.exports = Wish;