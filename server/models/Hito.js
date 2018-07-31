const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const hitoSchema = new Schema({
  image: String,
  name: String,
  birth: Date,
  rip: Date,
  ligth: String,
  room: String,
  water: [ last = String, next = String], //Aviso en next y actualizar last-next
  fertilize: String, //Aviso
  transplant: String, //Aviso de cuando es buena fecha
  plant:{type:Schema.Types.ObjectId, ref:'Plant'}
});

const Hito = mongoose.model('Hito', hitoSchema);
module.exports = Hito;