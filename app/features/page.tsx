import { Bot, Brain, Clock, Shield, Zap, BarChart } from "lucide-react";

const features = [
  {
    title: "AI-Powered Support",
    description: "24/7 intelligent assistance that understands and responds to customer queries with human-like accuracy.",
    icon: Bot,
  },
  {
    title: "Smart Learning",
    description: "Continuously improves responses by learning from customer interactions and feedback.",
    icon: Brain,
  },
  {
    title: "Instant Responses",
    description: "Delivers immediate answers to customer queries, reducing wait times and improving satisfaction.",
    icon: Clock,
  },
  {
    title: "Secure & Reliable",
    description: "Enterprise-grade security with end-to-end encryption and data protection measures.",
    icon: Shield,
  },
  {
    title: "Lightning Fast",
    description: "Processes and responds to queries in milliseconds, ensuring smooth customer experiences.",
    icon: Zap,
  },
  {
    title: "Advanced Analytics",
    description: "Comprehensive insights into customer interactions, response times, and satisfaction metrics.",
    icon: BarChart,
  },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Powerful Features</h1>
        <p className="text-xl text-muted-foreground">
          Everything you need to transform your customer support
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-6 rounded-lg border bg-card hover:border-primary transition-colors"
          >
            <feature.icon className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Why Choose SupportGenie?</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            SupportGenie combines cutting-edge AI technology with deep understanding
            of customer service best practices. Our platform is designed to help
            businesses of all sizes deliver exceptional customer experiences while
            reducing support costs and improving efficiency.
          </p>
          <p>
            Whether you're a small business looking to automate basic support or a
            large enterprise needing sophisticated AI capabilities, SupportGenie has
            the features and flexibility to meet your needs.
          </p>
        </div>
      </div>
    </div>
  );
} 