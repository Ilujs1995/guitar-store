// src/components/Footer.jsx
import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

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
                    <h4>Products</h4>
                    <ul>
                        <li><Link to="/ac-01">AC-01</Link></li>
                        <li><Link to="/el-str">EL-STR</Link></li>
                        <li><Link to="/el-lsp">EL-LSP</Link></li>
                    </ul>
                </div>
                <div>
                    <h4>Follow Us</h4>
                    <ul>
                        <li>Instagram</li>
                        <li>Facebook</li>
                        <li><a href="mailto:chunyung8487@gmail.com">Email</a></li>
                    </ul>
                </div>

            </div>
            <p className="copyright">&copy; 2025 Aesthetic Guitars. All rights reserved.</p>
        </footer>
    );
}

export default Footer;