import React, { useState } from 'react';
import './ac-01.css';
import ac01Image from '/src/assets/images/product-acoustic-guitar.jpg';
import { useShoppingCart } from '../context/ShoppingCartContext';

function AC01() {
    const { addItem } = useShoppingCart();
    const [isAdding, setIsAdding] = useState(false);
    const [message, setMessage] = useState('');

    // AC-01 商品資料 (與後端一致)
    const ac01Product = {
        id: 'AC-01',
        name: 'AC-01',
        price: 449,
        imageUrl: '/src/assets/images/product-acoustic-guitar.jpg'
    };

    const handleAddToCart = async () => {
        try {
            setIsAdding(true);
            setMessage('');

            await addItem(ac01Product.id, 1);

            setMessage('✓ Item added to cart!');

            // Clear message after 3 seconds
            setTimeout(() => setMessage(''), 3000);

        } catch (error) {
            console.error('Failed to add item to cart:', error);
            setMessage('❌ Failed to add item. Please try again.');

            // Clear error message after 5 seconds
            setTimeout(() => setMessage(''), 5000);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="ac-01-container">
            <div className="ac-01-image-section">
                <img src={ac01Image} alt="AC-01 Guitar" className="ac-01-image" />
            </div>
            <div className="ac-01-details-section">
                <h1 className="ac-01-title">AC-01</h1>
                <p className="ac-01-description">
                    Dreadnought Cutaway Acoustic | Solid Spruce Top | Rosewood Back and Sides | Maple Neck | Richlite Fretboard | Fishman Pickups | Hardshell Case
                </p>
                <p className="ac-01-price">$449 USD</p>

                <h2 className="ac-01-overview-title">Overview</h2>
                <ul className="ac-01-features-list">
                    <li>Solid spruce top yields warm, bold tone</li>
                    <li>Versatile, comfortable body shape</li>
                    <li>Easy-playing maple neck for relaxed fretting</li>
                    <li>Features Fishman pickups for authentic plugged-in tone</li>
                    <li>Includes hardshell case for storage and transport</li>
                </ul>

                {/* Status message display */}
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
                    className="ac-01-add-to-cart"
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

export default AC01;