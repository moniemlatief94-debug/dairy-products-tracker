const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema(
  {
    truckNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['شركة', 'مبيعات'],
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    coolingStatus: {
      type: Boolean,
      required: true,
      default: true,
    },
    hasRefrigeratorSeal: {
      type: Boolean,
      required: true,
      default: true,
    },
    temperatureAtShipment: {
      type: Number,
      required: true,
    },
    temperatureAtArrival: {
      type: Number,
      required: true,
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

module.exports = mongoose.model('Truck', truckSchema);
