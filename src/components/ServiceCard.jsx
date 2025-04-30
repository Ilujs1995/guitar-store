// src/components/ServiceCard.jsx
import React from 'react';
import './ServiceCard.css'; // 確保路徑正確

function ServiceCard({ imageUrl, title, description, linkText, linkUrl }) {
    return (
        <div className="service-card">
            <img src={imageUrl} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p><br />
            <a href={linkUrl}>{linkText}</a>
        </div>
    );
}

export default ServiceCard;