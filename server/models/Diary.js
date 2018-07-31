const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const plantSchema = new Schema({
  image: String,
  name: String,
  birth: Date,
  rip: Date,
  ligth: String,
  room: String,
  water: [ last = String, next = String], //Aviso en next y actualizar last-next
  fertilize: String, //Aviso
  trasplantar: String, //Aviso de cuando es buena fecha
  author:{type:Schema.Types.ObjectId, ref:'User'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;