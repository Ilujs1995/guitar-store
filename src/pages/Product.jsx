// src/pages/Product.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../pages/ProductCard';
import './Product.css';
import { useShoppingCart } from '../context/ShoppingCartContext';
import acGuitarSound from '../assets/audios/AC-01.mp3';
import elStrSound from '../assets/audios/EL-STR.mp3';
import elLspSound from '../assets/audios/EL-LSP.mp3';

// 導入圖片
import ac01Image from '/src/assets/images/product-acoustic-guitar.jpg';
import lesPaulImage from '/src/assets/images/product-les-paul.jpg';
import stratocasterImage from '/src/assets/images/product-stratocaster.jpg';

// 預設商品資料 - 當後端無法連接時使用
const DEFAULT_PRODUCTS = [
    {
        id: 'AC-01',
        name: 'Acoustic Guitar AC-01',
        price: 449,
        imageUrl: ac01Image,
        description: 'Warm wood tone, suitable for fingerpicking.',
        audioSrc: acGuitarSound
    },
    {
        id: 'EL-STR',
        name: 'Electric Guitar EL-STR',
        price: 550,
        imageUrl: stratocasterImage,
        description: 'Bright and clear tone, suitable for funk.',
        audioSrc: elStrSound
    },
    {
        id: 'EL-LSP',
        name: 'Electric Guitar EL-LSP',
        price: 600,
        imageUrl: lesPaulImage,
        description: 'Full-bodied, suitable for heavy metal rock.',
        audioSrc: elLspSound
    }
];

function Product() {
    const { getProducts } = useShoppingCart();
    const [products, setProducts] = useState(DEFAULT_PRODUCTS);

    // 嘗試從後端獲取商品資料
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getProducts();
                if (productsData && productsData.length > 0) {
                    setProducts(productsData);
                }
            } catch (err) {
                // 靜默處理錯誤，繼續使用預設資料
            }
        };

        const timer = setTimeout(fetchProducts, 100);
        return () => clearTimeout(timer);
    }, [getProducts]);

    return (
        <main className="product-main">
            <h2 className="product-title">✨Genuine Guitar✨</h2>

            <section className="product-list">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        productId={product.id}
                        image={product.imageUrl}
                        title={product.name}
                        price={product.price}
                        description={product.description || (
                            product.id === 'AC-01' ? 'Warm wood tone, suitable for fingerpicking.' :
                                product.id === 'EL-STR' ? 'Bright and clear tone, suitable for funk.' :
                                    product.id === 'EL-LSP' ? 'Full-bodied, suitable for heavy metal rock.' : ''
                        )}
                        audioSrc={
                            product.audioSrc || (
                                product.id === 'AC-01' ? acGuitarSound :
                                    product.id === 'EL-STR' ? elStrSound :
                                        product.id === 'EL-LSP' ? elLspSound : ''
                            )
                        }
                        link={`/${product.id.toLowerCase()}`}
                        quantity={1}
                    />
                ))}
            </section>
        </main>
    );
}

export default Product;