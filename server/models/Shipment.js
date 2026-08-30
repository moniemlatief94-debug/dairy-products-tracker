const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema(
  {
    shipmentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    truckId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Truck',
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ['pending', 'shipped', 'delivered', 'returned'],
          default: 'pending',
        },
      },
    ],
    market: {
      type: String,
      required: true,
    },
    shipmentDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'in-transit', 'delivered', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Shipment', shipmentSchema);
