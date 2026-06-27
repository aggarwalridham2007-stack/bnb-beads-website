import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMessageCircle, FiMail } from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading: contextLoading } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (contextLoading) return;
    
    const foundProduct = products.find(p => p._id === id);
    if (foundProduct) {
      setProduct({
        ...foundProduct,
        description: foundProduct.description || 'Exquisitely handcrafted luxury piece. Made with precision and care by skilled artisans.',
        // Only use fallback specs if the product literally has 0 specs (including empty arrays)
        specifications: foundProduct.specifications && foundProduct.specifications.length > 0 
          ? foundProduct.specifications 
          : []
      });
      setMainImage(foundProduct.images && foundProduct.images[0] ? foundProduct.images[0] : '/beaded_bag_mockup.jpg');
    } else {
      setProduct(null);
    }
    setLoading(false);
  }, [id, products, contextLoading]);

  if (loading || contextLoading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  if (!product) return <div className="text-center py-20 font-light text-gray-500">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Images */}
        <div className="w-full md:w-1/2">
          {/* Main Showcase Image */}
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden mb-4">
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover transition-opacity duration-300" />
          </div>
          
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setMainImage(img)}
                  className={`aspect-square bg-gray-100 cursor-pointer border-2 transition-colors ${mainImage === img ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-serif text-dark mb-4">{product.name}</h1>
          {product.price && <p className="text-2xl font-light text-gray-700 mb-8">₹{product.price}</p>}
          
          <div className="prose prose-sm text-gray-600 font-light mb-8">
            <p>{product.description}</p>
          </div>

          {/* Action Buttons for Showcase */}
          <div className="flex flex-col space-y-4 mb-12">
            <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-2">Interested in this piece?</p>
            <a 
              href={`https://wa.me/918126741039?text=I'm%20interested%20in%20the%20${product.name}%20(ID:${product._id})`}
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center w-full py-4 bg-[#25D366] text-white hover:bg-[#128C7E] transition-colors font-medium tracking-wide uppercase text-sm"
            >
              <FiMessageCircle className="mr-2" size={18} /> Inquire via WhatsApp
            </a>
            <Link 
              to={`/contact?product=${product._id}`}
              className="flex items-center justify-center w-full py-4 border border-dark text-dark hover:bg-dark hover:text-white transition-colors font-medium tracking-wide uppercase text-sm"
            >
              <FiMail className="mr-2" size={18} /> Send an Email Inquiry
            </Link>
          </div>

          {/* Specs */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-serif text-xl mb-4">Specifications</h3>
              <ul className="space-y-2">
                {product.specifications.map((spec, idx) => (
                  <li key={idx} className="flex justify-between border-b border-gray-100 pb-2 text-sm">
                    <span className="text-gray-500 font-medium">{spec.key}</span>
                    <span className="text-gray-700 font-light text-right">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
