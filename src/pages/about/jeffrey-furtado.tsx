import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  Shield,
  Briefcase,
  Award,
  Linkedin,
  Phone,
  Globe,
  CheckCircle2,
  Building2,
  Users,
  Lightbulb,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function JeffreyFurtadoPage() {
  const expertise = [
    'HR Strategy & Organizational Design',
    'Canadian Employment Law Compliance',
    'Intelligent HR Technology & Automation',
    'Talent Acquisition & Workforce Planning',
    'Compensation & Benefits Strategy',
    'Workplace Investigations',
    'Change Management',
    'Multi-Provincial Compliance',
  ];

  const milestones = [
    { year: '2011', text: 'Founded PreciseHR to bring enterprise-grade HR consulting to Canadian SMBs' },
    { year: '2018', text: 'Expanded services to cover all 13 Canadian provinces and territories' },
    { year: '2023', text: 'Launched the PreciseHR intelligent software platform' },
    { year: '2025', text: 'Surpassed 90+ active Canadian client organizations' },
    { year: '2026', text: 'Introduced AI-powered compliance tools and document generation' },
  ];

  return (
    <div className="flex flex-col">
      <SEO
        title="Jeffrey T. Furtado — Managing Partner, PreciseHR"
        description="Jeffrey T. Furtado is the Managing Partner and Principal Consultant of PreciseHR, a Canadian HR consulting and technology firm. Over 15 years of experience in HR strategy, employment law compliance, and intelligent HR technology."
        path="/about/jeffrey-furtado"
      />

      {/* Enhanced Person schema specific to this page */}
      <Helmet>
        <link rel="canonical" href="https://www.precisehr.ca/about/jeffrey-furtado" />
        <meta property="og:type" content="profile" />
        <meta property="profile:first_name" content="Jeffrey" />
        <meta property="profile:last_name" content="Furtado" />
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Jeffrey T. Furtado</h1>
            <p className="text-xl text-cyan-300 font-medium mb-4">Managing Partner & Principal Consultant</p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Founder of PreciseHR — helping Canadian businesses build compliant, scalable people operations through intelligent consulting and technology.
            </p>
            <div className="flex gap-3 justify-center mt-8">
              <a href="https://www.linkedin.com/in/jeffreytfurtado/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </a>
              <Link to="/contact">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp}>
              <h2 className="text-2xl font-bold mb-6">About Jeffrey</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Jeffrey T. Furtado is the Managing Partner and Principal Consultant of PreciseHR, a Canadian HR consulting and technology firm that serves organizations across all 13 provinces and territories. With over 15 years of experience spanning HR strategy, employment law compliance, organizational design, and HR technology, he founded PreciseHR to give Canadian businesses access to enterprise-grade human resources expertise — regardless of their size.
                </p>
                <p>
                  His approach to HR management combines deep regulatory knowledge with intelligent automation. Under his leadership, PreciseHR developed a proprietary software platform that automates compliance monitoring, document generation, and workforce analytics — capabilities typically reserved for large enterprises with dedicated HR departments.
                </p>
                <p>
                  Jeffrey has advised organizations across technology, healthcare, financial services, manufacturing, retail, professional services, and non-profit sectors. His work focuses on building compliant, scalable people operations that reduce risk and drive business growth, particularly for companies navigating the complexities of multi-provincial Canadian employment law.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp} className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Areas of Expertise</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-3">
              {expertise.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-center gap-3 p-3 rounded-xl border bg-card"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp} className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Professional Timeline</h2>
            </motion.div>
            <div className="space-y-0">
              {milestones.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-4 relative"
                >
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center z-10">
                      <span className="text-[10px] font-bold text-primary">{item.year}</span>
                    </div>
                    {i < milestones.length - 1 && <div className="w-0.5 h-full bg-primary/20 min-h-[2rem]" />}
                  </div>
                  <div className="pb-8 pt-2">
                    <p className="text-sm leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PreciseHR connection */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp}>
              <Card className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mb-1">PreciseHR</h2>
                      <p className="text-sm text-muted-foreground">Founder & Managing Partner · 2011 – Present</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    PreciseHR provides intelligent HR consulting and software for Canadian businesses. The firm serves 90+ organizations across all provinces, offering services from compliance management and recruitment to workplace investigations and HR technology — all enhanced by intelligent automation that reduces costs and improves accuracy.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 rounded-xl bg-muted/50">
                      <div className="text-2xl font-bold text-primary">90+</div>
                      <div className="text-[10px] text-muted-foreground">Clients Served</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-muted/50">
                      <div className="text-2xl font-bold text-primary">15+</div>
                      <div className="text-[10px] text-muted-foreground">Years Experience</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-muted/50">
                      <div className="text-2xl font-bold text-primary">1,500+</div>
                      <div className="text-[10px] text-muted-foreground">Employees Supported</div>
                    </div>
                  </div>
                  <Link to="/">
                    <Button>
                      Visit PreciseHR
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp} className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Connect with Jeffrey</h2>
            <p className="text-white/80 mb-8 leading-relaxed text-sm">
              Interested in working together or discussing HR strategy for your organization?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto font-semibold">
                  Get Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="https://www.linkedin.com/in/jeffreytfurtado/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                  <Linkedin className="mr-2 w-4 h-4" />
                  Connect on LinkedIn
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
