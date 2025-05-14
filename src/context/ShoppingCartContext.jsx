import { createContext, useContext, useState, useEffect } from 'react';

// 這是一個用來儲存購物車數據在瀏覽器裡面的鑰匙 (key)
const CART_STORAGE_KEY = 'guitarStoreCart';

// 創建一個購物車的環境 (context)
const ShoppingCartContext = createContext();

// 創建一個提供購物車功能的組件
export const ShoppingCartProvider = ({ children }) => {
    // 使用 useState 來創建一個叫做 cartItems 的狀態 (state)，
    // 它是一個陣列，用來存放購物車裡的商品。
    // 初始值是空的陣列 ([])。
    const [cartItems, setCartItems] = useState([]);

    // useEffect 是一個 Hook，它讓你可以在組件渲染之後執行一些操作。
    // 這裡的第一個 useEffect 用來在組件第一次顯示的時候，
    // 從瀏覽器的儲存空間 (localStorage) 讀取之前儲存的購物車數據。
    useEffect(() => {
        // 從 localStorage 裡面根據 CART_STORAGE_KEY 這個鑰匙來取得數據
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        // 如果有取得數據 (storedCart 不是 null)
        if (storedCart) {
            // 使用 JSON.parse 把從 localStorage 拿到的文字轉換回 JavaScript 的東西 (陣列)
            setCartItems(JSON.parse(storedCart));
        }
        // [] 這個空陣列表示這個 useEffect 只會在組件第一次顯示的時候執行一次。
    }, []);

    // 這個 useEffect 用來在購物車的商品 (cartItems) 改變的時候，
    // 把最新的購物車數據儲存到瀏覽器的儲存空間 (localStorage)。
    useEffect(() => {
        // 使用 JSON.stringify 把購物車的商品陣列轉換成文字 (JSON 格式)
        const cartString = JSON.stringify(cartItems);
        // 把轉換後的文字儲存到 localStorage 裡面，使用的鑰匙是 CART_STORAGE_KEY
        localStorage.setItem(CART_STORAGE_KEY, cartString);
        // [cartItems] 這個陣列表示只有當 cartItems 這個狀態改變的時候，這個 useEffect 才會重新執行。
    }, [cartItems]);

    // 這是一個把商品添加到購物車的函數
    const addItem = (product) => {
        // 先檢查購物車裡是不是已經有這個商品了
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

        // 如果商品已經存在購物車裡 (findIndex 找到了，索引大於 -1)
        if (existingItemIndex > -1) {
            // 複製目前的購物車商品陣列，不要直接修改原本的
            const updatedCart = [...cartItems];
            // 增加已存在商品的數量，如果原本沒有數量就當作 1 開始加
            updatedCart[existingItemIndex].quantity = (updatedCart[existingItemIndex].quantity || 1) + 1;
            // 使用 setCartItems 來更新購物車的狀態
            setCartItems(updatedCart);
        } else {
            // 如果商品還沒有在購物車裡
            // 就把新的商品加到購物車陣列裡面，同時設定它的數量為 1
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    // 這是一個增加購物車裡指定商品數量的函數
    const increaseQuantity = (itemId) => {
        // 使用 map 遍歷購物車裡的每一個商品
        const updatedCart = cartItems.map(item => {
            // 如果目前的商品 id 跟我們要增加數量的商品 id 一樣
            if (item.id === itemId) {
                // 就回傳一個新的商品物件，這個物件跟原本的商品一樣，但是數量加 1
                return { ...item, quantity: (item.quantity || 1) + 1 };
            }
            // 如果不是我們要增加數量的商品，就回傳原本的商品
            return item;
        });
        // 使用 setCartItems 來更新購物車的狀態
        setCartItems(updatedCart);
    };

    // 這是一個減少購物車裡指定商品數量的函數
    const decreaseQuantity = (itemId) => {
        // 使用 map 遍歷購物車裡的每一個商品
        const updatedCart = cartItems.map(item => {
            // 如果目前的商品 id 跟我們要減少數量的商品 id 一樣，並且數量大於 1
            if (item.id === itemId && item.quantity > 1) {
                // 就回傳一個新的商品物件，這個物件跟原本的商品一樣，但是數量減 1
                return { ...item, quantity: item.quantity - 1 };
            }
            // 如果不是我們要減少數量的商品，或是數量已經是 1 了，就回傳原本的商品
            return item;
        });
        // 使用 setCartItems 來更新購物車的狀態
        setCartItems(updatedCart);
    };

    // 這是一個從購物車裡移除指定商品的函數
    const removeItem = (itemId) => {
        // 使用 filter 遍歷購物車裡的每一個商品
        // 只留下商品 id 不是我們要移除的商品 id 的商品
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        // 使用 setCartItems 來更新購物車的狀態
        setCartItems(updatedCart);
    };

    // 這是一個計算購物車總金額的函數
    const totalAmount = cartItems.reduce((total, item) => {
        // 把每個商品的價格乘以數量，然後加到總金額裡面
        return total + item.price * (item.quantity || 1);
        // 初始的總金額是 0
    }, 0);

    // ShoppingCartContext.Provider 這個組件會把它 value 裡面提供的東西
    // 傳遞給所有在它裡面的子組件
    return (
        <ShoppingCartContext.Provider value={{
            cartItems: cartItems, // 目前購物車裡的商品
            addItem: addItem, // 添加商品的函數
            increaseQuantity: increaseQuantity, // 增加商品數量的函數
            decreaseQuantity: decreaseQuantity, // 減少商品數量的函數
            removeItem: removeItem, // 移除商品的函數
            totalAmount: totalAmount // 購物車的總金額
        }}>
            {children} {/* 這裡會渲染被 ShoppingCartProvider 包裹的子組件 */}
        </ShoppingCartContext.Provider>
    );
};

// 這是一個自定義的 Hook，讓你在其他的組件裡面可以很方便地使用購物車的環境 (context)
export const useShoppingCart = () => {
    // useContext 這個 Hook 會接收 ShoppingCartContext 這個環境物件，
    // 然後回傳當時環境中 Provider 提供的值 (也就是上面 value prop 裡面的東西)
    return useContext(ShoppingCartContext);
};