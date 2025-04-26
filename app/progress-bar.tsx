"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";

// Import the CSS but we'll override with our own styles
import "nprogress/nprogress.css";

type PushStateInput = [data: any, unused: string, url?: string | URL | null | undefined];

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({ 
      showSpinner: false,
      minimum: 0.3, // Start with more visible progress
      easing: 'ease',
      speed: 400, // Slightly slower for more visible effect
      trickleSpeed: 100 // Faster trickling for more movement
    });

    // Start progress on initial load
    NProgress.start();
    
    // Force done to clear initial progress - gives a nice flash of the bar
    setTimeout(() => {
      NProgress.done(true);
    }, 300);

    // Handle anchor clicks to start progress immediately
    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = location.href;
      if (targetUrl !== currentUrl) {
        NProgress.set(0.3); // Start with immediate progress 
        NProgress.start(); // Start immediately
      }
    };

    // Add click listener to all anchor tags
    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a[href]");
      anchorElements.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));
    };

    // Observe DOM changes to catch dynamically added anchors
    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    // Apply initial listeners to existing anchors
    handleMutation();

    // Proxy history.pushState to complete progress when navigation finishes
    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      }
    });

    // Clean up
    return () => {
      mutationObserver.disconnect();
      NProgress.remove();
    };
  }, []);

  // When pathname changes, complete the progress
  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return (
    <style jsx global>{`
      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background: linear-gradient(90deg, #4f46e5, #8b5cf6, #ec4899, #3b82f6);
        background-size: 300% 300%;
        animation: gradient-shift 3s ease infinite;
        position: fixed;
        z-index: 9999999;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }

      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 15px rgba(79, 70, 229, 0.8), 0 0 8px rgba(236, 72, 153, 0.8);
        opacity: 1.0;
        transform: rotate(3deg) translate(0px, -4px);
      }

      /* Loading animation for the bar when processing */
      .nprogress-busy #nprogress .bar {
        animation: gradient-shift 2s ease infinite, pulse 1s ease-in-out infinite alternate;
      }
      
      @keyframes pulse {
        0% { opacity: 0.8; }
        100% { opacity: 1; }
      }
    `}</style>
  );
} 