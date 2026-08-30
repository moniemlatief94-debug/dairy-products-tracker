const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post(
  '/register',
  [
    body('name', 'الاسم مطلوب').notEmpty(),
    body('email', 'البريد الإلكتروني غير صحيح').isEmail(),
    body('password', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'المستخدم موجود بالفعل' });
      }

      user = new User({ name, email, password });
      await user.save();

      const payload = { userId: user.id, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        message: 'تم التسجيل بنجاح',
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
    } catch (error) {
      res.status(500).json({ message: 'خطأ في السيرفر', error: error.message });
    }
  }
);

// Login
router.post(
  '/login',
  [
    body('email', 'البريد الإلكتروني غير صحيح').isEmail(),
    body('password', 'كلمة المرور مطلوبة').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'بيانات الدخول غير صحيحة' });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'بيانات الدخول غير صحيحة' });
      }

      const payload = { userId: user.id, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.json({
        message: 'تم الدخول بنجاح',
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
    } catch (error) {
      res.status(500).json({ message: 'خطأ في السيرفر', error: error.message });
    }
  }
);

module.exports = router;
