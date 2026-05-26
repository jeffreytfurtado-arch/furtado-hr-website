import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { 
  Shield, 
  Users, 
  FileText, 
  TrendingUp, 
  ArrowRight,
  CheckCircle2,
  Star,
  Briefcase,
  UserCheck,
  Award,
  DollarSign,
  Laptop,
  Search,
  UserX,
  ClipboardCheck,
  Target,
  Rocket
} from 'lucide-react';
import { motion } from 'motion/react';

export default function HomePage() {
  const stats = [
    { value: '500+', label: 'Clients Served' },
    { value: '15+', label: 'Years Experience' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support Available' },
  ];

  const services = [
    {
      icon: Laptop,
      title: 'HR Software Platform',
      description: 'All-in-one HR management software to streamline your operations and automate tasks.',
      features: [
        'Employee profiles & data repository',
        'Document management & storage',
        'Vacation & sick day tracking',
        'Attendance monitoring',
        'Policy document uploads',
        'Legally compliant HR reports'
      ],
      link: '/client-portal',
      hasButton: true
    },
    {
      icon: Briefcase,
      title: 'HR Consulting & Strategy',
      description: 'Strategic HR guidance to align your people practices with business objectives.',
      features: [
        'HR strategy development',
        'Organizational design',
        'Change management',
        'HR policy development',
        'Workforce planning',
        'HR audits & assessments'
      ],
      link: '/services'
    },
    {
      icon: UserCheck,
      title: 'Recruitment & Talent Acquisition',
      description: 'Find and attract the right talent to build high-performing teams.',
      features: [
        'Executive search',
        'Full-cycle recruitment',
        'Candidate screening',
        'Interview coordination',
        'Employer branding',
        'Onboarding programs'
      ],
      link: '/services'
    },
    {
      icon: Shield,
      title: 'Compliance & Risk Management',
      description: 'Navigate Canadian employment law and mitigate workplace risks.',
      features: [
        'Employment law compliance',
        'Policy & handbook creation',
        'Workplace investigations',
        'Health & safety programs',
        'Regulatory updates',
        'Risk assessments'
      ],
      link: '/services'
    },
    {
      icon: TrendingUp,
      title: 'Performance Management',
      description: 'Drive employee performance and organizational success.',
      features: [
        'Performance review systems',
        'Goal setting frameworks',
        '360-degree feedback',
        'Performance improvement plans',
        'Succession planning',
        'Career development'
      ],
      link: '/services'
    },
    {
      icon: Award,
      title: 'Training & Development',
      description: 'Invest in your team\'s growth with customized learning programs.',
      features: [
        'Leadership development',
        'Management training',
        'Skills workshops',
        'Coaching & mentoring',
        'Team building',
        'Diversity & inclusion training'
      ],
      link: '/services'
    },
    {
      icon: DollarSign,
      title: 'Compensation & Benefits',
      description: 'Design competitive compensation packages to attract and retain talent.',
      features: [
        'Salary benchmarking',
        'Compensation structure design',
        'Benefits program design',
        'Total rewards strategy',
        'Job evaluation',
        'Incentive programs'
      ],
      link: '/services'
    },
    {
      icon: FileText,
      title: 'HR Documentation',
      description: 'Professional documentation and policy management.',
      features: [
        'Employee handbooks',
        'Job descriptions',
        'Employment contracts',
        'Policy templates',
        'Forms & checklists',
        'HR process documentation'
      ],
      link: '/services'
    },
    {
      icon: Users,
      title: 'Employee Relations',
      description: 'Foster positive workplace culture and resolve employee issues.',
      features: [
        'Conflict resolution',
        'Mediation services',
        'Disciplinary processes',
        'Employee engagement',
        'Culture development',
        'Workplace communication'
      ],
      link: '/services'
    },
    {
      icon: Search,
      title: 'Workplace Investigations',
      description: 'Fully compliant, non-biased third-party investigations for workplace violence, harassment, and employee complaints with comprehensive reports.',
      features: [
        'Harassment investigations',
        'Workplace violence assessments',
        'Employee complaint resolution',
        'Third-party neutral investigations',
        'Comprehensive investigation reports',
        'Legal compliance documentation'
      ],
      link: '/services'
    },
    {
      icon: UserX,
      title: 'Termination Services',
      description: 'End-to-end termination support from planning to execution, including termination meetings, documentation, and compliance with Canadian employment laws.',
      features: [
        'Termination planning & strategy',
        'Termination meeting facilitation',
        'Severance package calculation',
        'Legal compliance review',
        'Documentation preparation',
        'Post-termination support'
      ],
      link: '/services'
    }
  ];

  const whyChooseUs = [
    {
      title: 'Canadian Expertise',
      description: 'Deep understanding of Canadian employment law, regulations, and best practices across all provinces.'
    },
    {
      title: 'Tailored Solutions',
      description: 'Customized HR strategies designed specifically for your industry, size, and organizational culture.'
    },
    {
      title: 'Responsive Support',
      description: '24/7 access to certified HR professionals who understand your business and respond when you need them.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      company: 'Technology',
      role: 'CEO',
      content: 'PreciseHR transformed our HR operations. Their software platform and consulting services helped us scale from 20 to 150 employees seamlessly.',
      rating: 5
    },
    {
      name: 'David C.',
      company: 'Manufacturing',
      role: 'Operations Director',
      content: 'The compliance support alone has saved us countless hours and potential legal issues. Their team is knowledgeable, responsive, and truly cares about our success.',
      rating: 5
    },
    {
      name: 'Jennifer T.',
      company: 'Retail',
      role: 'HR Manager',
      content: 'Best decision we made was partnering with PreciseHR. The software is intuitive, and their consulting team feels like an extension of our own HR department.',
      rating: 5
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('https://media.gettyimages.com/id/2229956035/photo/team-lunch-meeting-in-the-boardroom.jpg?b=1&s=2048x2048&w=0&k=20&c=shUfuIReGsFsMF5kX_LOkSZW-tuj2LCm95z7Vsh2wEI=')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Comprehensive HR Solutions for
              <br />
              <span className="text-accent">Canadian Businesses</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              From strategic consulting to powerful HR software, we provide everything you need 
              to build exceptional teams and maintain compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/hr-assessment">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Take Free HR Health Check
                  <ClipboardCheck className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white/30 text-white">
                  Schedule An Assessment
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive HR solutions tailored to your organization's needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/contact">
                        <Button className="w-full" size="sm">
                          Schedule an Assessment
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PreciseHR?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trusted by over 500 Canadian organizations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-semibold">How It Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple, proven approach to transforming your HR operations
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary to-transparent" />

              {[
                {
                  step: '01',
                  title: 'Free Assessment',
                  description: 'We start with a comprehensive analysis of your current HR practices, challenges, and goals. No obligation, no pressure - just expert insights into how we can help.',
                  icon: ClipboardCheck,
                  highlights: ['30-minute consultation', 'Identify pain points', 'Custom recommendations']
                },
                {
                  step: '02',
                  title: 'Custom Strategy',
                  description: 'Based on your assessment, we create a tailored HR solution plan. Choose the services you need - software, consulting, or both - with transparent pricing and clear deliverables.',
                  icon: Target,
                  highlights: ['Personalized roadmap', 'Flexible service options', 'Clear timeline & pricing']
                },
                {
                  step: '03',
                  title: 'Implementation',
                  description: 'Our team works alongside you to deploy systems, update policies, and train your staff. We handle the heavy lifting while keeping disruption to a minimum.',
                  icon: Rocket,
                  highlights: ['Seamless onboarding', 'Staff training included', 'Minimal disruption']
                },
                {
                  step: '04',
                  title: 'Ongoing Support',
                  description: 'HR doesn\'t stop after setup. We provide continuous guidance, software updates, compliance monitoring, and expert advice whenever you need it.',
                  icon: Users,
                  highlights: ['24/7 platform access', 'Expert advisors on-call', 'Regular compliance updates']
                }
              ].map((process, index) => {
                const Icon = process.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className="relative mb-12 md:mb-20 last:mb-0"
                  >
                    <div className={`md:flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Content */}
                      <div className="md:w-1/2">
                        <Card className="hover:shadow-xl transition-all border-2 hover:border-primary/50">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-8 h-8 text-primary" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-primary mb-1">Step {process.step}</div>
                                <h3 className="text-2xl font-bold">{process.title}</h3>
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-4">{process.description}</p>
                            <ul className="space-y-2">
                              {process.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Timeline dot */}
                      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg" />

                      {/* Spacer for other side */}
                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/contact">
                <Button size="lg">
                  Start Your Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from real businesses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-primary">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block px-6 py-2 bg-gradient-to-r from-primary to-accent rounded-full mb-4 shadow-lg"
            >
              <span className="text-white font-semibold text-sm">📬 Stay Connected</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Never Miss an Update
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our community of HR professionals and get exclusive insights delivered monthly
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            <NewsletterSignup variant="default" showBenefits={true} />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-semibold">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about our HR services
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: 'What size businesses do you work with?',
                answer: 'We work with businesses of all sizes, from startups with just a few employees to established companies with hundreds of staff members. Our services are scalable and customized to meet the unique needs of your organization, whether you\'re a small business looking for foundational HR support or a larger company needing comprehensive HR management.'
              },
              {
                question: 'How quickly can you get started?',
                answer: 'We can typically begin working with you within 1-2 business days of our initial consultation. For urgent matters like workplace investigations or terminations, we offer expedited onboarding. Our streamlined process ensures you get the HR support you need without unnecessary delays.'
              },
              {
                question: 'Do I need to use all your services or can I pick specific ones?',
                answer: 'You have complete flexibility to choose exactly the services you need. Many clients start with one or two core services and expand as their needs grow. Whether you need just our HR software platform, specific consulting services, or a comprehensive HR solution, we\'ll create a package that works for your business and budget.'
              },
              {
                question: 'What makes Precise HR different from other HR providers?',
                answer: 'We combine cutting-edge HR technology with personalized consulting services. Unlike providers that offer only software or only consulting, we provide both—giving you the tools to manage HR efficiently while having expert advisors available when you need strategic guidance. Plus, our deep expertise in Canadian employment law ensures you stay compliant.'
              },
              {
                question: 'How do you ensure compliance with changing regulations?',
                answer: 'Our team continuously monitors federal and provincial employment law changes across Canada. We proactively update our software, policies, and recommendations to reflect new regulations. You\'ll receive timely alerts about changes that affect your business, along with guidance on implementation. Our compliance audits help identify and address potential issues before they become problems.'
              },
              {
                question: 'What is your pricing structure?',
                answer: 'We offer transparent, flexible pricing based on your company size and selected services. Our HR software platform starts with affordable monthly subscriptions, while consulting services can be purchased as needed or through retainer packages. Contact us for a free assessment and customized quote—we\'ll create a solution that fits your budget.'
              },
              {
                question: 'Do you provide support for remote and hybrid workforces?',
                answer: 'Absolutely! Our cloud-based HR platform is designed for modern workplaces, whether your team is in-office, remote, or hybrid. We help you create policies, manage performance, and maintain compliance across distributed teams. Our training programs are available virtually, and our consultants are experienced in addressing the unique challenges of remote work.'
              },
              {
                question: 'What kind of support can I expect?',
                answer: 'You\'ll have access to our expert HR team via phone, email, and our client portal. Response times vary by service level, but we typically respond to inquiries within 24 hours. For urgent matters like workplace investigations or legal compliance issues, we offer priority support. Our software platform includes built-in help resources and live chat support.'
              },
              {
                question: 'Can you integrate with our existing systems?',
                answer: 'Our HR software platform integrates with many popular payroll, accounting, and business management systems. During onboarding, we\'ll assess your current technology stack and recommend the best integration approach. We can also work alongside your existing systems if you prefer to keep certain tools in place.'
              },
              {
                question: 'What if we need to cancel or change services?',
                answer: 'We offer flexible contracts with no long-term commitments for most services. You can adjust your service level or cancel with 30 days\' notice. Our goal is to earn your business every month through exceptional service, not lock you into rigid contracts. If your needs change, we\'ll work with you to find the right solution.'
              },
              {
                question: 'Do you handle workplace investigations?',
                answer: 'Yes, we provide fully compliant, non-biased third-party investigations for workplace violence, harassment, and employee complaints. Our investigators are trained professionals who conduct thorough, confidential investigations and provide comprehensive reports that meet legal standards. This protects both your employees and your organization.'
              },
              {
                question: 'Can you help with employee terminations?',
                answer: 'We offer end-to-end termination support, from planning and strategy to facilitating termination meetings and ensuring legal compliance. We help you calculate appropriate severance, prepare documentation, and navigate the process professionally and compassionately. Our guidance minimizes legal risk and maintains workplace morale.'
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-6 hover:border-primary/50 transition-colors">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="text-lg font-semibold pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Link to="/contact">
              <Button size="lg">
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your HR?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Join over 500 Canadian organizations that trust PreciseHR for their HR needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Free HR Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white/30 text-white">
                  Learn About Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
