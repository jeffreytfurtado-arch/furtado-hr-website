import SEO from '@/components/SEO';
import { PersonSchemaDavid } from '@/components/StructuredData';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Linkedin, Brain, Workflow, Cpu, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';

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

const focus = [
  { icon: Brain, label: 'AI Strategy & Adoption' },
  { icon: Cpu, label: 'AI Build & Automation' },
  { icon: Workflow, label: 'Revenue & Operations' },
  { icon: TrendingUp, label: 'Go-to-Market & Scaling' },
];

export default function DavidSucklingPage() {
  return (
    <div className="flex flex-col">
      <SEO
        title="David Suckling — Co-Founder"
        description="David Suckling is a Co-Founder of PreciseHR. A builder and applied-AI specialist, he helps organizations adopt and deploy artificial intelligence to work smarter across their operations."
        path="/about/david-suckling"
      />
      <PersonSchemaDavid />
      <Helmet>
        <link rel="canonical" href="https://www.precisehr.ca/about/david-suckling" />
        <meta property="og:type" content="profile" />
        <meta property="profile:first_name" content="David" />
        <meta property="profile:last_name" content="Suckling" />
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">David Suckling</h1>
            <p className="text-xl text-cyan-300 font-medium mb-6">Co-Founder · Builder · AI Consultant</p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              An operator and builder combining go-to-market and operations leadership with hands-on, AI-forward engineering.
            </p>
            <div className="flex gap-3 justify-center mt-8">
              <a href="https://www.linkedin.com/in/david-suckling-b98353326/" target="_blank" rel="noopener noreferrer">
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
                  David Suckling is a Co-Founder of PreciseHR, bringing a rare blend of operational leadership and hands-on technical depth to the firm.
                </p>
                <p>
                  He serves as Chief of Staff at Mortgage Automator, the leading global SaaS platform for private and asset-based lenders, where he has also led the Sales, Revenue Operations, and Operations functions. That trajectory — across go-to-market, revenue, and operations — gives him a panoramic understanding of how growth-stage companies scale.
                </p>
                <p>
                  A developer and builder at heart, David is deeply AI-forward, having designed and stood up hundreds of AI-driven projects and automations. He pairs that engineering instinct with real operating experience — the combination that turns AI from experiment into measurable business impact.
                </p>
                <p>
                  At PreciseHR, David leads the technology and AI vision, translating the firm's expertise into intelligent, automation-ready products and helping clients adopt AI across their organizations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Focus areas */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp} className="mb-8">
              <h2 className="text-2xl font-bold">Areas of Focus</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-3">
              {focus.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={i} {...staggerChild(i * 0.05)}>
                    <Card className="group hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                      <CardContent className="p-5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Let's build what's next</h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Exploring how AI can move your organization forward? Start a conversation with the PreciseHR team.
            </p>
            <Link to="/contact">
              <Button className="bg-white text-primary hover:bg-white/90">
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
