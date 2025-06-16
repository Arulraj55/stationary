const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (with database name)
mongoose.connect(
  'mongodb+srv://arulrajjebasingh:YlDLDxAqYiN6td2U@cluster0.uk9xdqu.mongodb.net/stationeryapp?retryWrites=true&w=majority&appName=Cluster0'
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
        console.error('Signup error:', error);
        res.json({ success: false, message: 'Error creating user' });
    }
});

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

// Cart routes
app.use('/api/cart', cartRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));