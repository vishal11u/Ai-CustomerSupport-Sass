import Link from "next/link";

const footerNav = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Logo and Description */}
          <div>
            <Link href="/" className="text-2xl font-bold mb-4 block">
              SupportGenie
            </Link>
            <p className="text-gray-600 dark:text-gray-400">
              AI-powered customer support that feels human.
            </p>
          </div>

          {/* Navigation Links (Displayed Horizontally) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerNav.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Section Removed */}

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} SupportGenie. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 