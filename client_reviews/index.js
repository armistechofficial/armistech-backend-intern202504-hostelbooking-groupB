require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const reviewRoutes = require('./routes/reviewRoutes');
const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.use('/api/reviews', reviewRoutes);

console.log('MONGO_URI from .env:', process.env.MONGO_URI);

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
