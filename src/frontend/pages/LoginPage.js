// src/frontend/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

function LoginPage({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://stationary-5c64.onrender.com/api/login', { username, password });

            if (res.data.success) {
                // Save user in App state and localStorage
                setUser(res.data.user);
                localStorage.setItem('user', JSON.stringify(res.data.user));

                alert('Login successful!');
                navigate('/'); // Redirect to HomePage
            } else {
                alert('Invalid credentials');
            }
        } catch (err) {
            console.error(err);
            alert('Error logging in');
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/signup">Signup</Link></p>
            </form>
        </div>
    );
}

export default LoginPage;