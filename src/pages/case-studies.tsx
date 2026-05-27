import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Phone, Quote } from 'lucide-react';

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

const caseStudies = [
  {
    company: 'TechVenture Inc.',
    industry: 'Technology',
    size: '150 employees',
    challenge: 'Rapid growth led to inconsistent HR practices, compliance gaps, and difficulty scaling recruitment.',
    solution: 'Implemented comprehensive HR infrastructure including standardized policies, ATS integration, and performance management.',
    results: [
      { metric: '60%', description: 'Reduction in time-to-hire' },
      { metric: '95%', description: 'Compliance score achieved' },
      { metric: '40%', description: 'Improvement in retention' },
    ],
    quote: 'PreciseHR transformed our HR from chaotic to strategic. Their expertise allowed us to scale confidently.',
    author: 'Sarah M., CEO',
    tags: ['HR Strategy', 'Recruitment', 'Compliance'],
  },
  {
    company: 'Northern Manufacturing Ltd.',
    industry: 'Manufacturing',
    size: '300 employees',
    challenge: 'Outdated HR processes, high turnover, and workplace safety compliance issues across multiple facilities.',
    solution: 'Redesigned HR policies, implemented safety training, and established employee engagement initiatives.',
    results: [
      { metric: '50%', description: 'Decrease in turnover' },
      { metric: '100%', description: 'Safety compliance' },
      { metric: '35%', description: 'Increase in satisfaction' },
    ],
    quote: 'They helped us modernize our HR approach while respecting our company culture. Results speak for themselves.',
    author: 'Michael T., Operations Director',
    tags: ['Employee Relations', 'Safety', 'Retention'],
  },
  {
    company: 'HealthFirst Services',
    industry: 'Healthcare',
    size: '200 employees',
    challenge: 'Complex scheduling, credential management, and compliance with healthcare regulations.',
    solution: 'Deployed specialized HR software, automated credential tracking, and created flexible scheduling.',
    results: [
      { metric: '70%', description: 'Time saved on scheduling' },
      { metric: '100%', description: 'Credential compliance' },
      { metric: '45%', description: 'Admin cost reduction' },
    ],
    quote: 'PreciseHR understood healthcare HR challenges. Their solutions were practical and immediately impactful.',
    author: 'Jennifer K., HR Manager',
    tags: ['Healthcare', 'Compliance', 'HR Technology'],
  },
  {
    company: 'GreenRetail Group',
    industry: 'Retail',
    size: '500+ employees',
    challenge: 'High seasonal turnover, inconsistent training across 15 locations, and difficulty managing multi-site workforce.',
    solution: 'Implemented centralized HRIS, standardized onboarding, and performance tracking across all locations.',
    results: [
      { metric: '55%', description: 'Faster onboarding' },
      { metric: '30%', description: 'Seasonal retention improvement' },
      { metric: '80%', description: 'Training completion rate' },
    ],
    quote: 'Managing HR across 15 locations was overwhelming. PreciseHR gave us the systems and support we needed.',
    author: 'David R., Regional Manager',
    tags: ['Multi-site', 'Training', 'Retail'],
  },
  {
    company: 'FinanceCore Solutions',
    industry: 'Financial Services',
    size: '120 employees',
    challenge: 'Needed remote work policies, regulatory compliance, and competitive talent acquisition in tight market.',
    solution: 'Developed hybrid framework, enhanced compensation strategy, and implemented talent acquisition best practices.',
    results: [
      { metric: '90%', description: 'Employee satisfaction' },
      { metric: '65%', description: 'More qualified applicants' },
      { metric: '100%', description: 'Regulatory compliance' },
    ],
    quote: 'Their remote work framework gave us the flexibility our team wanted while maintaining compliance.',
    author: 'Amanda L., VP People',
    tags: ['Remote Work', 'Compensation', 'Finance'],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col">
      <title>Case Studies - PreciseHR</title>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-4">Case Studies</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Client success stories</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Real results from real Canadian businesses across industries and sizes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-12">
            {caseStudies.map((cs, i) => (
              <motion.div key={i} {...staggerChild(i * 0.1)}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 md:p-10">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <h2 className="text-2xl font-bold">{cs.company}</h2>
                      <Badge variant="secondary">{cs.industry}</Badge>
                      <span className="text-sm text-muted-foreground">{cs.size}</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left — challenge & solution */}
                      <div>
                        <div className="mb-6">
                          <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2">Challenge</p>
                          <p className="text-muted-foreground">{cs.challenge}</p>
                        </div>
                        <div className="mb-6">
                          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Solution</p>
                          <p className="text-muted-foreground">{cs.solution}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cs.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-primary/5 text-primary text-xs rounded-full font-medium">{tag}</span>
                          ))}
                        </div>
                      </div>

                      {/* Right — results & quote */}
                      <div>
                        <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-4">Results</p>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          {cs.results.map((r, j) => (
                            <div key={j} className="text-center">
                              <div className="text-2xl font-bold text-primary">{r.metric}</div>
                              <div className="text-xs text-muted-foreground">{r.description}</div>
                            </div>
                          ))}
                        </div>
                        <div className="bg-muted/50 rounded-lg p-5">
                          <Quote className="w-5 h-5 text-primary/30 mb-2" />
                          <p className="text-sm italic text-muted-foreground mb-3">"{cs.quote}"</p>
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
            <h2 className="text-3xl font-bold mb-4">Your success story starts here</h2>
            <p className="text-white/80 mb-8">Let's discuss how PreciseHR can deliver similar results for your organization.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                  Get Free Assessment <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+14378872263">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
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
