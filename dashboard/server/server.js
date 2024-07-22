const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('./models/Booking');

const app = express();

app.use(bodyParser.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/book', (req, res) => {
  const newBooking = new Booking(req.body);

  newBooking.save().then(() => {
    const msg = {
      to: req.body.email,
      from: 'your-email@example.com',
      subject: 'Booking Confirmation',
      text: 'Your booking has been confirmed!',
    };

    sgMail.send(msg)
      .then(() => {
        res.send('Booking received and email sent');
      })
      .catch((error) => {
        res.status(500).send('Error sending email');
      });
  });
});

app.post('/pay', async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
