const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  event: { type: String, required: true }
});

module.exports = mongoose.model('Guest', guestSchema);
