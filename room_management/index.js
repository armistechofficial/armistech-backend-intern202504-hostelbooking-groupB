const express = require('express');
const mongoose = require('mongoose');
const roomCategoryRoutes = require('./routes/roomCategoryRoutes');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use('/api/room-categories', roomCategoryRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));