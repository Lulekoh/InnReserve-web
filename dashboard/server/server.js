require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;
const sendgridApiKey = process.env.SENDGRID_API_KEY;

if (!uri) {
  throw new Error('MONGODB_URI is not defined');
}

if (!sendgridApiKey.startsWith("SG.")) {
  throw new Error("API key does not start with 'SG.'");
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});i
