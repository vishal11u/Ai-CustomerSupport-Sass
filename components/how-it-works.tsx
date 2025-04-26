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
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-200 dark:bg-indigo-900/20 rounded-full filter blur-3xl opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full">
              Simple Process
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400"
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
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="p-8 bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700/50 flex flex-col items-center group"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <step.icon className="w-9 h-9 text-white" />
              </div>
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">Step {index + 1}</span>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-lg">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
} 