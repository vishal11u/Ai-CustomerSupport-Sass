"use client";

import { Bot, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Bot,
    title: "Connect AI Assistant",
    description:
      "Integrate our advanced AI into your customer support channels in minutes.",
  },
  {
    icon: MessageSquare,
    title: "Personalize Responses",
    description:
      "Train the AI with your brand voice and specific business knowledge.",
  },
  {
    icon: Sparkles,
    title: "Watch It Learn",
    description:
      "Our AI continuously improves from each interaction, getting smarter every day.",
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

export function HowItWorks() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
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
            How SupportGenie Works
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Get started in three simple steps
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-800"
            >
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <step.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 