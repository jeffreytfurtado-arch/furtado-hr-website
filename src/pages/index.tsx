import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  ClipboardCheck,
  Scale,
  UserX,
  ChevronDown,
  Plus,
  Minus,
  Zap,
  Bot,
  BarChart3,
} from 'lucide-react';
import { motion, useAnimation } from 'motion/react';
import { useEffect, useRef, useState, useCallback } from 'react';

/* ── Intersection Observer hook ── */
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: 0.3, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/* ── Count-up hook ── */
function useCountUp(end: number, duration = 2000, start = false, suffix = '', prefix = '') {
  const [display, setDisplay] = useState(prefix + '0' + suffix);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let frame: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * end);
      setDisplay(prefix + current.toLocaleString() + suffix);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [start, end, duration, suffix, prefix]);
  return display;
}

/* ── Animation variants ── */
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

/* ── Stat counter component ── */
function StatCounter({ value, label, delay }: { value: string; label: string; delay: number }) {
  const { ref, inView } = useInView();
  // Parse the value: "90+" -> end=90, suffix="+"
  const numMatch = value.match(/^([^\d]*)(\d[\d,]*)(.*)$/);
  const prefix = numMatch?.[1] || '';
  const num = numMatch ? parseInt(numMatch[2].replace(/,/g, ''), 10) : 0;
  const suffix = numMatch?.[3] || '';
  const display = useCountUp(num, 2200, inView, suffix, prefix);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{display}</div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
}

/* ── FAQ Item component ── */
function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, inView } = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`group relative rounded-xl border bg-card overflow-hidden transition-all duration-300 ${
          isOpen ? 'border-primary/40 shadow-lg shadow-primary/5' : 'border-border hover:border-primary/20 hover:shadow-md'
        }`}
      >
        {/* Gradient accent line */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-cyan-400 to-primary transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4"
        >
          <span className="font-semibold text-sm md:text-base pr-2">{question}</span>
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? 'bg-primary text-white rotate-0' : 'bg-primary/10 text-primary'
          }`}>
            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </div>
        </button>

        <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="px-5 md:px-6 pb-5 md:pb-6 text-muted-foreground text-sm leading-relaxed border-t border-border/50 pt-4">
              {answer}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Process Step component ── */
function ProcessStep({ step, title, desc, index }: { step: string; title: string; desc: string; index: number }) {
  const { ref, inView } = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="relative bg-card rounded-2xl border p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-500 group">
        {/* Step number with animated ring */}
        <div className="relative w-16 h-16 mb-6">
          <div className={`absolute inset-0 rounded-full border-2 border-primary/20 transition-all duration-500 ${inView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-xl font-bold text-white">{step}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
      </div>

      {/* Connector line for desktop */}
      {index < 2 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
          className="hidden md:block absolute top-12 -right-[calc(50%-2rem)] w-[calc(100%-4rem)] h-[2px] bg-gradient-to-r from-primary/40 to-primary/10 origin-left"
        />
      )}
    </motion.div>
  );
}

