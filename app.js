const express = require('express');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

// ✅ Mount the route under "/api/products"
app.use('/api/products', productRoutes);

// Start the server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(err => {
  console.error('Database connection failed:', err);
});
const cron = require('node-cron');
const checkLowStock = require('./utils/stockChecker'); // Create this if needed

cron.schedule('0 9 * * *', () => {
  checkLowStock(); // Runs every day at 9 AM
});
