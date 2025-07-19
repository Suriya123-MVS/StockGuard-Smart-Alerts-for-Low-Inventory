// utils/stockChecker.js

const Product = require('../models/Product');
const { Sequelize } = require('sequelize');
const sendLowStockEmail = require('./mailer');

async function checkLowStockAndSendAlerts() {
  try {
    const lowStock = await Product.findAll({
      where: Sequelize.literal('quantity <= min_quantity')
    });

    if (lowStock.length > 0) {
      console.log('📉 Low stock detected, sending email...');
      await sendLowStockEmail(lowStock);
    } else {
      console.log('✅ All stock levels are sufficient.');
    }
  } catch (err) {
    console.error('❌ Error checking stock:', err);
  }
}

module.exports = checkLowStockAndSendAlerts;
