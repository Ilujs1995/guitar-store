# Guitar Store

使用 React 開發的吉他商店電商平台。

## 功能特色

- 響應式首頁展示
- 產品目錄瀏覽
- 購物車功能
- 吉他客製化表單
- 聯絡表單

## 技術棧

- React 18+
- React Router v6
- React Context API
- CSS3

## 安裝與運行

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm start

# 建置生產版本
npm run build
```

## 頁面路由

| 路由 | 說明 |
|------|------|
| `/` | 首頁 |
| `/product` | 產品頁面 |
| `/ac-01`, `/el-str`, `/el-lsp` | 吉他型號詳細頁 |
| `/manufacturing` | 製造工藝 |
| `/customizationform` | 客製化表單 |
| `/contactus` | 聯絡我們 |
| `/cart` | 購物車 |

## 專案結構

```
src/
├── components/    # 通用組件
├── pages/         # 頁面組件
├── context/       # 狀態管理
└── App.js         # 主要路由配置
```

開發伺服器運行在 `http://localhost:3000`
