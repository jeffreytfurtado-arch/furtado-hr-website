import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PROVINCES_DATA } from '@/data/provinces';
import { MapPin, ArrowRight, Calendar, Phone } from 'lucide-react';

const CALENDLY = 'https://calendly.com/precisehr-info/precisehr-consult';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export default function HRServicesHub() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="HR Services Across Canada"
        description="PreciseHR provides HR consulting, compliance, payroll, and recruitment for businesses in every Canadian province and territory. Find HR services for your province."
        path="/hr-services"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.precisehr.ca/' },
          { name: 'HR Services', url: 'https://www.precisehr.ca/hr-services' },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-3">Coast to coast</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">HR Services Across Canada</h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Employment standards differ in every province and territory. We deliver HR consulting, compliance, payroll, and recruitment tuned to yours — wherever your team is.
            </p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Book a free HR review <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Provinces grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Find your province</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">HR services by province & territory</h2>
            <p className="text-muted-foreground">Pick your jurisdiction for province-specific HR support, compliance, and free local tools.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROVINCES_DATA.map((p, i) => (
              <motion.div key={p.slug} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}>
                <Link to={`/hr-services/${p.slug}`} className="group block h-full">
                  <Card className="h-full hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{p.name}</h3>
                          <p className="text-xs text-muted-foreground">{p.abbr}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 relative text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Not sure where to start?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Book a free, no-obligation HR review and we'll point you in the right direction.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Calendar className="mr-2 w-4 h-4" /> Book a free consult
              </Button>
            </a>
            <a href="tel:+14378872263">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Phone className="mr-2 w-4 h-4" /> (437) 887-2263
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
