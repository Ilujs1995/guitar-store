// server.cjs
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

// 自定義訂單資料儲存
const customOrders = new Map();

// 聯絡表單資料儲存
const contactMessages = new Map();

// 生成 session ID
const generateSessionId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// 生成訂單 ID
const generateOrderId = () => {
    return 'ORDER-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase();
};

// 生成聯絡訊息 ID
const generateMessageId = () => {
    return 'MSG-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase();
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

// ==================== 原有的購物車 API ====================

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

// ==================== 自定義訂單 API ====================

// 提交自定義吉他訂單
app.post('/api/custom-orders', (req, res) => {
    try {
        const {
            topWood,
            backSidesWood,
            neckWood,
            fingerboardWood,
            bodyShape,
            bodyColor,
            bracingStyle,
            finish,
            inlayStyle,
            additionalRequests,
            timestamp
        } = req.body;

        // 基本驗證
        if (!topWood || !backSidesWood || !neckWood || !fingerboardWood || !bodyShape) {
            return res.status(400).json({
                success: false,
                error: 'Please fill in all required fields (wood types and body shape)'
            });
        }

        // 生成訂單 ID
        const orderId = generateOrderId();

        // 創建訂單對象
        const order = {
            orderId,
            specifications: {
                topWood,
                backSidesWood,
                neckWood,
                fingerboardWood,
                bodyShape,
                bodyColor,
                bracingStyle,
                finish,
                inlayStyle,
                additionalRequests
            },
            status: 'pending',
            submittedAt: timestamp || new Date().toISOString(),
            estimatedPrice: calculateEstimatedPrice({
                topWood,
                backSidesWood,
                neckWood,
                fingerboardWood,
                bodyShape,
                finish,
                inlayStyle
            })
        };

        // 儲存訂單
        customOrders.set(orderId, order);

        console.log('New custom order received:', orderId);
        console.log('Order details:', JSON.stringify(order, null, 2));

        res.json({
            success: true,
            data: {
                orderId,
                estimatedPrice: order.estimatedPrice,
                status: order.status
            },
            message: 'Custom order submitted successfully'
        });

    } catch (error) {
        console.error('Error processing custom order:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error while processing order'
        });
    }
});

// 查詢自定義訂單狀態
app.get('/api/custom-orders/:orderId', (req, res) => {
    const { orderId } = req.params;
    const order = customOrders.get(orderId);

    if (!order) {
        return res.status(404).json({
            success: false,
            error: 'Order not found'
        });
    }

    res.json({
        success: true,
        data: order
    });
});

// 獲取所有自定義訂單（管理用）
app.get('/api/custom-orders', (req, res) => {
    const orders = Array.from(customOrders.values()).sort((a, b) =>
        new Date(b.submittedAt) - new Date(a.submittedAt)
    );

    res.json({
        success: true,
        data: orders,
        count: orders.length
    });
});

// 更新訂單狀態（管理用）
app.put('/api/custom-orders/:orderId/status', (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'in-production', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid status. Valid statuses are: ' + validStatuses.join(', ')
        });
    }

    const order = customOrders.get(orderId);
    if (!order) {
        return res.status(404).json({
            success: false,
            error: 'Order not found'
        });
    }

    order.status = status;
    order.lastUpdated = new Date().toISOString();

    res.json({
        success: true,
        data: order,
        message: 'Order status updated successfully'
    });
});

// ==================== 新增的聯絡表單 API ====================

// 提交聯絡表單
app.post('/api/contact', (req, res) => {
    try {
        const { email, message, timestamp } = req.body;

        // 基本驗證
        if (!email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Email and message are required'
            });
        }

        // 驗證 email 格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Please provide a valid email address'
            });
        }

        // 生成訊息 ID
        const messageId = generateMessageId();

        // 創建聯絡訊息物件
        const contactMessage = {
            messageId,
            email: email.trim(),
            message: message.trim(),
            status: 'unread',
            submittedAt: timestamp || new Date().toISOString(),
            ipAddress: req.ip || req.connection.remoteAddress
        };

        // 儲存聯絡訊息
        contactMessages.set(messageId, contactMessage);

        console.log('New contact message received:', messageId);
        console.log('From:', email);
        console.log('Message:', message.substring(0, 100) + (message.length > 100 ? '...' : ''));

        res.json({
            success: true,
            data: {
                messageId,
                status: 'received'
            },
            message: 'Thank you for your message. We will reply to you ASAP!'
        });

    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error while processing your message'
        });
    }
});

// 獲取所有聯絡訊息（管理用）
app.get('/api/contact', (req, res) => {
    const messages = Array.from(contactMessages.values()).sort((a, b) =>
        new Date(b.submittedAt) - new Date(a.submittedAt)
    );

    res.json({
        success: true,
        data: messages,
        count: messages.length
    });
});

// 獲取單一聯絡訊息（管理用）
app.get('/api/contact/:messageId', (req, res) => {
    const { messageId } = req.params;
    const message = contactMessages.get(messageId);

    if (!message) {
        return res.status(404).json({
            success: false,
            error: 'Message not found'
        });
    }

    res.json({
        success: true,
        data: message
    });
});

// 更新聯絡訊息狀態（管理用）
app.put('/api/contact/:messageId/status', (req, res) => {
    const { messageId } = req.params;
    const { status } = req.body;

    const validStatuses = ['unread', 'read', 'replied', 'archived'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid status. Valid statuses are: ' + validStatuses.join(', ')
        });
    }

    const message = contactMessages.get(messageId);
    if (!message) {
        return res.status(404).json({
            success: false,
            error: 'Message not found'
        });
    }

    message.status = status;
    message.lastUpdated = new Date().toISOString();

    res.json({
        success: true,
        data: message,
        message: 'Message status updated successfully'
    });
});

// 計算預估價格的輔助函數
function calculateEstimatedPrice(specs) {
    let basePrice = 800; // 基礎價格

    // 根據木材類型調整價格
    const woodPricing = {
        'Spruce': 0,
        'Cedar': 50,
        'Koa': 200,
        'Mahogany': 100,
        'Rosewood': 150,
        'Maple': 75,
        'Ebony': 100
    };

    // 頂板木材
    basePrice += woodPricing[specs.topWood] || 0;

    // 背側板木材
    basePrice += woodPricing[specs.backSidesWood] || 0;

    // 琴頸木材
    basePrice += (woodPricing[specs.neckWood] || 0) * 0.5;

    // 指板木材
    basePrice += (woodPricing[specs.fingerboardWood] || 0) * 0.3;

    // 琴身形狀調整
    const shapePricing = {
        'OM': 0,
        'Dreadnought': 0,
        'Parlor': -50,
        'Jumbo': 100
    };
    basePrice += shapePricing[specs.bodyShape] || 0;

    // 漆面類型調整
    const finishPricing = {
        'Satin': 0,
        'Gloss': 50,
        'Matte': 25
    };
    basePrice += finishPricing[specs.finish] || 0;

    // 裝飾調整
    const inlayPricing = {
        'Simple Dots': 0,
        'Custom Design': 200,
        'No Inlays': -25
    };
    basePrice += inlayPricing[specs.inlayStyle] || 0;

    return Math.round(basePrice);
}

// 錯誤處理中介軟體
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('- Shopping cart API: /api/cart/*');
    console.log('- Products API: /api/products');
    console.log('- Custom orders API: /api/custom-orders');
    console.log('- Contact form API: /api/contact');
});