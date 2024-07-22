const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  time: String,
  guests: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

