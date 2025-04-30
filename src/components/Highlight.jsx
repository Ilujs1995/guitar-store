import React from 'react';
import './Highlight.css';
import highlightImage from '../assets/images/highlight-acoustic-guitar.jpg';

function Highlight() {
    return (
        <section className="highlight">
            <div className="highlight-image">
                <img src={highlightImage} alt="red-acoustic-guitar" />
            </div>
            <div className="highlight-text">
                <h2 className="highlight-h2">What makes us different from other guitar brands?</h2>
                <p>
                    We select the finest woods from around the world to create
                    guitars that have both tone and feel, making every play more
                    dynamic.
                </p>
                <ul>
                    <li>
                        Mahogany from the tropical rainforests, with a warm and
                        full-bodied tone and a prominent midrange.
                    </li>
                    <li>
                        Spruce from the frigid mountains, bright and clear tone,
                        quick response.
                    </li>
                    <li>
                        Maple from temperate forests has a clean, crisp tone with
                        excellent penetration and a beautiful natural grain.
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Highlight;