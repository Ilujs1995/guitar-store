import React from 'react';
import './Banner.css';
import { Link } from 'react-router-dom'; // 引入 Link 組件

function Banner() {
    return (
        <section className="banner">
            <h2 className="banner-h2">Discover Your Perfect Guitar</h2>
            <p>Explore our unique range of guitars and accessories designed to inspire your musical journey</p>
            <Link to="/product">
                <button>Shop</button>
            </Link>
            <Link to="/manufacturing">
                <button>Visit</button>
            </Link>
        </section>
    );
}

export default Banner;