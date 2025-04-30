import React from 'react';
import ProductCard from './ProductCard';
import acousticGuitarImage from '/src/assets/images/product-acoustic-guitar.jpg';
import stratocasterImage from '/src/assets/images/product-stratocaster.jpg';
import lesPaulImage from '/src/assets/images/product-les-paul.jpg';
import './Product.css';

function Product() {
    return (
        <>
            <main className="product-main">
                <h2 className="product-title">✨Genuine Guitar✨</h2>
                <section className="product-list">
                    <ProductCard
                        image={acousticGuitarImage}
                        title="AC-01"
                        description="Warm wood tone, suitable for fingerpicking."
                        audioSrc="audio/Output1.mp3"
                        link="/ac-01"
                    />
                    <ProductCard
                        image={stratocasterImage}
                        title="EL-STR"
                        description="Bright and clear tone, suitable for funk."
                        audioSrc="audio/guitar2.mp3"
                        link="/el-str"
                    />
                    <ProductCard
                        image={lesPaulImage}
                        title="EL-LSP"
                        description="Full-bodied, suitable for heavy metal rock."
                        audioSrc="audio/guitar2.mp3"
                        link="/el-lsp"
                    />
                </section>
            </main>

            <footer>
                <p>&copy; 2025 吉他音色商店. All rights reserved.</p>
            </footer>
        </>
    );
}

export default Product;