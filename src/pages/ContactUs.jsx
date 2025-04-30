import React, { useState } from 'react';
import './ContactUs.css';

function ContactUs() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // 在這裡處理表單提交的邏輯，例如發送數據到後端
        console.log('Email:', email);
        console.log('Message:', message);
        alert('Thanks. We will reply to you ASAP!!');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="contact-us-container">
            <h2>Contact Us Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Please leave your email.</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">How may we help you?</label>
                    <textarea
                        id="message"
                        placeholder="Please enter your request here..."
                        value={message}
                        onChange={handleMessageChange}
                        rows="5"
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ContactUs;