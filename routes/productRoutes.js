const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // ✅ Use correct path
const { Sequelize } = require('sequelize');
const sendLowStockEmail = require('../utils/mailer'); // ✅ If email alert is used

// ✅ GET /api/products
router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// ✅ GET /api/products/check-stock
router.get('/check-stock', async (req, res) => {
  try {
    const lowStock = await Product.findAll({
      where: Sequelize.literal('quantity <= min_quantity')
    });

    if (lowStock.length > 0) {
      await sendLowStockEmail(lowStock); // 📨 Optional
    }

    res.json(lowStock);
  } catch (err) {
    console.error('Error in /check-stock:', err);
    res.status(500).json({ error: 'Failed to check stock' });
  }
});

module.exports = router;
