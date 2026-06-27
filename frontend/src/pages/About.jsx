import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-serif text-dark mb-8">Our Story</h1>
      <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>
      
      <div className="space-y-8 text-lg text-gray-600 font-light leading-relaxed text-justify md:text-center">
        <p>
          Welcome to <strong className="font-serif text-dark font-medium">BNB Beads and bags</strong>, where passion meets craftsmanship. 
          Founded with a vision to bring exquisite, handcrafted luxury into everyday life, our brand is a celebration of meticulous artistry.
        </p>
        <p>
          Every beaded bag, decorative platter, and festive piece is born from hours of dedicated handwork by skilled artisans. 
          We source the finest materials, from lustrous faux pearls to premium glass beads, ensuring each creation is not just an accessory, but a timeless heirloom.
        </p>
        <p>
          Our philosophy is simple: Luxury lies in the details. We don't mass-produce. We curate, we design, and we handcraft with love. 
          Whether you are looking for that perfect statement bag for an evening out, or a majestic platter to elevate your home decor, 
          BNB Beads and bags promises unparalleled elegance.
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-secondary/20">
          <h3 className="font-serif text-2xl text-dark mb-4">Craftsmanship</h3>
          <p className="text-gray-500 font-light text-sm">Every piece is 100% handcrafted by artisans, ensuring unique character and superior quality.</p>
        </div>
        <div className="p-6 bg-secondary/20">
          <h3 className="font-serif text-2xl text-dark mb-4">Premium Materials</h3>
          <p className="text-gray-500 font-light text-sm">We use only high-grade beads, crystals, and base materials for lasting durability and shine.</p>
        </div>
        <div className="p-6 bg-secondary/20">
          <h3 className="font-serif text-2xl text-dark mb-4">Bespoke Design</h3>
          <p className="text-gray-500 font-light text-sm">Custom orders and personalized touches are available to make your purchase truly yours.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
