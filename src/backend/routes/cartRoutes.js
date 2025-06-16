const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get cart by userId
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ products: user.cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add to cart
router.post('/add', async (req, res) => {
    try {
        console.log('Add request body:', req.body);
        const { userId, product } = req.body;

        if (!userId || !product || !product.productId) {
            return res.status(400).json({ error: 'Missing userId or product data' });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const existingProduct = user.cart.find(item => item.productId === product.productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            user.cart.push({ ...product, quantity: 1 });
        }

        await user.save();
        res.status(200).json({ message: 'Item added successfully', updatedCart: user.cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Server error while adding item to cart' });
    }
});

// Remove from cart
router.post('/remove', async (req, res) => {
    try {
        console.log('Remove request body:', req.body);
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ error: 'Missing userId or productId' });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const initialCartLength = user.cart.length;

        user.cart = user.cart.filter(item => item.productId !== productId);

        if (user.cart.length === initialCartLength) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        await user.save();
        res.status(200).json({ message: 'Item removed successfully', updatedCart: user.cart });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ error: 'Server error while removing item from cart' });
    }
});

module.exports = router;