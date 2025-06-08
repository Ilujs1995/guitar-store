# Guitar Store

## 功能特色

- 響應式首頁
- 產品目錄與音色試聽
- 購物車
- 吉他客製化表單
- 聯絡表單

## 技術棧

- React 18+
- React Router v6
- React Context API
- CSS3

## npm run dev

https://guitar-store-git-main-ilujs1995s-projects.vercel.app/

## 頁面路由

| 路由 | 說明 |
|------|------|
| `/` | 首頁 |
| `/product` | 產品頁面 |
| `/ac-01`, `/el-str`, `/el-lsp` | 吉他型號介紹 |
| `/manufacturing` | 製造工藝 |
| `/customizationform` | 客製化表單 |
| `/contactus` | 聯絡我們 |
| `/cart` | 購物車 |

## 專案結構

```
guitar-store/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/          # 可重用組件
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── Feature.js
│   │   ├── Highlight.js
│   │   ├── ServiceList.js
│   │   ├── Testimonial.js
│   │   ├── Banner.js
│   │   └── Footer.js
│   ├── pages/               # 頁面組件
│   │   ├── Product.js
│   │   ├── AC-01.js
│   │   ├── EL-STR.js
│   │   ├── EL-LSP.js
│   │   ├── Manufacturing.js
│   │   ├── CustomizationForm.js
│   │   ├── ContactUs.js
│   │   └── ShoppingCart.js
│   ├── context/             # Context 狀態管理
│   │   └── ShoppingCartContext.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

開發伺服器運行在 `http://localhost:3000`
