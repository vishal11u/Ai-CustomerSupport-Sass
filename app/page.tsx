"use client";

import Link from "next/link";
import { ArrowRight, Star, MousePointer, Sparkles, Zap, Laptop, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorks } from "@/components/how-it-works";
import { PricingSection } from "@/components/pricing-section";
import { CtaSection } from "@/components/cta-section";
import { HeroBackground } from "@/components/hero-background";
import { FAQSection } from "@/components/faq-section";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { FuturisticCursor } from "@/components/futuristic-cursor";
import { FloatingObject } from "@/components/floating-object";
import { ClientSideParticles } from "@/components/client-side-particles";
import { StatsHighlight } from "@/components/stats-highlight";

// Re-added constants for testimonials and stats
const testimonials = [
  {
    quote:
      "SupportGenie reduced our response time by 80% and increased customer satisfaction by 40%.",
    author: "Sarah Johnson",
    role: "Customer Support Director, TechCorp",
    rating: 5,
  },
  {
    quote:
      "The AI's ability to understand and respond to complex queries is truly impressive.",
    author: "Michael Chen",
    role: "Founder, StartupX",
    rating: 5,
  },
  {
    quote:
      "Our customer retention has improved significantly since implementing SupportGenie.",
    author: "Jessica Wang",
    role: "Head of Customer Experience, RetailPro",
    rating: 5,
  },
  {
    quote:
      "The integration was seamless and our team was able to see results within days.",
    author: "David Rodriguez",
    role: "CTO, GlobalTech Solutions",
    rating: 5,
  },
];

const stats = [
  { value: "10k+", label: "Happy Customers", icon: <Globe className="h-5 w-5" /> },
  { value: "24/7", label: "Support Availability", icon: <Zap className="h-5 w-5" /> },
  { value: "98%", label: "Satisfaction Rate", icon: <Star className="h-5 w-5" /> },
  { value: "2s", label: "Average Response Time", icon: <Laptop className="h-5 w-5" /> },
];

// 3D Objects data for animation
const objects3D = [
  { id: 1, color: "#8b5cf6", size: 40, delay: 0 },
  { id: 2, color: "#d946ef", size: 30, delay: 1.5 },
  { id: 3, color: "#f472b6", size: 25, delay: 0.8 },
  { id: 4, color: "#38bdf8", size: 35, delay: 2.5 },
  { id: 5, color: "#4ade80", size: 20, delay: 1.2 },
];

