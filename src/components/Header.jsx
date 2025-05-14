// src/components/Header.jsx
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { FaShoppingCart } from 'react-icons/fa'; // 導入 Font Awesome 的購物車圖示

function Header() {
    const { cartItems } = useShoppingCart();
    const cartQuantity = cartItems.reduce((sum, item) => sum + (item?.quantity || 0), 0);

    return (
        <header>
            <h1>
                <Link to="/">Osgt</Link>
            </h1>
            <nav>
                <Link to="/product">Guitar Shop</Link>
                <Link to="/manufacturing">Manufacturing</Link>
                <Link to="/customizationform">Customization</Link>
                <Link to="/contactus">Contact Us</Link>
                <Link to="/cart" className="cart-link">
                    <FaShoppingCart className="cart-icon" /> {/* 使用購物車圖示組件 */}
                    ({cartQuantity})
                </Link>
            </nav>
        </header>
    );
}

export default Header;