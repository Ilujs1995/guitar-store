// ContactUs.jsx
import React, { useState } from 'react';
import './ContactUs.css';

function ContactUs() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 防止重複提交
        if (isSubmitting) return;

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                    message: message.trim(),
                    timestamp: new Date().toISOString()
                })
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                setEmail('');
                setMessage('');

                // 顯示成功訊息
                alert(result.message || 'Thanks. We will reply to you ASAP!!');

                console.log('Message submitted successfully:', result.data.messageId);
            } else {
                setSubmitStatus('error');
                alert('Error: ' + result.error);
                console.error('Submission error:', result.error);
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error('Network error:', error);
            alert('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`contact-submit-button ${isSubmitting ? 'submitting' : ''}`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>

            {/* 提交狀態指示器 */}
            {submitStatus === 'success' && (
                <div className="status-message success">
                    ✓ Message sent successfully!
                </div>
            )}
            {submitStatus === 'error' && (
                <div className="status-message error">
                    ✗ Failed to send message. Please try again.
                </div>
            )}
        </div>
    );
}

export default ContactUs;