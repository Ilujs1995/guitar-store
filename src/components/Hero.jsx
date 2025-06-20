import React from 'react';
import './Hero.css';
import heroImage from '../assets/images/hero-acoustic-guitar.jpg';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section className="hero">
            <div className="hero-text">
                <h2 className="hero-h2">The first guitar of your life.</h2>
                <p>Regarding the first guitar in your life, it must be durable and good to play. In addition, the design must be your favorite.
                    We will provide you with professional advice to help you find the guitar of your dreams.</p>
                <Link to="/product">
                    <button>Shop</button>
                </Link>
                <Link to="/manufacturing">
                    <button>Learn More</button>
                </Link>
            </div>
            <div className="hero-image">
                <img src={heroImage} alt="acoustic-guitar" />
            </div>
        </section>
    );
}

export default Hero;