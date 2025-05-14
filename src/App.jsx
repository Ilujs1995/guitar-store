// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Feature from './components/Feature';
import Highlight from './components/Highlight';
import ServiceList from './components/ServiceList';
import Testimonial from './components/Testimonial';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Product from './pages/Product'; // 匯入 Product 頁面
import AC01 from './pages/Ac-01'; // Import the AC01 component
import ELSTR from './pages/EL-STR'; // Import the ELSTR component
import ELLSP from './pages/EL-LSP'; // Import the EL-LSP component
import Manufacturing from './pages/Manufacturing';
import CustomizationForm from './pages/CustomizationForm';
import ContactUs from './pages/ContactUs';
import './App.css';
import { ShoppingCartProvider } from './context/ShoppingCartContext'; // 確保路徑正確
import ShoppingCart from './pages/ShoppingCart'; // 確保路徑正確

function App() {
  return (
    <Router>
      <ShoppingCartProvider> {/* 包裹整個應用程式 */}
        <div>
          <Header />
          <Routes>
            <Route path="/" element={
              <main>
                <Hero />
                <Feature />
                <Highlight />
                <ServiceList />
                <Testimonial />
                <Banner />
              </main>
            } />
            <Route path="/product" element={<Product />} />
            <Route path="/ac-01" element={<AC01 />} /> {/* Add this route for AC01 */}
            <Route path="/el-str" element={<ELSTR />} /> {/* Add this route for ELSTR */}
            <Route path="/el-lsp" element={<ELLSP />} /> {/* Add this route for ELLSP */}
            <Route path="/manufacturing" element={<Manufacturing />} /> {/* Add this route for Manufacturing */}
            <Route path="/customizationform" element={<CustomizationForm />} /> {/* Add this route for CustomizationForm */}
            <Route path="/contactus" element={<ContactUs />} /> {/* Add this route for ContactUs */}
            <Route path="/cart" element={<ShoppingCart />} /> {/* 添加購物車頁面的路由 */}
          </Routes>
          <Footer />
        </div>
      </ShoppingCartProvider> {/* 結束包裹 */}
    </Router>
  );
}

export default App;