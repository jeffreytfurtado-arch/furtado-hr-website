import { motion } from 'motion/react';
import { Lock, Mail, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ClientPortal() {
  return (
    <div className="min-h-screen">
      <title>Client Portal - PreciseHR Solutions</title>
      <meta name="description" content="Access your PreciseHR Solutions client portal for HR documents, resources, and support." />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Client Portal
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Access your HR documents, resources, and dedicated support team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portal Access Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Login Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Existing Clients</CardTitle>
                    <CardDescription>
                      Sign in to access your client portal
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <Button className="w-full" asChild>
                      <a href="/login">
                        <Lock className="w-4 h-4 mr-2" />
                        Sign In to Portal
                      </a>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Secure authentication required
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Request Access Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="h-full bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle>New to PreciseHR?</CardTitle>
                    <CardDescription>
                      Request portal access and learn about our services
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-primary font-semibold">1</span>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Schedule Consultation</h3>
                          <p className="text-sm text-muted-foreground">
                            Meet with our HR experts to discuss your needs
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-primary font-semibold">2</span>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Onboard Your Company</h3>
                          <p className="text-sm text-muted-foreground">
                            We'll set up your customized HR solutions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-primary font-semibold">3</span>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Access Your Portal</h3>
                          <p className="text-sm text-muted-foreground">
                            Get secure access to all your HR resources
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" asChild>
                      <a href="/#contact">
                        Request Portal Access
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">What's Inside Your Portal</h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to manage your HR operations efficiently
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'HR Documents & Policies',
                  description: 'Access your employee handbook, policies, and compliance documents anytime'
                },
                {
                  title: 'Employee Records',
                  description: 'Securely store and manage employee files, contracts, and performance reviews'
                },
                {
                  title: 'Training Resources',
                  description: 'Access training materials, compliance courses, and development programs'
                },
                {
                  title: 'Direct Support',
                  description: 'Message your dedicated HR team and get expert guidance when you need it'
                },
                {
                  title: 'Compliance Tracking',
                  description: 'Stay on top of deadlines, renewals, and regulatory requirements'
                },
                {
                  title: 'Reports & Analytics',
                  description: 'View insights on turnover, engagement, and HR metrics for your business'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team is here to assist you with portal access or any questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+14378872263">
                  <Phone className="w-4 h-4 mr-2" />
                  (437) 887-2263
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:info@precisehr.ca">
                  <Mail className="w-4 h-4 mr-2" />
                  info@precisehr.ca
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
