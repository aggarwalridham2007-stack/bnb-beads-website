import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { FiArrowRight } from 'react-icons/fi';
import Glitter from '../components/ui/Glitter';

const Home = () => {
  const { products, loading } = useProducts();

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-dark">
        {/* Dynamic Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/gift_hamper_mockup.jpg" 
            alt="Luxury Hamper" 
            className="w-full h-full object-cover opacity-40 scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
        </div>
        
        {/* Sprinkler Glitter Effect */}
        <Glitter />

        <motion.div 
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.p variants={fadeUp} className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            The Wedding Point
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-7xl font-serif text-white mb-6 leading-tight shimmer-text">
            Handcrafted Luxury <br/> For Your Special Day
          </motion.h1>
          <motion.p variants={fadeUp} className="text-gray-300 font-light text-lg mb-10 max-w-2xl mx-auto">
            Bespoke trousseau packing, custom gift hampers, and premium beaded bags designed to make your celebrations unforgettable.
          </motion.p>
          <motion.div variants={fadeUp} className="flex justify-center space-x-6">
            <Link to="/catalog" className="px-8 py-4 bg-primary text-dark uppercase tracking-widest text-sm font-medium hover:bg-white transition-all duration-300">
              Explore Collections
            </Link>
            <Link to="/custom-order" className="px-8 py-4 border border-white text-white uppercase tracking-widest text-sm font-medium hover:bg-white hover:text-dark transition-all duration-300">
              Bespoke Orders
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* NEW ARRIVALS / FEATURED */}
      <section className="py-24 bg-aurora relative overflow-hidden">
        {/* Animated Glowing Background Orbs */}
        <div className="orb-1"></div>
        <div className="orb-2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp} className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-dark mb-4">Latest Additions</h2>
            <div className="h-[2px] w-24 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-500 font-light max-w-xl mx-auto">Discover our newest handcrafted pieces, designed with meticulous attention to detail.</p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            >
              {products.slice(0, 3).map(product => (
                <motion.div key={product._id} variants={fadeUp}>
                  <Link to={`/product/${product._id}`} className="group block bg-white/60 backdrop-blur-md p-4 shadow-lg border border-white/50 rounded-sm">
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-6 shadow-md border border-gray-200 luxury-border">
                      <img 
                        src={product.images && product.images[0] ? product.images[0] : '/beaded_bag_mockup.jpg'} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-500"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex justify-center">
                        <span className="bg-white/95 backdrop-blur px-6 py-2 text-dark uppercase tracking-widest text-xs font-medium border border-gray-200">View Details</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">{product.category?.name || 'Collection'}</p>
                      <h3 className="font-serif text-xl text-dark mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                      {product.price && <p className="font-light text-gray-600">₹{product.price}</p>}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <motion.div 
            className="mt-16 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <Link to="/catalog" className="inline-flex items-center justify-center border-b-2 border-dark pb-1 text-dark hover:text-primary hover:border-primary transition-colors uppercase tracking-widest text-sm font-medium">
              View All Products <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ABOUT PREVIEW SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            >
              <div className="relative aspect-[4/5] max-w-md mx-auto">
                <img src="/home_decor_mockup.jpg" alt="Craftsmanship" className="w-full h-full object-cover shadow-2xl" />
                <div className="absolute -inset-4 border border-primary/30 -z-10 translate-x-4 translate-y-4"></div>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 space-y-6"
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-serif text-dark">The Art of Craftsmanship</h2>
              <p className="text-gray-600 font-light leading-relaxed">
                At BNB Beads and bags, every piece tells a story of meticulous attention to detail. 
                From our intricately woven beaded bags to our bespoke trousseau packaging, we blend 
                traditional artistry with modern luxury to create items you'll cherish forever.
              </p>
              <Link to="/about" className="inline-block px-8 py-4 border border-dark text-dark hover:bg-dark hover:text-white transition-all uppercase tracking-widest text-sm font-medium mt-4">
                Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
