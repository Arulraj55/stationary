import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, cartCount, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <div>
            <style>
                {`
                .navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    background: linear-gradient(to right, #4f46e5, #3b82f6);
                    color: white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 50;
                }
                
                .navbar-left {
                    font-size: 1.8rem;
                    font-weight: bold;
                    cursor: pointer;
                }
                
                .navbar-right {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }
                
                .navbar-link {
                    color: white;
                    text-decoration: none;
                    font-size: 1.1rem;
                    padding: 0.3rem 0.6rem;
                    border-radius: 6px;
                    transition: background 0.3s;
                }
                
                .navbar-link:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }
                
                .logout-btn {
                    background-color: #ef4444;
                    color: white;
                    border: none;
                    padding: 0.4rem 0.8rem;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: background 0.3s;
                }
                
                .logout-btn:hover {
                    background-color: #dc2626;
                }
                `}
            </style>

            <nav className="navbar">
                <div className="navbar-left" onClick={() => navigate('/')}>
                    Stationery Shop
                </div>
                <div className="navbar-right">
                    <Link to="/" className="navbar-link">Home</Link>
                    {!user && <Link to="/login" className="navbar-link">Login</Link>}
                    {!user && <Link to="/signup" className="navbar-link">Signup</Link>}
                    {user && (
                        <>
                            <Link to="/cart" className="navbar-link">
                                🛒 Cart ({cartCount})
                            </Link>
                            <button onClick={handleLogout} className="logout-btn">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;