export default function HomePage() {
  const stats = [
    { value: '90+', label: 'Clients Served' },
    { value: '15+', label: 'Years Experience' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '1,500+', label: 'Employees Supported' },
  ];

  const primaryServices = [
    {
      icon: Laptop,
      title: 'HR Software Platform',
      description: 'Intelligent HR management software that automates repetitive tasks, flags compliance risks, and gives you real-time insights into your workforce.',
    },
    {
      icon: Briefcase,
      title: 'HR Consulting & Strategy',
      description: 'Data-informed strategic guidance to align your people practices with business objectives and drive measurable growth.',
    },
    {
      icon: UserCheck,
      title: 'Recruitment & Talent',
      description: 'Smart recruitment from executive search to onboarding — automated screening, intelligent matching, faster hires.',
    },
    {
      icon: DollarSign,
      title: 'Compensation & Benefits',
      description: 'Automated salary benchmarking, benefits modeling, and total rewards strategy built on real-time Canadian market data.',
    },
  ];

  const secondaryServices = [
    {
      icon: Search,
      title: 'Workplace Investigations',
      description: 'Compliant, non-biased third-party investigations for harassment, violence, and workplace complaints.',
    },
    {
      icon: UserX,
      title: 'Termination Services',
      description: 'Professional termination planning, severance calculation, legal compliance, and post-termination support.',
    },
    {
      icon: Shield,
      title: 'Compliance & Risk',
      description: 'Navigate Canadian employment law, workplace safety, and regulatory requirements.',
    },
    {
      icon: TrendingUp,
      title: 'Performance Management',
      description: 'Performance reviews, goal setting, succession planning, and career development programs.',
    },
  ];

  const differentiators = [
    { title: 'Canadian Expertise', description: 'Deep knowledge of federal and provincial employment law across all Canadian jurisdictions.' },
    { title: 'Intelligent Technology', description: 'Our platform uses intelligent automation to handle compliance monitoring, document generation, and workforce analytics — so you spend less time on admin.' },
    { title: 'Scalable Solutions', description: 'From 1 employee to 5,000 — our services grow with your business, no long-term contracts required.' },
  ];

  const faqs = [
    { q: 'What size businesses do you work with?', a: 'We work with businesses of all sizes, from solo founders to enterprises with thousands of employees. Our services are modular — you pick what you need, and we scale with you as you grow.' },
    { q: 'How quickly can you get started?', a: 'We can typically begin within 1-2 business days. For urgent matters like workplace investigations or terminations, we offer same-day expedited onboarding.' },
    { q: 'Do I need to use all your services?', a: 'Not at all. Many clients start with one or two services and expand over time. We\'ll build a package around your priorities and budget — no lock-in contracts.' },
    { q: 'What makes PreciseHR different from other HR firms?', a: 'We build intelligent automation into everything we do — from compliance monitoring to document generation. Most HR firms offer manual consulting or basic software. We combine both, with built-in intelligence that reduces your costs and gives you more control over your operations.' },
    { q: 'How do you handle compliance across provinces?', a: 'Our platform continuously monitors federal and provincial employment law changes and flags what affects your business. You\'ll get proactive alerts and automated policy recommendations before changes take effect — no more scrambling.' },
    { q: 'What is your pricing structure?', a: 'Transparent, flexible pricing based on company size and selected services. No hidden fees, no long-term contracts. Contact us for a free assessment and customized quote.' },
  ];

  const processSteps = [
    { step: '01', title: 'Free Assessment', desc: 'We review your current HR operations and identify gaps, risks, and opportunities.' },
    { step: '02', title: 'Custom Plan', desc: 'We design a tailored HR strategy and select the services that fit your needs and budget.' },
    { step: '03', title: 'Ongoing Support', desc: 'Your dedicated HR team handles the work — you focus on growing your business.' },
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
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Trusted by 90+ Canadian organizations
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
              HR solutions that
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">move your business forward</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Intelligent consulting, automation-ready software, and deep Canadian expertise — everything you need to build exceptional teams and stay compliant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto font-semibold">
                  Get a Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/hr-assessment">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                  <ClipboardCheck className="mr-2 w-5 h-5" />
                  Take Free HR Health Check
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats — count up on scroll */}
      <section className="border-b bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StatCounter key={i} value={stat.value} label={stat.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Primary Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive HR Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From day-to-day operations to strategic initiatives, we cover every aspect of human resources.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {primaryServices.map((service, i) => {
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

          {/* Secondary Services — compact row */}
          <motion.div {...fadeUp} className="mt-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {secondaryServices.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div key={i} {...staggerChild(0.4 + i * 0.06)}>
                    <div className="flex items-start gap-3 p-4 rounded-xl border bg-card hover:border-primary/20 hover:shadow-sm transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{service.title}</h4>
                        <p className="text-muted-foreground text-xs leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="text-center mt-10">
            <Link to="/services">
              <Button variant="outline" size="lg">
                View All Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why PreciseHR */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div {...fadeUp}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop&q=80"
                  alt="Professional team collaborating"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>

            <div>
              <motion.div {...fadeUp}>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Why PreciseHR</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">What sets us apart</h2>
              </motion.div>

              <div className="space-y-6">
                {differentiators.map((item, i) => (
                  <motion.div key={i} {...staggerChild(i * 0.15)} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-primary">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligent by Design */}
      <section className="py-24 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-3">Intelligent by Design</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Smarter HR, not just more HR</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Every part of our platform is built with intelligent automation — reducing your costs, eliminating manual work, and putting you in control.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-14">
            {[
              {
                icon: Zap,
                title: 'Automated Compliance',
                description: 'Our system monitors employment law changes across every Canadian jurisdiction and automatically flags what affects your business — before deadlines hit.',
              },
              {
                icon: Bot,
                title: 'Intelligent Document Generation',
                description: 'Generate job descriptions, offer letters, policies, and termination packages in seconds — customized to your company, role, and province.',
              },
              {
                icon: BarChart3,
                title: 'Predictive Workforce Insights',
                description: 'Spot turnover risks, compensation gaps, and compliance issues before they become problems. Data-driven decisions, not guesswork.',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} {...staggerChild(i * 0.12)}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-cyan-300" />
                    </div>
                    <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeUp} className="text-center">
            <p className="text-white/60 text-sm mb-4">See what our intelligent tools can do</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/compliance-checker">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold w-full sm:w-auto">
                  <Shield className="mr-2 w-5 h-5" />
                  Check Your Compliance
                </Button>
              </Link>
              <Link to="/jd-generator">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                  Try JD Generator
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process — animated steps */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold">Getting started is simple</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {processSteps.map((item, i) => (
              <ProcessStep key={i} step={item.step} title={item.title} desc={item.desc} index={i} />
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

      {/* FAQ — cutting edge design */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Got questions? We've got answers.</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Everything you need to know about working with PreciseHR.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} index={i} />
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-10">
            <p className="text-muted-foreground text-sm mb-4">Still have questions?</p>
            <Link to="/contact">
              <Button variant="outline">
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA — compact */}
      <section className="py-16 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp} className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to transform your HR?
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Join 90+ Canadian organizations that trust PreciseHR.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
