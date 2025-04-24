"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Zap, Clock, DollarSign } from "lucide-react";

export function StatsHighlight() {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const dotsRef = useRef<Array<{left: string, top: string}>>([]);
  
  // Generate random positions only once on client side
  useEffect(() => {
    setIsClient(true);
    
    // Pre-generate random positions for dots
    if (dotsRef.current.length === 0) {
      dotsRef.current = Array(15).fill(0).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }));
    }
  }, []);
  
  const stats = [
    { 
      id: "response-time", 
      value: 80, 
      label: "Faster Response Time", 
      description: "Reduce customer wait times by 80%",
      icon: <Clock className="h-4 w-4" />,
      color: "from-blue-400 to-cyan-400" 
    },
    { 
      id: "satisfaction", 
      value: 40, 
      label: "Increased Satisfaction", 
      description: "Improve customer satisfaction by 40%",
      icon: <Zap className="h-4 w-4" />,
      color: "from-purple-400 to-indigo-400" 
    },
    { 
      id: "cost", 
      value: 60, 
      label: "Cost Reduction", 
      description: "Save up to 60% on support costs",
      icon: <DollarSign className="h-4 w-4" />,
      color: "from-green-400 to-emerald-400" 
    },
  ];

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="py-2 px-4 glass-card backdrop-blur-md bg-white/5 border border-purple-500/20 rounded-xl mb-4">
        <div className="relative flex flex-wrap justify-around items-center gap-3 py-2">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="flex items-center gap-2 px-4 py-2 rounded-lg relative"
              onMouseEnter={() => setHoveredStat(stat.id)}
              onMouseLeave={() => setHoveredStat(null)}
              whileHover={{ scale: 1.05 }}
            >
              {hoveredStat === stat.id && (
                <motion.div
                  layoutId="statHighlight"
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-10 rounded-lg -z-10`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              
              {/* Stat value with animated counter */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${stat.color} bg-opacity-20`}>
                  {stat.icon}
                </div>
                <motion.div 
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + stats.indexOf(stat) * 0.2 }}
                >
                  {isClient ? (
                    <Counter from={0} to={stat.value} duration={2} />
                  ) : (
                    stat.value
                  )}
                  <span className="text-lg">%</span>
                </motion.div>
                <div className="text-xs text-gray-300">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.p 
        className="text-base text-center text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Power your support with our intelligent AI assistant and transform your customer experience.
      </motion.p>
      
      {/* Animated dots - Only shown on client side */}
      {isClient && (
        <div className="absolute -inset-4 -z-10 overflow-hidden">
          {dotsRef.current.map((position, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-purple-400/30"
              style={{
                left: position.left,
                top: position.top,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Animated counter component
function Counter({ from, to, duration }: { from: number; to: number; duration: number }) {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(from + progress * (to - from)));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);
  
  return <>{count}</>;
} 