const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  const { hotel, checkIn, checkOut, guests } = req.body;

  try {
    const newBooking = new Booking({
      user: req.user.id,
      hotel,
      checkIn,
      checkOut,
      guests,
    });

    const booking = await newBooking.save();
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('user', ['name', 'email']);
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
