import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu as MenuIcon, FiX as CloseIcon } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              {/* Fallback to text if logo.jpg is not placed in public folder yet */}
              <img src="/logo.jpg" alt="BNB Beads and bags Logo" className="h-12 w-auto rounded-full object-cover" 
                onError={(e) => { e.target.style.display='none'; document.getElementById('text-logo').style.display='block'; }} />
              <span id="text-logo" style={{display: 'none'}} className="font-serif text-2xl font-bold text-primary tracking-wider uppercase">
                BNB BEADS AND BAGS
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-dark hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">Home</Link>
            <Link to="/catalog" className="text-dark hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">Collections</Link>
            <Link to="/custom-order" className="text-dark hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">Custom Orders</Link>
            <Link to="/about" className="text-dark hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">About</Link>
            <Link to="/contact" className="text-dark hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">Contact</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-dark hover:text-primary focus:outline-none">
              {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-dark absolute w-full left-0 top-20 shadow-xl border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link to="/" onClick={() => setIsOpen(false)} className="px-3 py-2 text-white hover:text-primary text-base font-medium tracking-wider uppercase">Home</Link>
            <Link to="/catalog" onClick={() => setIsOpen(false)} className="px-3 py-2 text-white hover:text-primary text-base font-medium tracking-wider uppercase">Collections</Link>
            <Link to="/custom-order" onClick={() => setIsOpen(false)} className="px-3 py-2 text-white hover:text-primary text-base font-medium tracking-wider uppercase">Custom Orders</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="px-3 py-2 text-white hover:text-primary text-base font-medium tracking-wider uppercase">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="px-3 py-2 text-white hover:text-primary text-base font-medium tracking-wider uppercase">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
