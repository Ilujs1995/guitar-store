// ShoppingCartContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CART_STORAGE_KEY = 'guitarStoreCart';
const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const addItem = useCallback((product) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            const updatedCart = [...cartItems];
            updatedCart[existingItemIndex].quantity = (updatedCart[existingItemIndex].quantity || 1) + 1;
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    }, [cartItems, setCartItems]);

    const increaseQuantity = useCallback((itemId) => {
        const updatedCart = cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
        setCartItems(updatedCart);
    }, [cartItems, setCartItems]);

    const decreaseQuantity = useCallback((itemId) => {
        const updatedCart = cartItems.map(item =>
            item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCart);
    }, [cartItems, setCartItems]);

    const removeItem = useCallback((itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
    }, [cartItems, setCartItems]);

    const totalAmount = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

    return (
        <ShoppingCartContext.Provider value={{ cartItems, addItem, increaseQuantity, decreaseQuantity, removeItem, totalAmount }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
};