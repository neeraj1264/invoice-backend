const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: { type: String},
  products: [{ name: String, price: Number, quantity: Number , size: String}],
  totalAmount: { type: Number, required: true },
  name: { type: String },
  phone: { type: Number },
  address: { type: String },
  timestamp: { type: String, required: true },
  discount:{ type: Number },
  delivery: { type: Number }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
