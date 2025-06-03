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

// 購物車資料儲存
const cartStorage = new Map();

// 生成 session ID
const generateSessionId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// 計算購物車總金額
const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// 獲取或創建購物車
const getOrCreateCart = (sessionId) => {
    if (!cartStorage.has(sessionId)) {
        cartStorage.set(sessionId, { items: [], totalAmount: 0 });
    }
    return cartStorage.get(sessionId);
};

// 獲取所有商品
app.get('/api/products', (req, res) => {
    res.json({ success: true, data: products });
});

// 根據 ID 獲取單一商品
app.get('/api/products/:productId', (req, res) => {
    const product = products.find(p => p.id === req.params.productId);

    if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, data: product });
});

// 獲取購物車內容
app.get('/api/cart/:sessionId', (req, res) => {
    const cart = getOrCreateCart(req.params.sessionId);
    res.json({
        success: true,
        data: { items: cart.items, totalAmount: cart.totalAmount }
    });
});

// 創建新的 session
app.post('/api/cart/session', (req, res) => {
    const sessionId = generateSessionId();
    getOrCreateCart(sessionId);
    res.json({ success: true, data: { sessionId } });
});

// 添加商品到購物車
app.post('/api/cart/:sessionId/items', (req, res) => {
    const { sessionId } = req.params;
    const { productId, quantity = 1 } = req.body;

    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
    }

    if (quantity < 1) {
        return res.status(400).json({ success: false, error: 'Quantity must be greater than 0' });
    }

    const cart = getOrCreateCart(sessionId);
    const existingItemIndex = cart.items.findIndex(item => item.id === productId);

    if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
    } else {
        cart.items.push({ ...product, quantity });
    }

    cart.totalAmount = calculateTotalAmount(cart.items);

    res.json({
        success: true,
        data: { items: cart.items, totalAmount: cart.totalAmount },
        message: 'Item added to cart'
    });
});

// 增加商品數量
app.put('/api/cart/:sessionId/items/:itemId/increase', (req, res) => {
    const { sessionId, itemId } = req.params;
    const cart = getOrCreateCart(sessionId);
    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({ success: false, error: 'Item not found in cart' });
    }

    cart.items[itemIndex].quantity += 1;
    cart.totalAmount = calculateTotalAmount(cart.items);

    res.json({
        success: true,
        data: { items: cart.items, totalAmount: cart.totalAmount }
    });
});

// 減少商品數量
app.put('/api/cart/:sessionId/items/:itemId/decrease', (req, res) => {
    const { sessionId, itemId } = req.params;
    const cart = getOrCreateCart(sessionId);
    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({ success: false, error: 'Item not found in cart' });
    }

    if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
    }

    cart.totalAmount = calculateTotalAmount(cart.items);

    res.json({
        success: true,
        data: { items: cart.items, totalAmount: cart.totalAmount }
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
        data: { items: cart.items, totalAmount: cart.totalAmount }
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
        data: { items: cart.items, totalAmount: cart.totalAmount }
    });
});

// 錯誤處理中介軟體
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`Shopping cart server running on http://localhost:${PORT}`);
});