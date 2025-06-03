import React, { useState } from 'react';
import './el-lsp.css';
import lesPaulImage from '/src/assets/images/product-les-paul.jpg';
import { useShoppingCart } from '../context/ShoppingCartContext';

function ELLSP() {
    const { addItem } = useShoppingCart();
    const [isAdding, setIsAdding] = useState(false);
    const [message, setMessage] = useState('');

    // EL-LSP product data (consistent with backend)
    const elLspProduct = {
        id: 'EL-LSP',
        name: 'EL-LSP',
        price: 600,
        imageUrl: '/src/assets/images/product-les-paul.jpg'
    };

    const handleAddToCart = async () => {
        try {
            setIsAdding(true);
            setMessage('');

            await addItem(elLspProduct.id, 1);

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
        <div className="el-lsp-container">
            <div className="el-lsp-image-section">
                <img src={lesPaulImage} alt="EL-LSP Guitar" className="el-lsp-image" />
            </div>
            <div className="el-lsp-details-section">
                <h1 className="el-lsp-title">EL-LSP</h1>
                <p className="el-lsp-description">
                    Les Paul Style Electric | Mahogany Body | Carved Maple Top | Mahogany Neck |
                    Rosewood Fretboard | Dual Humbucker Pickups | 3-Way Toggle Switch | Tune-o-Matic Bridge |
                    Hardshell Case Included
                </p>
                <p className="el-lsp-price">$600 USD</p>

                <h2 className="el-lsp-overview-title">Overview</h2>
                <ul className="el-lsp-features-list">
                    <li>Rich and powerful humbucking tones</li>
                    <li>Solid mahogany body with a maple top for sustain</li>
                    <li>Set neck construction for enhanced resonance</li>
                    <li>Ideal for rock, blues, and heavy metal</li>
                    <li>Classic and iconic aesthetics</li>
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
                    className="el-lsp-add-to-cart"
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

export default ELLSP;