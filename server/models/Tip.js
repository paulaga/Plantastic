const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tipsSchema = new Schema({
  text: String,
  plantId:{type:Schema.Types.ObjectId, ref:'Plant'}
});

const Tip = mongoose.model('Tip', tipsSchema);
module.exports = Tip;