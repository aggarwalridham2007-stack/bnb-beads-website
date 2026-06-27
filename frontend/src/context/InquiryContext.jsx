import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const InquiryContext = createContext();

export const useInquiries = () => useContext(InquiryContext);

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/inquiries` : 'http://localhost:5001/api/inquiries';

export const InquiryProvider = ({ children }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setInquiries(response.data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const addInquiry = async (inquiryData) => {
    try {
      const response = await axios.post(API_URL, inquiryData);
      setInquiries([response.data, ...inquiries]);
      return true;
    } catch (error) {
      console.error("Error saving inquiry:", error);
      return false;
    }
  };

  const updateInquiryStatus = async (id, newStatus) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}/status`, { status: newStatus });
      setInquiries(inquiries.map(inq => inq._id === id ? response.data : inq));
      return true;
    } catch (error) {
      console.error("Error updating inquiry status:", error);
      return false;
    }
  };

  return (
    <InquiryContext.Provider value={{ inquiries, addInquiry, updateInquiryStatus, loading }}>
      {children}
    </InquiryContext.Provider>
  );
};
