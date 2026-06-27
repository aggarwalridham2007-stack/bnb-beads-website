import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import { ProductProvider } from './context/ProductContext';
import { InquiryProvider } from './context/InquiryContext';
import CustomOrder from './pages/CustomOrder';

function App() {
  return (
    <ProductProvider>
      <InquiryProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20"> {/* pt-20 for sticky navbar offset */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/custom-order" element={<CustomOrder />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<ManageProducts />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </Router>
      </InquiryProvider>
    </ProductProvider>
  );
}

export default App;
