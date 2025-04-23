"use client";

import Link from "next/link"
import { ArrowRight, Star, Check, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorks } from "@/components/how-it-works";
import { PricingSection } from "@/components/pricing-section";
import { CtaSection } from "@/components/cta-section";
import { HeroBackground } from "@/components/hero-background";
import { FAQSection } from "@/components/faq-section";

// Re-added constants for testimonials and stats
const testimonials = [
  {
    quote: "SupportGenie reduced our response time by 80% and increased customer satisfaction by 40%.",
    author: "Sarah Johnson",
    role: "Customer Support Director, TechCorp",
    rating: 5,
  },
  {
    quote: "The AI's ability to understand and respond to complex queries is truly impressive.",
    author: "Michael Chen",
    role: "Founder, StartupX",
    rating: 5,
  },
];

const stats = [
  { value: "10k+", label: "Happy Customers" },
  { value: "24/7", label: "Support Availability" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "2s", label: "Average Response Time" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Updated */}
      <section className="relative flex-1 flex items-center overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <HeroBackground />
        <div className="relative container mx-auto px-4 py-20 sm:py-32 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 mb-6">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Trusted by 10,000+ businesses</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Transform Your Customer Support with
              <span className="text-purple-600 dark:text-purple-400"> AI That Feels Human</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Reduce response times by 80%, increase satisfaction by 40%, and save up to 60% on support costs with our intelligent AI assistant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-purple-600 hover:bg-purple-700 text-white">
                <Link href="/sign-up">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {/* Removed Demo button for now to match CTA section */}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Restored */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Added back */}
      <HowItWorks />

      {/* Features Section - Added back */}
      <FeaturesSection />

      {/* Testimonials Section - Restored */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of satisfied businesses using SupportGenie
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="p-6 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.quote}"</p>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{testimonial.author}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Added back */}
      <PricingSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section - Added back */}
      <CtaSection />
    </div>
  )
}
