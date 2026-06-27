import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiPackage, FiMessageSquare, FiPlus, FiEdit, FiTrash2, FiX, FiMinus } from 'react-icons/fi';
import { useProducts } from '../../context/ProductContext';

const ManageProducts = () => {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '', 
    isFeatured: false,
    specifications: [{ key: '', value: '' }]
  });
  
  // Robust image state handling
  const [images, setImages] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingId(product._id);
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price || '',
        category: product.category?.name || '', 
        isFeatured: product.isFeatured || false,
        specifications: product.specifications && product.specifications.length > 0 
          ? product.specifications 
          : [{ key: '', value: '' }]
      });
    } else {
      setEditingId(null);
      setFormData({ 
        name: '', 
        description: '', 
        price: '', 
        category: '', 
        isFeatured: false,
        specifications: [{ key: '', value: '' }]
      });
    }
    setImages([]); 
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    // Store actual file objects for upload
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData({ ...formData, specifications: newSpecs });
  };

  const addSpecRow = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { key: '', value: '' }]
    });
  };

  const removeSpecRow = (index) => {
    const newSpecs = formData.specifications.filter((_, i) => i !== index);
    setFormData({ ...formData, specifications: newSpecs.length ? newSpecs : [{ key: '', value: '' }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('isFeatured', formData.isFeatured);
    data.append('specifications', JSON.stringify(formData.specifications.filter(s => s.key.trim() !== '')));
    
    // Append actual File objects
    images.forEach(file => {
      data.append('images', file);
    });

    try {
      if (editingId) {
        await updateProduct(editingId, data);
      } else {
        await addProduct(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
      {/* Sidebar */}
      <div className="w-64 bg-dark text-white p-6 shadow-xl min-h-[60vh] flex flex-col">
        <h2 className="text-xl font-serif text-primary mb-8 border-b border-gray-700 pb-4">BNB Admin</h2>
        <nav className="flex-grow space-y-4 font-light text-gray-300 text-sm">
          <Link to="/admin/dashboard" className="flex items-center hover:text-white transition-colors"><FiMessageSquare className="mr-3"/> Inquiries</Link>
          <Link to="/admin/products" className="flex items-center text-white"><FiPackage className="mr-3"/> Products</Link>
        </nav>
        <button onClick={handleLogout} className="flex items-center text-gray-400 hover:text-white mt-auto pt-4 border-t border-gray-700">
          <FiLogOut className="mr-3"/> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-serif text-dark">Manage Products</h1>
          <button onClick={() => openModal()} className="bg-primary text-dark px-4 py-2 text-sm font-medium uppercase tracking-wider flex items-center hover:bg-dark hover:text-primary transition-colors">
            <FiPlus className="mr-2" /> Add Product
          </button>
        </div>

        <div className="bg-white shadow border border-gray-100 rounded-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-medium">
                <th className="p-4 w-16">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="font-light text-sm text-gray-700">
              {products.map(product => (
                <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="w-12 h-12 bg-gray-200">
                      <img src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/100'} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-gray-500">{product.category?.name || 'Uncategorized'}</td>
                  <td className="p-4">₹{product.price || 'N/A'}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => openModal(product)} className="text-blue-500 hover:text-blue-700 mr-3"><FiEdit size={18}/></button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700"><FiTrash2 size={18}/></button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">No products found. Add one to get started!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-dark">
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-serif text-dark mb-6">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-gray-600 mb-1">Product Name</label>
                  <input required type="text" className="w-full border p-2 focus:border-primary outline-none font-light" 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                
                <div>
                  <label className="block text-xs uppercase text-gray-600 mb-1">Product Images</label>
                  <div className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors relative">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange} 
                    />
                    <div className="pointer-events-none">
                      <p className="text-sm text-gray-500 font-medium">Click to upload multiple images</p>
                    </div>
                  </div>
                  
                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="mt-4 flex gap-2 flex-wrap">
                      {images.map((file, index) => (
                      <div key={index} className="relative group rounded-md overflow-hidden h-20 w-20 border border-gray-200">
                        <img src={typeof file === 'string' ? file : URL.createObjectURL(file)} alt="preview" className="h-full w-full object-cover" />
                        <button 
                          type="button" 
                             onClick={() => removeImage(index)}
                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                           >
                             <FiX size={12} />
                           </button>
                         </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-600 mb-1">Description</label>
                <textarea required rows="3" className="w-full border p-2 focus:border-primary outline-none font-light"
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-xs uppercase text-gray-600 mb-1">Price (₹)</label>
                  <input type="number" className="w-full border p-2 focus:border-primary outline-none font-light"
                    value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div className="w-1/2">
                  <label className="block text-xs uppercase text-gray-600 mb-1">Category</label>
                  <input type="text" className="w-full border p-2 focus:border-primary outline-none font-light"
                    value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Home Decor" />
                </div>
              </div>

              {/* Dynamic Specifications */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-xs uppercase text-gray-600 font-medium">Product Specifications</label>
                  <button type="button" onClick={addSpecRow} className="text-xs text-primary hover:text-dark flex items-center font-medium uppercase tracking-wider">
                    <FiPlus className="mr-1"/> Add Row
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.specifications.map((spec, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <div className="w-1/3">
                        <input type="text" placeholder="e.g. Material" className="w-full border p-2 text-sm focus:border-primary outline-none font-light"
                          value={spec.key} onChange={e => handleSpecChange(index, 'key', e.target.value)} />
                      </div>
                      <div className="w-flex-grow flex-1">
                        <input type="text" placeholder="e.g. Pure Glass Beads" className="w-full border p-2 text-sm focus:border-primary outline-none font-light"
                          value={spec.value} onChange={e => handleSpecChange(index, 'value', e.target.value)} />
                      </div>
                      <button type="button" onClick={() => removeSpecRow(index)} className="text-red-400 hover:text-red-600 p-2">
                        <FiMinus />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-dark text-white py-3 uppercase tracking-widest text-sm hover:bg-primary hover:text-dark transition-colors mt-6">
                {editingId ? 'Update Product' : 'Save Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
