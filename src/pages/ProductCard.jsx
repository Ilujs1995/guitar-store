// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import './ProductCard.css';

function ProductCard({
    productId,     // 商品 ID
    image,
    title,
    description,
    price,         // 商品價格
    audioSrc,
    link,
    quantity = 1   // 預設數量
}) {
    const { addItem, isLoading } = useShoppingCart();
    const [isAdding, setIsAdding] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const buttonStyle = {
        margin: '1rem',
        padding: '0.75rem 1.5rem',
        fontSize: '1.1rem',
        border: '1px solid #705C53',
        backgroundColor: isAdding ? '#8B7355' : '#705C53',
        color: 'white',
        cursor: isAdding ? 'not-allowed' : 'pointer',
        borderRadius: '6px',
        transition: 'background-color 0.2s ease',
        opacity: isAdding ? 0.7 : 1,
    };

    const successStyle = {
        margin: '0.5rem 1rem',
        padding: '0.5rem',
        fontSize: '0.9rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        borderRadius: '4px',
        textAlign: 'center',
        opacity: showSuccess ? 1 : 0,
        transition: 'opacity 0.3s ease',
    };

    const handleAddToCart = async () => {
        if (!productId) {
            console.error('ProductCard: productId is required');
            return;
        }

        setIsAdding(true);
        try {
            await addItem(productId, quantity);

            // 顯示成功訊息
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 2000);

        } catch (error) {
            console.error('添加商品到購物車失敗:', error);
            // 這裡可以顯示錯誤訊息或處理錯誤
        } finally {
            setIsAdding(false);
        }
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
            {price && (
                <p className="product-price" style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: '#705C53',
                    margin: '0.5rem 0'
                }}>
                    ${price}
                </p>
            )}
            {audioSrc && (
                <audio controls className="product-audio">
                    <source src={audioSrc} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}

            <div style={successStyle}>
                ✓ 已加入購物車！
            </div>

            <button
                style={buttonStyle}
                onClick={handleAddToCart}
                disabled={isAdding || isLoading}
            >
                {isAdding ? '處理中...' : 'Add to cart'}
            </button>
        </div>
    );
}

export default ProductCard;