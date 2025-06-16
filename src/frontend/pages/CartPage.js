import React from 'react';
import './CartPage.css';

const CartPage = ({ user, cart, removeFromCart }) => {
    const proceedToOrder = () => {
        if (!cart || cart.length === 0) return;
        alert(`Order placed successfully!\nDelivery Address: ${user.address}`);
    };

    const calculateTotal = () => {
        return cart?.reduce((total, product) => total + (product.price * product.quantity), 0);
    };

    if (cart === null)
        return (
            <div className="cart-loading">
                Loading...
            </div>
        );

    return (
        <div className="cart-container">
            <h1 className="cart-title">🛒 Your Cart</h1>
            <div className="cart-content">
                {cart.length === 0 ? (
                    <div className="cart-empty">
                        <span className="cart-empty-emoji">😕</span>
                        Your cart is empty.
                    </div>
                ) : (
                    <div className="cart-list">
                        {cart.map((product, index) => (
                            <div
                                key={product.productId || product._id || index}
                                className="cart-item"
                            >
                                <div className="cart-item-info">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="cart-item-image"
                                    />
                                    <div>
                                        <h2 className="cart-item-title">{product.title}</h2>
                                        <p className="cart-item-detail">Price: <span>₹{product.price}</span></p>
                                        <p className="cart-item-detail">Quantity: <span>{product.quantity}</span></p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(product.productId || product._id)}
                                    className="cart-remove-btn"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="cart-summary">
                        <h2 className="cart-total">
                            Total: <span>₹{calculateTotal()}</span>
                        </h2>
                        <button
                            onClick={proceedToOrder}
                            className="cart-order-btn"
                        >
                            Proceed to Order
                        </button>
                    </div>
                )}
            </div>

            <div className="cart-address">
                <strong>Delivery Address:</strong>
                <div>{user.address}</div>
            </div>
        </div>
    );
};

export default CartPage;