import { Users, Lightbulb, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About SupportGenie</h1>
        <p className="text-xl text-muted-foreground">
          Revolutionizing customer support with AI-powered solutions
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 rounded-lg border bg-card">
          <Lightbulb className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
          <p className="text-muted-foreground">
            To transform customer support by making it more efficient, personalized,
            and available 24/7 through the power of artificial intelligence.
          </p>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <Rocket className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-muted-foreground">
            To help businesses of all sizes provide exceptional customer service
            while reducing costs and improving response times.
          </p>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <Users className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Team</h3>
          <p className="text-muted-foreground">
            A diverse group of AI experts, customer service professionals, and
            software engineers dedicated to building the future of support.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Our Story</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            SupportGenie was born out of a simple observation: businesses were
            struggling to keep up with growing customer support demands while
            maintaining quality and efficiency. We saw an opportunity to leverage
            AI to solve this challenge.
          </p>
          <p>
            Founded in 2023, our team set out to create an AI-powered support
            platform that could understand customer queries, provide accurate
            responses, and learn from every interaction. Today, we're proud to
            serve businesses across various industries, helping them transform
            their customer support operations.
          </p>
          <p>
            Our platform combines cutting-edge AI technology with deep
            understanding of customer service best practices. We're constantly
            innovating and improving our solutions to help businesses deliver
            exceptional customer experiences.
          </p>
        </div>
      </div>
    </div>
  );
} 