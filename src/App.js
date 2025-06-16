import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './frontend/components/Navbar';
import HomePage from './frontend/pages/HomePage';
import LoginPage from './frontend/pages/LoginPage';
import SignupPage from './frontend/pages/SignupPage';
import CartPage from './frontend/pages/CartPage';
import axios from 'axios';

const API_BASE = "https://stationary-5c64.onrender.com";

function App() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (user) {
            fetchCart(user._id);
        } else {
            setCart([]);
        }
    }, [user]);

    const fetchCart = (userId) => {
        axios.get(`${API_BASE}/api/cart/${userId}`)
            .then(res => setCart(res.data.products || []))
            .catch(err => console.error('Error fetching cart:', err));
    };

    const addToCart = async (product) => {
        try {
            const productToSend = {
                productId: String(product.productId || product.id || product._id),
                title: product.title || product.name,
                price: product.price,
                image: product.image
            };
            const response = await axios.post(`${API_BASE}/api/cart/add`, {
                userId: user._id,
                product: productToSend
            });
            setCart(response.data.products);
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add item to cart.');
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await axios.post(`${API_BASE}/api/cart/remove`, {
                userId: user._id,
                productId: String(productId)
            });
            setCart(response.data.products);
        } catch (error) {
            console.error('Error removing from cart:', error);
            alert('Failed to remove item from cart.');
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        setCart([]);
    };

    const getCartQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <>
            <Navbar user={user} cartCount={getCartQuantity()} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage addToCart={addToCart} user={user} />} />
                <Route path="/login" element={<LoginPage setUser={(loggedInUser) => {
                    setUser(loggedInUser);
                    localStorage.setItem('user', JSON.stringify(loggedInUser));
                    fetchCart(loggedInUser._id);
                }} />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/cart" element={user ? <CartPage user={user} cart={cart} removeFromCart={removeFromCart} /> : <Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default App;