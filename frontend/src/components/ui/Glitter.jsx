import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Glitter = () => {
  // Generate random particles
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1, // 1px to 4px
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      duration: Math.random() * 4 + 3, // 3s to 7s
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#d4af37]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: '0 0 8px 2px rgba(212, 175, 55, 0.4)'
          }}
          initial={{ opacity: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 1, 0.8, 0],
            y: [-10, -30, -50],
            scale: [0, 1.5, 1, 0.5, 0]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default Glitter;
