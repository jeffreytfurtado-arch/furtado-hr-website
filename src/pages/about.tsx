import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Target, 
  Heart, 
  Award,
  TrendingUp,
  Shield,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ClipboardCheck,
  Rocket,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and ethical practices in everything we do.'
    },
    {
      icon: Heart,
      title: 'People-First',
      description: 'Your employees are your greatest asset. We help you build cultures where people thrive.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We stay ahead of HR trends and leverage technology to deliver modern solutions.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We are committed to delivering precise, high-quality HR services that exceed expectations.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Free Assessment',
      description: 'We start with a comprehensive analysis of your current HR practices, challenges, and goals. No obligation, no pressure - just expert insights into how we can help.',
      icon: ClipboardCheck,
      highlights: ['30-minute consultation', 'Identify pain points', 'Custom recommendations']
    },
    {
      step: '02',
      title: 'Custom Strategy',
      description: 'Based on your assessment, we create a tailored HR solution plan. Choose the services you need - software, consulting, or both - with transparent pricing and clear deliverables.',
      icon: Target,
      highlights: ['Personalized roadmap', 'Flexible service options', 'Clear timeline & pricing']
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Our team works alongside you to deploy systems, update policies, and train your staff. We handle the heavy lifting while keeping disruption to a minimum.',
      icon: Rocket,
      highlights: ['Seamless onboarding', 'Staff training included', 'Minimal disruption']
    },
    {
      step: '04',
      title: 'Ongoing Support',
      description: 'HR doesn\'t stop after setup. We provide continuous guidance, software updates, compliance monitoring, and expert advice whenever you need it.',
      icon: Users,
      highlights: ['24/7 platform access', 'Expert advisors on-call', 'Regular compliance updates']
    }
  ];

  const certifications = [
    'Chartered Professionals in Human Resources (CPHR)',
    'Society for Human Resource Management (SHRM)',
    'Human Resources Professionals Association (HRPA)',
    'Canadian Payroll Association (CPA)'
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('https://media.gettyimages.com/id/2235463489/photo/a-shared-moment-of-success-and-joy.jpg?b=1&s=2048x2048&w=0&k=20&c=hVQst7SUgLZS0REuQ90nFpbiCbl4tA9fRVHmo78ClE8=')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About PreciseHR
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Your trusted partner in human resources excellence. We combine deep expertise 
              with a commitment to precision, helping Canadian organizations build stronger teams 
              and better workplaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground text-lg">
                    To empower organizations with precise, efficient, and compliant HR solutions 
                    that enable them to attract, develop, and retain exceptional talent while 
                    fostering positive workplace cultures.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground text-lg">
                    To be Canada's most trusted HR partner, recognized for our expertise, 
                    innovation, and unwavering commitment to helping organizations achieve 
                    their full potential through exceptional people management.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <CardContent className="pt-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-semibold">How It Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple, proven approach to transforming your HR operations
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {processSteps.map((process, index) => {
                const Icon = process.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all border-2 hover:border-primary/50">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-8 h-8 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-primary mb-1">Step {process.step}</div>
                            <h3 className="text-2xl font-bold">{process.title}</h3>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4">{process.description}</p>
                        <ul className="space-y-2">
                          {process.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/contact">
                <Button size="lg">
                  Start Your Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Certifications</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our team holds certifications from leading HR professional organizations
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {certifications.map((cert, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-lg">{cert}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Let's discuss how PreciseHR can help your organization achieve its HR goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Free HR Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white/30 text-white">
                  View Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
