const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
    productId: { type: String, required: true }, // Always use String for productId
    title: String,
    price: Number,
    image: String,
    quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [cartProductSchema]
});

module.exports = mongoose.model('Cart', cartSchema);