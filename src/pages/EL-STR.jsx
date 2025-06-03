import React, { useState } from 'react';
import './el-str.css';
import stratocasterImage from '/src/assets/images/product-stratocaster.jpg';
import { useShoppingCart } from '../context/ShoppingCartContext';

function ELSTR() {
    const { addItem } = useShoppingCart();
    const [isAdding, setIsAdding] = useState(false);
    const [message, setMessage] = useState('');

    const elStrProduct = {
        id: 'EL-STR',
        name: 'EL-STR',
        price: 550,
        imageUrl: '/src/assets/images/product-stratocaster.jpg'
    };

    const handleAddToCart = async () => {
        try {
            setIsAdding(true);
            setMessage('');

            await addItem(elStrProduct.id, 1);
            setMessage('✓ Added to cart!');
            setTimeout(() => setMessage(''), 3000);

        } catch (error) {
            console.error('Add to cart failed:', error);
            setMessage('❌ Failed to add. Please try again.');
            setTimeout(() => setMessage(''), 5000);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="el-str-container">
            <div className="el-str-image-section">
                <img src={stratocasterImage} alt="EL-STR Guitar" className="el-str-image" />
            </div>
            <div className="el-str-details-section">
                <h1 className="el-str-title">EL-STR</h1>
                <p className="el-str-description">
                    Stratocaster Style Electric | Alder Body | Maple Neck |
                    Rosewood Fretboard | 3 Single-Coil Pickups | 5-Way Selector Switch | Synchronized Tremolo Bridge |
                    Gig Bag Included
                </p>
                <p className="el-str-price">$550 USD</p>

                <h2 className="el-str-overview-title">Overview</h2>
                <ul className="el-str-features-list">
                    <li>Classic bright and articulate tone</li>
                    <li>Comfortable and versatile body shape</li>
                    <li>Maple neck with smooth playability</li>
                    <li>Three single-coil pickups for a wide range of sounds</li>
                    <li>Ideal for various music genres, especially funk and rock</li>
                </ul>

                {message && (
                    <div className="message" style={{
                        padding: '0.75rem',
                        borderRadius: '6px',
                        marginBottom: '1rem',
                        backgroundColor: message.includes('✓') ? '#d4edda' : '#f8d7da',
                        color: message.includes('✓') ? '#155724' : '#721c24',
                        border: `1px solid ${message.includes('✓') ? '#c3e6cb' : '#f5c6cb'}`
                    }}>
                        {message}
                    </div>
                )}

                <button
                    className="el-str-add-to-cart"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    style={{
                        opacity: isAdding ? 0.7 : 1,
                        cursor: isAdding ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isAdding ? 'Adding...' : 'Add to cart'}
                </button>
            </div>
        </div>
    );
}

export default ELSTR;