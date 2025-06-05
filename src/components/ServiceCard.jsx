import React from 'react';
import './ServiceCard.css';
import { Link } from 'react-router-dom';

function ServiceCard({ imageUrl, title, description, linkText, linkUrl }) {
    return (
        <div className="service-card">
            <img src={imageUrl} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p><br />
            <Link to={linkUrl}>{linkText}</Link>
        </div>
    );
}

export default ServiceCard;