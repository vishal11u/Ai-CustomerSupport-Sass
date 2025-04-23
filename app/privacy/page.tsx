export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="space-y-8 text-gray-600 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">1. Information We Collect</h2>
          <div className="space-y-4">
            <p>
              At SupportGenie, we collect and process the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (name, email, company details)</li>
              <li>Usage data (how you interact with our services)</li>
              <li>Customer support conversations and history</li>
              <li>Technical data (IP address, browser type, device information)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">2. How We Use Your Information</h2>
          <div className="space-y-4">
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing and improving our services</li>
              <li>Personalizing your experience</li>
              <li>Processing your transactions</li>
              <li>Communicating with you about our services</li>
              <li>Analyzing and improving our platform</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">3. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information. 
            However, please note that no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">4. Your Rights</h2>
          <div className="space-y-4">
            <p>You have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@supportgenie.com" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
              privacy@supportgenie.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">6. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "Last Updated" date below.
          </p>
        </section>

        <div className="text-sm text-gray-500 dark:text-gray-400 mt-12">
          Last Updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
} 