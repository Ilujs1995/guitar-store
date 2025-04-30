// src/components/Header.jsx
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
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
            </nav>
        </header>
    );
}

export default Header;