import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { PROVINCES_DATA } from '@/data/provinces';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'HR Services by Province', href: '/hr-services' },
      { name: 'AI Consulting', href: '/ai' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'PreciseHR App', href: '/app' },
    ],
    tools: [
      { name: 'Compliance Checker', href: '/compliance-checker' },
      { name: 'JD Generator', href: '/jd-generator' },
      { name: 'Policy Generator', href: '/policy-generator' },
      { name: 'Offer Letter Generator', href: '/offer-letter' },
      { name: 'Policy Scanner', href: '/policy-scanner' },
      { name: 'Net Pay Calculator', href: '/net-pay-calculator' },
      { name: 'ROI Calculator', href: '/roi-calculator' },
      { name: 'HR Health Check', href: '/hr-assessment' },
      { name: 'Salary Benchmarking', href: '/salary-benchmarking' },
      { name: 'Turnover Calculator', href: '/turnover-calculator' },
      { name: 'Hiring Calculator', href: '/hiring-calculator' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Articles', href: '/articles' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'HR Resources', href: '/resources' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
    ],
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/precisehrcanada/' },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Signup */}
        <div className="mb-12">
          <NewsletterSignup variant="compact" showBenefits={false} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src="/images/precisehr-logo.svg" alt="PreciseHR" className="h-10" />
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Empowering organizations with precise, efficient, and compliant HR solutions. 
              Your trusted partner in human resources management.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@precisehr.ca" className="hover:text-primary transition-colors">
                  info@precisehr.ca
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <a href="tel:+14378872263" className="hover:text-primary transition-colors">
                  (437) 887-2263
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Toronto, ON, Canada</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Links */}
          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* HR Services by province — internal linking */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm font-semibold mb-4">HR Services by province &amp; territory</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {PROVINCES_DATA.map((p) => (
              <Link
                key={p.slug}
                to={`/hr-services/${p.slug}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} PreciseHR. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
