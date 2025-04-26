"use client";

import { Check, X, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "Perfect for small businesses",
    features: [
      "24/7 AI Support",
      "Up to 1,000 conversations/month",
      "Basic analytics",
      "Email support",
    ],
    buttonText: "Get Started",
    buttonVariant: "default",
    highlight: false,
  },
  {
    name: "Professional",
    price: "$149",
    period: "/month",
    description: "Ideal for growing companies",
    features: [
      "Everything in Starter",
      "Up to 10,000 conversations/month",
      "Advanced analytics",
      "Priority support",
      "Custom AI training",
    ],
    buttonText: "Get Started",
    buttonVariant: "primary",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: [
      "Everything in Professional",
      "Unlimited conversations",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 phone support",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "default",
    highlight: false,
  },
];

const featureComparison = [
  {
    feature: "Price",
    weekly: "$4.99/week",
    monthly: "$9.99/month",
    yearly: "$49.99/year",
  },
  {
    feature: "AI Humanizer",
    weekly: "Basic",
    monthly: "Advanced",
    yearly: "Premium",
  },
  {
    feature: "AI Checker",
    weekly: true,
    monthly: true,
    yearly: true,
  },
  {
    feature: "Word Limit",
    weekly: "10,000/week",
    monthly: "50,000/month",
    yearly: "Unlimited",
  },
  {
    feature: "Support Response",
    weekly: "24 hours",
    monthly: "4 hours",
    yearly: "1 hour",
  },
  {
    feature: "Custom AI Training",
    weekly: false,
    monthly: true,
    yearly: true,
  },
  {
    feature: "Analytics Dashboard",
    weekly: "Basic",
    monthly: "Advanced",
    yearly: "Premium",
  },
  {
    feature: "API Access",
    weekly: false,
    monthly: true,
    yearly: true,
  },
  {
    feature: "Custom Integrations",
    weekly: false,
    monthly: false,
    yearly: true,
  },
  {
    feature: "Dedicated Account Manager",
    weekly: false,
    monthly: false,
    yearly: true,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const tableRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tableRef.current) return;
    
    const rect = tableRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (normalized -1 to 1)
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    // Limit rotation to a reasonable amount
    setRotation({ 
      x: -y * 2, // Inverted for natural feel
      y: x * 2 
    });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6"
          >
            Pricing Plans
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Choose the plan that's right for your business
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-full mb-10"
          >
            <button 
              onClick={() => setBillingCycle("monthly")} 
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                billingCycle === "monthly" 
                  ? "bg-white dark:bg-gray-700 shadow-sm text-purple-600 dark:text-purple-400" 
                  : "text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-500"
              )}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle("yearly")} 
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                billingCycle === "yearly" 
                  ? "bg-white dark:bg-gray-700 shadow-sm text-purple-600 dark:text-purple-400" 
                  : "text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-500"
              )}
            >
              Yearly
              <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Save 20%
              </span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={cn(
                "relative flex flex-col rounded-2xl border backdrop-blur-sm p-8 shadow-lg transition-all duration-300 hover:shadow-xl",
                plan.highlight 
                  ? "bg-gradient-to-b from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 border-purple-200 dark:border-purple-700"
                  : "bg-white dark:bg-gray-800/80 border-gray-100 dark:border-gray-700 hover:border-purple-100 dark:hover:border-purple-800/50"
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full flex items-center shadow-lg">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-end">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</div>
                  {plan.period && <div className="text-gray-500 dark:text-gray-400 ml-1">{plan.period}</div>}
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start text-gray-600 dark:text-gray-300">
                    <span className="mr-3 mt-1 flex-shrink-0 w-5 h-5 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className={cn(
                  "w-full rounded-xl py-6 font-medium transition-all duration-300 shadow-sm hover:shadow-md",
                  plan.highlight
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    : "bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-2 border-purple-200 dark:border-purple-800/50 hover:border-purple-400 dark:hover:border-purple-700"
                )}
              >
                <Link href="/sign-up">{plan.buttonText}</Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto mt-24"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white"
          >
            Compare Plans
          </motion.h3>
          <motion.div 
            ref={tableRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => {
              setHovering(false);
              setRotation({ x: 0, y: 0 });
            }}
            style={{
              transform: hovering ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
              transition: hovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
              transformStyle: 'preserve-3d'
            }}
            className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl bg-white dark:bg-gray-800/80 relative"
          >
            <div 
              className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/10 dark:from-purple-500/10 dark:to-indigo-500/20 rounded-xl pointer-events-none"
              style={{ 
                transform: hovering ? `translateZ(20px)` : 'translateZ(0)',
                transition: hovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
              }}
            />
            <table className="w-full">
              <thead>
                <tr className="bg-purple-50 dark:bg-purple-900/20">
                  <th className="py-4 px-6 text-left text-gray-900 dark:text-white font-bold rounded-tl-xl">Feature</th>
                  <th className="py-4 px-6 text-center text-gray-900 dark:text-white font-bold">Weekly</th>
                  <th className="py-4 px-6 text-center text-gray-900 dark:text-white font-bold">Monthly</th>
                  <th className="py-4 px-6 text-center text-gray-900 dark:text-white font-bold rounded-tr-xl">Yearly</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((item, index) => (
                  <tr
                    key={item.feature}
                    className={cn(
                      index === featureComparison.length - 1 ? "border-0" : "border-b border-gray-200 dark:border-gray-700",
                      index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-800/50"
                    )}
                    style={{ 
                      transform: hovering ? `translateZ(${15 - index * 0.5}px)` : 'translateZ(0)',
                      transition: hovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                    }}
                  >
                    <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">{item.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                      {typeof item.weekly === "boolean" ? (
                        item.weekly ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                            <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          </span>
                        )
                      ) : (
                        <span className={item.weekly === "Premium" ? "font-semibold text-purple-600 dark:text-purple-400" : ""}>
                          {item.weekly}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                      {typeof item.monthly === "boolean" ? (
                        item.monthly ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                            <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          </span>
                        )
                      ) : (
                        <span className={item.monthly === "Premium" ? "font-semibold text-purple-600 dark:text-purple-400" : ""}>
                          {item.monthly}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                      {typeof item.yearly === "boolean" ? (
                        item.yearly ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                            <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          </span>
                        )
                      ) : (
                        <span className={item.yearly === "Premium" ? "font-semibold text-purple-600 dark:text-purple-400" : ""}>
                          {item.yearly}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 