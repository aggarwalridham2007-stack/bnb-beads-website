import React, { useState } from 'react';
import { useInquiries } from '../context/InquiryContext';
import { FiCheckCircle } from 'react-icons/fi';

const CustomOrder = () => {
  const { addInquiry } = useInquiries();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Gift Hamper',
    details: '',
    packaging: '',
    budget: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addInquiry(formData);
    setSubmitted(true);
    // Reset form
    setFormData({ name: '', email: '', phone: '', type: 'Gift Hamper', details: '', packaging: '', budget: '' });
    // Hide success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="w-full bg-[#faf9f6]">
      {/* Header */}
      <section className="relative py-20 bg-dark text-center">
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-wide">Bespoke Requests & Custom Hampers</h1>
          <p className="text-gray-300 font-light max-w-2xl mx-auto">
            From personalized luxury gift hampers to custom-designed beaded bags and home decor, our artisans will bring your unique vision to life.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-serif text-dark mb-2">Submit Your Request</h2>
            <p className="text-sm text-gray-500 font-light">Tell us what you are looking for, and we will get back to you with a quote.</p>
          </div>

          {submitted && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-800 flex items-center justify-center">
              <FiCheckCircle className="mr-2" size={20} />
              <span className="font-light">Thank you! Your custom request has been successfully submitted. We will contact you soon.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:border-primary focus:outline-none transition-colors font-light text-dark bg-transparent" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:border-primary focus:outline-none transition-colors font-light text-dark bg-transparent" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Phone / WhatsApp</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:border-primary focus:outline-none transition-colors font-light text-dark bg-transparent" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Request Type</label>
                <select name="type" value={formData.type} onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:border-primary focus:outline-none transition-colors font-light text-dark bg-transparent">
                  <option value="Gift Hamper">Custom Gift Hamper</option>
                  <option value="Beaded Bag">Custom Beaded Bag</option>
                  <option value="Home Decor">Custom Home Decor</option>
                  <option value="Other">Other Bespoke Request</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Customization Details</label>
              <textarea required rows="4" name="details" value={formData.details} onChange={handleChange} placeholder="What colors, sizes, or specific items do you want included?"
                className="w-full border border-gray-300 p-3 focus:border-primary focus:outline-none transition-colors font-light text-dark bg-transparent"></textarea>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Packaging Preferences</label>
              <textarea rows="2" name="packaging" value={formData.packaging} onChange={handleChange} placeholder="e.g., specific ribbon colors, handwritten notes, box styles"
                className="w-full border border-gray-300 p-3 focus:border-primary focus:outline-none transition-colors font-light text-dark bg-transparent"></textarea>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Estimated Budget (Optional)</label>
              <input type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="₹"
                className="w-full border-b border-gray-300 py-2 focus:border-primary focus:outline-none transition-colors font-light text-dark bg-transparent" />
            </div>

            <button type="submit" className="w-full py-4 bg-dark text-white uppercase tracking-widest text-sm font-medium hover:bg-primary hover:text-dark transition-all duration-300 mt-4">
              Submit Request
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CustomOrder;
