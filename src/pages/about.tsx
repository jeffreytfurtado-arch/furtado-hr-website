import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Shield,
  Heart,
  Award,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Phone,
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

export default function AboutPage() {
  const values = [
    { icon: Shield, title: 'Integrity', description: 'Transparent, honest, and ethical practices in everything we do.' },
    { icon: Heart, title: 'People-First', description: 'Your employees are your greatest asset. We help build cultures where people thrive.' },
    { icon: Lightbulb, title: 'Innovation', description: 'We leverage the latest HR technology and stay ahead of industry trends.' },
    { icon: Award, title: 'Excellence', description: 'Precise, high-quality services that consistently exceed expectations.' },
  ];

  const certifications = [
    'Chartered Professionals in Human Resources (CPHR)',
    'Society for Human Resource Management (SHRM)',
    'Human Resources Professionals Association (HRPA)',
    'Canadian Payroll Association (CPA)',
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-4">About Us</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Your trusted partner in
              <br />HR excellence
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              We combine deep expertise with a commitment to precision, helping Canadian organizations build stronger teams and better workplaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div {...staggerChild(0)}>
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-8">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Our Mission</p>
                  <h2 className="text-2xl font-bold mb-4">Empowering organizations through precision HR</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide efficient, compliant HR solutions that enable organizations to attract, develop, and retain exceptional talent while fostering positive workplace cultures.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div {...staggerChild(0.1)}>
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-8">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Our Vision</p>
                  <h2 className="text-2xl font-bold mb-4">Canada's most trusted HR partner</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To be recognized for our expertise, innovation, and unwavering commitment to helping organizations achieve their full potential through exceptional people management.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-bold">The principles that guide us</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div key={i} {...staggerChild(i * 0.1)}>
                  <Card className="h-full text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold">A proven approach</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Assessment', desc: 'Comprehensive review of your current HR practices, challenges, and goals.' },
              { step: '02', title: 'Strategy', desc: 'Tailored plan with the right mix of software and consulting for your needs.' },
              { step: '03', title: 'Implementation', desc: 'Hands-on deployment with training and minimal disruption to your team.' },
              { step: '04', title: 'Ongoing Support', desc: 'Continuous guidance, compliance monitoring, and expert advice on-call.' },
            ].map((item, i) => (
              <motion.div key={i} {...staggerChild(i * 0.1)} className="text-center">
                <div className="text-5xl font-black text-primary/10 mb-3">{item.step}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-14">
            <Link to="/contact">
              <Button size="lg">
                Start Your Free Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Credentials</p>
            <h2 className="text-3xl md:text-4xl font-bold">Professional certifications</h2>
          </motion.div>

          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {certifications.map((cert, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to work together?</h2>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Let's discuss how PreciseHR can help your organization achieve its HR goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto font-semibold">
                  Get Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+14378872263">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                  <Phone className="mr-2 w-4 h-4" />
                  (437) 887-2263
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
