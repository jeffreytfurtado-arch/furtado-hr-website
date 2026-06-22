import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col">
      <SEO title="Privacy Policy" description="PreciseHR privacy policy — how we collect, use, and protect your personal information." path="/privacy-policy" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
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
                <h2>1. Introduction</h2>
                <p>
                  PreciseHR ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
                  how we collect, use, disclose, and safeguard your personal information in accordance with Canadian privacy 
                  laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA).
                </p>

                <h2>2. Information We Collect</h2>
                <h3>2.1 Personal Information</h3>
                <p>
                  We may collect the following types of personal information:
                </p>
                <ul>
                  <li>Name, email address, and phone number</li>
                  <li>Company name and job title</li>
                  <li>Account credentials (username and encrypted password)</li>
                  <li>Payment and billing information</li>
                  <li>Employment and HR-related data (when using our services)</li>
                  <li>Communication preferences</li>
                </ul>

                <h3>2.2 Automatically Collected Information</h3>
                <p>
                  When you visit our website, we automatically collect:
                </p>
                <ul>
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <p>
                  We use your personal information for the following purposes:
                </p>
                <ul>
                  <li>Providing and managing our HR services and software</li>
                  <li>Processing transactions and billing</li>
                  <li>Communicating with you about our services</li>
                  <li>Improving our website and services</li>
                  <li>Sending newsletters and marketing communications (with consent)</li>
                  <li>Complying with legal obligations</li>
                  <li>Protecting against fraud and security threats</li>
                </ul>

                <h2>4. Legal Basis for Processing</h2>
                <p>
                  We process your personal information based on:
                </p>
                <ul>
                  <li>Your consent (which you can withdraw at any time)</li>
                  <li>Performance of a contract with you</li>
                  <li>Compliance with legal obligations</li>
                  <li>Our legitimate business interests</li>
                </ul>

                <h2>5. Information Sharing and Disclosure</h2>
                <h3>5.1 Third-Party Service Providers</h3>
                <p>
                  We may share your information with trusted third-party service providers who assist us in:
                </p>
                <ul>
                  <li>Website hosting and maintenance</li>
                  <li>Payment processing</li>
                  <li>Email delivery and marketing</li>
                  <li>Analytics and performance monitoring</li>
                  <li>Customer support services</li>
                </ul>

                <h3>5.2 Legal Requirements</h3>
                <p>
                  We may disclose your information when required by law or to:
                </p>
                <ul>
                  <li>Comply with legal processes or government requests</li>
                  <li>Enforce our terms and policies</li>
                  <li>Protect our rights, property, or safety</li>
                  <li>Prevent fraud or security issues</li>
                </ul>

                <h3>5.3 Business Transfers</h3>
                <p>
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred to the 
                  acquiring entity.
                </p>

                <h2>6. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information, including:
                </p>
                <ul>
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure authentication and access controls</li>
                  <li>Regular security assessments and updates</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response procedures</li>
                </ul>

                <h2>7. Data Retention</h2>
                <p>
                  We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, 
                  unless a longer retention period is required by law. When information is no longer needed, we securely delete 
                  or anonymize it.
                </p>

                <h2>8. Your Privacy Rights</h2>
                <p>
                  Under Canadian privacy law, you have the right to:
                </p>
                <ul>
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Withdrawal of Consent:</strong> Withdraw consent for processing</li>
                  <li><strong>Portability:</strong> Request your data in a portable format</li>
                  <li><strong>Object:</strong> Object to certain types of processing</li>
                  <li><strong>Complaint:</strong> File a complaint with the Privacy Commissioner of Canada</li>
                </ul>

                <h2>9. Marketing Communications</h2>
                <p>
                  With your consent, we may send you marketing emails about our services. You can opt-out at any time by:
                </p>
                <ul>
                  <li>Clicking the "unsubscribe" link in our emails</li>
                  <li>Contacting us directly</li>
                  <li>Updating your preferences in your account settings</li>
                </ul>

                <h2>10. Children's Privacy</h2>
                <p>
                  Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal 
                  information from children.
                </p>

                <h2>11. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries outside of Canada. We ensure appropriate 
                  safeguards are in place to protect your information in accordance with this policy.
                </p>

                <h2>12. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of significant changes by posting 
                  the updated policy on our website and updating the "Last Updated" date.
                </p>

                <h2>13. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
                </p>
                <ul>
                  <li>Email: <a href="mailto:info@precisehr.ca">info@precisehr.ca</a></li>
                  <li>Phone: <a href="tel:+14378872263">(437) 887-2263</a></li>
                  <li>Address: Toronto, Ontario, Canada</li>
                </ul>

                <h3>Privacy Commissioner of Canada</h3>
                <p>
                  If you have concerns about our privacy practices, you may also contact:
                </p>
                <ul>
                  <li>Office of the Privacy Commissioner of Canada</li>
                  <li>Website: <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer">www.priv.gc.ca</a></li>
                  <li>Toll-free: 1-800-282-1376</li>
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