export default function HomePage() {
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const statsY = useTransform(scrollYProgress, [0.05, 0.15], [50, 0]);
  const statsOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

  // Auto-scroll testimonials with increased speed
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000); // Fast scrolling speed

    return () => clearInterval(interval);
  }, [isPaused]);

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  // 3D card hover effect
  const cardHover = {
    rest: {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      boxShadow: "0px 0px 0px rgba(0,0,0,0.2)"
    },
    hover: {
      rotateY: 5,
      rotateX: -5,
      scale: 1.05,
      boxShadow: "10px 10px 20px rgba(0,0,0,0.2)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-gradient-to-b from-gray-900 via-purple-900/20 to-black text-white overflow-hidden">
      {/* Futuristic cursor */}
      <FuturisticCursor />

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Floating 3D objects */}
      {objects3D.map((obj) => (
        <FloatingObject
          key={obj.id}
          color={obj.color}
          size={obj.size}
          delay={obj.delay}
          x={Math.random() * 100}
          y={Math.random() * 100}
        />
      ))}

      {/* Animated background grid */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>

      {/* Neural network visualization */}
      <div className="fixed inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${['#8b5cf6', '#ec4899', '#3b82f6'][i % 3]}, transparent)`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 50 + 20}%`,
              left: `${Math.random() * 100 - 25}%`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              x: ['-20%', '120%'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* AI data flow particles - Client-side only */}
      <ClientSideParticles />

      {/* Floating animated element */}
      <motion.div
        className="fixed top-1/2 left-1/2 z-[5] pointer-events-none hidden md:block"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity
        }}
      >
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Hero Section - Futuristic 3D */}
      <motion.section
        ref={heroRef}
        className="relative flex-1 flex items-center justify-center min-h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <HeroBackground />

        {/* 3D rotating circle */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full border border-purple-500/20"
          animate={{
            rotateZ: 360,
            boxShadow: [
              "0 0 20px rgba(168, 85, 247, 0.1)",
              "0 0 60px rgba(168, 85, 247, 0.4)",
              "0 0 20px rgba(168, 85, 247, 0.1)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full border border-pink-500/20"
          animate={{ rotateZ: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* AI Pulse effect */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/5 to-blue-500/5"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative container mx-auto px-4 py-20 sm:py-32 z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center relative"
            initial="hidden"
            animate="show"
            variants={container}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/10 text-purple-300 mb-6 backdrop-blur-lg border border-purple-500/20"
              variants={item}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">
                The future of customer support is here
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-pink-300"
              variants={item}
            >
              Transform Your Support with
              <motion.div
                className="relative mt-2 inline-block w-full"
              >
                <motion.span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 glitch-text"
                  animate={{
                    textShadow: ["0px 0px 0px rgba(147, 51, 234, 0)", "0px 0px 20px rgba(147, 51, 234, 0.8)", "0px 0px 0px rgba(147, 51, 234, 0)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  data-text="AI That Feels Human"
                >
                  AI That Feels Human
                </motion.span>
                <motion.span
                  className="absolute left-0 -top-1 w-full opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
                  data-text="AI That Feels Human"
                  animate={{
                    opacity: [0, 0.3, 0],
                    x: [-1, 1, -1],
                    top: ["-0.1em", "0em", "-0.1em"]
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 5
                  }}
                >
                  AI That Feels Human
                </motion.span>
              </motion.div>
            </motion.h1>

            {/* Animated text typing effect */}
            <motion.div
              className="h-8 mb-6 overflow-hidden"
              variants={item}
            >
              <motion.div
                animate={{ y: [-40, -80, -120, -160, 0] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 0.6, 0.8]
                }}
                className="flex flex-col items-center"
              >
                <p className="text-xl text-blue-300 my-2">Instant responses</p>
                <p className="text-xl text-green-300 my-2">24/7 availability</p>
                <p className="text-xl text-pink-300 my-2">Personalized answers</p>
                <p className="text-xl text-yellow-300 my-2">Continuous learning</p>
                <p className="text-xl text-blue-300 my-2">Instant responses</p>
              </motion.div>
            </motion.div>


            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={item}
            >
              <Button
                size="lg"
                asChild
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 group neumorph-button"
              >
                <Link href="/dashboard" data-cursor-text="Start">
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30"
                    animate={{
                      x: ["100%", "-100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "linear"
                    }}
                  />
                  <span className="relative z-10 flex items-center font-semibold">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="backdrop-blur-lg bg-white/5 border-purple-500/20 hover:bg-white/10 text-white group neumorph-button"
              >
                <Link href="/contact" data-cursor-text="Watch">
                  <span className="relative z-10 flex items-center">
                    Watch Demo
                    <motion.div
                      className="ml-2 relative w-5 h-5"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="absolute inset-0 rounded-full border-2 border-l-transparent border-purple-400"></div>
                      <div className="absolute inset-1 rounded-full border border-t-transparent border-pink-400"></div>
                    </motion.div>
                  </span>
                </Link>
              </Button>
            </motion.div>

            {/* Floating badges */}
            <div className="absolute -left-32 top-1/4">
              <motion.div
                className="glass-card backdrop-blur-lg bg-white/5 border border-purple-500/20 rounded-xl p-3 shadow-lg"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                whileHover={{ y: -5, scale: 1.03 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-sm text-white">Instant Responses</p>
                </div>
              </motion.div>
            </div>

            <div className="absolute -right-32 top-1/3">
              <motion.div
                className="glass-card backdrop-blur-lg bg-white/5 border border-purple-500/20 rounded-xl p-3 shadow-lg"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.7 }}
                whileHover={{ y: -5, scale: 1.03 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Star className="h-4 w-4 text-blue-400" />
                  </div>
                  <p className="text-sm text-white">98% Satisfaction Rate</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* 3D Floating laptop with AI animation */}
        <motion.div
          className="absolute bottom-10 w-full max-w-md mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <motion.div
            className="relative perspective-1000 w-full h-64"
            animate={{
              y: [0, -15, 0],
              rotateY: [0, 5, 0, -5, 0],
              rotateX: [2, 0, 2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/30 shadow-2xl backdrop-blur-xl p-4 transform preserve-3d rotate-x-12">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="chat-window h-44 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex gap-2 mb-3"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-xs">U</div>
                  <div className="bg-gray-800/50 rounded-lg p-2 text-sm max-w-[80%]">How do I reset my password?</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="flex gap-2 mb-3 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-xs">AI</div>
                  <div className="bg-purple-500/20 rounded-lg p-2 text-sm max-w-[80%]">
                    <motion.div
                      initial={{ width: "20%" }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 2.2, duration: 1.5 }}
                      className="h-4 bg-purple-300/20 rounded mb-1"
                    />
                    <motion.div
                      initial={{ width: "30%" }}
                      animate={{ width: "80%" }}
                      transition={{ delay: 2.4, duration: 1.2 }}
                      className="h-4 bg-purple-300/20 rounded mb-1"
                    />
                    <motion.div
                      initial={{ width: "10%" }}
                      animate={{ width: "60%" }}
                      transition={{ delay: 2.6, duration: 1 }}
                      className="h-4 bg-purple-300/20 rounded"
                    />
                  </div>
                </motion.div>

                {/* Real-time typing effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4 }}
                  className="flex gap-2 mb-3"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-xs">U</div>
                  <div className="bg-gray-800/50 rounded-lg p-2 text-sm max-w-[80%]">
                    <motion.div
                      animate={{
                        width: ["0%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 5
                      }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      Thanks, that worked perfectly!
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Pulsing glow effect */}
              <motion.div
                className="absolute -inset-2 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-pink-500/0 z-[-1] blur-xl"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-purple-300 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-xs mb-1">Scroll to explore</p>
          <MousePointer className="h-4 w-4" />
        </motion.div>
      </motion.section>

      {/* Stats Section - 3D Glass Cards */}
      <motion.section
        ref={statsRef}
        className="py-20 relative z-10"
        style={{ y: statsY, opacity: statsOpacity }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative"
                variants={item}
                whileHover="hover"
                initial="rest"
                animate="rest"
                custom={index}
              >
                <motion.div
                  className="glass-card backdrop-blur-lg bg-white/5 border border-purple-500/20 rounded-xl p-6 h-full transform transition-all duration-300 overflow-hidden group"
                  variants={cardHover}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  <motion.div
                    className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-xl group-hover:bg-gradient-to-br group-hover:from-purple-500/20 group-hover:to-pink-500/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="relative">
                    <motion.div
                      className="rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 mb-4 inline-block"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {stat.icon}
                    </motion.div>

                    <motion.div
                      className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 mb-2"
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
                    >
                      {stat.value}
                    </motion.div>

                    <div className="text-sm text-gray-300">
                      {stat.label}
                    </div>

                    {/* Animated line */}
                    <motion.div
                      className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 mt-3"
                      initial={{ width: 0 }}
                      whileInView={{ width: "3rem" }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    />
                  </div>

                  {/* 3D layered effect elements */}
                  <motion.div
                    className="absolute bottom-1 right-1 w-12 h-12 border-r border-b border-purple-500/20 rounded-br-lg"
                    style={{ translateZ: "20px" }}
                  />
                  <motion.div
                    className="absolute top-1 left-1 w-12 h-12 border-l border-t border-purple-500/20 rounded-tl-lg"
                    style={{ translateZ: "20px" }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works and Features Sections - Wrapped with fade-in animations */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        <HowItWorks />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        <FeaturesSection />
      </motion.div>

      {/* Testimonials Section - Enhanced with 3D Animation */}
      <section className="py-20 overflow-hidden relative">
        {/* Background animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"
            animate={{
              x: [0, 40, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-pink-500/5 blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, -40, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <motion.div
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block mb-3">
              <motion.div
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full p-2 backdrop-blur-sm border border-purple-500/20"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              >
                <Star className="h-6 w-6 text-purple-300" />
              </motion.div>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-pink-300">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of satisfied businesses using SupportGenie
            </p>
          </motion.div>

          <div
            ref={testimonialsRef}
            className="relative perspective-1000"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex justify-center gap-2 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="relative"
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index
                        ? "bg-purple-500"
                        : "bg-gray-500/30"
                      }`}
                  />
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute -inset-2 rounded-full border border-purple-500/30 z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto relative h-[340px] sm:h-[300px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {testimonials.map((testimonial, i) => (
                  i === activeIndex && (
                    <motion.div
                      key={testimonial.author}
                      className="absolute top-0 left-0 w-full glass-card backdrop-blur-md bg-white/5 p-8 rounded-2xl border border-purple-500/20 shadow-2xl"
                      initial={{ opacity: 0, x: 100, rotateY: 30 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      exit={{ opacity: 0, x: -100, rotateY: -30 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Quote particle */}
                      <motion.div
                        className="absolute -right-4 -top-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-20"
                        animate={{
                          scale: [1, 1.05, 1],
                          rotate: [0, 10, 0, -10, 0]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                      >
                        "
                      </motion.div>

                      {/* 3D elements */}
                      <motion.div
                        className="absolute -right-2 -bottom-2 w-40 h-40 rounded-br-2xl border-r border-b border-purple-500/20 z-10"
                        style={{ translateZ: "10px" }}
                      />

                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star
                              className="h-6 w-6 text-yellow-300 fill-yellow-300"
                            />
                          </motion.div>
                        ))}
                      </div>

                      <motion.p
                        className="text-gray-100 mb-6 text-xl font-light italic leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        "{testimonial.quote}"
                      </motion.p>

                      <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <motion.div
                          className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                        >
                          {testimonial.author.charAt(0)}
                        </motion.div>
                        <div>
                          <motion.div
                            className="font-medium text-white text-lg"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            {testimonial.author}
                          </motion.div>
                          <motion.div
                            className="text-sm text-purple-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            {testimonial.role}
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Navigation arrows */}
            <div className="flex justify-between items-center mt-6">
              <motion.button
                className="w-12 h-12 rounded-full bg-white/5 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              >
                <ArrowRight className="h-5 w-5 rotate-180 text-purple-300" />
              </motion.button>

              <motion.button
                className="w-12 h-12 rounded-full bg-white/5 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
              >
                <ArrowRight className="h-5 w-5 text-purple-300" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pricing, FAQ and CTA sections with futuristic animations */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <PricingSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <FAQSection />
      </motion.div>

      {/* CTA Section with futuristic effects */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <section className="py-20 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 to-black opacity-80"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"]
              }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
            />
          </div>

          {/* Static particles (safe for SSR) */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-500 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                }}
                animate={{
                  y: [0, -300],
                  opacity: [0.5, 0]
                }}
                transition={{
                  duration: Math.random() * 10 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative">
            <motion.div
              className="max-w-4xl mx-auto glass-card backdrop-blur-lg bg-white/5 border border-purple-500/20 rounded-2xl p-12 text-center"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.h2
                className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-pink-300"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Ready to Transform Your Customer Support?
              </motion.h2>

              <motion.p
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Join thousands of businesses already providing exceptional
                support with SupportGenie's AI-powered platform.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  size="lg"
                  asChild
                  className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 group px-8 py-6 text-lg"
                >
                  <Link href="/dashboard">
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30"
                      animate={{
                        x: ["100%", "-100%"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "linear"
                      }}
                    />
                    <span className="relative z-10 flex items-center font-semibold">
                      Get Started for Free
                      <Sparkles className="ml-2 h-5 w-5" />
                    </span>
                  </Link>
                </Button>
              </motion.div>

              {/* AI Glow circles */}
              <motion.div
                className="absolute -inset-5 opacity-30 z-[-1] pointer-events-none"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              >
                <div className="absolute left-1/2 top-1/2 w-full h-full bg-gradient-to-r from-purple-600/20 via-transparent to-pink-600/20 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2" />
              </motion.div>

              {/* 3D decorative elements */}
              <motion.div
                className="absolute -left-5 -top-5 w-20 h-20 border-l border-t border-purple-500/30 rounded-tl-xl z-10"
                style={{ translateZ: "20px" }}
                animate={{
                  rotateZ: [0, 10, 0, -10, 0]
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />

              <motion.div
                className="absolute -right-5 -bottom-5 w-20 h-20 border-r border-b border-purple-500/30 rounded-br-xl z-10"
                style={{ translateZ: "20px" }}
                animate={{
                  rotateZ: [0, -10, 0, 10, 0]
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </section>
      </motion.div>

      {/* Add custom styles to the page */}
      <style jsx global>{`
        body {
          background: linear-gradient(to bottom, #0f0f19, #191927);
          overflow-x: hidden;
        }
        
        .glass-card {
          box-shadow: 0 10px 30px -5px rgba(79, 70, 229, 0.1);
          backdrop-filter: blur(10px);
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .rotate-x-12 {
          transform: rotateX(12deg);
        }
        
        ::selection {
          background: rgba(168, 85, 247, 0.4);
          color: white;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 15, 25, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
