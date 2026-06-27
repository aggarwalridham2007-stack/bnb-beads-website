import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const Catalog = () => {
  const { products, loading } = useProducts();

  // Group products by category name
  const groupedProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      const catName = product.category?.name || 'Uncategorized';
      if (!acc[catName]) acc[catName] = [];
      acc[catName].push(product);
      return acc;
    }, {});
  }, [products]);

  // Extract ordered categories for the sidebar
  // (We can force 'Beaded Bags' to be top and 'Gift Hampers' to be bottom if we want, but alphabetical is usually safest. Let's do custom sorting as requested)
  const categoryNames = useMemo(() => {
    const names = Object.keys(groupedProducts);
    
    // Sort logic: Beaded Bags first, Gift Hampers last
    return names.sort((a, b) => {
      if (a.toLowerCase().includes('bag')) return -1;
      if (b.toLowerCase().includes('bag')) return 1;
      if (a.toLowerCase().includes('hamper')) return 1;
      if (b.toLowerCase().includes('hamper')) return -1;
      return a.localeCompare(b); // Alphabetical for the rest
    });
  }, [groupedProducts]);

  const scrollToCategory = (categoryName) => {
    const elementId = `category-${categoryName.replace(/\s+/g, '-').toLowerCase()}`;
    const element = document.getElementById(elementId);
    if (element) {
      // Smooth scroll with offset for the sticky navbar
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-dark mb-4">Our Collections</h1>
        <p className="text-gray-500 font-light max-w-2xl mx-auto">Explore our premium range of handcrafted luxury items.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 relative">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-28 space-y-8">
            <div>
              <h3 className="font-serif text-xl border-b border-gray-200 pb-2 mb-4">Categories</h3>
              <ul className="space-y-3 font-light text-gray-600">
                <li 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  All Products
                </li>
                {categoryNames.map(name => (
                  <li 
                    key={name}
                    onClick={() => scrollToCategory(name)}
                    className="hover:text-primary cursor-pointer transition-colors"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Sections */}
        <div className="flex-grow">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : products.length === 0 ? (
             <div className="text-center py-20 text-gray-500">No products available.</div>
          ) : (
            <div className="space-y-16">
              {categoryNames.map(category => (
                <div key={category} id={`category-${category.replace(/\s+/g, '-').toLowerCase()}`} className="pt-4">
                  
                  <div className="mb-6 flex items-center">
                    <h2 className="text-3xl font-serif text-dark mr-4">{category}</h2>
                    <div className="h-[1px] bg-gray-200 flex-grow mt-2"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {groupedProducts[category].map(product => (
                      <Link to={`/product/${product._id}`} key={product._id} className="group flex flex-col">
                        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4 shadow-sm border border-gray-100 luxury-border">
                          <img 
                            src={product.images && product.images[0] ? product.images[0] : '/beaded_bag_mockup.jpg'} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                          />
                          <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-500"></div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{product.category?.name || 'Category'}</p>
                          <h3 className="font-serif text-lg text-dark mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                          {product.price && <p className="font-light text-gray-600">₹{product.price}</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
