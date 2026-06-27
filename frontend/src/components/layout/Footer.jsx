import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8 border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl text-primary mb-4 uppercase">BNB BEADS AND BAGS</h3>
            <p className="text-gray-400 font-light max-w-sm mb-6">
              Handcrafted luxury pieces that bring elegance to your home and style to your wardrobe. 
              Every piece is made with love, precision, and the finest materials.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/bnbhomedecor" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors"><FiInstagram size={20} /></a>
              <a href="https://www.facebook.com/share/1BdH66ipft/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors"><FiFacebook size={20} /></a>
              <a href="mailto:bnbdecor25@gmail.com" className="text-gray-400 hover:text-primary transition-colors"><FiMail size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-secondary tracking-wider">Quick Links</h4>
            <ul className="space-y-2 font-light text-gray-400">
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Our Collections</Link></li>
              <li><Link to="/custom-order" className="hover:text-primary transition-colors">Custom Orders</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-secondary tracking-wider">Inquiries</h4>
            <ul className="space-y-2 font-light text-gray-400">
              <li>Custom Orders</li>
              <li>Corporate Gifting</li>
              <li>Wholesale</li>
              <li><Link to="/contact" className="text-primary hover:underline">Get in Touch &rarr;</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-light">
          <p>&copy; {new Date().getFullYear()} BNB Beads and bags. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/admin/login" className="hover:text-primary">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
