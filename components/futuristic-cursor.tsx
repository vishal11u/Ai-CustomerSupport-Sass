"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function FuturisticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  
  // Increased stiffness and reduced damping for faster response
  const springConfig = { damping: 15, stiffness: 1000 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Direct setting for immediate response
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    const checkHover = () => {
      const element = document.elementFromPoint(
        cursorX.get(),
        cursorY.get()
      ) as HTMLElement;
      
      if (element) {
        // Check if hovering over a button, link or interactive element
        const isInteractive = 
          element.tagName === 'BUTTON' || 
          element.tagName === 'A' || 
          !!element.closest('button') || 
          !!element.closest('a') ||
          element.getAttribute('role') === 'button';
        
        setIsHovering(isInteractive);
        
        // Get data attribute for custom cursor text
        const dataText = element.getAttribute('data-cursor-text') || 
                         (element.closest('[data-cursor-text]')?.getAttribute('data-cursor-text'));
        
        if (dataText) {
          setCursorText(dataText);
        } else if (element.tagName === 'BUTTON' || element.closest('button')) {
          setCursorText("Click");
        } else if (element.tagName === 'A' || element.closest('a')) {
          setCursorText("View");
        } else {
          setCursorText("");
        }
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousemove', checkHover);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousemove', checkHover);
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? '60px' : '24px',
          height: isHovering ? '60px' : '24px',
          borderRadius: '50%',
          border: '2px solid rgb(168, 85, 247)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s', // Faster transition
        }}
        animate={isHovering ? {
          scale: [1, 1.2, 1],
        } : {}}
        transition={{
          duration: 0.8, // Faster animation
          repeat: isHovering ? Infinity : 0,
        }}
      >
        {cursorText && (
          <span className="text-xs font-medium select-none" style={{ color: 'white' }}>
            {cursorText}
          </span>
        )}
      </motion.div>
      
      {/* Cursor dot */}
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-white pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Trail effect - reduced to improve performance */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 rounded-full bg-purple-400 pointer-events-none z-50 opacity-70"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            transform: 'translate(-50%, -50%)',
            transition: `all ${0.05 * (i + 1)}s ease-out`, // Much faster trail
          }}
        />
      ))}
    </>
  );
} 