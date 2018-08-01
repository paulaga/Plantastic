const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const plantSchema = new Schema({
  image: String,
  name: {type: String, required: true},
  birth: String,
  rip: String,
  ligth: String,
  room: String,
  lastWater: String, 
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