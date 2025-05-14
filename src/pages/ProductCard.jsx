// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ image, title, description, audioSrc, link, onAddToCart }) {
    const buttonStyle = { // 定義你的按鈕樣式
        margin: '1rem',
        padding: '0.75rem 1.5rem',
        fontSize: '1.1rem',
        border: '1px solid #705C53',
        backgroundColor: '#705C53',
        color: 'white',
        cursor: 'pointer',
        borderRadius: '6px',
    };

    return (
        <div className="product-card">
            {link ? (
                <Link to={link}>
                    <img src={image} alt={title} />
                </Link>
            ) : (
                <img src={image} alt={title} />
            )}
            <h3>{title}</h3>
            <p>{description}</p>
            {audioSrc && (
                <audio controls className="product-audio">
                    <source src={audioSrc} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}
            <button style={buttonStyle} onClick={onAddToCart}>Add to cart</button>
        </div>
    );
}

export default ProductCard;