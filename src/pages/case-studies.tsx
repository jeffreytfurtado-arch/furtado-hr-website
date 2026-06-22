import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { ArrowRight, Phone, Quote } from 'lucide-react';

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

/* ── Inline SVG logo marks ───────────────────────────────── */

const LogoMark = ({
  letters,
  bg,
  fg = '#fff',
  shape = 'circle',
}: {
  letters: string;
  bg: string;
  fg?: string;
  shape?: 'circle' | 'rounded-rect';
}) => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
    aria-hidden
  >
    {shape === 'circle' ? (
      <circle cx="22" cy="22" r="22" fill={bg} />
    ) : (
      <rect x="0" y="0" width="44" height="44" rx="10" fill={bg} />
    )}
    <text
      x="22"
      y="22"
      textAnchor="middle"
      dominantBaseline="central"
      fill={fg}
      fontSize="17"
      fontWeight="700"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      {letters}
    </text>
  </svg>
);

/* ── Case study data ─────────────────────────────────────── */

const caseStudies = [
  {
    company: 'BrightPath Tech',
    logo: <LogoMark letters="BP" bg="#1e6091" shape="rounded-rect" />,
    industry: 'Technology',
    size: '45 employees',
    challenge:
      'Rapid growth from 18 to 45 staff in under a year left BrightPath without consistent onboarding, no formal policies, and ad-hoc performance reviews that frustrated managers and new hires alike.',
    solution:
      'Built a lightweight HR framework: an employee handbook tailored to Ontario ESA requirements, a repeatable onboarding checklist, and quarterly check-in templates managers could run in 20 minutes.',
    results: [
      { metric: '55%', description: 'Faster onboarding' },
      { metric: '100%', description: 'ESA compliance' },
      { metric: '30%', description: 'Lower early turnover' },
    ],
    quote:
      'We went from winging it to having real structure — without it feeling corporate. PreciseHR made it painless.',
    author: 'Sarah M., Co-founder',
    tags: ['HR Strategy', 'Onboarding', 'Compliance'],
  },
  {
    company: 'Northern Edge Fabrication',
    logo: <LogoMark letters="NE" bg="#2a7f62" shape="circle" />,
    industry: 'Manufacturing',
    size: '88 employees',
    challenge:
      'Two shifts across a Vaughan facility were running with outdated safety docs, no formal incident process, and 38% annual turnover on the production floor.',
    solution:
      'Overhauled health & safety policies to meet OHSA standards, introduced a return-to-work program, and launched a supervisor training series on retention and engagement.',
    results: [
      { metric: '42%', description: 'Drop in turnover' },
      { metric: '100%', description: 'OHSA compliance' },
      { metric: '28%', description: 'Rise in engagement scores' },
    ],
    quote:
      'They understood manufacturing — no fluff, just practical changes that stuck. Our floor supervisors actually bought in.',
    author: 'Michael T., Operations Director',
    tags: ['Employee Relations', 'Safety', 'Retention'],
  },
  {
    company: 'Halton Physiotherapy',
    logo: <LogoMark letters="HP" bg="#0e7c7b" shape="rounded-rect" />,
    industry: 'Healthcare',
    size: '12 employees',
    challenge:
      'A growing clinic with three physiotherapists and support staff had no formal HR — scheduling was manual, credential tracking lived in a spreadsheet, and the owner handled every people issue personally.',
    solution:
      'Set up a simple HRIS for scheduling and credential reminders, drafted employment agreements compliant with Ontario standards, and created a clear process for handling patient-facing staff concerns.',
    results: [
      { metric: '6 hrs', description: 'Saved weekly on admin' },
      { metric: '100%', description: 'Credential compliance' },
      { metric: '3', description: 'Policies formalized' },
    ],
    quote:
      'I was spending evenings on HR paperwork. Now it runs itself and I can focus on patient care.',
    author: 'Dr. Jennifer K., Clinic Owner',
    tags: ['Healthcare', 'Compliance', 'HR Technology'],
  },
  {
    company: 'Canopy Home & Garden',
    logo: <LogoMark letters="C" bg="#3d5a80" shape="circle" />,
    industry: 'Retail',
    size: '65 employees',
    challenge:
      'Four retail locations across the GTA with seasonal staffing swings. Inconsistent training meant customer experience varied wildly between stores, and seasonal rehire rates were low.',
    solution:
      'Created a centralized onboarding playbook, standardized training checklists per role, and implemented a lightweight performance tracker so store managers could give consistent feedback.',
    results: [
      { metric: '40%', description: 'Faster seasonal ramp-up' },
      { metric: '25%', description: 'Higher seasonal rehire rate' },
      { metric: '85%', description: 'Training completion' },
    ],
    quote:
      'Our four stores finally feel like one company. New hires get the same experience whether they start in Oakville or Scarborough.',
    author: 'David R., Regional Manager',
    tags: ['Multi-location', 'Training', 'Retail'],
  },
  {
    company: 'Fidelis Advisory',
    logo: <LogoMark letters="FA" bg="#264653" shape="rounded-rect" />,
    industry: 'Financial Services',
    size: '28 employees',
    challenge:
      'A boutique advisory firm shifting to hybrid work needed remote-work policies that satisfied OSFI expectations, plus a compensation review to stay competitive in a tight hiring market.',
    solution:
      'Drafted a hybrid work policy aligned with regulatory guidance, benchmarked salaries against comparable Ontario firms, and built a simple offer-letter and onboarding flow for new advisors.',
    results: [
      { metric: '92%', description: 'Employee satisfaction' },
      { metric: '50%', description: 'More qualified applicants' },
      { metric: '100%', description: 'Regulatory compliance' },
    ],
    quote:
      'The hybrid policy gave our team flexibility without the compliance risk. We finally feel like a modern firm.',
    author: 'Amanda L., Managing Partner',
    tags: ['Remote Work', 'Compensation', 'Finance'],
  },
];

