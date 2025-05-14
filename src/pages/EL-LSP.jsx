import React from 'react';
import './el-lsp.css';
import lesPaulImage from '/src/assets/images/product-les-paul.jpg';
import { useShoppingCart } from '../context/ShoppingCartContext';
import products from '../context/Products';

function ELLSP() {
    const { addItem } = useShoppingCart();
    const elLspProduct = products.find(product => product.id === 'EL-LSP');

    const handleAddToCart = () => {
        if (elLspProduct) {
            addItem(elLspProduct);
        } else {
            console.error('EL-LSP product not found.');
        }
    };

    return (
        <div className="el-lsp-container">
            <div className="el-lsp-image-section">
                <img src={lesPaulImage} alt="EL-LSP Guitar" className="el-lsp-image" />
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
                    <li>Rich and powerful humbucking tones</li>
                    <li>Solid mahogany body with a maple top for sustain</li>
                    <li>Set neck construction for enhanced resonance</li>
                    <li>Ideal for rock, blues, and heavy metal</li>
                    <li>Classic and iconic aesthetics</li>
                </ul>
                <button className="el-lsp-add-to-cart" onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>
    );
}

export default ELLSP;