import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Shield,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  UserCheck,
  DollarSign,
  Laptop,
  Phone,
  Search,
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

export default function HomePage() {
  const stats = [
    { value: '500+', label: 'Clients Served' },
    { value: '15+', label: 'Years Experience' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support Available' },
  ];

  const services = [
    {
      icon: Laptop,
      title: 'HR Software Platform',
      description: 'All-in-one HR management software to streamline operations, track employees, and automate compliance.',
    },
    {
      icon: Briefcase,
      title: 'HR Consulting & Strategy',
      description: 'Strategic guidance to align your people practices with business objectives and drive growth.',
    },
    {
      icon: UserCheck,
      title: 'Recruitment & Talent',
      description: 'Full-cycle recruitment from executive search to onboarding — find the right people, faster.',
    },
    {
      icon: Shield,
      title: 'Compliance & Risk',
      description: 'Navigate Canadian employment law, workplace investigations, and regulatory requirements.',
    },
    {
      icon: TrendingUp,
      title: 'Performance Management',
      description: 'Performance reviews, goal setting, succession planning, and career development programs.',
    },
    {
      icon: DollarSign,
      title: 'Compensation & Benefits',
      description: 'Salary benchmarking, benefits design, and total rewards strategy to attract and retain talent.',
    },
  ];

  const differentiators = [
    { title: 'Canadian Expertise', description: 'Deep knowledge of federal and provincial employment law across all Canadian jurisdictions.' },
    { title: 'Technology + Consulting', description: 'The only provider combining a full HR software platform with hands-on expert consulting.' },
    { title: 'Scalable Solutions', description: 'From 5 employees to 500 — our services grow with your business, no long-term contracts required.' },
  ];

  const faqs = [
    { q: 'What size businesses do you work with?', a: 'We work with businesses of all sizes, from startups with just a few employees to established companies with hundreds of staff. Our services are scalable and customized to your needs.' },
    { q: 'How quickly can you get started?', a: 'We can typically begin within 1-2 business days. For urgent matters like workplace investigations or terminations, we offer expedited onboarding.' },
    { q: 'Do I need to use all your services?', a: 'No — you have complete flexibility. Many clients start with one or two services and expand as needs grow. We\'ll create a package that fits your business and budget.' },
    { q: 'What makes PreciseHR different?', a: 'We combine cutting-edge HR technology with personalized consulting. Unlike providers that offer only software or only consulting, we provide both — plus deep expertise in Canadian employment law.' },
    { q: 'How do you handle compliance?', a: 'Our team continuously monitors federal and provincial employment law changes. We proactively update our recommendations, and you\'ll receive timely alerts about changes affecting your business.' },
    { q: 'What is your pricing structure?', a: 'We offer transparent, flexible pricing based on company size and selected services. Contact us for a free assessment and customized quote.' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Trusted by 500+ Canadian organizations
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
              HR solutions that
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">move your business forward</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
              Strategic consulting, powerful software, and deep Canadian expertise — everything you need to build exceptional teams and stay compliant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto font-semibold">
                  Get a Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} {...staggerChild(i * 0.1)} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive HR Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From day-to-day operations to strategic initiatives, we cover every aspect of human resources.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div key={i} {...staggerChild(i * 0.08)}>
                  <Card className="h-full group hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg">
                View All Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why PreciseHR — full-width accent band */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Why PreciseHR</p>
            <h2 className="text-3xl md:text-4xl font-bold">What sets us apart</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {differentiators.map((item, i) => (
              <motion.div key={i} {...staggerChild(i * 0.1)}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <span className="text-2xl font-bold text-primary">{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold">Getting started is simple</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Free Assessment', desc: 'We review your current HR operations and identify gaps, risks, and opportunities.' },
              { step: '02', title: 'Custom Plan', desc: 'We design a tailored HR strategy and select the services that fit your needs and budget.' },
              { step: '03', title: 'Ongoing Support', desc: 'Your dedicated HR team handles the work — you focus on growing your business.' },
            ].map((item, i) => (
              <motion.div key={i} {...staggerChild(i * 0.15)} className="relative">
                <div className="text-6xl font-black text-primary/10 mb-2">{item.step}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 text-primary/20">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-14">
            <Link to="/contact">
              <Button size="lg">
                Book Your Free Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold">Trusted by Canadian businesses</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Sarah M.', role: 'CEO', industry: 'Technology', quote: 'PreciseHR transformed our HR operations. Their software and consulting helped us scale from 20 to 150 employees seamlessly.' },
              { name: 'David C.', role: 'Operations Director', industry: 'Manufacturing', quote: 'The compliance support alone has saved us countless hours and potential legal issues. Their team truly cares about our success.' },
              { name: 'Jennifer T.', role: 'HR Manager', industry: 'Retail', quote: 'Best decision we made. The software is intuitive, and their consulting team feels like an extension of our HR department.' },
            ].map((t, i) => (
              <motion.div key={i} {...staggerChild(i * 0.1)}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role} · {t.industry}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold">Frequently asked questions</h2>
          </motion.div>

          <motion.div {...fadeUp} className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-lg px-6 hover:border-primary/30 transition-colors">
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-semibold pr-4">{faq.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div {...fadeUp} className="text-center mt-10">
            <p className="text-muted-foreground mb-4">Have more questions?</p>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your HR?
            </h2>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Join 500+ Canadian organizations that trust PreciseHR. Get a free assessment and see how we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto font-semibold">
                  Get Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
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
