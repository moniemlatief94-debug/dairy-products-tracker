const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['حليب', 'زبادي', 'جبن', 'قشطة', 'آيس كريم', 'أخرى'],
      required: true,
    },
    batch: {
      type: String,
      required: true,
      unique: true,
    },
    manufacturingDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    mixingQuantity: {
      type: Number,
      default: 0,
    },
    mixingRatio: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
