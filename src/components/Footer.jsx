// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className="subscribe">
                <p>Subscribe to updates</p>
                <input type="email" placeholder="Your Email Here" />
                <button>Join</button>
            </div>
            <div className="footer-links">
                <div>
                    <h4>Quick Links</h4>
                    <ul>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Shop Now</li>
                        <li>Gift Cards</li>
                    </ul>
                </div>
                <div>
                    <h4>Follow Us</h4>
                    <ul>
                        <li>Instagram</li>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>YouTube</li>
                    </ul>
                </div>
                <div>
                    <h4>Resources</h4>
                    <ul>
                        <li>Blog</li>
                        <li>FAQs</li>
                        <li>Shipping Info</li>
                        <li>Returns</li>
                    </ul>
                </div>
            </div>
            <p className="copyright">&copy; 2024 Aesthetic Guitars. All rights reserved.</p>
        </footer>
    );
}

export default Footer;