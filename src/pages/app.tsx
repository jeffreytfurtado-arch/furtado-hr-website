import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema, ServiceSchema } from '@/components/StructuredData';
import { track } from '@/lib/track';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Lock, Check, ArrowRight, Calendar, Sparkles, Users, Building2, Shield, FileText,
  BarChart3, Clock, Loader2, CheckCircle2, LayoutDashboard,
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/precisehr-info/precisehr-consult';
const APP_SIGNIN = 'https://app.precisehr.ca';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};
const stagger = (d: number) => ({ ...fadeUp, transition: { ...fadeUp.transition, delay: d } });

// Pricing in CAD (per employee / month). Adjust freely.
const TIERS = [
  {
    name: 'Starter',
    annual: '$6',
    monthly: '$8',
    unit: '/ employee / mo',
    blurb: 'For small teams getting organized.',
    popular: false,
    features: ['Employee records & basic org chart', 'Time-off tracking & approvals', 'Documents & e-signatures', 'Onboarding checklists', 'Email support'],
  },
  {
    name: 'Growth',
    annual: '$12',
    monthly: '$14',
    unit: '/ employee / mo',
    blurb: 'For growing companies that need compliance built in.',
    popular: true,
    features: ['Everything in Starter', 'Payroll-ready: CPP, EI & tax', 'ROE & T4 generation', 'Provincial (ESA) compliance tracking', 'Org-chart builder — drag, edit & plan headcount', 'Policies & handbook builder', 'Reporting & analytics', 'Priority support'],
  },
  {
    name: 'Agency',
    annual: 'Custom',
    monthly: 'Custom',
    unit: '',
    blurb: 'For HR firms managing multiple client companies.',
    popular: false,
    features: ['Everything in Growth', 'Multi-tenant: manage many companies', 'White-label & custom branding', 'SSO & advanced permissions', 'API access', 'Dedicated account manager'],
  },
];

const FEATURES = [
  { icon: Shield, title: 'Canadian-first compliance', desc: 'CPP/EI, provincial ESA rules, ROE and T4 — built for Canada, not bolted on after.' },
  { icon: FileText, title: 'Documents & e-sign', desc: 'Generate contracts, offer letters, and policies, then send for signature in a click.' },
  { icon: Building2, title: 'Multi-tenant by design', desc: 'Manage your own team or, for agencies, dozens of client companies from one place.' },
  { icon: BarChart3, title: 'Workforce insights', desc: 'Headcount, turnover, time-off, and compliance status — surfaced, not buried.' },
  { icon: Users, title: 'Hiring & onboarding', desc: 'Structured onboarding that gets new hires productive and compliant from day one.' },
  { icon: Clock, title: 'Less admin, more time', desc: 'Automate the repetitive HR work so you can focus on people, not paperwork.' },
];

const FAQS = [
  { q: 'When does the PreciseHR app launch?', a: 'We\u2019re rolling out access in stages to a founding group of customers. Join the waitlist and we\u2019ll reach out as soon as your spot opens — founding customers get priority onboarding and launch pricing.' },
  { q: 'Is it built for Canadian businesses?', a: 'Yes. The platform is designed Canadian-first — CPP/EI and tax, Records of Employment, T4s, and province-by-province employment-standards compliance, with PIPEDA-aware data practices.' },
  { q: 'Can HR firms manage multiple clients?', a: 'Absolutely. The Agency plan is multi-tenant, so consultancies can manage many client companies from a single login, with white-label branding.' },
  { q: 'How much will it cost?', a: 'Pricing is per employee per month in CAD \u2014 Starter from $6 and Growth from $12, with a custom plan for agencies. Annual billing saves about two months, we never charge for archived employees, and every plan includes a free 30-minute HR consult.' },
  { q: 'Do I get access to real HR experts?', a: 'Yes \u2014 every plan includes a free 30-minute consult with a PreciseHR advisor. For ongoing support you can add our HR Advice Line for unlimited expert HR advice. It\u2019s software backed by real people, not just a dashboard.' },
  { q: 'Can I see it before committing?', a: 'Yes \u2014 book a live demo and we\u2019ll walk you through the platform and answer your questions. No obligation.' },
];

