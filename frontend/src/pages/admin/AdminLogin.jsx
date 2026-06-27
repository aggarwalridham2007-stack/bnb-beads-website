import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, call backend /api/auth/login and store JWT
    if (email === 'admin@bbbeads.com' && password === 'admin123') {
      localStorage.setItem('adminToken', 'mock-token');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials (use admin@bbbeads.com / admin123 for demo)');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-lg border border-gray-100">
        <h2 className="text-3xl font-serif text-center text-dark mb-8">Admin Portal</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Admin Email</label>
            <input 
              type="email" 
              required 
              className="w-full border border-gray-300 p-3 focus:border-primary focus:outline-none font-light transition-colors"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Password</label>
            <input 
              type="password" 
              required 
              className="w-full border border-gray-300 p-3 focus:border-primary focus:outline-none font-light transition-colors"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-dark text-white hover:bg-primary py-3 uppercase tracking-widest text-sm font-medium transition-colors">
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
