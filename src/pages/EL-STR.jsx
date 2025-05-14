import React from 'react';
import './el-str.css';
import stratocasterImage from '/src/assets/images/product-stratocaster.jpg';
import { useShoppingCart } from '../context/ShoppingCartContext';
import products from '../context/Products';

function ELSTR() {
    const { addItem } = useShoppingCart();
    const elStrProduct = products.find(product => product.id === 'EL-STR');

    const handleAddToCart = () => {
        if (elStrProduct) {
            addItem(elStrProduct);
        } else {
            console.error('EL-STR product not found.');
        }
    };

    return (
        <div className="el-str-container">
            <div className="el-str-image-section">
                <img src={stratocasterImage} alt="EL-STR Guitar" className="el-str-image" />
            </div>
            <div className="el-str-details-section">
                <h1 className="el-str-title">EL-STR</h1>
                <p className="el-str-description">
                    Stratocaster Style Electric | Alder Body | Maple Neck |
                    Rosewood Fretboard | 3 Single-Coil Pickups | 5-Way Selector Switch | Synchronized Tremolo Bridge |
                    Gig Bag Included
                </p>
                <p className="el-str-price">$550 USD</p>

                <h2 className="el-str-overview-title">Overview</h2>
                <ul className="el-str-features-list">
                    <li>Classic bright and articulate tone</li>
                    <li>Comfortable and versatile body shape</li>
                    <li>Maple neck with smooth playability</li>
                    <li>Three single-coil pickups for a wide range of sounds</li>
                    <li>Ideal for various music genres, especially funk and rock</li>
                </ul>
                <button className="el-str-add-to-cart" onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>
    );
}

export default ELSTR;