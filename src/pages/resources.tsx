import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Calculator,
  ClipboardCheck,
  TrendingUp,
  UserMinus,
  DollarSign,
  FileText,
  BookOpen,
  Phone,
  Download,
} from 'lucide-react';

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

const tools = [
  { title: 'HR Outsourcing ROI Calculator', description: 'See how much your organization could save by outsourcing HR to PreciseHR.', icon: Calculator, href: '/roi-calculator', color: 'bg-blue-500/10 text-blue-600' },
  { title: 'HR Health Check', description: 'Assess your HR compliance and identify gaps with our interactive quiz.', icon: ClipboardCheck, href: '/hr-assessment', color: 'bg-green-500/10 text-green-600' },
  { title: 'Salary Benchmarking Tool', description: 'Compare salaries across Canadian provinces for 9+ HR positions.', icon: TrendingUp, href: '/salary-benchmarking', color: 'bg-purple-500/10 text-purple-600' },
  { title: 'Turnover Cost Calculator', description: 'Calculate the true cost of employee turnover at every level.', icon: UserMinus, href: '/turnover-calculator', color: 'bg-red-500/10 text-red-600' },
  { title: 'Hiring Cost Calculator', description: 'Understand the full cost-per-hire across different recruitment methods.', icon: DollarSign, href: '/hiring-calculator', color: 'bg-amber-500/10 text-amber-600' },
];

const guides = [
  { title: 'Canadian Employment Standards Guide', description: 'Comprehensive overview of federal and provincial employment standards for Canadian employers.', type: 'Guide', link: '/blog/federal-vs-provincial-employment-standards' },
  { title: 'Workplace Investigation Guide', description: 'Best practices for conducting fair, thorough, and legally compliant workplace investigations.', type: 'Guide', link: '/blog/workplace-investigations' },
  { title: 'Performance Management Framework', description: 'Build an effective performance management system with continuous feedback.', type: 'Framework', link: '/blog/performance-management' },
  { title: 'Remote Work Policy Template', description: 'Everything Canadian employers need to address in their remote work policies.', type: 'Template', link: '/blog/remote-work-policies' },
  { title: 'Harassment Prevention Guide', description: 'Go beyond compliance with proactive strategies for a respectful workplace.', type: 'Guide', link: '/blog/preventing-workplace-harassment' },
  { title: 'Termination Best Practices', description: 'Handle terminations professionally with documentation and compliance strategies.', type: 'Checklist', link: '/blog/termination-best-practices' },
];

export default function ResourcesPage() {
  return (
    <div className="flex flex-col">
      <SEO title="HR Resources & Guides" description="Free HR guides, templates, and tools for Canadian businesses. Termination checklists, compliance guides, and more." path="/resources" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-4">Resources</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">HR Tools & Resources</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Free calculators, guides, and templates to help you make better HR decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Interactive Tools</p>
            <h2 className="text-3xl md:text-4xl font-bold">Free HR calculators</h2>
            <p className="text-muted-foreground mt-3">Instant insights — no signup required.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <motion.div key={i} {...staggerChild(i * 0.08)}>
                  <Link to={tool.href}>
                    <Card className="h-full group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-4`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                        <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Try it now <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guides & Templates */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Guides & Templates</p>
            <h2 className="text-3xl md:text-4xl font-bold">In-depth HR resources</h2>
            <p className="text-muted-foreground mt-3">Written by our team of Canadian HR experts.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {guides.map((guide, i) => (
              <motion.div key={i} {...staggerChild(i * 0.08)}>
                <Link to={guide.link}>
                  <Card className="h-full group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold group-hover:text-primary transition-colors">{guide.title}</h3>
                            <Badge variant="secondary" className="text-xs">{guide.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{guide.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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
            <h2 className="text-3xl font-bold mb-4">Need personalized guidance?</h2>
            <p className="text-white/80 mb-8">Our HR experts can help you apply these resources to your specific situation.</p>
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
