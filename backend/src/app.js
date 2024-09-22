const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shopkeeperRoutes = require('./interfaces/routes/ShopkeeperRoutes');
const initializeAdmin = require('./infrastructure/db/initializeAdmin');
const adminRoutes = require('./interfaces/routes/adminRoutes');
const shopRoutes = require('./interfaces/routes/ShopRoutes');
const bookingRoutes = require('./interfaces/routes/bookingRoutes');
const paymentRoutes = require('./interfaces/routes/paymentRoutes');
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors(
  {
    origin:{},
    methods:{"POST","GET","PUT","DELETE","PATCH"},
    credentials:true
  }
))
app.use(express.json());

const dbUri = process.env.DB_URI;

mongoose.connect(dbUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));

app.use('/api/auth', require('./interfaces/routes/authRoutes'));
app.use('/api/shopkeepers', shopkeeperRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
