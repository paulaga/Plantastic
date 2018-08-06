const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const plantSchema = new Schema({
  image: {type: String, default: 'https://res.cloudinary.com/dwe7h0zgx/image/upload/v1533576244/plants/default_planta.png'},
  name: {type: String, required: true},
  birth: Date,
  light: String,
  room: String,
  waterTimes: Number,
  lastWater: Date, 
  nextWater: Date, //Aviso en next y actualizar last-next 
  fertilize: String, //Aviso
  transplant: String, //Aviso de cuando es buena fecha
  author: {type:Schema.Types.ObjectId, ref:'User'}
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;