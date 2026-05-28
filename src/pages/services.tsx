import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  DollarSign,
  Laptop,
  Search,
  UserX,
  Phone,
} from 'lucide-react';
import { motion } from 'motion/react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const staggerChild = (delay: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay },
});

export default function ServicesPage() {
  const services = [
    {
      icon: Laptop,
      title: 'HR Software Platform',
      description: 'Intelligent HR management software that automates tasks, flags risks, and delivers real-time workforce insights.',
      features: ['Automated employee profiles & data management', 'Intelligent document management & storage', 'Smart vacation & sick day tracking', 'Automated attendance monitoring', 'Policy document management with alerts', 'Auto-generated compliance reports'],
    },
    {
      icon: Briefcase,
      title: 'HR Consulting & Strategy',
      description: 'Data-driven HR guidance aligned with your business objectives.',
      features: ['HR strategy development', 'Organizational design', 'Change management', 'Intelligent policy development', 'Workforce planning & analytics', 'Automated HR audits & assessments'],
    },
    {
      icon: UserCheck,
      title: 'Recruitment & Talent',
      description: 'Smart recruitment — automated screening, intelligent matching, faster hires.',
      features: ['Executive search', 'Full-cycle recruitment', 'Automated candidate screening', 'Interview coordination', 'Employer branding', 'Streamlined onboarding programs'],
    },
    {
      icon: Shield,
      title: 'Compliance & Risk',
      description: 'Automated compliance monitoring across all Canadian jurisdictions.',
      features: ['Automated employment law monitoring', 'Intelligent policy & handbook creation', 'Health & safety programs', 'Real-time regulatory alerts', 'Automated risk assessments', 'Audit-ready documentation'],
    },
    {
      icon: TrendingUp,
      title: 'Performance Management',
      description: 'Drive employee performance and organizational success.',
      features: ['Performance review systems', 'Goal setting frameworks', '360-degree feedback', 'Performance improvement plans', 'Succession planning', 'Career development'],
    },
    {
      icon: Award,
      title: 'Training & Development',
      description: 'Customized learning programs for your team\'s growth.',
      features: ['Leadership development', 'Management training', 'Skills workshops', 'Coaching & mentoring', 'Team building', 'Diversity & inclusion training'],
    },
    {
      icon: DollarSign,
      title: 'Compensation & Benefits',
      description: 'Competitive compensation packages to attract and retain talent.',
      features: ['Salary benchmarking', 'Compensation structure design', 'Benefits program design', 'Total rewards strategy', 'Job evaluation', 'Incentive programs'],
    },
    {
      icon: FileText,
      title: 'HR Documentation',
      description: 'Professional documentation and policy management.',
      features: ['Employee handbooks', 'Job descriptions', 'Employment contracts', 'Policy templates', 'Forms & checklists', 'Process documentation'],
    },
    {
      icon: Users,
      title: 'Employee Relations',
      description: 'Foster positive workplace culture and resolve issues.',
      features: ['Conflict resolution', 'Mediation services', 'Disciplinary processes', 'Employee engagement', 'Culture development', 'Workplace communication'],
    },
    {
      icon: Search,
      title: 'Workplace Investigations',
      description: 'Compliant, non-biased third-party investigations.',
      features: ['Harassment investigations', 'Workplace violence assessments', 'Employee complaint resolution', 'Third-party neutral investigations', 'Comprehensive reports', 'Legal compliance documentation'],
    },
    {
      icon: UserX,
      title: 'Termination Services',
      description: 'End-to-end termination support from planning to execution.',
      features: ['Termination planning & strategy', 'Termination meeting facilitation', 'Severance package calculation', 'Legal compliance review', 'Documentation preparation', 'Post-termination support'],
    },
  ];

  const industries = [
    'Technology & Software', 'Professional Services', 'Manufacturing', 'Healthcare',
    'Retail & E-commerce', 'Financial Services', 'Construction', 'Non-Profit',
  ];

  const benefits = [
    'Reduce HR administrative burden by up to 60% with intelligent automation',
    'Automated compliance monitoring across all Canadian jurisdictions',
    'Predictive analytics to improve employee retention',
    'Instant document generation — job descriptions, policies, contracts',
    'Scalable solutions that grow with your business',
    'Lower costs than in-house HR with better coverage',
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-4">Our Services</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Intelligent HR solutions
              <br />for Canadian businesses
            </h1>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              From strategic consulting to automated compliance, we combine expert guidance with intelligent technology to manage your people smarter.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Get Free Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Full-Spectrum HR</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligent tools, expert guidance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every service is enhanced with built-in intelligence — automating the routine so your team can focus on what matters.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div key={i} {...staggerChild(i * 0.05)}>
                  <Card className="h-full group hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Industries</p>
            <h2 className="text-3xl md:text-4xl font-bold">Specialized expertise across sectors</h2>
          </motion.div>

          <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {industries.map((industry, i) => (
              <span key={i} className="px-5 py-2.5 bg-background border rounded-full text-sm font-medium hover:border-primary/50 hover:shadow-sm transition-all">
                {industry}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div {...fadeUp}>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Why Partner With Us</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Measurable results for your organization</h2>
              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <motion.div key={i} {...staggerChild(i * 0.08)} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div {...staggerChild(0.2)} className="grid grid-cols-2 gap-4">
              {[
                { value: '60%', label: 'Reduction in HR admin burden' },
                { value: '100%', label: 'Compliance assurance' },
                { value: '40%', label: 'Cost savings vs in-house HR' },
                { value: '24/7', label: 'Expert access & platform' },
              ].map((stat, i) => (
                <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Not sure where to start?</h2>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Run a free compliance check to see where your business stands — then let us help close the gaps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/compliance-checker">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto font-semibold">
                  <Shield className="mr-2 w-5 h-5" />
                  Run Free Compliance Check
                </Button>
              </Link>
              <a href="tel:+14378872263">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                  <Phone className="mr-2 w-4 h-4" />
                  (437) 887-2263
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
