const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const notificationSchema = new Schema({
  message: String,
  nextWater: Date,
  plantId: {type:Schema.Types.ObjectId, ref:'Plant'},
  author: {type:Schema.Types.ObjectId, ref:'User'}
});

const Notif = mongoose.model('Notif', notificationSchema);
module.exports = Notif;