// ShoppingCartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// 後端 API 的基本 URL
const API_BASE_URL = 'http://localhost:3001/api';

// 購物車 Context
const ShoppingCartContext = createContext();

// API 請求的輔助函數
const apiRequest = async (url, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || '請求失敗');
        }

        return data;
    } catch (error) {
        console.error('API 請求錯誤:', error);
        throw error;
    }
};

// 購物車 Provider 組件
export const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [sessionId, setSessionId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // 初始化 session 和購物車資料
    useEffect(() => {
        const initializeCart = async () => {
            setIsLoading(true);
            try {
                // 檢查是否已有 sessionId 儲存在 localStorage
                let storedSessionId = localStorage.getItem('cartSessionId');

                if (!storedSessionId) {
                    // 創建新的 session
                    const sessionResponse = await apiRequest('/cart/session', {
                        method: 'POST',
                    });
                    storedSessionId = sessionResponse.data.sessionId;
                    localStorage.setItem('cartSessionId', storedSessionId);
                }

                setSessionId(storedSessionId);

                // 獲取購物車資料
                const cartResponse = await apiRequest(`/cart/${storedSessionId}`);
                setCartItems(cartResponse.data.items);
                setTotalAmount(cartResponse.data.totalAmount);
            } catch (err) {
                setError('初始化購物車失敗');
                console.error('初始化購物車錯誤:', err);
            } finally {
                setIsLoading(false);
            }
        };

        initializeCart();
    }, []);

    // 更新購物車狀態的輔助函數
    const updateCartState = (data) => {
        setCartItems(data.items);
        setTotalAmount(data.totalAmount);
        setError(null);
    };

    // 獲取所有商品
    const getProducts = async () => {
        try {
            const response = await apiRequest('/products');
            return response.data;
        } catch (err) {
            console.error('獲取商品錯誤:', err);
            throw err;
        }
    };

    // 根據 ID 獲取單一商品
    const getProduct = async (productId) => {
        try {
            const response = await apiRequest(`/products/${productId}`);
            return response.data;
        } catch (err) {
            console.error('獲取商品錯誤:', err);
            throw err;
        }
    };

    // 添加商品到購物車 (使用 productId)
    const addItem = async (productId, quantity = 1) => {
        if (!sessionId) return;

        setIsLoading(true);
        try {
            const response = await apiRequest(`/cart/${sessionId}/items`, {
                method: 'POST',
                body: JSON.stringify({ productId, quantity }),
            });
            updateCartState(response.data);
        } catch (err) {
            setError('添加商品失敗');
            console.error('添加商品錯誤:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // 添加商品到購物車 (使用完整商品物件，保持向後相容)
    const addProduct = async (product, quantity = 1) => {
        if (product && product.id) {
            await addItem(product.id, quantity);
        }
    };

    // 增加商品數量
    const increaseQuantity = async (itemId) => {
        if (!sessionId) return;

        setIsLoading(true);
        try {
            const response = await apiRequest(`/cart/${sessionId}/items/${itemId}/increase`, {
                method: 'PUT',
            });
            updateCartState(response.data);
        } catch (err) {
            setError('增加數量失敗');
            console.error('增加數量錯誤:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // 減少商品數量
    const decreaseQuantity = async (itemId) => {
        if (!sessionId) return;

        setIsLoading(true);
        try {
            const response = await apiRequest(`/cart/${sessionId}/items/${itemId}/decrease`, {
                method: 'PUT',
            });
            updateCartState(response.data);
        } catch (err) {
            setError('減少數量失敗');
            console.error('減少數量錯誤:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // 從購物車移除商品
    const removeItem = async (itemId) => {
        if (!sessionId) return;

        setIsLoading(true);
        try {
            const response = await apiRequest(`/cart/${sessionId}/items/${itemId}`, {
                method: 'DELETE',
            });
            updateCartState(response.data);
        } catch (err) {
            setError('移除商品失敗');
            console.error('移除商品錯誤:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // 清空購物車
    const clearCart = async () => {
        if (!sessionId) return;

        setIsLoading(true);
        try {
            const response = await apiRequest(`/cart/${sessionId}`, {
                method: 'DELETE',
            });
            updateCartState(response.data);
        } catch (err) {
            setError('清空購物車失敗');
            console.error('清空購物車錯誤:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // 清除錯誤訊息
    const clearError = () => {
        setError(null);
    };

    return (
        <ShoppingCartContext.Provider value={{
            cartItems,
            totalAmount,
            sessionId,
            isLoading,
            error,
            getProducts,
            getProduct,
            addItem,
            addProduct,
            increaseQuantity,
            decreaseQuantity,
            removeItem,
            clearCart,
            clearError,
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

// 自定義 Hook 來使用購物車 Context
export const useShoppingCart = () => {
    const context = useContext(ShoppingCartContext);
    if (!context) {
        throw new Error('useShoppingCart 必須在 ShoppingCartProvider 內部使用');
    }
    return context;
};