/* ── Page component ──────────────────────────────────────── */

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col">
      <SEO
        title="Client Case Studies"
        description="See how PreciseHR helps Canadian businesses solve real HR challenges — from compliance gaps to scaling teams."
        path="/case-studies"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-4">
              Case Studies
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Client success stories
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Real results from small and mid-size Canadian businesses — from 12-person clinics to 88-employee manufacturers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid gap-10">
            {caseStudies.map((cs, i) => (
              <motion.div key={i} {...staggerChild(i * 0.1)}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 md:p-10">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                      {cs.logo}
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-bold leading-tight">
                          {cs.company}
                        </h2>
                        <Badge variant="secondary">{cs.industry}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {cs.size}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left — challenge & solution */}
                      <div className="flex flex-col">
                        <div className="mb-6">
                          <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2">
                            Challenge
                          </p>
                          <p className="text-muted-foreground leading-relaxed">
                            {cs.challenge}
                          </p>
                        </div>
                        <div className="mb-6">
                          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                            Solution
                          </p>
                          <p className="text-muted-foreground leading-relaxed">
                            {cs.solution}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {cs.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-primary/5 text-primary text-xs rounded-full font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right — results & quote */}
                      <div className="flex flex-col">
                        <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-4">
                          Results
                        </p>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          {cs.results.map((r, j) => (
                            <div key={j} className="text-center">
                              <div className="text-2xl font-bold text-primary">
                                {r.metric}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {r.description}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="bg-muted/50 rounded-lg p-5 mt-auto">
                          <Quote className="w-5 h-5 text-primary/30 mb-2" />
                          <p className="text-sm italic text-muted-foreground mb-3">
                            &ldquo;{cs.quote}&rdquo;
                          </p>
                          <p className="text-xs font-semibold">{cs.author}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Your success story starts here
            </h2>
            <p className="text-white/80 mb-8">
              Let's discuss how PreciseHR can deliver similar results for your
              organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold"
                >
                  Get Free Assessment{' '}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+14378872263">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Phone className="mr-2 w-4 h-4" /> (437) 887-2263
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
