const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// 中介軟體設定
app.use(cors());
app.use(express.json());

// 商品資料
const products = [
    {
        id: 'AC-01',
        name: 'AC-01',
        price: 449,
        imageUrl: '/src/assets/images/product-acoustic-guitar.jpg',
    },
    {
        id: 'EL-STR',
        name: 'EL-STR',
        price: 550,
        imageUrl: '/src/assets/images/product-stratocaster.jpg',
    },
    {
        id: 'EL-LSP',
        name: 'EL-LSP',
        price: 600,
        imageUrl: '/src/assets/images/product-les-paul.jpg',
    },
];

// 暫時用記憶體儲存購物車資料（實際應用中應該使用資料庫）
// 格式: { sessionId: { items: [], totalAmount: 0 } }
const cartStorage = new Map();

// 生成簡單的 session ID（實際應用中應該使用更安全的方式）
const generateSessionId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// 計算購物車總金額的輔助函數
const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
    }, 0);
};

// 獲取或創建購物車
const getOrCreateCart = (sessionId) => {
    if (!cartStorage.has(sessionId)) {
        cartStorage.set(sessionId, {
            items: [],
            totalAmount: 0
        });
    }
    return cartStorage.get(sessionId);
};

// API 路由

// 獲取所有商品
app.get('/api/products', (req, res) => {
    res.json({
        success: true,
        data: products
    });
});

// 根據 ID 獲取單一商品
app.get('/api/products/:productId', (req, res) => {
    const { productId } = req.params;
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            error: '商品不存在'
        });
    }

    res.json({
        success: true,
        data: product
    });
});

// 獲取購物車內容
app.get('/api/cart/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const cart = getOrCreateCart(sessionId);

    res.json({
        success: true,
        data: {
            items: cart.items,
            totalAmount: cart.totalAmount
        }
    });
});

// 創建新的 session
app.post('/api/cart/session', (req, res) => {
    const sessionId = generateSessionId();
    getOrCreateCart(sessionId);

    res.json({
        success: true,
        data: {
            sessionId: sessionId
        }
    });
});

// 添加商品到購物車
app.post('/api/cart/:sessionId/items', (req, res) => {
    const { sessionId } = req.params;
    const { productId, quantity = 1 } = req.body;

    // 驗證商品是否存在
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({
            success: false,
            error: '商品不存在'
        });
    }

    // 驗證數量
    if (quantity < 1) {
        return res.status(400).json({
            success: false,
            error: '商品數量必須大於 0'
        });
    }

    const cart = getOrCreateCart(sessionId);
    const existingItemIndex = cart.items.findIndex(item => item.id === productId);

    if (existingItemIndex > -1) {
        // 商品已存在，增加數量
        cart.items[existingItemIndex].quantity += quantity;
    } else {
        // 新商品，添加到購物車
        cart.items.push({
            ...product,
            quantity: quantity
        });
    }

    // 重新計算總金額
    cart.totalAmount = calculateTotalAmount(cart.items);

    res.json({
        success: true,
        data: {
            items: cart.items,
            totalAmount: cart.totalAmount
        },
        message: '商品已添加到購物車'
    });
});

// 增加商品數量
app.put('/api/cart/:sessionId/items/:itemId/increase', (req, res) => {
    const { sessionId, itemId } = req.params;
    const cart = getOrCreateCart(sessionId);

    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({
            success: false,
            error: '商品不存在於購物車中'
        });
    }

    cart.items[itemIndex].quantity = (cart.items[itemIndex].quantity || 1) + 1;
    cart.totalAmount = calculateTotalAmount(cart.items);

    res.json({
        success: true,
        data: {
            items: cart.items,
            totalAmount: cart.totalAmount
        }
    });
});

// 減少商品數量
app.put('/api/cart/:sessionId/items/:itemId/decrease', (req, res) => {
    const { sessionId, itemId } = req.params;
    const cart = getOrCreateCart(sessionId);

    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({
            success: false,
            error: '商品不存在於購物車中'
        });
    }

    if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
    }

    cart.totalAmount = calculateTotalAmount(cart.items);

    res.json({
        success: true,
        data: {
            items: cart.items,
            totalAmount: cart.totalAmount
        }
    });
});

// 從購物車移除商品
app.delete('/api/cart/:sessionId/items/:itemId', (req, res) => {
    const { sessionId, itemId } = req.params;
    const cart = getOrCreateCart(sessionId);

    cart.items = cart.items.filter(item => item.id !== itemId);
    cart.totalAmount = calculateTotalAmount(cart.items);

    res.json({
        success: true,
        data: {
            items: cart.items,
            totalAmount: cart.totalAmount
        }
    });
});

// 清空購物車
app.delete('/api/cart/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const cart = getOrCreateCart(sessionId);

    cart.items = [];
    cart.totalAmount = 0;

    res.json({
        success: true,
        data: {
            items: cart.items,
            totalAmount: cart.totalAmount
        }
    });
});

// 錯誤處理中介軟體
app.use((error, req, res, next) => {
    console.error('伺服器錯誤:', error);
    res.status(500).json({
        success: false,
        error: '伺服器內部錯誤'
    });
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`購物車伺服器運行在 http://localhost:${PORT}`);
});