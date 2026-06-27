require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
const productRoutes = require('./routes/products');
const inquiryRoutes = require('./routes/inquiries');

app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);

app.get('/', (req, res) => {
  res.send('B&B Beads and Bags API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
