// CustomizationForm.jsx
import React, { useState } from 'react';
import './customizationform.css';

function CustomizationForm() {
    const [formData, setFormData] = useState({
        topWood: '',
        backSidesWood: '',
        neckWood: '',
        fingerboardWood: '',
        bodyShape: '',
        bodyColor: '',
        bracingStyle: '',
        finish: '',
        inlayStyle: '',
        additionalRequests: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? (prevFormData[name] === value ? '' : value) : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const response = await fetch('http://localhost:3001/api/custom-orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    timestamp: new Date().toISOString(),
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitMessage('訂單提交成功！我們會盡快聯繫您。訂單編號：' + result.data.orderId);
                // 重置表單
                setFormData({
                    topWood: '',
                    backSidesWood: '',
                    neckWood: '',
                    fingerboardWood: '',
                    bodyShape: '',
                    bodyColor: '',
                    bracingStyle: '',
                    finish: '',
                    inlayStyle: '',
                    additionalRequests: '',
                });
            } else {
                setSubmitMessage('提交失敗：' + result.error);
            }
        } catch (error) {
            console.error('提交錯誤:', error);
            setSubmitMessage('網路錯誤，請稍後再試');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="customization-form-container">
            <h2 className="form-title">🎸Custom Guitar Order Form🎸</h2>

            {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('成功') ? 'success' : 'error'}`}>
                    {submitMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h3>1. Top Wood</h3>
                    <label>
                        <input
                            type="checkbox"
                            name="topWood"
                            value="Spruce"
                            checked={formData.topWood === 'Spruce'}
                            onChange={handleChange}
                        />
                        Spruce
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="topWood"
                            value="Cedar"
                            checked={formData.topWood === 'Cedar'}
                            onChange={handleChange}
                        />
                        Cedar
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="topWood"
                            value="Koa"
                            checked={formData.topWood === 'Koa'}
                            onChange={handleChange}
                        />
                        Koa
                    </label>
                    <label>
                        Other:
                        <input
                            type="text"
                            name="topWood"
                            value={formData.topWood !== 'Spruce' && formData.topWood !== 'Cedar' && formData.topWood !== 'Koa' ? formData.topWood : ''}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group">
                    <h3>2. Back & Sides Wood</h3>
                    <label>
                        <input
                            type="checkbox"
                            name="backSidesWood"
                            value="Mahogany"
                            checked={formData.backSidesWood === 'Mahogany'}
                            onChange={handleChange}
                        />
                        Mahogany
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="backSidesWood"
                            value="Rosewood"
                            checked={formData.backSidesWood === 'Rosewood'}
                            onChange={handleChange}
                        />
                        Rosewood
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="backSidesWood"
                            value="Maple"
                            checked={formData.backSidesWood === 'Maple'}
                            onChange={handleChange}
                        />
                        Maple
                    </label>
                    <label>
                        Other:
                        <input
                            type="text"
                            name="backSidesWood"
                            value={formData.backSidesWood !== 'Mahogany' && formData.backSidesWood !== 'Rosewood' && formData.backSidesWood !== 'Maple' ? formData.backSidesWood : ''}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group">
                    <h3>3. Neck Wood</h3>
                    <label>
                        <input
                            type="checkbox"
                            name="neckWood"
                            value="Maple"
                            checked={formData.neckWood === 'Maple'}
                            onChange={handleChange}
                        />
                        Maple
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="neckWood"
                            value="Mahogany"
                            checked={formData.neckWood === 'Mahogany'}
                            onChange={handleChange}
                        />
                        Mahogany
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="neckWood"
                            value="Rosewood"
                            checked={formData.neckWood === 'Rosewood'}
                            onChange={handleChange}
                        />
                        Rosewood
                    </label>
                    <label>
                        Other:
                        <input
                            type="text"
                            name="neckWood"
                            value={formData.neckWood !== 'Maple' && formData.neckWood !== 'Mahogany' && formData.neckWood !== 'Rosewood' ? formData.neckWood : ''}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group">
                    <h3>4. Fingerboard Wood</h3>
                    <label>
                        <input
                            type="checkbox"
                            name="fingerboardWood"
                            value="Rosewood"
                            checked={formData.fingerboardWood === 'Rosewood'}
                            onChange={handleChange}
                        />
                        Rosewood
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="fingerboardWood"
                            value="Ebony"
                            checked={formData.fingerboardWood === 'Ebony'}
                            onChange={handleChange}
                        />
                        Ebony
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="fingerboardWood"
                            value="Maple"
                            checked={formData.fingerboardWood === 'Maple'}
                            onChange={handleChange}
                        />
                        Maple
                    </label>
                    <label>
                        Other:
                        <input
                            type="text"
                            name="fingerboardWood"
                            value={formData.fingerboardWood !== 'Rosewood' && formData.fingerboardWood !== 'Ebony' && formData.fingerboardWood !== 'Maple' ? formData.fingerboardWood : ''}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group">
                    <h3>5. Body Shape</h3>
                    <label>
                        <input
                            type="checkbox"
                            name="bodyShape"
                            value="OM"
                            checked={formData.bodyShape === 'OM'}
                            onChange={handleChange}
                        />
                        OM
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="bodyShape"
                            value="Dreadnought"
                            checked={formData.bodyShape === 'Dreadnought'}
                            onChange={handleChange}
                        />
                        Dreadnought
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="bodyShape"
                            value="Parlor"
                            checked={formData.bodyShape === 'Parlor'}
                            onChange={handleChange}
                        />
                        Parlor
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="bodyShape"
                            value="Jumbo"
                            checked={formData.bodyShape === 'Jumbo'}
                            onChange={handleChange}
                        />
                        Jumbo
                    </label>
                    <label>
                        Other:
                        <input
                            type="text"
                            name="bodyShape"
                            value={formData.bodyShape !== 'OM' && formData.bodyShape !== 'Dreadnought' && formData.bodyShape !== 'Parlor' && formData.bodyShape !== 'Jumbo' ? formData.bodyShape : ''}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group">
                    <h3>6. Body Color</h3>
                    <label>
                        <input
                            type="checkbox"
                            name="bodyColor"
                            value="Natural"
                            checked={formData.bodyColor === 'Natural'}
                            onChange={handleChange}
                        />
                        Natural
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="bodyColor"
                            value="Red"
                            checked={formData.bodyColor === 'Red'}
                            onChange={handleChange}
                        />
                        Red
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="bodyColor"
                            value="Sunburst"
                            checked={formData.bodyColor === 'Sunburst'}
                            onChange={handleChange}
                        />
                        Sunburst
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="bodyColor"
                            value="Black"
                            checked={formData.bodyColor === 'Black'}
                            onChange={handleChange}
                        />
                        Black
                    </label>
                    <label>
                        Custom Color:
                        <input
                            type="text"
                            name="bodyColor"
                            value={formData.bodyColor !== 'Natural' && formData.bodyColor !== 'Red' && formData.bodyColor !== 'Sunburst' && formData.bodyColor !== 'Black' ? formData.bodyColor : ''}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group">
                    <h3>7. Bracing Style</h3>
                    <label>
                        <input
                            type="checkbox"
                            name="bracingStyle"
                            value="X-Bracing"
                            checked={formData.bracingStyle === 'X-Bracing'}
                            onChange={handleChange}
                        />
                        X-Bracing
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="bracingStyle"
                            value="Fan Bracing"
                            checked={formData.bracingStyle === 'Fan Bracing'}
                            onChange={handleChange}
                        />
                        Fan Bracing
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="bracingStyle"
                            value="Lattice Bracing"
                            checked={formData.bracingStyle === 'Lattice Bracing'}
                            onChange={handleChange}
                        />
                        Lattice Bracing
                    </label>
                    <label>
                        Other:
                        <input
                            type="text"
                            name="bracingStyle"
                            value={formData.bracingStyle !== 'X-Bracing' && formData.bracingStyle !== 'Fan Bracing' && formData.bracingStyle !== 'Lattice Bracing' ? formData.bracingStyle : ''}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group">
                    <h3>8. Finish</h3>
                    <label>
                        <input
                            type="radio"
                            name="finish"
                            value="Gloss"
                            checked={formData.finish === 'Gloss'}
                            onChange={handleChange}
                        />
                        Gloss
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="finish"
                            value="Satin"
                            checked={formData.finish === 'Satin'}
                            onChange={handleChange}
                        />
                        Satin
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="finish"
                            value="Matte"
                            checked={formData.finish === 'Matte'}
                            onChange={handleChange}
                        />
                        Matte
                    </label>
                </div>

                <div className="form-group">
                    <h3>9. Inlay Style</h3>
                    <label>
                        <input
                            type="radio"
                            name="inlayStyle"
                            value="Simple Dots"
                            checked={formData.inlayStyle === 'Simple Dots'}
                            onChange={handleChange}
                        />
                        Simple Dots
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="inlayStyle"
                            value="Custom Design"
                            checked={formData.inlayStyle === 'Custom Design'}
                            onChange={handleChange}
                        />
                        Custom Design
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="inlayStyle"
                            value="No Inlays"
                            checked={formData.inlayStyle === 'No Inlays'}
                            onChange={handleChange}
                        />
                        No Inlays
                    </label>
                </div>

                <div className="form-group">
                    <h3>10. Additional Requests</h3>
                    <textarea
                        name="additionalRequests"
                        value={formData.additionalRequests}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Please enter your requests here..."
                    />
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default CustomizationForm;