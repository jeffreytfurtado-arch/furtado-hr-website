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
  TrendingUp,
  Zap,
  DollarSign,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useRef, useState, useEffect } from 'react';

function useInView(opts?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.15, ...opts });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function JeffreyFurtadoPage() {
  const expertise = [
    { label: 'Gaming & Live Operations', icon: Zap },
    { label: 'SaaS Operations & Scaling', icon: TrendingUp },
    { label: 'Go-to-Market Strategy', icon: Zap },
    { label: 'Revenue & Sales Leadership', icon: DollarSign },
    { label: 'Private Equity & M&A Exits', icon: Award },
    { label: 'Fintech & Financial Services', icon: Building2 },
    { label: 'HR Technology & Automation', icon: Lightbulb },
    { label: 'Real Estate Investment', icon: Globe },
    { label: 'AI-Driven Business Operations', icon: Lightbulb },
    { label: 'Risk & Compliance', icon: Shield },
  ];

  const roles = [
    {
      title: 'Chief Operating Officer & Executive Producer',
      company: 'Big Viking Games',
      period: 'Current',
      description: 'COO & Executive Producer at Canada\'s largest independent mobile and social game studio. Series B funded ($21.8M). Titles played by millions worldwide across iOS, Android, Facebook, and the web — including YoWorld, acquired from Zynga. Leading operations, live game production, and studio strategy across a 60+ person team.',
      url: 'https://www.bigvikinggames.com',
      highlight: true,
    },
    {
      title: 'Chief Operating Officer & CRO',
      company: 'Mortgage Automator (BVP Forge)',
      period: 'Current',
      description: 'COO at the leading SaaS platform for private and asset-based lenders. 400+ lenders worldwide, $66B+ in funded loans. Driving force behind the company\'s $110M strategic partnership with BVP Forge, one of the world\'s largest private equity firms. Led AI integration across business operations, 30% customer growth, and global expansion.',
      url: 'https://www.mortgageautomator.com',
      highlight: true,
    },
    {
      title: 'Managing Partner',
      company: 'PreciseHR',
      period: 'Current',
      description: 'Investor and operator at an intelligent HR consulting and technology firm serving 90+ Canadian organizations across all provinces. Leading the firm\'s strategy to leverage AI and automation to reshape how businesses manage compliance, talent, and people operations.',
      url: 'https://www.precisehr.ca',
      highlight: true,
    },
    {
      title: 'Founder',
      company: 'FurtadoFirm',
      period: 'Current',
      description: 'Real estate investment firm specializing in multi-unit and commercial property acquisition, private mortgages, tenant rentals, and rent-to-own homeownership solutions.',
      url: 'https://furtadofirm.com',
    },
    {
      title: 'VP / Senior Executive',
      company: 'Progressa',
      period: 'Previous',
      description: 'Senior executive at a pre-IPO stage fintech company focused on consumer lending and financial wellness. Held VP-level roles across Sales, Operations, and Lending.',
    },
    {
      title: 'VP / Senior Executive',
      company: 'Consumer Centre Inc. (CCi)',
      period: 'Previous',
      description: 'Successfully led the company through a strategic exit. Held VP-level roles across Shared Services, Customer Success, and Operations — driving revenue growth and operational efficiency across BPO operations.',
    },
  ];

  const mentions = [
    {
      title: 'Mortgage Automator Announces Record Growth & AI-Driven Innovation in 2024',
      source: 'Business Wire',
      date: 'February 2025',
      url: 'https://www.businesswire.com/news/home/20250219687145/en/Mortgage-Automator-Announces-Record-Growth-AI-Driven-Innovation-in-2024',
      excerpt: 'Jeffrey Furtado was promoted to Chief Operating Officer (COO)',
    },
    {
      title: 'Mortgage Automator Receives Strategic Investment from BVP Forge',
      source: 'Business Wire',
      date: 'May 2024',
      url: 'https://www.businesswire.com/news/home/20240501524578/en/',
      excerpt: '$110M strategic partnership with one of the world\'s largest private equity firms',
    },
  ];

  return (
    <div className="flex flex-col">
      <SEO
        title="Jeffrey T. Furtado — Executive, Entrepreneur, Operator"
        description="Jeffrey T. Furtado is a Canadian executive and entrepreneur. COO & Executive Producer at Big Viking Games. COO at Mortgage Automator (BVP Forge). Managing Partner at PreciseHR. Track record scaling growth-stage companies, driving $110M+ exits, and building AI-driven operations across Gaming, Fintech, SaaS, HR, and Real Estate."
        path="/about/jeffrey-furtado"
      />
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
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Jeffrey T. Furtado</h1>
            <p className="text-xl text-cyan-300 font-medium mb-2">Executive · Entrepreneur · Operator</p>
            <p className="text-sm text-white/60 mb-6">Toronto · Oakville · Simcoe, Ontario, Canada</p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Scaling growth-stage companies across gaming, fintech, SaaS, HR technology, and real estate. Track record of driving enterprise strategy, revenue growth, and successful exits.
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
              <h2 className="text-2xl font-bold mb-6">About</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4 text-[15px]">
                <p>
                  Jeffrey T. Furtado is a Canadian executive, entrepreneur, and operator with a career defined by scaling businesses, unlocking revenue, and architecting enterprise-level strategies across gaming, fintech, SaaS, HR technology, BPO, and real estate.
                </p>
                <p>
                  Jeffrey currently serves as Chief Operating Officer & Executive Producer at Big Viking Games, Canada's largest independent mobile and social game studio. Backed by $21.8M in Series B funding, the company develops titles played by millions worldwide across iOS, Android, Facebook, and the web — including YoWorld, acquired from Zynga. He oversees operations, live game production, and studio strategy.
                </p>
                <p>
                  Concurrently, Jeffrey is COO & CRO at Mortgage Automator, a BVP Forge portfolio company and the leading SaaS platform for private and asset-based lenders. He was a driving force behind the company's $110M strategic partnership with BVP Forge. The platform serves 400+ lenders globally and has facilitated over $66 billion in funded loans.
                </p>
                <p>
                  Jeffrey is also Managing Partner at PreciseHR, an intelligent HR consulting and technology firm serving 90+ Canadian organizations. As an investor and operator, he leads the firm's strategy to leverage AI and automation to reshape how Canadian businesses manage compliance, talent, and people operations. He is also the founder of FurtadoFirm, a real estate investment firm specializing in multi-unit property, private lending, and rent-to-own solutions.
                </p>
                <p>
                  Throughout his career, Jeffrey has held senior executive roles including VP of Sales, VP of Operations, VP of Shared Services, VP of Customer Success, VP of Lending, Chief Risk & Compliance Officer, Chief Revenue Officer, and Chief Marketing Officer — successfully leading a strategic exit at CCi, navigating pre-IPO stages at Progressa, and consistently institutionalizing growth-stage companies for profitability and scale.
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
              <h2 className="text-2xl font-bold">Areas of Expertise</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-3">
              {expertise.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-center gap-3 p-3 rounded-xl border bg-card"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Career */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp} className="mb-8">
              <h2 className="text-2xl font-bold">Career</h2>
            </motion.div>
            <div className="space-y-4">
              {roles.map((role, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${role.highlight ? 'border-l-4 border-l-primary' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-bold">{role.title}</h3>
                          <p className="text-sm text-primary font-medium">{role.company}</p>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full whitespace-nowrap">{role.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{role.description}</p>
                      {role.url && (
                        <a href={role.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-3 hover:underline">
                          <ExternalLink className="w-3 h-3" />
                          {new URL(role.url).hostname.replace('www.', '')}
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp} className="mb-8">
              <h2 className="text-2xl font-bold">Key Achievements</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { metric: '$110M', label: 'Strategic exit at Mortgage Automator / BVP Forge partnership' },
                { metric: '$66B+', label: 'Total loans funded through Mortgage Automator platform' },
                { metric: 'Millions', label: 'Players across Big Viking Games titles worldwide' },
                { metric: '400+', label: 'Lenders worldwide on the Mortgage Automator platform' },
                { metric: '90+', label: 'Canadian organizations served through PreciseHR' },
                { metric: '4+', label: 'Companies scaled as executive, investor, and operator' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="text-2xl font-bold text-primary mb-1">{item.metric}</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Press & Mentions */}
      {mentions.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div {...fadeUp} className="mb-8">
                <h2 className="text-2xl font-bold">Press & Mentions</h2>
              </motion.div>
              <div className="space-y-3">
                {mentions.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Card className="hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{item.title}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{item.source} · {item.date}</p>
                              <p className="text-xs text-muted-foreground mt-2 italic">"{item.excerpt}"</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-1 group-hover:text-primary transition-colors" />
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp} className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Connect with Jeffrey</h2>
            <p className="text-white/80 mb-8 leading-relaxed text-sm">
              Interested in working together, discussing strategy, or exploring partnership opportunities?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://www.linkedin.com/in/jeffreytfurtado/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto font-semibold">
                  <Linkedin className="mr-2 w-5 h-5" />
                  Connect on LinkedIn
                </Button>
              </a>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                  Get in Touch
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
