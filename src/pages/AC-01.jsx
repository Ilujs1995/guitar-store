import React from 'react';
import './ac-01.css'; // 確保路徑正確
import ac01Image from '/src/assets/images/product-acoustic-guitar.jpg'; // 確保路徑正確

function AC01() {
    return (
        <div className="ac-01-container">
            <div className="ac-01-image-section">
                <img src={ac01Image} alt="AC-01 Guitar" className="ac-01-image" />
            </div>
            <div className="ac-01-details-section">
                <h1 className="ac-01-title">AC-01</h1>
                <p className="ac-01-description">
                    Dreadnought Cutaway Acoustic | Solid Spruce Top | Rosewood Back and Sides | Maple Neck | Richlite Fretboard | Fishman Pickups | Hardshell Case
                </p>
                <p className="ac-01-price">$449 USD</p>

                <h2 className="ac-01-overview-title">Overview</h2>
                <ul className="ac-01-features-list">
                    <li>Solid spruce top yields warm, bold tone</li>
                    <li>Versatile, comfortable body shape</li>
                    <li>Easy-playing maple neck for relaxed fretting</li>
                    <li>Features Fishman pickups for authentic plugged-in tone</li>
                    <li>Includes hardshell case for storage and transport</li>
                </ul>
                <button className="ac-01-add-to-cart">Add to cart</button>
            </div>
        </div>
    );
}

export default AC01;