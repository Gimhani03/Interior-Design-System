require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const passwordRoutes = require('./routes/password');
const furnitureRoutes = require('./routes/furnitureRoutes');

const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/admin');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/furniture', furnitureRoutes);

app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Interior Design System API is running!' });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});