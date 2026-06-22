import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col">
      <SEO title="Cookie Policy" description="How PreciseHR uses cookies on our website." path="/cookie-policy" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
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
                <h2>What Are Cookies?</h2>
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                  They are widely used to make websites work more efficiently and provide information to website owners.
                </p>

                <h2>How We Use Cookies</h2>
                <p>
                  PreciseHR uses cookies to:
                </p>
                <ul>
                  <li>Keep you signed in to your account</li>
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you use our website</li>
                  <li>Improve our services and user experience</li>
                  <li>Provide secure access to our HR portal</li>
                </ul>

                <h2>Types of Cookies We Use</h2>
                
                <h3>Essential Cookies</h3>
                <p>
                  These cookies are necessary for the website to function properly. They enable core functionality such as 
                  security, authentication, and accessibility. You cannot opt-out of these cookies.
                </p>

                <h3>Performance Cookies</h3>
                <p>
                  These cookies help us understand how visitors interact with our website by collecting and reporting 
                  information anonymously. This helps us improve our website's performance.
                </p>

                <h3>Functional Cookies</h3>
                <p>
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences 
                  and settings.
                </p>

                <h3>Analytics Cookies</h3>
                <p>
                  We use analytics cookies to understand how visitors use our website. This information helps us improve 
                  our content and services.
                </p>

                <h2>Third-Party Cookies</h2>
                <p>
                  We may use third-party services that set cookies on your device. These services include:
                </p>
                <ul>
                  <li>Google Analytics for website analytics</li>
                  <li>Authentication providers for secure login</li>
                  <li>Content delivery networks for improved performance</li>
                </ul>

                <h2>Managing Cookies</h2>
                <p>
                  Most web browsers allow you to control cookies through their settings. You can:
                </p>
                <ul>
                  <li>View what cookies are stored on your device</li>
                  <li>Delete cookies from your device</li>
                  <li>Block cookies from being set</li>
                  <li>Set preferences for specific websites</li>
                </ul>
                <p>
                  Please note that blocking or deleting cookies may impact your experience on our website and limit 
                  certain functionality.
                </p>

                <h2>Cookie Consent</h2>
                <p>
                  When you first visit our website, you'll see a cookie banner asking for your consent. You can choose to:
                </p>
                <ul>
                  <li>Accept all cookies</li>
                  <li>Reject non-essential cookies</li>
                  <li>Customize your cookie preferences</li>
                </ul>

                <h2>Updates to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. 
                  We will notify you of any significant changes by posting the new policy on this page.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have questions about our use of cookies, please contact us:
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
