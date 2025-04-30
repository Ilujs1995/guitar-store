// src/pages/EL-LSP.jsx
import React from 'react';
import './EL-LSP.css';
import elLspImage from '../assets/images/product-les-paul.jpg';

function ELLSP() {
    return (
        <div className="el-lsp-container">
            <div className="el-lsp-image-section">
                <img className="el-lsp-image" src={elLspImage} alt="Les Paul 電吉他" />
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
                    <li>Mahogany body with carved maple top</li>
                    <li>Dual humbucker pickups</li>
                    <li>Set neck for improved sustain</li>
                    <li>Classic gold hardware</li>
                </ul>
                <button className="el-lsp-add-to-cart">Add to Cart</button>
            </div>
        </div>
    );
}

export default ELLSP;
