import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Brain,
  LineChart,
  Cpu,
  Rocket,
  GraduationCap,
  Workflow,
  Users,
  TrendingUp,
  DollarSign,
  MessageSquare,
  BarChart3,
  FileText,
  Bot,
  Search,
  Cog,
  CheckCircle2,
  ArrowRight,
  Phone,
  Sparkles,
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

const pillars = [
  {
    icon: Search,
    title: 'AI Advisory & Readiness',
    description:
      'We assess where AI creates real, measurable value in your business — auditing your workflows, data, and tools to separate genuine opportunities from hype.',
  },
  {
    icon: LineChart,
    title: 'Strategy & Roadmap',
    description:
      'A practical, ROI-driven roadmap that sequences the right use cases, sets realistic timelines, and aligns AI investment to your business goals.',
  },
  {
    icon: Cpu,
    title: 'Build & Integration',
    description:
      'We design, build, and integrate AI tools and automations directly into your existing stack — not science projects, but working software your team uses.',
  },
  {
    icon: Rocket,
    title: 'Adoption & Rollout',
    description:
      'The hard part isn\u2019t the technology — it\u2019s getting people to use it. We handle change management, governance, and org-wide rollout so adoption actually sticks.',
  },
  {
    icon: GraduationCap,
    title: 'Training & Enablement',
    description:
      'We upskill your teams, set sensible AI usage policies, and embed AI into daily workflows so the capability stays in-house long after we\u2019re gone.',
  },
  {
    icon: Cog,
    title: 'Governance & Guardrails',
    description:
      'Clear policies, data handling standards, and human-in-the-loop checks so you capture the upside of AI while keeping risk, privacy, and compliance under control.',
  },
];

const departments = [
  {
    icon: Users,
    dept: 'Human Resources',
    examples: 'Job-description generation, resume screening, compliance gap checks, policy drafting, onboarding automation.',
  },
  {
    icon: TrendingUp,
    dept: 'Sales',
    examples: 'Lead scoring, outreach and proposal drafting, CRM hygiene, call summaries, pipeline insights.',
  },
  {
    icon: Workflow,
    dept: 'Operations / COO',
    examples: 'Workflow and approval automation, SOP generation, vendor and document processing, operational reporting.',
  },
  {
    icon: DollarSign,
    dept: 'Finance',
    examples: 'Invoice and expense processing, reconciliation support, forecasting inputs, automated reporting.',
  },
  {
    icon: MessageSquare,
    dept: 'Customer Support',
    examples: 'AI assistants, ticket triage, knowledge-base answers, drafted responses, sentiment analysis.',
  },
  {
    icon: BarChart3,
    dept: 'Marketing',
    examples: 'Content drafting, SEO, campaign analysis, audience and competitor research.',
  },
];

const built = [
  { title: 'Net Pay Calculator', description: 'A full 2026 Canadian payroll engine — federal & provincial tax, CPP/CPP2, and EI.', href: '/net-pay-calculator' },
  { title: 'JD Generator', description: 'Generates complete, role-specific job descriptions in seconds.', href: '/jd-generator' },
  { title: 'Compliance Checker', description: 'AI-driven analysis that surfaces your HR compliance gaps.', href: '/compliance-checker' },
  { title: 'Compliance Updates', description: 'Automated monitoring of Canadian HR law changes, refreshed daily.', href: '/compliance-updates' },
  { title: 'Minimum Wage Tracker', description: 'Current minimum-wage rates across every province and territory.', href: '/minimum-wage' },
  { title: 'Statutory Holidays', description: '2026 holiday calendar with built-in stat-holiday pay calculation.', href: '/statutory-holidays' },
];

const couldBuild = [
  { icon: Bot, title: 'Internal AI copilots', description: 'Assistants trained on your own policies, documents, and processes — answering staff questions instantly.' },
  { icon: FileText, title: 'Document & contract automation', description: 'Draft, review, and extract data from contracts, offers, and forms automatically.' },
  { icon: Brain, title: 'Knowledge assistants', description: 'Turn scattered institutional knowledge into a searchable, always-available resource.' },
  { icon: Workflow, title: 'Workflow automation', description: 'Automate the repetitive hand-offs and approvals that quietly drain your team\u2019s time.' },
  { icon: Sparkles, title: 'Custom tools & calculators', description: 'Purpose-built decision tools tailored to your business — like the ones live on this site.' },
  { icon: BarChart3, title: 'AI-driven reporting', description: 'Dashboards and reports that summarize, explain, and surface what matters — without manual effort.' },
];

export default function AIPage() {
  return (
    <div className="flex flex-col">
      <SEO
        title="AI Consulting & Build-Out"
        description="PreciseHR helps Canadian organizations adopt and execute AI — advisory, strategy, custom builds, and org-wide rollout across HR, Sales, Operations, Finance, and beyond."
        path="/ai"
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-4">AI Consulting &amp; Build-Out</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Bring AI into your organization — and make it stick
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              We help Canadian businesses move past the hype: identifying where AI genuinely pays off, building the tools, and driving adoption across every department — from HR to Sales to the executive suite.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a href="https://calendly.com/precisehr-info/precisehr-consult" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                  Book an AI consult
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="#what-weve-built">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                  See what we&apos;ve built
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">How We Work</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">From idea to adoption — end to end</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Most AI projects stall because they start with technology instead of outcomes. We work the other way around.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} {...staggerChild(i * 0.05)}>
                  <Card className="h-full group hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                      <p className="text-sm text-muted-foreground">{p.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Across Your Org</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI isn&apos;t just for one team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experts deploy AI wherever it moves the needle — and the same disciplined approach applies in every function.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {departments.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div key={i} {...staggerChild(i * 0.05)}>
                  <Card className="h-full group hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{d.dept}</h3>
                      <p className="text-sm text-muted-foreground">{d.examples}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What we've built */}
      <section id="what-weve-built" className="py-24 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Proof, Not Promises</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI we&apos;ve already built</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The tools below were designed, built, and shipped by our team — and they&apos;re live on this very site. Try them yourself.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {built.map((b, i) => (
              <motion.div key={i} {...staggerChild(i * 0.05)}>
                <Link to={b.href} className="block h-full">
                  <Card className="h-full group hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                        {b.title}
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-sm text-muted-foreground">{b.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we could build for you */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Built For You</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What we could build for your business</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A few of the things we can design and deploy — each tailored to your data, your workflows, and your goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {couldBuild.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={i} {...staggerChild(i * 0.05)}>
                  <Card className="h-full group hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                      <p className="text-sm text-muted-foreground">{c.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to put AI to work?</h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Let&apos;s find the highest-value place to start. Book a no-obligation consult and we&apos;ll map out what AI can realistically do for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a href="https://calendly.com/precisehr-info/precisehr-consult" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                  Book an AI consult
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="tel:+14378872263" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                (437) 887-2263
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
