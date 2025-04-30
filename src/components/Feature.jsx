// src/components/Feature.jsx
import React from 'react';
import './Feature.css';
import featureImage from '../assets/images/feature-guitar-player.jpg'; // 引入圖片

function Feature() {
    return (
        <section className="feature">
            <img src={featureImage} alt="guitar-player" />
        </section>
    );
}

export default Feature;