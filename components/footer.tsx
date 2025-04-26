import Link from "next/link";
import { ChevronRight, MessageSquare, Mail, Phone, MapPin, Github, Twitter, Instagram } from "lucide-react";

const footerNav = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

const contactInfo = [
  { 
    icon: Mail, 
    label: "Email", 
    value: "hello@supportgenie.ai",
    href: "mailto:hello@supportgenie.ai" 
  },
  { 
    icon: Phone, 
    label: "Phone", 
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567" 
  },
  { 
    icon: MapPin, 
    label: "Address", 
    value: "123 AI Boulevard, San Francisco, CA",
    href: "https://maps.google.com" 
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Instagram, href: "https://instagram.com" },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center mr-2 shadow-lg">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                SupportGenie
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              AI-powered customer support that feels human. Transform your customer experience today.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.href}
                  className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-200 dark:hover:border-purple-800 transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-base font-bold mb-6 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-4">
              {footerNav.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group flex items-center"
                  >
                    <ChevronRight className="h-3 w-3 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h3 className="text-base font-bold mb-6 text-gray-900 dark:text-white">Contact Us</h3>
            <ul className="space-y-5">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <item.icon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500 dark:text-gray-500">{item.label}</span>
                    <Link 
                      href={item.href} 
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      {item.value}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} SupportGenie. All rights reserved.
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-full py-1.5 px-4 text-sm text-gray-600 dark:text-gray-400 shadow-sm border border-gray-100 dark:border-gray-700">
            Made with 🧞 by <span className="text-purple-600 dark:text-purple-400">SupportGenie Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 