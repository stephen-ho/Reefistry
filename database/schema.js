const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  pH: Number,
  Alk: Number,
  Ca: Number,
  Mg: Number,
  No3: Number,
  Po4: Number,
  Date: Number
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;

