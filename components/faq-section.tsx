"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
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

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find answers to common questions about SupportGenie
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
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
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 