"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
}

export function ClientSideParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    // Generate particles once on the client side
    const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981'];
    const newParticles = [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: colors[i % colors.length],
      opacity: Math.random() * 0.6 + 0.2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -1000],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
} 