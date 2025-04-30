// src/pages/EL-STR.jsx
import React from 'react';
import './EL-STR.css';
import electricGuitarImage from '../assets/images/product-stratocaster.jpg';

function ELSTR() {
    return (
        <div className="el-str-container">
            <div className="el-str-image-section">
                <img src={electricGuitarImage} alt="Stratocaster 電吉他" className="el-str-image" />
            </div>
            <div className="el-str-details-section">
                <h1 className="el-str-title">EL-STR </h1>
                <p className="el-str-description">Stratocaster Style Electric | Alder Body | Maple Neck |
                    Rosewood Fretboard | 3 Single-Coil Pickups | 5-Way Selector Switch | Synchronized Tremolo Bridge |
                    Gig Bag Included</p>
                <p className="el-str-price">$550 USD</p>

                <h2 className="el-str-overview-title">Overview</h2>
                <ul className="el-str-features-list">
                    <li>Bright single-coil pickups</li>
                    <li>Comfortable contoured body</li>
                    <li>Ideal for funk, pop, and rock genres</li>
                </ul>

                <button className="el-str-add-to-cart">Add to Cart</button>
            </div>
        </div>
    );
}

export default ELSTR;
