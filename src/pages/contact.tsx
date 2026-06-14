import SEO from '@/components/SEO';
import { track } from '@/lib/track';
import { useState, useEffect } from 'react';

// Load Calendly widget script
if (typeof window !== 'undefined') {
  const script = document.createElement('script');
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  script.async = true;
  document.head.appendChild(script);

  const link = document.createElement('link');
  link.href = 'https://assets.calendly.com/assets/external/widget.css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin,
  CheckCircle2,
  Loader2
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    employees: '',
    serviceInterest: '',
    message: ''
  });
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          serviceInterest: formData.serviceInterest || 'Not specified'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // If user opted in to newsletter, subscribe them
      if (subscribeToNewsletter) {
        try {
          await fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              company: formData.company
            })
          });
        } catch (newsletterError) {
          console.error('Newsletter subscription failed:', newsletterError);
          // Don't block the main flow if newsletter fails
        }
      }

      track('contact_submit', { service: formData.serviceInterest || 'Not specified' });
      setIsSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        employees: '',
        serviceInterest: '',
        message: ''
      });
      setSubscribeToNewsletter(false);
      
      // Immediately redirect to Calendly
      window.open('https://calendly.com/precisehr-info/precisehr-consult', '_blank');
    } catch (err) {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col">
      <SEO title="Contact Us" description="Get a free HR assessment for your Canadian business. Reach our team by phone, email, or online form." path="/contact" />
      <title>Get Free HR Assessment - PreciseHR</title>
      <meta name="description" content="Schedule your free HR assessment with PreciseHR. Get expert analysis of your HR needs and customized solutions." />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Your Free HR Assessment</h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Discover how PreciseHR can transform your HR operations. Schedule a complimentary assessment with our experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Schedule Your Assessment</CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and our team will contact you within 24 hours to schedule your free HR assessment.
                    </p>
                  </CardHeader>
                  <CardContent>
                    {isSuccess ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                        <p className="text-muted-foreground mb-4">
                          We have received your request and our team will contact you within 24 hours.
                        </p>
                        <div className="space-y-4">
                          <div className="bg-primary/10 rounded-lg p-4 mb-4">
                            <p className="text-lg font-semibold text-primary mb-2">Opening your calendar...</p>
                            <p className="text-sm text-muted-foreground">
                              We're redirecting you to schedule your free assessment call right now.
                            </p>
                          </div>
                          <div className="pt-4">
                            <Button onClick={() => setIsSuccess(false)} variant="outline">
                              Submit Another Request
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              placeholder="John"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              placeholder="Smith"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="john@company.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              placeholder="(416) 555-0123"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="company">Company Name *</Label>
                            <Input
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              required
                              placeholder="Your Company Inc."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="employees">Number of Employees</Label>
                            <Input
                              id="employees"
                              name="employees"
                              value={formData.employees}
                              onChange={handleChange}
                              placeholder="e.g., 50-100"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="serviceInterest">What service are you interested in? *</Label>
                          <Select
                            value={formData.serviceInterest}
                            onValueChange={(value) => setFormData({ ...formData, serviceInterest: value })}
                          >
                            <SelectTrigger id="serviceInterest">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="HR Consulting">HR Consulting</SelectItem>
                              <SelectItem value="Compliance & Risk Management">Compliance & Risk Management</SelectItem>
                              <SelectItem value="Recruitment & Talent Acquisition">Recruitment & Talent Acquisition</SelectItem>
                              <SelectItem value="Performance Management">Performance Management</SelectItem>
                              <SelectItem value="Employee Relations">Employee Relations</SelectItem>
                              <SelectItem value="Termination Services">Termination Services</SelectItem>
                              <SelectItem value="Workplace Investigations">Workplace Investigations</SelectItem>
                              <SelectItem value="HR Technology & Software">HR Technology & Software</SelectItem>
                              <SelectItem value="Training & Development">Training & Development</SelectItem>
                              <SelectItem value="Compensation and Benefits">Compensation and Benefits</SelectItem>
                              <SelectItem value="General Question">General Question</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Tell Us About Your HR Needs</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Describe your current HR challenges and what you're looking to improve..."
                          />
                        </div>

                        {error && (
                          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                          </div>
                        )}

                        {/* Newsletter Opt-in */}
                        <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
                          <Checkbox 
                            id="newsletter" 
                            checked={subscribeToNewsletter}
                            onCheckedChange={(checked) => setSubscribeToNewsletter(checked as boolean)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <label
                              htmlFor="newsletter"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              Subscribe to our newsletter
                            </label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Get monthly HR insights, compliance updates, and expert tips delivered to your inbox.
                            </p>
                          </div>
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            'Schedule Free Assessment'
                          )}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          By submitting this form, you agree to our Privacy Policy and Terms of Service.
                        </p>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Phone</h4>
                        <a href="tel:4378872263" className="text-sm text-muted-foreground hover:text-primary">
                          (437) 887-2263
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <a href="mailto:info@precisehr.ca" className="text-sm text-muted-foreground hover:text-primary break-all">
                          info@precisehr.ca
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Location</h4>
                        <p className="text-sm text-muted-foreground">
                          Serving businesses across Canada
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">What to Expect</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>Free 30-minute consultation with an HR expert</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>Comprehensive analysis of your current HR practices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>Customized recommendations for improvement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>No obligation proposal with transparent pricing</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Embed Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Or Schedule a Call Directly</h2>
              <p className="text-muted-foreground">
                Pick a time that works best for you and book your free HR assessment call instantly.
              </p>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="calendly-inline-widget" 
                  data-url="https://calendly.com/precisehr-info/precisehr-consult?hide_gdpr_banner=1&primary_color=8b5cf6" 
                  style={{ minWidth: '320px', height: '700px' }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
