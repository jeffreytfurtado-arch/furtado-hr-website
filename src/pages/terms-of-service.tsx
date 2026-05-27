import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col">
      <title>Terms of Service - PreciseHR</title>
      <meta name="description" content="Terms of Service for using PreciseHR services and software platform." />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-primary-foreground/90">
              Last Updated: February 8, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-8 prose prose-slate max-w-none">
                <h2>1. Agreement to Terms</h2>
                <p>
                  By accessing or using PreciseHR's website and services, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services.
                </p>

                <h2>2. Description of Services</h2>
                <p>
                  PreciseHR provides human resources consulting services and software solutions, including:
                </p>
                <ul>
                  <li>HR consulting and strategic planning</li>
                  <li>Recruitment and talent acquisition services</li>
                  <li>Compliance and risk management</li>
                  <li>Performance management systems</li>
                  <li>Training and development programs</li>
                  <li>HR software platform and portal access</li>
                </ul>

                <h2>3. User Accounts</h2>
                <h3>3.1 Account Creation</h3>
                <p>
                  To access certain features of our services, you must create an account. You agree to:
                </p>
                <ul>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be responsible for all activities under your account</li>
                </ul>

                <h3>3.2 Account Termination</h3>
                <p>
                  We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.
                </p>

                <h2>4. Use of Services</h2>
                <h3>4.1 Acceptable Use</h3>
                <p>
                  You agree to use our services only for lawful purposes and in accordance with these terms. You agree not to:
                </p>
                <ul>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit malicious code or viruses</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with other users' access to services</li>
                  <li>Use our services for any illegal or unauthorized purpose</li>
                </ul>

                <h3>4.2 Professional Services</h3>
                <p>
                  Our HR consulting services are provided based on the terms outlined in individual service agreements. 
                  These terms supplement but do not replace specific service agreements.
                </p>

                <h2>5. Intellectual Property</h2>
                <p>
                  All content, features, and functionality of our services, including but not limited to text, graphics, 
                  logos, software, and documentation, are owned by PreciseHR and protected by copyright, trademark, and 
                  other intellectual property laws.
                </p>

                <h2>6. Privacy and Data Protection</h2>
                <p>
                  Your use of our services is also governed by our Privacy Policy. We are committed to protecting your 
                  personal information in accordance with Canadian privacy laws, including PIPEDA.
                </p>

                <h2>7. Payment Terms</h2>
                <p>
                  For paid services:
                </p>
                <ul>
                  <li>Fees are specified in your service agreement</li>
                  <li>Payment is due according to agreed terms</li>
                  <li>Late payments may result in service suspension</li>
                  <li>Refunds are provided according to our refund policy</li>
                </ul>

                <h2>8. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, PreciseHR shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages resulting from your use of our services.
                </p>

                <h2>9. Disclaimers</h2>
                <p>
                  Our services are provided "as is" without warranties of any kind, either express or implied. While we 
                  strive to provide accurate and reliable services, we do not guarantee that:
                </p>
                <ul>
                  <li>Services will be uninterrupted or error-free</li>
                  <li>Results will meet your specific requirements</li>
                  <li>All errors will be corrected</li>
                </ul>

                <h2>10. Indemnification</h2>
                <p>
                  You agree to indemnify and hold PreciseHR harmless from any claims, damages, or expenses arising from 
                  your use of our services or violation of these terms.
                </p>

                <h2>11. Governing Law</h2>
                <p>
                  These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.
                </p>

                <h2>12. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of significant changes by 
                  posting the updated terms on our website. Continued use of our services after changes constitutes acceptance 
                  of the new terms.
                </p>

                <h2>13. Contact Information</h2>
                <p>
                  For questions about these Terms of Service, please contact us:
                </p>
                <ul>
                  <li>Email: <a href="mailto:info@precisehr.ca">info@precisehr.ca</a></li>
                  <li>Phone: <a href="tel:+14378872263">(437) 887-2263</a></li>
                  <li>Address: Toronto, Ontario, Canada</li>
                </ul>

                <div className="mt-8 pt-8 border-t">
                  <Link to="/" className="text-primary hover:underline">
                    ← Back to Home
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
