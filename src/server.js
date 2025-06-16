const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./backend/models/User');
const Cart = require('./backend/models/Cart');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  'mongodb+srv://arulrajjebasingh:YlDLDxAqYiN6td2U@cluster0.uk9xdqu.mongodb.net/stationeryapp?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Signup
app.post('/api/signup', async (req, res) => {
    const { username, email, password, address } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.json({ success: false, message: 'User already exists' });

        const newUser = new User({ username, email, password, address });
        await newUser.save();
        res.json({ success: true, user: newUser });
    } catch (error) {
        console.error('Signup error:', error); // Add this line
        res.json({ success: false, message: 'Error creating user' });
    }
});
// ...existing code...

// Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) res.json({ success: true, user });
        else res.json({ success: false, message: 'Invalid credentials' });
    } catch (error) {
        res.json({ success: false, message: 'Error logging in' });
    }
});

// Get Cart
app.get('/api/cart/:userId', async (req, res) => {
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

// Add to Cart
app.post('/api/cart/add', async (req, res) => {
    const { userId, product } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        // Always use productId for matching
const existingProductIndex = cart.products.findIndex(
    p => String(p.productId) === String(product.productId)
);

        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity += 1;
        } else {
            cart.products.push({
                productId: String(product.productId),
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        await cart.save();
        res.json({ products: cart.products });
    } catch (err) {
        res.status(500).json({ message: 'Error updating cart' });
    }
});

// Remove from Cart
app.post('/api/cart/remove', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (cart) {
            const productIndex = cart.products.findIndex(
                p => p.productId === String(productId)
            );

            if (productIndex > -1) {
                if (cart.products[productIndex].quantity > 1) {
                    cart.products[productIndex].quantity -= 1;
                } else {
                    cart.products.splice(productIndex, 1);
                }
            }

            await cart.save();
            res.json({ products: cart.products });
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error removing item' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));