export default function AppPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [plan, setPlan] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [annual, setAnnual] = useState(true);

  function pickPlan(tier: string) {
    setPlan(tier);
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  async function submit() {
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const r = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, company, plan }),
      });
      if (!r.ok) throw new Error();
      setStatus('success');
      track('waitlist_signup', { plan: plan || 'none' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="PreciseHR App — Canadian HR Software & HRIS"
        description="The PreciseHR HRIS — Canadian-first HR software with payroll-ready compliance (CPP/EI, ROE, T4, provincial ESA), documents, and multi-tenant support for agencies. Join early access."
        path="/app"
      />
      <ServiceSchema
        name="PreciseHR HRIS"
        description="Canadian-first HR software: payroll-ready compliance, documents, onboarding, and multi-tenant management for agencies and SMBs."
        areaServed="Canada"
        url="https://www.precisehr.ca/app"
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.precisehr.ca/' },
          { name: 'PreciseHR App', url: 'https://www.precisehr.ca/app' },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 py-20 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-300/15 text-cyan-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 mb-5">
                <Sparkles className="w-3.5 h-3.5" /> Launching soon · Early access
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">The PreciseHR HRIS</h1>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                Canadian-first HR software that handles compliance, payroll prep, documents, and your whole team — built by operators who run HR for a living.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={() => pickPlan('')}>
                  Join the waitlist <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Calendar className="mr-2 w-4 h-4" /> Book a demo
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Locked dashboard preview */}
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
              <div className="rounded-xl border border-white/15 bg-white/5 shadow-2xl overflow-hidden">
                {/* faux app chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-white/5">
                  <span className="w-3 h-3 rounded-full bg-white/20" />
                  <span className="w-3 h-3 rounded-full bg-white/20" />
                  <span className="w-3 h-3 rounded-full bg-white/20" />
                  <span className="ml-3 text-xs text-white/40 flex items-center gap-1.5"><LayoutDashboard className="w-3.5 h-3.5" /> app.precisehr.ca</span>
                </div>
                {/* blurred faux UI */}
                <div className="relative p-5 blur-[3px] select-none" aria-hidden="true">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {['Headcount', 'Time-off', 'Compliance'].map((l) => (
                      <div key={l} className="rounded-lg bg-white/10 p-3">
                        <div className="text-[10px] text-white/50">{l}</div>
                        <div className="h-5 mt-2 rounded bg-white/25 w-2/3" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[80, 65, 72, 58, 90].map((w, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/15 shrink-0" />
                        <div className="h-3 rounded bg-white/15" style={{ width: `${w}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
                {/* lock overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#001d3d]/80 to-transparent">
                  <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-3">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-semibold">Early access only</p>
                  <button onClick={() => pickPlan('')} className="mt-2 text-xs text-cyan-200 hover:text-white underline underline-offset-2">
                    Join the waitlist to unlock
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">What it does</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">HR software built for Canadian reality</h2>
            <p className="text-muted-foreground">One platform for compliance, documents, people, and insight — whether you run one company or many.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} {...stagger(i * 0.07)}>
                  <Card className="h-full hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-bold mb-2">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, per-employee pricing</h2>
            <p className="text-muted-foreground">Per employee, per month, billed in CAD. We never charge for archived employees. Founding customers lock in launch pricing.</p>
          </motion.div>

          {/* Billing toggle */}
          <div className="flex flex-col items-center mb-10">
            <div className="inline-flex items-center rounded-full border bg-card p-1">
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-1.5 text-sm font-medium rounded-full transition-colors ${annual ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Annual
              </button>
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-1.5 text-sm font-medium rounded-full transition-colors ${!annual ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Monthly
              </button>
            </div>
            <p className="text-xs font-medium text-primary mt-3">
              {annual ? 'You\u2019re saving ~2 months with annual billing' : 'Switch to annual and save ~2 months'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {TIERS.map((t, i) => (
              <motion.div key={t.name} {...stagger(i * 0.08)}>
                <Card className={`h-full relative ${t.popular ? 'border-primary shadow-lg md:-mt-2' : ''}`}>
                  {t.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most popular
                    </span>
                  )}
                  <CardContent className="p-7">
                    <h3 className="text-lg font-bold">{t.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-5 min-h-[40px]">{t.blurb}</p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl font-bold">{annual ? t.annual : t.monthly}</span>
                      {t.unit && <span className="text-sm text-muted-foreground">{t.unit}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mb-6">{t.unit ? (annual ? 'billed annually · CAD' : 'billed monthly · CAD') : 'volume pricing · CAD'}</p>
                    <Button className="w-full mb-3" variant={t.popular ? 'default' : 'outline'} onClick={() => pickPlan(t.name)}>
                      Join the waitlist
                    </Button>
                    <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="block text-center text-sm text-primary hover:underline mb-6">
                      Book a demo
                    </a>
                    <ul className="space-y-2.5">
                      {t.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Advisory perk + add-on */}
          <motion.div {...fadeUp} className="max-w-3xl mx-auto mt-10">
            <div className="rounded-xl border bg-card px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3 text-center sm:text-left">
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                <Calendar className="w-4 h-4 text-primary" /> Every plan includes a free 30-minute HR consult
              </span>
              <span className="hidden sm:block w-px h-6 bg-border" />
              <span className="text-sm text-muted-foreground">
                Need more? Add the <strong className="text-foreground">HR Advice Line</strong> — unlimited expert HR advice — to any plan.
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Early access</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Join the waitlist</h2>
              <p className="text-muted-foreground">Be first in line when access opens. Founding customers get priority onboarding and launch pricing.</p>
            </div>

            {status === 'success' ? (
              <Card className="border-primary/30">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">You&apos;re on the list 🎉</h3>
                  <p className="text-muted-foreground text-sm mb-6">Check your inbox for a confirmation. We&apos;ll reach out as your spot opens up.</p>
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline"><Calendar className="mr-2 w-4 h-4" /> Book a demo while you wait</Button>
                  </a>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 sm:p-8 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Name</label>
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Company</label>
                      <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name"
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Work email <span className="text-primary">*</span></label>
                    <input
                      type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
                      placeholder="you@company.ca"
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  {plan && (
                    <p className="text-xs text-muted-foreground">Interested in the <strong>{plan}</strong> plan.</p>
                  )}
                  <Button className="w-full" onClick={submit} disabled={status === 'loading' || !email}>
                    {status === 'loading' ? <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Joining…</> : 'Join the waitlist'}
                  </Button>
                  {status === 'error' && (
                    <p className="text-sm text-red-600 text-center">Something went wrong. Please try again or email info@precisehr.ca.</p>
                  )}
                  <p className="text-xs text-muted-foreground text-center">No spam. We&apos;ll only email you about early access.</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold">Questions about the app</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((f, i) => (
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
          <div className="text-center mt-10">
            <a href={APP_SIGNIN} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Already have access? Sign in →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
