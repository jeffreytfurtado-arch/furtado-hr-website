import { useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema, ServiceSchema } from '@/components/StructuredData';
import { track } from '@/lib/track';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppShowcase from '@/components/AppShowcase';
import {
  Check, ArrowRight, Calendar, Sparkles, Loader2, CheckCircle2,
  Network, ShieldCheck, FileSignature, BarChart3, LayoutDashboard,
  Minus,
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

// Pricing in CAD (per employee / month).
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

// Feature showcase. Drop real captures at /public/images/app/<key>.png and they replace the placeholders automatically.
const SHOTS = [
  { key: 'orgchart', icon: Network, label: 'Org chart', title: 'Plan your org, visually', desc: 'Drag-and-drop reporting lines, model headcount, and surface open roles — your whole structure on one canvas.', img: '/images/app/orgchart.png' },
  { key: 'compliance', icon: ShieldCheck, label: 'Compliance & payroll', title: 'Payroll-ready, built for Canada', desc: 'CPP/EI, Records of Employment, T4s, and province-by-province ESA rules — generated, not bolted on after.', img: '/images/app/compliance.png' },
  { key: 'documents', icon: FileSignature, label: 'Documents & e-sign', title: 'Send for signature in a click', desc: 'Generate contracts, offer letters, and policies, then collect signatures without leaving the platform.', img: '/images/app/documents.png' },
  { key: 'insights', icon: BarChart3, label: 'Insights', title: 'Your workforce at a glance', desc: 'Headcount, turnover, time-off, and compliance status — surfaced on a live dashboard, not buried in spreadsheets.', img: '/images/app/dashboard.png' },
];

const FAQS = [
  { q: 'How do I get started?', a: 'Pick a plan, tell us how many employees you have, and check out. Your workspace is created automatically and you get an email to set your password and sign in — most teams are up and running in minutes.' },
  { q: 'Is it built for Canadian businesses?', a: 'Yes. The platform is designed Canadian-first — CPP/EI and tax, Records of Employment, T4s, and province-by-province employment-standards compliance, with PIPEDA-aware data practices.' },
  { q: 'Can HR firms manage multiple clients?', a: 'Absolutely. The Agency plan is multi-tenant, so consultancies can manage many client companies from a single login, with white-label branding. Contact us to get set up.' },
  { q: 'How much does it cost?', a: 'Pricing is per employee per month in CAD — Starter from $6 and Growth from $12, with a custom plan for agencies. Annual billing saves about two months, we never charge for archived employees, and every plan includes a free 30-minute HR consult.' },
  { q: 'Can I change plans or cancel?', a: 'Yes — upgrade, downgrade, or cancel anytime from your billing settings. Per-employee pricing scales with your team, and you are never charged for archived employees.' },
  { q: 'Do I get access to real HR experts?', a: 'Yes — every plan includes a free 30-minute consult with a PreciseHR advisor. For ongoing support you can add our HR Advice Line for unlimited expert HR advice. It is software backed by real people, not just a dashboard.' },
];

type Avail = boolean; // true = included, false = not included
interface CompRow { feature: string; starter: Avail; growth: Avail; agency: Avail }
interface CompGroup { category: string; rows: CompRow[] }

const COMPARISON: CompGroup[] = [
  {
    category: 'Core HR',
    rows: [
      { feature: 'Employee records & profiles', starter: true, growth: true, agency: true },
      { feature: 'Org chart', starter: true, growth: true, agency: true },
      { feature: 'Time-off tracking', starter: true, growth: true, agency: true },
      { feature: 'Documents & e-signatures', starter: true, growth: true, agency: true },
      { feature: 'Onboarding checklists', starter: true, growth: true, agency: true },
    ],
  },
  {
    category: 'Payroll & Compliance',
    rows: [
      { feature: 'Payroll-ready CPP/EI/tax', starter: false, growth: true, agency: true },
      { feature: 'ROE & T4 generation', starter: false, growth: true, agency: true },
      { feature: 'Provincial ESA compliance tracking', starter: false, growth: true, agency: true },
    ],
  },
  {
    category: 'Tools & Analytics',
    rows: [
      { feature: 'Drag-and-drop org chart builder', starter: false, growth: true, agency: true },
      { feature: 'Policies & handbook builder', starter: false, growth: true, agency: true },
      { feature: 'Reporting & analytics', starter: false, growth: true, agency: true },
    ],
  },
  {
    category: 'Enterprise & Agency',
    rows: [
      { feature: 'Multi-tenant management', starter: false, growth: false, agency: true },
      { feature: 'White-label branding', starter: false, growth: false, agency: true },
      { feature: 'SSO / SAML', starter: false, growth: false, agency: true },
      { feature: 'API access', starter: false, growth: false, agency: true },
      { feature: 'Custom integrations', starter: false, growth: false, agency: true },
    ],
  },
  {
    category: 'Support',
    rows: [
      { feature: 'Email support', starter: true, growth: true, agency: true },
      { feature: 'Priority support', starter: false, growth: true, agency: true },
      { feature: 'Dedicated account manager', starter: false, growth: false, agency: true },
    ],
  },
];

const PLAN_COLS = [
  { key: 'starter' as const, name: 'Starter', price: '$6–8', unit: '/emp/mo', popular: false, cta: 'get-started', label: 'Get started' },
  { key: 'growth' as const, name: 'Growth', price: '$12–14', unit: '/emp/mo', popular: true, cta: 'get-started', label: 'Get started' },
  { key: 'agency' as const, name: 'Agency', price: 'Custom', unit: '', popular: false, cta: 'talk-to-sales', label: 'Talk to sales' },
];

function CellIcon({ included }: { included: boolean }) {
  return included ? (
    <Check className="w-5 h-5 text-primary mx-auto" aria-label="Included" />
  ) : (
    <Minus className="w-4 h-4 text-muted-foreground/40 mx-auto" aria-label="Not included" />
  );
}

export default function AppPage() {
  const [annual, setAnnual] = useState(true);
  const [employees, setEmployees] = useState(10);
  const [checkoutBusy, setCheckoutBusy] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState('');
  const [shot, setShot] = useState(0);
  const [imgFailed, setImgFailed] = useState<Record<string, boolean>>({});

  async function startCheckout(planKey: string) {
    if (checkoutBusy) return;
    setCheckoutError('');
    setCheckoutBusy(planKey);
    try {
      const r = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planKey, interval: annual ? 'annual' : 'monthly', employees }),
      });
      const d = await r.json();
      if (!r.ok || !d.url) throw new Error(d.error || 'Could not start checkout.');
      track('checkout_start', { plan: planKey, interval: annual ? 'annual' : 'monthly', employees });
      window.location.href = d.url;
    } catch (e) {
      setCheckoutError(e instanceof Error ? e.message : 'Could not start checkout.');
      setCheckoutBusy(null);
    }
  }

  const active = SHOTS[shot];
  const ActiveIcon = active.icon;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="PreciseHR App — Pricing & Canadian HR Software"
        description="Canadian-first HRIS from $6/employee — payroll-ready compliance, documents, org charts, and multi-tenant support for agencies and SMBs."
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

      {/* Pricing — first thing on the page */}
      <section id="pricing" className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.06)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto text-center mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-300/15 text-cyan-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Now available · Canadian-first HRIS
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Simple, per-employee pricing</h1>
            <p className="text-white/80 text-lg">
              Per employee, per month, billed in CAD. Start today, cancel anytime, and never pay for archived employees.
            </p>
          </motion.div>

          {/* Billing toggle */}
          <div className="flex flex-col items-center mb-8">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 p-1">
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-1.5 text-sm font-medium rounded-full transition-colors ${annual ? 'bg-white text-primary' : 'text-white/80 hover:text-white'}`}
              >
                Annual
              </button>
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-1.5 text-sm font-medium rounded-full transition-colors ${!annual ? 'bg-white text-primary' : 'text-white/80 hover:text-white'}`}
              >
                Monthly
              </button>
            </div>
            <p className="text-xs font-medium text-cyan-200 mt-3">
              {annual ? 'Save up to 25% with annual billing' : 'Switch to annual and save up to 25%'}
            </p>
          </div>

          {/* Employee count drives per-seat checkout quantity */}
          <div className="flex flex-col items-center mb-10">
            <label htmlFor="emp" className="text-sm font-medium mb-2 text-white/90">How many employees?</label>
            <input
              id="emp" type="number" min={1} max={5000} value={employees}
              onChange={(e) => setEmployees(Math.max(1, Math.min(5000, Number(e.target.value) || 1)))}
              className="w-28 text-center rounded-md border border-white/20 bg-white/10 text-white px-3 py-2 text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
            />
            <p className="text-xs text-white/60 mt-2">Billed per employee · adjust anytime at checkout</p>
            {checkoutError && <p className="text-sm text-red-300 mt-3">{checkoutError}</p>}
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {TIERS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
                <Card className={`h-full relative text-foreground ${t.popular ? 'ring-2 ring-cyan-300 shadow-2xl md:-mt-2' : ''}`}>
                  {t.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-300 text-primary text-xs font-bold px-3 py-1 rounded-full">
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
                    {t.unit ? (
                      <Button
                        className="w-full mb-3"
                        variant={t.popular ? 'default' : 'outline'}
                        disabled={checkoutBusy !== null}
                        onClick={() => startCheckout(t.name.toLowerCase())}
                      >
                        {checkoutBusy === t.name.toLowerCase() ? (
                          <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Starting…</>
                        ) : (
                          <>Get started <ArrowRight className="ml-2 w-4 h-4" /></>
                        )}
                      </Button>
                    ) : (
                      <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="block mb-3">
                        <Button className="w-full" variant="outline">Talk to sales</Button>
                      </a>
                    )}
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

          <p className="text-center text-sm text-white/70 mt-8">
            Every plan includes a free 30-minute HR consult · add the <strong className="text-white">HR Advice Line</strong> for unlimited expert advice.
          </p>
        </div>
      </section>

      {/* Product showcase with styled mockups */}
      <AppShowcase />

      {/* Animated feature showcase — screenshots drop into /public/images/app/ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">See it in action</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">One platform for your whole HR operation</h2>
            <p className="text-muted-foreground">Org charts, Canadian compliance, documents, and insight — together, not bolted on.</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {SHOTS.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.key}
                  onClick={() => setShot(i)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    i === shot ? 'bg-primary text-white border-primary' : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/40'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {s.label}
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-center max-w-6xl mx-auto">
            {/* Framed screenshot */}
            <div className="lg:col-span-3">
              <div className="rounded-xl border bg-card shadow-xl overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b bg-muted/40">
                  <span className="w-3 h-3 rounded-full bg-muted-foreground/25" />
                  <span className="w-3 h-3 rounded-full bg-muted-foreground/25" />
                  <span className="w-3 h-3 rounded-full bg-muted-foreground/25" />
                  <span className="ml-3 text-xs text-muted-foreground flex items-center gap-1.5"><LayoutDashboard className="w-3.5 h-3.5" /> app.precisehr.ca</span>
                </div>
                <div className="relative aspect-[16/10] bg-gradient-to-br from-muted/60 to-muted">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.key}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      {!imgFailed[active.key] ? (
                        <img
                          src={active.img}
                          alt={active.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={() => setImgFailed((p) => ({ ...p, [active.key]: true }))}
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white">
                          <div className="w-14 h-14 rounded-2xl bg-white/12 flex items-center justify-center mb-4">
                            <ActiveIcon className="w-7 h-7" />
                          </div>
                          <p className="font-semibold">{active.label}</p>
                          <p className="text-xs text-white/55 mt-1">Screenshot preview</p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.key}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <ActiveIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{active.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{active.desc}</p>
                  <Button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                    See pricing <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Get started CTA */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto">
            <div className="rounded-2xl bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white p-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to get started?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Choose a plan, set your team size, and you&apos;ll be up and running in minutes — your workspace is created the moment you check out.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                  See plans &amp; pricing <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Calendar className="mr-2 w-4 h-4" /> Book a demo
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Feature breakdown</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare Plans</h2>
            <p className="text-muted-foreground">See exactly what you get at every level — pick the plan that fits your stage.</p>
          </motion.div>

          {/* Desktop table */}
          <motion.div {...fadeUp} className="hidden md:block max-w-5xl mx-auto">
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-card border-b">
                  <tr>
                    <th className="text-left px-6 py-5 font-semibold text-foreground w-[40%]">Feature</th>
                    {PLAN_COLS.map((p) => (
                      <th key={p.key} className="px-4 py-5 text-center w-[20%]">
                        <div className="flex flex-col items-center gap-1">
                          {p.popular && (
                            <span className="inline-block bg-cyan-100 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1">
                              Most Popular
                            </span>
                          )}
                          <span className="font-bold text-foreground">{p.name}</span>
                          <span className="text-xs text-muted-foreground">{p.price}{p.unit ? ` ${p.unit}` : ''}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((group) => (
                    <Fragment key={group.category}>
                      <tr className="bg-muted/50">
                        <td colSpan={4} className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {group.category}
                        </td>
                      </tr>
                      {group.rows.map((row, ri) => (
                        <tr
                          key={`${group.category}-${ri}`}
                          className={`border-t border-border/50 ${ri % 2 === 1 ? 'bg-muted/20' : ''}`}
                        >
                          <td className="px-6 py-3.5 text-foreground">{row.feature}</td>
                          <td className="px-4 py-3.5 text-center"><CellIcon included={row.starter} /></td>
                          <td className="px-4 py-3.5 text-center"><CellIcon included={row.growth} /></td>
                          <td className="px-4 py-3.5 text-center"><CellIcon included={row.agency} /></td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                  {/* CTA row */}
                  <tr className="border-t">
                    <td className="px-6 py-5" />
                    {PLAN_COLS.map((p) => (
                      <td key={p.key} className="px-4 py-5 text-center">
                        {p.cta === 'get-started' ? (
                          <Button
                            size="sm"
                            variant={p.popular ? 'default' : 'outline'}
                            disabled={checkoutBusy !== null}
                            onClick={() => startCheckout(p.key)}
                          >
                            {checkoutBusy === p.key ? (
                              <><Loader2 className="mr-1.5 w-3.5 h-3.5 animate-spin" /> Starting…</>
                            ) : (
                              <>{p.label} <ArrowRight className="ml-1.5 w-3.5 h-3.5" /></>
                            )}
                          </Button>
                        ) : (
                          <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline">{p.label}</Button>
                          </a>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Mobile card-based view */}
          <div className="md:hidden space-y-6 max-w-md mx-auto">
            {PLAN_COLS.map((plan) => (
              <motion.div key={plan.key} {...fadeUp}>
                <Card className={`relative ${plan.popular ? 'ring-2 ring-cyan-300' : ''}`}>
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-300 text-primary text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <CardContent className="p-6">
                    <div className="text-center mb-5">
                      <h3 className="text-lg font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.price}{plan.unit ? ` ${plan.unit}` : ''}</p>
                    </div>
                    {COMPARISON.map((group) => (
                      <div key={group.category} className="mb-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{group.category}</p>
                        <ul className="space-y-1.5">
                          {group.rows.map((row, ri) => {
                            const included = row[plan.key];
                            return (
                              <li key={ri} className="flex items-center gap-2 text-sm">
                                {included ? (
                                  <Check className="w-4 h-4 text-primary shrink-0" />
                                ) : (
                                  <Minus className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                                )}
                                <span className={included ? 'text-foreground' : 'text-muted-foreground/50'}>{row.feature}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                    <div className="pt-2">
                      {plan.cta === 'get-started' ? (
                        <Button
                          className="w-full"
                          variant={plan.popular ? 'default' : 'outline'}
                          disabled={checkoutBusy !== null}
                          onClick={() => startCheckout(plan.key)}
                        >
                          {checkoutBusy === plan.key ? (
                            <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Starting…</>
                          ) : (
                            <>{plan.label} <ArrowRight className="ml-2 w-4 h-4" /></>
                          )}
                        </Button>
                      ) : (
                        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="block">
                          <Button className="w-full" variant="outline">{plan.label}</Button>
                        </a>
                      )}
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
              Already have an account? Sign in →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
