"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { PricingSection } from "@/components/pricing-section";

const features = [
  "24/7 AI Support",
  "Basic Knowledge Base",
  "Email Support",
  "Analytics Dashboard",
  "Custom Branding",
  "API Access",
  "Priority Support",
  "Advanced Analytics",
  "Custom Integrations",
  "Dedicated Account Manager",
];

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small businesses getting started with AI support",
    features: [0, 1, 2, 3],
    cta: "Get Started",
    href: "/sign-up?plan=starter",
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "Ideal for growing businesses with advanced support needs",
    features: [0, 1, 2, 3, 4, 5, 6],
    cta: "Get Started",
    href: "/sign-up?plan=professional",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with complex support requirements",
    features: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    cta: "Contact Sales",
    href: "/contact",
  },
];

export default function PricingPage() {
  return (
    <div>
      {/* You can add other content here if needed, like an introductory header */}
      <PricingSection />
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
} 