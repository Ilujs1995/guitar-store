// src/pages/ShoppingCart.jsx
import React from 'react';
import { useShoppingCart } from "../context/ShoppingCartContext";
import './ShoppingCart.css'; // 引入 CSS 檔案

const ShoppingCart = () => {
    const { cartItems, increaseQuantity, decreaseQuantity, removeItem, totalAmount } = useShoppingCart();

    return (
        <div className="shoppingcartDiv">
            <h2 className="shoppingcartH2">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p className="emptyCart">Your cart is empty.</p>
            ) : (
                <ul className="cartList">
                    {cartItems.map(item => (
                        <li key={item.id} className="cartItem">
                            <div className="itemDetails">
                                <span className="itemName">{item.name} - ${item.price}</span>
                            </div>
                            <div className="quantityControls">
                                <button className="quantityButton" onClick={() => decreaseQuantity(item.id)}>-</button>
                                <span className="quantity">{item.quantity}</span>
                                <button className="quantityButton" onClick={() => increaseQuantity(item.id)}>+</button>
                            </div>
                            <button className="removeItemButton" onClick={() => removeItem(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <p className="totalAmount">Total Amount: ${totalAmount.toFixed(2)} USD</p>
            {cartItems.length > 0 && (
                <button className="checkoutButton">Checkout</button>
            )}
        </div>
    );
};

export default ShoppingCart;