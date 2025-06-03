// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import './ProductCard.css';

function ProductCard({
    productId,
    image,
    title,
    description,
    price,
    audioSrc,
    link,
    quantity = 1
}) {
    const { addItem, isLoading } = useShoppingCart();
    const [isAdding, setIsAdding] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddToCart = async () => {
        if (!productId) {
            console.error('ProductCard: productId is required');
            return;
        }

        setIsAdding(true);
        try {
            await addItem(productId, quantity);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        } catch (error) {
            console.error('Add to cart failed:', error);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="product-card">
            {link ? (
                <Link to={link} className="product-image-link">
                    <img src={image} alt={title} />
                </Link>
            ) : (
                <img src={image} alt={title} />
            )}

            <h3 className="product-title">{title}</h3>
            <p className="product-description">{description}</p>

            {price && (
                <p className="product-price">
                    ${price}
                </p>
            )}

            {audioSrc && (
                <audio controls className="product-audio">
                    <source src={audioSrc} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}

            <div className={`product-success-message ${showSuccess ? 'show' : ''}`}>
                ✓ Added to cart!
            </div>

            <button
                className={`product-add-button ${isAdding ? 'adding' : ''}`}
                onClick={handleAddToCart}
                disabled={isAdding || isLoading}
            >
                {isAdding ? 'Adding...' : 'Add to cart'}
            </button>
        </div>
    );
}

export default ProductCard;