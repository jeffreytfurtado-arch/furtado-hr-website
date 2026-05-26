import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Users, 
  FileText, 
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  UserCheck,
  Award,
  Target,
  Clock,
  DollarSign,
  Laptop
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ServicesPage() {
  const services = [
    {
      icon: Laptop,
      title: 'HR Software Platform',
      description: 'All-in-one HR management software to streamline your operations and automate tasks.',
      features: [
        'Employee profiles & data repository',
        'Document management & storage',
        'Vacation & sick day tracking',
        'Attendance monitoring',
        'Policy document uploads',
        'Legally compliant HR reports'
      ],
      hasButton: true
    },
    {
      icon: Briefcase,
      title: 'HR Consulting & Strategy',
      description: 'Strategic HR guidance to align your people practices with business objectives.',
      features: [
        'HR strategy development',
        'Organizational design',
        'Change management',
        'HR policy development',
        'Workforce planning',
        'HR audits & assessments'
      ]
    },
    {
      icon: UserCheck,
      title: 'Recruitment & Talent Acquisition',
      description: 'Find and attract the right talent to build high-performing teams.',
      features: [
        'Executive search',
        'Full-cycle recruitment',
        'Candidate screening',
        'Interview coordination',
        'Employer branding',
        'Onboarding programs'
      ]
    },
    {
      icon: Shield,
      title: 'Compliance & Risk Management',
      description: 'Navigate Canadian employment law and mitigate workplace risks.',
      features: [
        'Employment law compliance',
        'Policy & handbook creation',
        'Workplace investigations',
        'Health & safety programs',
        'Regulatory updates',
        'Risk assessments'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Performance Management',
      description: 'Drive employee performance and organizational success.',
      features: [
        'Performance review systems',
        'Goal setting frameworks',
        '360-degree feedback',
        'Performance improvement plans',
        'Succession planning',
        'Career development'
      ]
    },
    {
      icon: Award,
      title: 'Training & Development',
      description: 'Invest in your team\'s growth with customized learning programs.',
      features: [
        'Leadership development',
        'Management training',
        'Skills workshops',
        'Coaching & mentoring',
        'Team building',
        'Diversity & inclusion training'
      ]
    },
    {
      icon: DollarSign,
      title: 'Compensation & Benefits',
      description: 'Design competitive compensation packages to attract and retain talent.',
      features: [
        'Salary benchmarking',
        'Compensation structure design',
        'Benefits program design',
        'Total rewards strategy',
        'Job evaluation',
        'Incentive programs'
      ]
    },
    {
      icon: FileText,
      title: 'HR Documentation',
      description: 'Professional documentation and policy management.',
      features: [
        'Employee handbooks',
        'Job descriptions',
        'Employment contracts',
        'Policy templates',
        'Forms & checklists',
        'HR process documentation'
      ]
    },
    {
      icon: Users,
      title: 'Employee Relations',
      description: 'Foster positive workplace culture and resolve employee issues.',
      features: [
        'Conflict resolution',
        'Mediation services',
        'Disciplinary processes',
        'Termination support',
        'Employee engagement',
        'Culture development'
      ]
    }
  ];

  const industries = [
    { name: 'Technology & Software', icon: '💻' },
    { name: 'Professional Services', icon: '💼' },
    { name: 'Manufacturing', icon: '🏭' },
    { name: 'Healthcare', icon: '🏥' },
    { name: 'Retail & E-commerce', icon: '🛍️' },
    { name: 'Financial Services', icon: '💰' },
    { name: 'Construction', icon: '🏗️' },
    { name: 'Non-Profit', icon: '🤝' }
  ];

  const process = [
    {
      step: '1',
      title: 'Discovery',
      description: 'We learn about your business, challenges, and HR needs through an in-depth consultation.'
    },
    {
      step: '2',
      title: 'Strategy',
      description: 'Our team develops a customized HR strategy aligned with your business objectives.'
    },
    {
      step: '3',
      title: 'Implementation',
      description: 'We work alongside you to implement solutions, providing hands-on support and guidance.'
    },
    {
      step: '4',
      title: 'Optimization',
      description: 'Continuous monitoring and refinement to ensure your HR practices deliver results.'
    }
  ];

  const benefits = [
    'Reduce HR administrative burden by up to 60%',
    'Ensure 100% compliance with Canadian employment law',
    'Improve employee retention rates',
    'Access to certified HR professionals',
    'Scalable solutions that grow with your business',
    'Cost-effective alternative to in-house HR',
    'Proactive risk management',
    'Strategic HR guidance when you need it'
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('https://media.gettyimages.com/id/2161842568/photo/business-persons-on-meeting-in-the-office.jpg?b=1&s=2048x2048&w=0&k=20&c=r6kh9ieQZHxQLjuajST-AM_wwQgXkxb2KUnZqfjc8nI=')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Comprehensive HR Services
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              From strategic consulting to day-to-day HR support, we provide the expertise 
              you need to build and manage exceptional teams.
            </p>
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Get Free HR Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured: HR Software Platform */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 border-accent shadow-xl">
              <CardContent className="pt-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                      <Laptop className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">PreciseHR Software Platform</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      All-in-one HR management software to streamline your operations, automate tasks, 
                      and keep your team organized. Everything you need in one powerful platform.
                    </p>
                    <Link to="/client-portal">
                      <Button size="lg" className="mb-6">
                        Access PreciseHR App
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">Employee profiles & data</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">Document management</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">Vacation tracking</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">Attendance monitoring</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">Policy uploads</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">Compliant reports</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Full-spectrum HR solutions tailored to your organization
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {service.hasButton && (
                        <Link to="/client-portal" className="block">
                          <Button className="w-full" size="sm">
                            Access PreciseHR App
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven approach to delivering HR excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized HR expertise across diverse sectors
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-3">{industry.icon}</div>
                    <p className="font-medium">{industry.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Partner With PreciseHR?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our clients experience measurable improvements in HR efficiency, compliance, 
                and employee satisfaction.
              </p>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://media.gettyimages.com/id/1730120071/photo/business-persons-on-meeting-in-the-office.jpg?b=1&s=2048x2048&w=0&k=20&c=3GQZNkBZgIhQbhx6K6LQ59VY6xF5d_6iFycKiSusIaM="
                alt="HR consulting meeting"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
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
              Ready to Elevate Your HR?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Get a free HR assessment to discuss your needs and discover how PreciseHR 
              can help your organization thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Free HR Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white/30 text-white">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
