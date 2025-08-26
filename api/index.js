const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import Routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const customerdataRoutes = require('./routes/customerdataRoutes');
<<<<<<< HEAD
const invoiceRoutes = require('./routes/invoice');
=======
const notificationRoutes = require('./routes/notificationRoutes');
>>>>>>> 7e924e01bac8e551c91c958f9d4be9b8137ebe6b

// Initialize the app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/customerdata', customerdataRoutes);
<<<<<<< HEAD
app.use('/api/invoice', invoiceRoutes);
=======
app.use('/api/notifications', notificationRoutes);
>>>>>>> 7e924e01bac8e551c91c958f9d4be9b8137ebe6b

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 
module.exports = app;
