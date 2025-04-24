"use client";

import { motion } from "framer-motion";

interface FloatingObjectProps {
  color: string;
  size: number;
  delay: number;
  x: number;
  y: number;
}

export function FloatingObject({ color, size, delay, x, y }: FloatingObjectProps) {
  return (
    <motion.div
      className="absolute rounded-full opacity-30 backdrop-blur-md"
      style={{
        background: `radial-gradient(circle at center, ${color}80, ${color}30)`,
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        boxShadow: `0 0 20px ${color}50, inset 0 0 20px ${color}30`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0.8, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
        z: [0, 50, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
} 