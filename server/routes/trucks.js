const express = require('express');
const Truck = require('../models/Truck');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all trucks
router.get('/', auth, async (req, res) => {
  try {
    const trucks = await Truck.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الحصول على الشاحنات', error: error.message });
  }
});

// Create truck
router.post('/', auth, async (req, res) => {
  try {
    const { truckNumber, type, companyName, coolingStatus, hasRefrigeratorSeal, temperatureAtShipment, temperatureAtArrival, notes } =
      req.body;

    const truck = new Truck({
      truckNumber,
      type,
      companyName,
      coolingStatus,
      hasRefrigeratorSeal,
      temperatureAtShipment,
      temperatureAtArrival,
      notes,
    });

    await truck.save();
    res.status(201).json({ message: 'تم إضافة الشاحنة بنجاح', truck });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في إضافة الشاحنة', error: error.message });
  }
});

// Update truck
router.put('/:id', auth, async (req, res) => {
  try {
    const truck = await Truck.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'تم تحديث الشاحنة بنجاح', truck });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في تحديث الشاحنة', error: error.message });
  }
});

// Delete truck
router.delete('/:id', auth, async (req, res) => {
  try {
    await Truck.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'تم حذف الشاحنة بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في حذف الشاحنة', error: error.message });
  }
});

module.exports = router;
