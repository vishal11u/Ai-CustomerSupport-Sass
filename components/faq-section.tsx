"use client";

import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What is SupportGenie?",
    answer: "SupportGenie is an AI-powered customer support platform that helps businesses provide 24/7 automated support to their customers. It uses advanced natural language processing to understand and respond to customer queries in a human-like manner."
  },
  {
    question: "How does SupportGenie work?",
    answer: "SupportGenie integrates with your existing support channels (website, email, chat) and uses AI to automatically respond to customer queries. It learns from your knowledge base and previous interactions to provide accurate and contextual responses."
  },
  {
    question: "Can SupportGenie replace human support agents?",
    answer: "While SupportGenie can handle many common customer queries, it's designed to work alongside human agents. It can handle routine questions and escalate complex issues to human agents when needed, improving overall support efficiency."
  },
  {
    question: "How accurate are the AI responses?",
    answer: "SupportGenie's AI is trained on vast amounts of customer support data and continuously learns from interactions. It typically achieves over 90% accuracy in understanding and responding to customer queries, with accuracy improving over time."
  },
  {
    question: "Is my customer data secure?",
    answer: "Yes, we take data security seriously. All customer data is encrypted in transit and at rest. We comply with major data protection regulations and never share your data with third parties."
  },
  {
    question: "How long does it take to set up?",
    answer: "You can get started with SupportGenie in minutes. Basic setup involves connecting your support channels and uploading your knowledge base. More advanced customization and training can take a few days."
  },
  {
    question: "What languages does SupportGenie support?",
    answer: "SupportGenie currently supports English, Spanish, French, German, and Japanese. We're continuously adding more languages to better serve our global customers."
  },
  {
    question: "Can I customize the AI's responses?",
    answer: "Yes, you can customize the AI's tone, style, and responses to match your brand voice. You can also train it with specific product information and company policies."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6"
          >
            Support & Help
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Find answers to common questions about SupportGenie
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-3xl mx-auto space-y-5"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-2xl overflow-hidden backdrop-blur-sm shadow-lg border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800/50 transition-all duration-300 bg-white/80 dark:bg-gray-800/80"
              initial={{ borderRadius: "1rem" }}
              animate={{ 
                borderRadius: openIndex === index ? "1.5rem" : "1rem",
                boxShadow: openIndex === index ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
              }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                    openIndex === index 
                    ? "bg-gradient-to-tr from-purple-500 to-indigo-600 text-white" 
                    : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                  } transition-colors duration-300`}>
                    <HelpCircle className="h-4 w-4" />
                  </span>
                  <h3 className={`text-lg font-bold ${
                    openIndex === index 
                    ? "text-purple-600 dark:text-purple-400" 
                    : "text-gray-900 dark:text-white"
                  } transition-colors duration-300`}>
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-purple-500 dark:text-purple-400 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 pb-6 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 ml-12 mr-6">
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                    {faq.answer}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 