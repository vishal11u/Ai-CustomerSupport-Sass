"use client";

import { motion } from "framer-motion";
import { Bot, Zap, Clock, LineChart, Shield, Puzzle } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Support",
    description: "24/7 intelligent responses that learn from every interaction.",
  },
  {
    icon: Zap,
    title: "Instant Responses",
    description: "Reduce wait times with immediate, accurate answers.",
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "Provide support around the clock without human limitations.",
  },
  {
    icon: LineChart,
    title: "Smart Analytics",
    description: "Track performance and gain insights from customer interactions.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security for your customer data.",
  },
  {
    icon: Puzzle,
    title: "Easy Integration",
    description: "Seamlessly integrate with your existing support tools.",
  },
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

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Why Choose SupportGenie?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Powerful features that transform your customer support experience
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 