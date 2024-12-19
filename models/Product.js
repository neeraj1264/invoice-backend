const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number},
  image: { type: String, required: false },
  category: { type: String, required: true },
  varieties: [
    {
      size: String,
      price: Number,
    }
  ]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;