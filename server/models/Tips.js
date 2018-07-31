const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tipsSchema = new Schema({
  text: String,
  plant:{type:Schema.Types.ObjectId, ref:'Plant'}
});

const Tips = mongoose.model('Tips', tipsSchema);
module.exports = Tips;