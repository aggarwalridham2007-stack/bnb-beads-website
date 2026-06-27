import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiPackage, FiMessageSquare, FiX } from 'react-icons/fi';
import { useInquiries } from '../../context/InquiryContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { inquiries, markAsRead } = useInquiries();
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
      {/* Sidebar */}
      <div className="w-64 bg-dark text-white p-6 shadow-xl min-h-[60vh] flex flex-col">
        <h2 className="text-xl font-serif text-primary mb-8 border-b border-gray-700 pb-4">BNB Admin</h2>
        <nav className="flex-grow space-y-4 font-light text-gray-300 text-sm">
          <Link to="/admin/dashboard" className="flex items-center text-white"><FiMessageSquare className="mr-3"/> Inquiries</Link>
          <Link to="/admin/products" className="flex items-center hover:text-white transition-colors"><FiPackage className="mr-3"/> Products</Link>
        </nav>
        <button onClick={handleLogout} className="flex items-center text-gray-400 hover:text-white mt-auto pt-4 border-t border-gray-700">
          <FiLogOut className="mr-3"/> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <h1 className="text-3xl font-serif text-dark mb-6">Recent Inquiries</h1>
        <div className="bg-white shadow border border-gray-100 rounded-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-medium">
                <th className="p-4">Date</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="font-light text-sm text-gray-700">
              {inquiries.map((inquiry) => (
                <tr key={inquiry._id} className={`border-b border-gray-50 hover:bg-gray-50 ${inquiry.status === 'New' ? 'bg-blue-50/30' : ''}`}>
                  <td className="p-4">{new Date(inquiry.date).toLocaleDateString()}</td>
                  <td className="p-4 font-medium">{inquiry.name}</td>
                  <td className="p-4">{inquiry.type}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${inquiry.status === 'New' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => { setSelectedInquiry(inquiry); markAsRead(inquiry._id); }} 
                      className="text-primary hover:underline text-xs uppercase tracking-wider font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">No inquiries yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl p-8 relative">
            <button onClick={() => setSelectedInquiry(null)} className="absolute top-6 right-6 text-gray-500 hover:text-dark">
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-serif text-dark mb-2">Inquiry Details</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-8">{new Date(selectedInquiry.date).toLocaleString()}</p>
            
            <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
              <div>
                <p className="text-gray-500 uppercase tracking-widest text-xs mb-1">Customer Name</p>
                <p className="font-medium text-dark">{selectedInquiry.name}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase tracking-widest text-xs mb-1">Request Type</p>
                <p className="font-medium text-dark">{selectedInquiry.type}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase tracking-widest text-xs mb-1">Email</p>
                <a href={`mailto:${selectedInquiry.email}`} className="text-primary hover:underline">{selectedInquiry.email}</a>
              </div>
              <div>
                <p className="text-gray-500 uppercase tracking-widest text-xs mb-1">Phone</p>
                <a href={`tel:${selectedInquiry.phone}`} className="text-primary hover:underline">{selectedInquiry.phone}</a>
              </div>
            </div>

            <div className="space-y-6 text-sm font-light text-gray-700">
              <div>
                <p className="text-gray-500 uppercase tracking-widest text-xs mb-2 font-normal">Customization Details</p>
                <p className="bg-gray-50 p-4 rounded-sm border border-gray-100">{selectedInquiry.details}</p>
              </div>
              {selectedInquiry.packaging && (
                <div>
                  <p className="text-gray-500 uppercase tracking-widest text-xs mb-2 font-normal">Packaging Preferences</p>
                  <p className="bg-gray-50 p-4 rounded-sm border border-gray-100">{selectedInquiry.packaging}</p>
                </div>
              )}
              {selectedInquiry.budget && (
                <div>
                  <p className="text-gray-500 uppercase tracking-widest text-xs mb-1 font-normal">Estimated Budget</p>
                  <p>{selectedInquiry.budget}</p>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex justify-end">
               <a 
                 href={`mailto:${selectedInquiry.email}?subject=Re: Your Custom ${selectedInquiry.type} Request at BNB`}
                 className="bg-dark text-white px-6 py-2 text-sm uppercase tracking-widest hover:bg-primary transition-colors"
               >
                 Reply via Email
               </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
