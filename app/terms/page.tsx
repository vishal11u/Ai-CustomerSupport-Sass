export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      <div className="space-y-8 text-gray-600 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">1. Agreement to Terms</h2>
          <p>
            By accessing and using SupportGenie's services, you agree to be bound by these Terms and Conditions. 
            If you disagree with any part of these terms, you may not access our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">2. Use License</h2>
          <div className="space-y-4">
            <p>Permission is granted to temporarily access our services for personal or business use, subject to the following conditions:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must not modify or copy our materials without explicit permission</li>
              <li>You must not use the materials for any commercial purpose without a license</li>
              <li>You must not attempt to decompile or reverse engineer any software</li>
              <li>You must not remove any copyright or proprietary notations</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">3. Service Description</h2>
          <p>
            SupportGenie provides AI-powered customer support solutions. We reserve the right to withdraw or amend our service 
            and any service or material we provide via SupportGenie without notice. We will not be liable if for any reason 
            all or any part of our service is unavailable at any time or for any period.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">4. User Obligations</h2>
          <div className="space-y-4">
            <p>As a user of our services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly notify us of any unauthorized use of your account</li>
              <li>Use the services in compliance with all applicable laws</li>
              <li>Not use the services for any illegal or unauthorized purpose</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">5. Payment Terms</h2>
          <p>
            Some aspects of our service may be provided for a fee. You agree to provide current, complete, and accurate 
            purchase and account information for all purchases made via our service. You agree to promptly update your 
            account and other information so that we can complete your transactions and contact you as needed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">6. Limitation of Liability</h2>
          <p>
            In no event shall SupportGenie, nor its directors, employees, partners, agents, suppliers, or affiliates, be 
            liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
            loss of profits, data, use, goodwill, or other intangible losses.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any material changes by posting 
            the new Terms and Conditions on this page and updating the "Last Updated" date below.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">8. Contact Information</h2>
          <p>
            Questions about the Terms and Conditions should be sent to us at{" "}
            <a href="mailto:legal@supportgenie.com" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
              legal@supportgenie.com
            </a>
          </p>
        </section>

        <div className="text-sm text-gray-500 dark:text-gray-400 mt-12">
          Last Updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
} 