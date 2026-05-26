import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  BookOpen, 
  CheckCircle2,
  Users,
  Scale,
  TrendingUp,
  Shield,
  Calendar,
  Award
} from 'lucide-react';

export default function ResourcesPage() {
  const categories = [
    {
      title: 'Compliance & Legal',
      icon: Scale,
      color: 'text-blue-600',
      resources: [
        { name: 'Canadian Employment Standards Guide 2026', type: 'PDF', size: '2.4 MB' },
        { name: 'Provincial Labour Law Comparison Chart', type: 'PDF', size: '1.8 MB' },
        { name: 'Workplace Safety Compliance Checklist', type: 'PDF', size: '890 KB' },
        { name: 'PIPEDA Privacy Requirements for HR', type: 'PDF', size: '1.2 MB' },
      ]
    },
    {
      title: 'HR Templates & Tools',
      icon: FileText,
      color: 'text-green-600',
      resources: [
        { name: 'Employee Handbook Template', type: 'DOCX', size: '450 KB' },
        { name: 'Performance Review Form', type: 'DOCX', size: '280 KB' },
        { name: 'Job Description Templates (10 Roles)', type: 'ZIP', size: '1.5 MB' },
        { name: 'Onboarding Checklist', type: 'XLSX', size: '320 KB' },
      ]
    },
    {
      title: 'Best Practices Guides',
      icon: BookOpen,
      color: 'text-purple-600',
      resources: [
        { name: 'Remote Work Policy Best Practices', type: 'PDF', size: '1.1 MB' },
        { name: 'Diversity & Inclusion Implementation Guide', type: 'PDF', size: '2.0 MB' },
        { name: 'Employee Retention Strategies', type: 'PDF', size: '1.6 MB' },
        { name: 'Conflict Resolution Framework', type: 'PDF', size: '950 KB' },
      ]
    },
    {
      title: 'Training Materials',
      icon: Award,
      color: 'text-orange-600',
      resources: [
        { name: 'Manager Training: Performance Management', type: 'PDF', size: '3.2 MB' },
        { name: 'Workplace Harassment Prevention Guide', type: 'PDF', size: '1.4 MB' },
        { name: 'New Employee Orientation Deck', type: 'PPTX', size: '5.8 MB' },
        { name: 'Leadership Development Workbook', type: 'PDF', size: '2.1 MB' },
      ]
    },
  ];

  const webinars = [
    {
      title: 'Navigating Canadian Employment Law Changes in 2026',
      date: 'March 15, 2026',
      duration: '60 min',
      status: 'Upcoming'
    },
    {
      title: 'Building High-Performance Teams',
      date: 'February 28, 2026',
      duration: '45 min',
      status: 'Upcoming'
    },
    {
      title: 'Effective Performance Management Strategies',
      date: 'January 20, 2026',
      duration: '60 min',
      status: 'Recording Available'
    },
    {
      title: 'HR Technology Trends for 2026',
      date: 'December 10, 2025',
      duration: '50 min',
      status: 'Recording Available'
    },
  ];

  return (
    <div className="flex flex-col">
      <title>HR Resources - PreciseHR</title>
      <meta name="description" content="Free HR resources, templates, guides, and webinars for Canadian businesses." />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">HR Resources</h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Free templates, guides, and tools to help you manage your HR operations effectively
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${category.color}`}>
                        <category.icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-2xl">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.resources.map((resource, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 rounded-lg border hover:border-primary transition-colors group cursor-pointer"
                        >
                          <FileText className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                              {resource.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {resource.type} • {resource.size}
                            </p>
                          </div>
                          <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Webinars</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our expert-led webinars to stay updated on HR trends and best practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {webinars.map((webinar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        webinar.status === 'Upcoming' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {webinar.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{webinar.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>{webinar.date}</span>
                      <span>•</span>
                      <span>{webinar.duration}</span>
                    </div>
                    <Button 
                      className="w-full" 
                      variant={webinar.status === 'Upcoming' ? 'default' : 'outline'}
                    >
                      {webinar.status === 'Upcoming' ? 'Register Now' : 'Watch Recording'}
                    </Button>
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
              Need Personalized HR Support?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Our team of HR experts is ready to help you tackle your specific challenges
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
