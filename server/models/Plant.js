const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const moment = require("moment");
moment.locale("es");
//moment().format('LL');

const plantSchema = new Schema({
  image: String,
  name: {type: String, required: true},
  birth: String,
  rip: String,
  light: String,
  room: String,
  lastWater: Date, 
  nextWater: String, //Aviso en next y actualizar last-next 
  fertilize: String, //Aviso
  transplant: String, //Aviso de cuando es buena fecha
  author:{type:Schema.Types.ObjectId, ref:'User'}
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;