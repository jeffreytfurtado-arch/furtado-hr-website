import SEO from '@/components/SEO';
import { PersonSchema } from '@/components/StructuredData';
import { blogPosts } from '@/data/blog-data';
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
      description: 'COO & Executive Producer at Canada\'s largest independent mobile and social game studio. Series B funded ($21.8M). Titles played by millions worldwide across iOS, Android, Facebook, and the web — including YoWorld, acquired from Zynga. Leading operations, live game production, and studio strategy.',
      url: 'https://www.bigvikinggames.com',
      highlight: true,
    },
    {
      title: 'Managing Partner',
      company: 'PreciseHR',
      period: 'Current',
      description: 'Investor and operator at an intelligent HR consulting and technology firm serving Canadian organizations across all provinces. Leading the firm\'s strategy to leverage AI and automation to reshape how businesses manage compliance, talent, and people operations.',
      url: 'https://www.precisehr.ca',
      highlight: true,
    },
    {
      title: 'GLG Council Member & Guidepoint Advisor',
      company: 'GLG · Guidepoint',
      period: 'Current',
      description: 'Advises institutional investors, private equity firms, and Fortune 500 companies on SaaS operations, fintech, gaming, and HR technology through the world\'s leading expert network platforms.',
    },
    {
      title: 'Strategic Investor',
      company: 'SaaS · Fintech · Ed-Tech · Real Estate',
      period: 'Current',
      description: 'Active strategic investor across SaaS, Fintech, Ed-Tech, and Real Estate businesses, providing capital, operational expertise, and growth advisory.',
    },
    {
      title: 'Founder',
      company: 'FurtadoFirm',
      period: 'Current',
      description: 'Real estate investment firm specializing in multi-unit and commercial property acquisition, private mortgages, tenant rentals, and rent-to-own homeownership solutions.',
      url: 'https://furtadofirm.com',
    },
    {
      title: 'Founder (Exited)',
      company: 'DooLeeNoted',
      period: 'Previously',
      description: 'Founded and built DooLeeNoted, a global talent-collaboration platform connecting South Asia, the Middle East and North America. The archived official Alexa Top 1 Million dataset recorded DooLeeNoted at #54,160 globally on March 16, 2015. The company was sold to a European acquirer in 2016 for a mid-seven-figure amount.',
    },
    {
      title: 'Chief Operating Officer & CRO',
      company: 'Mortgage Automator (BVP Forge)',
      period: 'Previously',
      description: 'Former Chief Operating Officer and Chief Revenue Officer at Mortgage Automator, a SaaS platform serving private and asset-based lenders. Played a central operating role in the company\'s $110 million private equity exit with BVP Forge, structured as a majority recapitalization with the founders retaining minority ownership. Led business transformation, AI integration, organizational development and international growth.',
      url: 'https://www.mortgageautomator.com',
    },
    {
      title: 'VP / Senior Executive',
      company: 'Progressa',
      period: 'Previously',
      description: 'Senior executive at a pre-IPO stage fintech company focused on consumer lending and financial wellness. Held VP-level roles across Sales, Operations, and Lending.',
    },
    {
      title: 'VP / Senior Executive',
      company: 'Consumer Centre Inc. (CCi)',
      period: 'Previously',
      description: 'Successfully led the company through a strategic exit. Held VP-level roles across Shared Services, Customer Success, and Operations — driving revenue growth and operational efficiency across BPO operations.',
    },
    {
      title: 'National Manager / Senior Executive',
      company: 'goeasy Ltd. (TSX: GSY)',
      period: 'Previously',
      description: 'National Manager of Sales, Service, and Shared Services at one of Canada\'s largest publicly traded alternative financial services companies.',
    },
    {
      title: 'Director, Client Solutions & Operations',
      company: 'NCO Financial Systems',
      period: 'Previously',
      description: 'Director-level role leading client solutions, business development, and international contact centre operations.',
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
      title: 'AFX Research Integrates with Mortgage Automator to Deliver Fast, Automated Title Updates',
      source: 'Business Wire',
      date: 'April 2025',
      url: 'https://www.businesswire.com/news/home/20250429040022/en/AFX-Research-Integrates-with-Mortgage-Automator-to-Deliver-Fast-Automated-Title-Updates-to-Private-Lenders',
      excerpt: '“Mortgage Automator is known for its commitment to streamlining the lending process,” said Jeffrey Furtado, COO',
    },
    {
      title: 'Mortgage Automator: Record Growth Coverage',
      source: 'Morningstar',
      date: 'February 2025',
      url: 'https://www.morningstar.com/news/business-wire/20250219687145/mortgage-automator-announces-record-growth-ai-driven-innovation-in-2024',
      excerpt: 'Jeffrey Furtado promoted to COO — syndicated coverage in Morningstar',
    },
  ];

  return (
    <div className="flex flex-col">
      <SEO
        title="Jeffrey T. Furtado — Executive, Entrepreneur, Operator"
        description="Jeffrey T. Furtado is COO and Executive Producer at Big Viking Games and Managing Partner at PreciseHR, with experience across fintech, SaaS, gaming and AI."
        path="/about/jeffrey-furtado"
      />
      <PersonSchema />
      <Helmet>
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
            <p className="text-xl text-cyan-300 font-medium mb-2">Executive · Entrepreneur · Strategic Investor</p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Scaling growth-stage companies across gaming, fintech, SaaS, HR technology and real estate. Track record spanning multiple exits, including a $110 million private equity exit, alongside enterprise strategy and operational transformation.
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
                  Jeffrey T. Furtado is a Canadian executive, entrepreneur and strategic investor with a career defined by scaling businesses, driving a $110 million private equity exit and other major transactions, and architecting enterprise-level strategies across gaming, fintech, SaaS, HR technology, BPO and real estate.
                </p>
                <p>
                  Jeffrey currently serves as Chief Operating Officer & Executive Producer at Big Viking Games, Canada's largest independent mobile and social game studio. Backed by $21.8M in Series B funding, the company develops titles played by millions worldwide across iOS, Android, Facebook, and the web — including YoWorld, acquired from Zynga. He oversees operations, live game production, and studio strategy.
                </p>
                <p>
                  Previously, Jeffrey served as Chief Operating Officer and Chief Revenue Officer at Mortgage Automator, a leading SaaS platform for private and asset-based lenders. He transformed the company's operating model and played a central role in preparing Mortgage Automator for its $110 million private equity exit with BVP Forge. The transaction was structured as a majority recapitalization, with BVP Forge acquiring majority ownership and the founders retaining a minority interest. During his tenure, the platform facilitated more than $66 billion in funded loans across the United States, Canada, Australia and New Zealand.
                </p>
                <p>
                  Jeffrey is Managing Partner at PreciseHR, an intelligent HR consulting and technology firm serving Canadian organizations across all provinces. As an investor and operator, he leads the firm's strategy to leverage AI and automation to reshape how businesses manage compliance, talent, and people operations.
                </p>
                <p>
                  Jeffrey participates in the GLG and Guidepoint expert networks, advising institutional investors, private equity firms and corporate leaders on SaaS operations, fintech, gaming, HR technology and organizational scale. He is a strategic investor in SaaS, Fintech, Ed-Tech, and Real Estate businesses. Jeffrey is also the founder of FurtadoFirm, a real estate investment firm, and previously founded and built DooLeeNoted, a global talent-collaboration platform connecting South Asia, the Middle East and North America. The archived official Alexa Top 1 Million dataset recorded DooLeeNoted at #54,160 globally on March 16, 2015. The company was sold to a European acquirer in 2016 for a mid-seven-figure amount.
                </p>
                <p>
                  Throughout his career, Jeffrey has held global senior executive roles across Sales, Operations, Shared Services, Customer Success/Service Delivery, Lending, Risk & Compliance/Legal, Revenue, Human Resources, IT, Development/DevOps, and Marketing. He served as Vice President, Sales, Operations and Shared Services at Consumer Centre Inc. through the company's $24 million exit. He later helped scale Progressa through its $84 million equity and loan funding round and pre-IPO preparations, and has consistently institutionalized growth-stage companies for profitability and scale.
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
                { metric: '$110M', label: 'Private equity exit and majority recapitalization with BVP Forge' },
                { metric: 'Multi-M', label: 'Exit — founded and sold DooLeeNoted' },
                { metric: 'Billions', label: 'In loans funded globally through the Mortgage Automator platform' },
                { metric: 'Millions', label: 'Players across Big Viking Games titles worldwide' },
                { metric: '300+', label: 'FTEs built and led across dozens of functional areas' },
                { metric: 'Active', label: 'Strategic investor in SaaS, Fintech, Ed-Tech, and Real Estate' },
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

      {/* Insights by Jeffrey */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Insights</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Articles by Jeffrey</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Practical writing on operations, AI implementation, revenue operations, leadership, and Canadian HR &amp; compliance.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[...blogPosts].reverse().filter((p) => p.author.includes('Jeffrey')).slice(0, 6).map((p) => (
              <motion.div key={p.id} {...fadeUp}>
                <Link to={`/blog/${p.id}`} className="group block h-full">
                  <Card className="h-full hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-5">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">{p.category}</p>
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors leading-snug">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all articles <ArrowRight className="w-4 h-4" />
            </Link>
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
