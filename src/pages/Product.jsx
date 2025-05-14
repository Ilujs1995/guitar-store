// src/pages/Product.jsx
import React from 'react';
import ProductCard from '../pages/ProductCard'; // 確保路徑正確
import './Product.css';
import products from '../context/Products'; // 確保路徑正確
import { useShoppingCart } from '../context/ShoppingCartContext'; // 確保路徑正確
import acGuitarSound from '../assets/audios/AC-01.mp3';
import elStrSound from '../assets/audios/EL-STR.mp3';
import elLspSound from '../assets/audios/EL-LSP.mp3';

function Product() {
    const { addItem } = useShoppingCart();

    const handleAddToCart = (product) => {
        addItem(product);
    };

    const buttonStyle = { // 定義你的按鈕樣式
        marginRight: '1.5rem',
        padding: '0.75rem 1.5rem',
        fontSize: '1.1rem',
        border: '1px solid #705C53',
        backgroundColor: '#705C53',
        color: 'white',
        cursor: 'pointer',
        borderRadius: '6px',
    };

    return (
        <>
            <main className="product-main">
                <h2 className="product-title">✨Genuine Guitar✨</h2>
                <section className="product-list">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            image={product.imageUrl}
                            title={product.name}
                            description={
                                product.id === 'AC-01' ? 'Warm wood tone, suitable for fingerpicking.' :
                                    product.id === 'EL-STR' ? 'Bright and clear tone, suitable for funk.' :
                                        product.id === 'EL-LSP' ? 'Full-bodied, suitable for heavy metal rock.' : ''
                            }
                            audioSrc={
                                product.id === 'AC-01' ? acGuitarSound :
                                    product.id === 'EL-STR' ? elStrSound :
                                        product.id === 'EL-LSP' ? elLspSound : ''
                            }
                            link={`/${product.id.toLowerCase()}`} // 使用小寫的產品ID作為路由
                            onAddToCart={() => handleAddToCart(product)} // 傳遞加入購物車的函式
                        />
                    ))}
                </section>
            </main>


        </>
    );
}

export default Product;