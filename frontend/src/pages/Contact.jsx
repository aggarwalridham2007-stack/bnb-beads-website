import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    // Mock API call
    setTimeout(() => {
      setStatus('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row gap-16">
        
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-serif text-dark mb-6">Get in Touch</h1>
          <p className="text-gray-500 font-light mb-8">
            Whether you have a question about our collections, need assistance with a custom order, or just want to say hello, we'd love to hear from you.
          </p>
          
          <div className="space-y-6 text-dark font-light">
            <div>
              <h4 className="font-medium font-sans uppercase tracking-widest text-xs text-gray-400 mb-1">Email</h4>
              <p>bnbdecor25@gmail.com</p>
            </div>
            <div>
              <h4 className="font-medium font-sans uppercase tracking-widest text-xs text-gray-400 mb-1">WhatsApp / Phone</h4>
              <p>+91 8126741039</p>
            </div>
            <div>
              <h4 className="font-medium font-sans uppercase tracking-widest text-xs text-gray-400 mb-1">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://instagram.com/bnbhomedecor" target="_blank" rel="noreferrer" className="text-dark hover:text-primary transition-colors">Instagram</a>
                <a href="https://www.facebook.com/share/1BdH66ipft/" target="_blank" rel="noreferrer" className="text-dark hover:text-primary transition-colors">Facebook</a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white p-8 shadow-xl border border-gray-100">
          <h3 className="font-serif text-2xl mb-6">Send an Inquiry</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Name</label>
              <input 
                type="text" 
                required 
                className="w-full border-b border-gray-300 focus:border-primary focus:outline-none py-2 font-light transition-colors"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Email</label>
                <input 
                  type="email" 
                  required 
                  className="w-full border-b border-gray-300 focus:border-primary focus:outline-none py-2 font-light transition-colors"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Phone (Optional)</label>
                <input 
                  type="tel" 
                  className="w-full border-b border-gray-300 focus:border-primary focus:outline-none py-2 font-light transition-colors"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1 mt-4">Message</label>
              <textarea 
                required 
                rows="4"
                className="w-full border-b border-gray-300 focus:border-primary focus:outline-none py-2 font-light transition-colors resize-none"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            
            <button type="submit" className="w-full bg-dark text-white hover:bg-primary py-4 uppercase tracking-widest text-sm font-medium transition-colors mt-6">
              Send Message
            </button>
            
            {status && <p className={`text-sm mt-4 text-center ${status.includes('success') ? 'text-green-600' : 'text-primary'}`}>{status}</p>}
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
