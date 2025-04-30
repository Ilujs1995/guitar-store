// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ image, title, description, audioSrc, link }) {
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
            <audio controls>
                <source src={audioSrc} type="audio/mpeg" />
                您的瀏覽器不支援音訊播放。
            </audio>
        </div>
    );
}

export default ProductCard;
