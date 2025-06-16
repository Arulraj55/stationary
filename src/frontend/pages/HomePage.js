import React from 'react';
import { useNavigate } from 'react-router-dom';
import note from '../assets/note.webp';
import pen from '../assets/pens.webp';
import stickyNotes from '../assets/sticky_notes.webp';
import highlighters from '../assets/highlighters.webp';
import erasers from '../assets/eraser.webp';
import pencils from '../assets/pencils.webp';
import glueStick from '../assets/glue.webp';
import scissors from '../assets/scissors.webp';
import colourPencils from '../assets/colour_pencils.webp';
import stapler from '../assets/stapler.webp';
import calculator from '../assets/calculators.webp';
import tapes from '../assets/Tapes.webp';

const HomePage = ({ addToCart, user }) => {
    const navigate = useNavigate();

    const products = [
        { id: 1, name: 'Notebook', price: 5.00, image: note },
        { id: 2, name: 'Pens', price: 3.00, image: pen },
        { id: 3, name: 'Sticky Notes', price: 2.00, image: stickyNotes },
        { id: 4, name: 'Highlighters', price: 4.50, image: highlighters },
        { id: 5, name: 'Erasers', price: 1.50, image: erasers },
        { id: 6, name: 'Pencils', price: 3.20, image: pencils },
        { id: 7, name: 'Glue Stick', price: 1.80, image: glueStick },
        { id: 8, name: 'Scissors', price: 4.00, image: scissors },
        { id: 9, name: 'Colour Pencils', price: 0.99, image: colourPencils },
        { id: 10, name: 'Stapler', price: 5.50, image: stapler },
        { id: 11, name: 'Calculator', price: 15.00, image: calculator },
        { id: 12, name: 'Tapes', price: 2.50, image: tapes },
    ];

    const handleBuyNow = (product) => {
        if (!user) {
            navigate('/login');
        } else {
            addToCart(product);
            alert(`${product.name} added to cart!`);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Welcome to Our Stationery Store</h1>
            <p>Your one-stop shop for all stationery needs.</p>

            <div style={styles.productGrid}>
                {products.map(product => (
                    <div key={product.id} style={styles.productCard} className="product-card">
                        <img src={product.image} alt={product.name} style={styles.productImage} />
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <button style={styles.buyButton} onClick={() => handleBuyNow(product)}>Buy Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' },
    productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', marginTop: '2rem' },
    productCard: { border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' },
    productImage: { width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' },
    buyButton: { padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }
};

export default HomePage;