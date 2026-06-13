import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema, ServiceSchema } from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProvince, provinceFaqs } from '@/data/provinces';
import { HERO_STATS } from '@/lib/site-stats';
import {
  Shield, FileText, Calculator, Users, UserX, Search, ArrowRight, Phone,
  MapPin, BadgeCheck, Clock, Star, CheckCircle2, Calendar,
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/precisehr-info/precisehr-consult';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};
const stagger = (d: number) => ({ ...fadeUp, transition: { ...fadeUp.transition, delay: d } });

export default function ProvincePage() {
  const { province } = useParams<{ province: string }>();
  const p = province ? getProvince(province) : undefined;
  if (!p) return <Navigate to="/hr-services" replace />;

  const url = `https://www.precisehr.ca/hr-services/${p.slug}`;
  const faqs = provinceFaqs(p);

  const services = [
    { icon: Shield, title: `Compliance with the ${p.statute}`, desc: `Stay onside of ${p.name}'s employment standards with policy audits, documentation, and ongoing monitoring.` },
    { icon: FileText, title: 'Contracts & Policies', desc: 'Legally sound employment agreements, handbooks, and workplace policies built for your business.' },
    { icon: Calculator, title: 'Payroll & Deductions', desc: `Accurate pay, CPP/EI, tax, and statutory holiday pay for your ${p.name} employees.` },
    { icon: Users, title: 'Recruitment & Onboarding', desc: 'Full-cycle hiring, screening, and onboarding programs that reduce early turnover.' },
    { icon: UserX, title: 'Terminations & ROE', desc: `End-to-end termination support and ROE filing that minimizes legal risk in ${p.name}.` },
    { icon: Search, title: 'Workplace Investigations', desc: 'Impartial, defensible investigations into harassment, misconduct, and complaints.' },
  ];

  const tools = [
    { label: 'Net Pay Calculator', to: '/net-pay-calculator' },
    { label: `Minimum Wage — ${p.name}`, to: '/minimum-wage' },
    { label: `Statutory Holidays — ${p.name}`, to: '/statutory-holidays' },
    { label: 'Salary Benchmarking', to: '/salary-benchmarking' },
    { label: 'Free HR Health Check', to: '/hr-assessment' },
    { label: 'HR Policy Generator', to: '/policy-generator' },
  ];

  const badges = [
    { icon: BadgeCheck, label: 'Canadian-owned & operated' },
    { icon: MapPin, label: `${p.name} employment standards` },
    { icon: Clock, label: 'Responses within 24 hours' },
    { icon: Star, label: '98% client satisfaction' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`HR Services in ${p.name}`}
        description={`PreciseHR delivers HR consulting, ${p.statute} compliance, payroll, and recruitment for ${p.name} businesses. Canadian-owned. Book a free HR review.`}
        path={`/hr-services/${p.slug}`}
      />
      <ServiceSchema
        name={`HR Services in ${p.name}`}
        description={`HR consulting, compliance, payroll, recruitment, and HR software for ${p.name} employers.`}
        areaServed={p.name}
        url={url}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.precisehr.ca/' },
          { name: 'HR Services', url: 'https://www.precisehr.ca/hr-services' },
          { name: p.name, url },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> HR Services · {p.abbr}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              HR Services in {p.name}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">{p.blurb}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Book a free HR review <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <Link to="/hr-assessment">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Free HR Health Check
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b bg-background">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 text-sm text-muted-foreground">
            {badges.map((b, i) => {
              const Icon = b.icon;
              return (
                <span key={i} className="inline-flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary" /> {b.label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">What we do</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How we help {p.name} employers</h2>
            <p className="text-muted-foreground">
              Whether you need a one-time fix or an ongoing HR partner, we cover the full employee lifecycle — built around {p.name}'s rules.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} {...stagger(i * 0.08)}>
                  <Card className="h-full hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-bold mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance note */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Local compliance</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{p.name} compliance, handled</h2>
            <p className="text-muted-foreground leading-relaxed">
              Employment standards in {p.name} are governed by the <strong>{p.statute}</strong>, administered by {p.agency}
              {p.agencyShort ? ` (${p.agencyShort})` : ''}. We keep your contracts, policies, and processes aligned to it — so you can grow without compliance surprises.
            </p>
            {p.note && <p className="text-muted-foreground leading-relaxed mt-4">{p.note}</p>}
          </motion.div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Free tools</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Free {p.name} HR tools</h2>
            <p className="text-muted-foreground">Practical calculators and AI tools, set up for {p.name}. No signup required.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((t, i) => (
              <motion.div key={i} {...stagger(i * 0.06)}>
                <Link to={t.to} className="group block">
                  <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                    <CardContent className="p-5 flex items-center justify-between">
                      <span className="font-medium text-sm">{t.label}</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {HERO_STATS.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold">HR in {p.name} — common questions</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((f, i) => (
              <motion.div key={i} {...stagger(i * 0.06)}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /> {f.q}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-7">{f.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 relative text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to fix HR in {p.name}?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Book a free, no-obligation HR review and we'll show you exactly where you stand.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Calendar className="mr-2 w-4 h-4" /> Book a free consult
              </Button>
            </a>
            <a href="tel:+14378872263">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Phone className="mr-2 w-4 h-4" /> (437) 887-2263
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
