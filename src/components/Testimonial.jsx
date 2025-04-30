// src/components/Testimonial.jsx
import React from 'react';
import '/src/components/Testimonial.css';
import testimonialImage from '../assets/images/testimonial-rating-star.png'; // 引入圖片

function Testimonial() {
    return (
        <section className="Testimonial">
            <img src={testimonialImage} alt="rating-star" />
            <p className="quote">"The quality of the guitars is unmatched, and the service is always friendly and helpful! I
                couldn't be happier with my purchase."</p>
            <p className="author">- Emily Johnson, Musician, Freelance</p>
        </section>
    );
}

export default Testimonial;