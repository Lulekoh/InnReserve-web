require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Retrieve environment variables
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;
const sendgridApiKey = process.env.SENDGRID_API_KEY;

// Debugging statements to verify environment variables
console.log('MongoDB URI:', uri);
console.log('SendGrid API Key:', sendgridApiKey);
console.log('Port:', port);

// Validate environment variables
if (!uri) {
  throw new Error('MONGODB_URI is not defined');
}

if (!sendgridApiKey || !sendgridApiKey.startsWith("SG.")) {
  throw new Error("SENDGRID_API_KEY is not defined or does not start with 'SG.'");
}

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
