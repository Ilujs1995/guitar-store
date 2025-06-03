// EL-STR.jsx
import React, { useState } from 'react';
import './el-str.css';
import stratocasterImage from '/src/assets/images/product-stratocaster.jpg';
import { useShoppingCart } from '../context/ShoppingCartContext';

function ELSTR() {
    const { addItem } = useShoppingCart();
    const [isAdding, setIsAdding] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

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
            setMessageType('');

            await addItem(elStrProduct.id, 1);
            setMessage('✓ Added to cart!');
            setMessageType('success');
            setTimeout(() => {
                setMessage('');
                setMessageType('');
            }, 3000);

        } catch (error) {
            console.error('Add to cart failed:', error);
            setMessage('❌ Failed to add. Please try again.');
            setMessageType('error');
            setTimeout(() => {
                setMessage('');
                setMessageType('');
            }, 5000);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="el-str-container">
            <div className="el-str-image-section">
                <img
                    src={stratocasterImage}
                    alt="EL-STR Stratocaster"
                    className="el-str-image"
                />
            </div>

            <div className="el-str-details-section">
                <h1 className="el-str-title">EL-STR</h1>

                <p className="el-str-description">
                    Stratocaster Style Electric | Alder Body | Maple Neck |
                    Rosewood Fretboard | 3 Single-Coil Pickups | 5-Way Selector Switch | Synchronized Tremolo Bridge |
                    Gig Bag Included
                </p>

                <div className="el-str-price">$550 USD</div>

                <h2 className="el-str-overview-title">Overview</h2>

                <ul className="el-str-features-list">
                    <li>Classic bright and articulate tone</li>
                    <li>Comfortable and versatile body shape</li>
                    <li>Maple neck with smooth playability</li>
                    <li>Three single-coil pickups for a wide range of sounds</li>
                    <li>Ideal for various music genres, especially funk and rock</li>
                </ul>

                {message && (
                    <div className={`el-lsp-message ${messageType}`}>
                        {message}
                    </div>
                )}

                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="el-str-add-to-cart"
                >
                    {isAdding ? 'Adding...' : 'Add to cart'}
                </button>
            </div>
        </div>
    );
}

export default ELSTR;