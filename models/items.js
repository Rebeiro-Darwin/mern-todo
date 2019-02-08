const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const items = mongoose.model('item', itemSchema);

module.exports = items;