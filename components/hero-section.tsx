"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { StatsHighlight } from "./stats-highlight";

export function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  const backgroundParticlesRef = useRef<Array<{
    x: string,
    y: string,
    size: number,
    delay: number
  }>>([]);
  
  useEffect(() => {
    setIsClient(true);
    
    // Pre-generate particles positions and properties
    if (backgroundParticlesRef.current.length === 0) {
      backgroundParticlesRef.current = Array(40).fill(0).map(() => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5
      }));
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background z-10" />
      
      {/* Background particle effect - only rendered on client */}
      {isClient && (
        <div className="absolute inset-0 z-0">
          {backgroundParticlesRef.current.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-500/20"
              style={{
                left: particle.x,
                top: particle.y,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
      
      <div className="relative z-20 container mx-auto py-20 md:py-32 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transform Your Customer Support with AI
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Our intelligent AI assistant helps you deliver exceptional support experiences while reducing costs and saving time.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-purple-500 text-purple-200 hover:bg-purple-500/10">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Stats highlight section */}
        <motion.div 
          className="w-full mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <StatsHighlight />
        </motion.div>
      </div>
    </section>
  );
} 