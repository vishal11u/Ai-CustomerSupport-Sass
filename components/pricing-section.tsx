"use client";

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
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
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Choose the plan that's right for your business
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={cn(
                "relative flex flex-col rounded-lg border p-8 bg-white dark:bg-gray-800 shadow-sm",
                plan.highlight 
                  ? "border-purple-500 border-2 dark:border-purple-400" 
                  : "border-gray-200 dark:border-gray-700"
              )}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-4 -mt-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
              <div className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{plan.price}</div>
              <p className="text-gray-500 dark:text-gray-400 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600 dark:text-gray-300">
                    <Check className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className={cn(
                  "w-full",
                  plan.highlight
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-600"
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
            className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white"
          >
            Compare Plans
          </motion.h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-4 px-6 text-left text-gray-900 dark:text-white font-semibold">Feature</th>
                  <th className="py-4 px-6 text-center text-gray-900 dark:text-white font-semibold">Weekly</th>
                  <th className="py-4 px-6 text-center text-gray-900 dark:text-white font-semibold">Monthly</th>
                  <th className="py-4 px-6 text-center text-gray-900 dark:text-white font-semibold">Yearly</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((item, index) => (
                  <tr
                    key={item.feature}
                    className={cn(
                      "border-b border-gray-200 dark:border-gray-700",
                      index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-800"
                    )}
                  >
                    <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">{item.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                      {typeof item.weekly === "boolean" ? (
                        item.weekly ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        item.weekly
                      )}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                      {typeof item.monthly === "boolean" ? (
                        item.monthly ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        item.monthly
                      )}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                      {typeof item.yearly === "boolean" ? (
                        item.yearly ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        item.yearly
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 