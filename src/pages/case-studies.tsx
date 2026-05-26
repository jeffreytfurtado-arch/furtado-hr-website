import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Target,
  CheckCircle2,
  ArrowRight,
  Building2,
  Briefcase
} from 'lucide-react';

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      company: 'TechVenture Inc.',
      industry: 'Technology',
      size: '150 employees',
      challenge: 'Rapid growth led to inconsistent HR practices, compliance gaps, and difficulty scaling recruitment processes.',
      solution: 'Implemented comprehensive HR infrastructure including standardized policies, ATS integration, and performance management system.',
      results: [
        { metric: '60%', description: 'Reduction in time-to-hire' },
        { metric: '95%', description: 'Compliance score achieved' },
        { metric: '40%', description: 'Improvement in employee retention' },
      ],
      testimonial: {
        quote: 'PreciseHR transformed our HR operations from chaotic to strategic. Their expertise allowed us to scale confidently while maintaining compliance.',
        author: 'Sarah M.',
        title: 'CEO'
      },
      tags: ['HR Strategy', 'Recruitment', 'Compliance']
    },
    {
      company: 'Northern Manufacturing Ltd.',
      industry: 'Manufacturing',
      size: '300 employees',
      challenge: 'Outdated HR processes, high turnover rates, and workplace safety compliance issues across multiple facilities.',
      solution: 'Redesigned HR policies, implemented safety training programs, and established employee engagement initiatives.',
      results: [
        { metric: '50%', description: 'Decrease in turnover rate' },
        { metric: '100%', description: 'Safety compliance achieved' },
        { metric: '35%', description: 'Increase in employee satisfaction' },
      ],
      testimonial: {
        quote: 'The team helped us modernize our HR approach while respecting our company culture. The results speak for themselves.',
        author: 'Michael T.',
        title: 'Operations Director'
      },
      tags: ['Employee Relations', 'Safety', 'Retention']
    },
    {
      company: 'HealthFirst Services',
      industry: 'Healthcare',
      size: '200 employees',
      challenge: 'Complex scheduling needs, credential management, and maintaining compliance with healthcare regulations.',
      solution: 'Deployed specialized HR software, automated credential tracking, and created flexible scheduling system.',
      results: [
        { metric: '70%', description: 'Time saved on scheduling' },
        { metric: '100%', description: 'Credential compliance maintained' },
        { metric: '45%', description: 'Reduction in administrative costs' },
      ],
      testimonial: {
        quote: 'PreciseHR understood the unique challenges of healthcare HR. Their solutions were practical and immediately impactful.',
        author: 'Jennifer K.',
        title: 'HR Manager'
      },
      tags: ['Healthcare', 'Compliance', 'HR Technology']
    },
    {
      company: 'GreenRetail Group',
      industry: 'Retail',
      size: '500+ employees',
      challenge: 'High seasonal turnover, inconsistent training across locations, and difficulty managing multi-site workforce.',
      solution: 'Implemented centralized HRIS, standardized onboarding program, and performance tracking across all locations.',
      results: [
        { metric: '55%', description: 'Faster onboarding process' },
        { metric: '30%', description: 'Improvement in seasonal retention' },
        { metric: '80%', description: 'Training completion rate' },
      ],
      testimonial: {
        quote: 'Managing HR across 15 locations was overwhelming. PreciseHR gave us the systems and support we needed to succeed.',
        author: 'David R.',
        title: 'Regional Manager'
      },
      tags: ['Multi-site', 'Training', 'Retail']
    },
    {
      company: 'FinanceCore Solutions',
      industry: 'Financial Services',
      size: '120 employees',
      challenge: 'Needed to establish remote work policies, maintain regulatory compliance, and attract top talent in competitive market.',
      solution: 'Developed hybrid work framework, enhanced compensation strategy, and implemented talent acquisition best practices.',
      results: [
        { metric: '90%', description: 'Employee satisfaction with remote policy' },
        { metric: '65%', description: 'Increase in qualified applicants' },
        { metric: '100%', description: 'Regulatory compliance maintained' },
      ],
      testimonial: {
        quote: 'Their strategic approach to remote work and talent acquisition positioned us as an employer of choice in our industry.',
        author: 'Amanda L.',
        title: 'Chief People Officer'
      },
      tags: ['Remote Work', 'Talent Acquisition', 'Financial Services']
    },
    {
      company: 'BuildRight Construction',
      industry: 'Construction',
      size: '250 employees',
      challenge: 'Managing unionized workforce, complex payroll requirements, and ensuring safety compliance across job sites.',
      solution: 'Streamlined union relations, automated payroll processes, and implemented comprehensive safety management system.',
      results: [
        { metric: '40%', description: 'Reduction in payroll errors' },
        { metric: '75%', description: 'Decrease in safety incidents' },
        { metric: '85%', description: 'Union grievance resolution rate' },
      ],
      testimonial: {
        quote: 'PreciseHR brought order to our complex HR environment. Their construction industry expertise was invaluable.',
        author: 'Robert P.',
        title: 'VP of Operations'
      },
      tags: ['Construction', 'Union Relations', 'Safety']
    },
  ];

  const industries = [
    { name: 'Technology', count: 45 },
    { name: 'Healthcare', count: 38 },
    { name: 'Manufacturing', count: 52 },
    { name: 'Retail', count: 41 },
    { name: 'Financial Services', count: 29 },
    { name: 'Construction', count: 34 },
    { name: 'Professional Services', count: 47 },
    { name: 'Non-Profit', count: 23 },
  ];

  return (
    <div className="flex flex-col">
      <title>Case Studies - PreciseHR</title>
      <meta name="description" content="Real success stories from Canadian businesses we've helped transform their HR operations." />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Client Success Stories</h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Discover how we've helped Canadian businesses across industries achieve their HR goals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Clients Served</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Employees Supported</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-3 gap-0">
                      {/* Left Column - Company Info */}
                      <div className="bg-muted p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{study.company}</h3>
                            <p className="text-sm text-muted-foreground">{study.industry}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                          <Users className="w-4 h-4" />
                          <span>{study.size}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {study.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Right Column - Details */}
                      <div className="lg:col-span-2 p-8">
                        <div className="space-y-6">
                          {/* Challenge */}
                          <div>
                            <h4 className="font-bold text-sm text-muted-foreground uppercase mb-2">Challenge</h4>
                            <p className="text-foreground">{study.challenge}</p>
                          </div>

                          {/* Solution */}
                          <div>
                            <h4 className="font-bold text-sm text-muted-foreground uppercase mb-2">Solution</h4>
                            <p className="text-foreground">{study.solution}</p>
                          </div>

                          {/* Results */}
                          <div>
                            <h4 className="font-bold text-sm text-muted-foreground uppercase mb-3">Results</h4>
                            <div className="grid md:grid-cols-3 gap-4">
                              {study.results.map((result, idx) => (
                                <div key={idx} className="text-center p-4 rounded-lg bg-muted">
                                  <div className="text-3xl font-bold text-primary mb-1">{result.metric}</div>
                                  <div className="text-xs text-muted-foreground">{result.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Testimonial */}
                          <div className="border-l-4 border-primary pl-4 py-2">
                            <p className="text-foreground italic mb-3">"{study.testimonial.quote}"</p>
                            <p className="text-sm font-medium">
                              {study.testimonial.author}, {study.testimonial.title}
                            </p>
                          </div>
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

      {/* Industries Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've successfully partnered with organizations across diverse sectors
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Briefcase className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-1">{industry.name}</h3>
                    <p className="text-sm text-muted-foreground">{industry.count} clients</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Let's discuss how we can help your organization achieve similar results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/services">Explore Our Services</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/contact">Get Free HR Assessment</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
