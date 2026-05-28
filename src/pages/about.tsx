import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Shield,
  Heart,
  Award,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Phone,
  Users,
  Scale,
  UserCheck,
  Laptop,
  Briefcase,
  Target,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/* ── Intersection Observer hook ── */
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.2, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/* ── Animation helpers ── */
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

/* ── Animated card wrapper ── */
function AnimatedCard({ children, index, className = '' }: { children: React.ReactNode; index: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
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

function StatCounter({ value, label, delay }: { value: string; label: string; delay: number }) {
  const { ref, inView } = useInView();
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
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">{display}</div>
      <div className="text-sm text-white/70 font-medium">{label}</div>
    </motion.div>
  );
}

export default function AboutPage() {
  const values = [
    { icon: Shield, title: 'Integrity', description: 'Transparent, honest, and ethical practices in everything we do.' },
    { icon: Heart, title: 'People-First', description: 'Your employees are your greatest asset. We help build cultures where people thrive.' },
    { icon: Lightbulb, title: 'Innovation', description: 'We build intelligent automation into every service — reducing costs and putting our clients in control.' },
    { icon: Award, title: 'Excellence', description: 'Precise, high-quality services that consistently exceed expectations.' },
  ];

  const capabilities = [
    {
      icon: Scale,
      title: 'HR Compliance & Risk',
      description: 'Our compliance team monitors employment law across all Canadian jurisdictions — federal and provincial. From policy audits to workplace investigations, we keep your organization protected and compliant.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop&q=80',
    },
    {
      icon: UserCheck,
      title: 'Talent Acquisition',
      description: 'Our recruitment specialists handle full-cycle hiring — from executive search and candidate screening to employer branding and onboarding programs that reduce early turnover.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop&q=80',
    },
    {
      icon: Users,
      title: 'Employee Relations',
      description: 'Experienced consultants specializing in conflict resolution, mediation, performance management, and building positive workplace cultures that drive retention.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&q=80',
    },
    {
      icon: Laptop,
      title: 'HR Technology',
      description: 'Our technology team builds and supports our intelligent HR software platform — automating compliance tracking, generating documents instantly, surfacing workforce insights, and giving organizations of every size the tools to operate smarter with less overhead.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop&q=80',
    },
  ];

  const certifications = [
    'Chartered Professionals in Human Resources (CPHR)',
    'Society for Human Resource Management (SHRM)',
    'Human Resources Professionals Association (HRPA)',
    'Canadian Payroll Association (CPA)',
  ];

  return (
    <div className="flex flex-col">
      <SEO title="About PreciseHR" description="Deep Canadian HR expertise, intelligent automation, and a commitment to precision. Learn how PreciseHR helps organizations build stronger teams." path="/about" />
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
            <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-4">About Us</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Your trusted partner in
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">HR excellence</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              We combine deep expertise with a commitment to precision, helping Canadian organizations build stronger teams and better workplaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-[#001d3d] border-t border-white/10">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '90+', label: 'Clients Served' },
              { value: '15+', label: 'Years Experience' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '1,500+', label: 'Employees Supported' },
            ].map((stat, i) => (
              <StatCounter key={i} value={stat.value} label={stat.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Story section with image */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <AnimatedCard index={0}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=500&fit=crop&q=80"
                  alt="Team collaboration in modern office"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </AnimatedCard>
            <AnimatedCard index={1}>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Built from experience, driven by purpose</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                PreciseHR was founded on a simple observation: Canadian businesses deserve HR support that's both expert and accessible. Too many organizations — especially growing ones — are forced to choose between expensive enterprise solutions and generic advice that doesn't account for the complexities of Canadian employment law.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We built PreciseHR to bridge that gap. By combining intelligent automation with hands-on consulting from experienced professionals, we give businesses of every size the tools and guidance to manage their people with confidence — from their first hire to their five-thousandth. Our platform handles the repetitive work automatically, so you get more control at a fraction of the cost.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedCard index={0}>
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-8">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Our Mission</p>
                  <h2 className="text-2xl font-bold mb-4">Empowering organizations through precision HR</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide efficient, compliant HR solutions that enable organizations to attract, develop, and retain exceptional talent while fostering positive workplace cultures.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>
            <AnimatedCard index={1}>
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-8">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Our Vision</p>
                  <h2 className="text-2xl font-bold mb-4">Canada's most trusted HR partner</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To be recognized for our expertise, innovation, and unwavering commitment to helping organizations achieve their full potential through exceptional people management.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Functional Capabilities — "Our Expertise" */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Our Expertise</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Specialized teams, deep capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our practice areas are led by experienced professionals with deep specialization in Canadian HR.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <AnimatedCard key={i} index={i}>
                  <Card className="h-full overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={cap.image}
                        alt={cap.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white">{cap.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground text-sm leading-relaxed">{cap.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-bold">The principles that guide us</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <AnimatedCard key={i} index={i}>
                  <Card className="h-full text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-muted/50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold">A proven approach</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Assessment', desc: 'Comprehensive review of your current HR practices, challenges, and goals.' },
              { step: '02', title: 'Strategy', desc: 'Tailored plan with the right mix of software and consulting for your needs.' },
              { step: '03', title: 'Implementation', desc: 'Hands-on deployment with training and minimal disruption to your team.' },
              { step: '04', title: 'Ongoing Support', desc: 'Continuous guidance, compliance monitoring, and expert advice on-call.' },
            ].map((item, i) => (
              <AnimatedCard key={i} index={i}>
                <div className="text-center relative">
                  <div className="relative w-16 h-16 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                      <span className="text-lg font-bold text-white">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-14">
            <Link to="/contact">
              <Button size="lg">
                Start Your Free Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <AnimatedCard index={0}>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Credentials</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Professional certifications</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our team holds certifications from the leading professional HR bodies in Canada, ensuring our advice is current, credible, and compliant.
              </p>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>
            <AnimatedCard index={1}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=450&fit=crop&q=80"
                  alt="Professional certification and credentials"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* CTA — compact */}
      <section className="py-16 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp} className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to work together?</h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Let's discuss how PreciseHR can help your organization achieve its HR goals.
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
