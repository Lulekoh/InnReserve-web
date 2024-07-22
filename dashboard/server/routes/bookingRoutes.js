const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createBooking);
router.get('/', auth, getBookings);

module.exports = router;
