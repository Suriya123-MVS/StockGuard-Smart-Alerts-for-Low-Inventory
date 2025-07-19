const Product = require('../models/product.');
const { sendLowStockAlert } = require('../utils/mailer');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity, min_quantity } = req.body;

    if (!name || price == null || quantity == null || min_quantity == null) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const product = await Product.create({ name, price, quantity, min_quantity });

    if (quantity <= min_quantity) {
      await sendLowStockAlert(product);
    }

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
