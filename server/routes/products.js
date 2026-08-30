const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all products
router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الحصول على المنتجات', error: error.message });
  }
});

// Create product
router.post('/', auth, async (req, res) => {
  try {
    const { name, type, batch, manufacturingDate, expiryDate, quantity, mixingQuantity, mixingRatio, notes } =
      req.body;

    const product = new Product({
      name,
      type,
      batch,
      manufacturingDate,
      expiryDate,
      quantity,
      mixingQuantity,
      mixingRatio,
      notes,
    });

    await product.save();
    res.status(201).json({ message: 'تم إضافة المنتج بنجاح', product });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في إضافة المنتج', error: error.message });
  }
});

// Update product
router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'تم تحديث المنتج بنجاح', product });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في تحديث المنتج', error: error.message });
  }
});

// Delete product
router.delete('/:id', auth, async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'تم حذف المنتج بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في حذف المنتج', error: error.message });
  }
});

module.exports = router;
