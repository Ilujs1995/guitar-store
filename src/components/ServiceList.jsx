import React from 'react';
import './ServiceList.css';
import ServiceCard from './ServiceCard';
import acousticGuitarImage from '../assets/images/service-list-acoustic-guitar.jpg';
import guitarPlayerImage from '../assets/images/service-list-guitar-player.jpg';
import electricGuitarImage from '../assets/images/service-list-electric-guitar.jpg';
import { Link } from 'react-router-dom';

function ServiceList() {
    return (
        <section className="service-list">
            <div className="text-grid">
                <h2 className="service-list-h2">Discover the perfect blend of style and sound with our guitars.</h2>
                <p>Every piece of wood is carefully selected and shipped by sea to Germany for assembly.
                    Professional craftsmen work on the wood. The finished product is adjusted by our team of musicians and technicians.
                    We also carefully select our shippers to make sure you get our best quality guitars!
                </p>
            </div>
            <div className="cards">
                <ServiceCard
                    imageUrl={acousticGuitarImage}
                    title="Elevate your music experience"
                    description="Inspire creativity and passion with our expertly designed guitars."
                    linkText="Shop"
                    linkUrl="/product"
                />
                <ServiceCard
                    imageUrl={guitarPlayerImage}
                    title="Customize your guitar"
                    description="Personalize your instrument with various finishes, wood, and features."
                    linkText="Create"
                    linkUrl="/customizationform"
                />
                <ServiceCard
                    imageUrl={electricGuitarImage}
                    title="Crafted with precision"
                    description="Experience the fantastic sound and durability of high-quality materials."
                    linkText="Learn More"
                    linkUrl="/manufacturing"
                />
            </div>
        </section>
    );
}

export default ServiceList;