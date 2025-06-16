const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get cart by userId
router.get('/:userId', async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) {
            cart = new Cart({ userId: req.params.userId, products: [] });
            await cart.save();
        }
        res.json({ products: cart.products });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching cart' });
    }
});

// Add to cart
router.post('/add', async (req, res) => {
    try {
        const { userId, product } = req.body;
        if (!userId || !product || !product.productId) {
            return res.status(400).json({ error: 'Missing userId or product data' });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        const existingProductIndex = cart.products.findIndex(
            item => item.productId === String(product.productId)
        );

        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity += 1;
        } else {
            cart.products.push({ ...product, productId: String(product.productId), quantity: 1 });
        }

        await cart.save();
        res.status(200).json({ products: cart.products });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Server error while adding item to cart' });
    }
});

// Remove from cart
router.post('/remove', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(
            item => item.productId === String(productId)
        );

        if (productIndex > -1) {
            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity -= 1;
            } else {
                cart.products.splice(productIndex, 1);
            }
        }

        await cart.save();
        res.status(200).json({ products: cart.products });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ error: 'Server error while removing item from cart' });
    }
});

module.exports = router;