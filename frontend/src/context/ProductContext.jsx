import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/products` : 'http://localhost:5001/api/products';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (formData) => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProducts([response.data, ...products]);
      return true;
    } catch (error) {
      console.error("Error adding product:", error);
      return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter(p => p._id !== id));
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  };

  const updateProduct = async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProducts(products.map(p => p._id === id ? response.data : p));
      return true;
    } catch (error) {
      console.error("Error updating product:", error);
      return false;
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
