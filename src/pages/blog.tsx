import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { 
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Users,
  BookOpen,
  FileText
} from 'lucide-react';

export default function BlogPage() {
  const featuredPost = {
    title: 'The Future of HR: Trends Shaping Canadian Workplaces in 2026',
    excerpt: 'From AI-powered recruitment to hybrid work evolution, discover the key trends transforming HR practices across Canada and how to prepare your organization for success.',
    author: 'Jennifer T.',
    date: 'February 5, 2026',
    readTime: '8 min read',
    category: 'HR Trends',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop'
  };

  const blogPosts = [
    {
      title: 'Navigating Canadian Employment Standards: A 2026 Update',
      excerpt: 'Stay compliant with the latest changes to federal and provincial employment standards. Learn what is new and how it affects your business.',
      author: 'Michael R.',
      date: 'January 28, 2026',
      readTime: '6 min read',
      category: 'Compliance',
    },
    {
      title: 'Building a Strong Company Culture in Remote and Hybrid Teams',
      excerpt: 'Practical strategies for maintaining engagement, collaboration, and company values when your team is distributed across locations.',
      author: 'Sarah K.',
      date: 'January 22, 2026',
      readTime: '7 min read',
      category: 'Culture',
    },
    {
      title: 'Performance Management Best Practices for 2026',
      excerpt: 'Move beyond annual reviews with continuous feedback, goal alignment, and development-focused conversations that drive results.',
      author: 'David L.',
      date: 'January 15, 2026',
      readTime: '5 min read',
      category: 'Performance',
    },
    {
      title: 'Effective Recruitment Strategies for Competitive Markets',
      excerpt: 'Attract top talent with employer branding, streamlined processes, and candidate experience optimization techniques.',
      author: 'Amanda P.',
      date: 'January 8, 2026',
      readTime: '6 min read',
      category: 'Recruitment',
    },
    {
      title: 'Employee Retention: Why People Leave and How to Keep Them',
      excerpt: 'Understand the real reasons behind turnover and implement proven strategies to retain your best employees.',
      author: 'Robert M.',
      date: 'December 18, 2025',
      readTime: '7 min read',
      category: 'Retention',
    },
    {
      title: 'Diversity, Equity & Inclusion: From Policy to Practice',
      excerpt: 'Transform DEI initiatives from checkbox exercises into meaningful programs that create lasting organizational change.',
      author: 'Jennifer T.',
      date: 'December 11, 2025',
      readTime: '8 min read',
      category: 'DEI',
    },
    {
      title: 'HR Technology Stack: Essential Tools for Modern HR Teams',
      excerpt: 'Build an efficient HR tech stack with HRIS, ATS, performance management, and analytics tools that integrate seamlessly.',
      author: 'Michael R.',
      date: 'December 4, 2025',
      readTime: '6 min read',
      category: 'Technology',
    },
    {
      title: 'Managing Workplace Conflict: A Practical Guide',
      excerpt: 'Address conflicts early with proven resolution techniques, mediation strategies, and communication frameworks.',
      author: 'Sarah K.',
      date: 'November 27, 2025',
      readTime: '5 min read',
      category: 'Employee Relations',
    },
    {
      title: 'Compensation Planning: Balancing Budget and Competitiveness',
      excerpt: 'Design compensation strategies that attract talent, reward performance, and align with your financial constraints.',
      author: 'David L.',
      date: 'November 20, 2025',
      readTime: '7 min read',
      category: 'Compensation',
    },
  ];

  const categories = [
    { name: 'All Posts', count: 45 },
    { name: 'HR Trends', count: 12 },
    { name: 'Compliance', count: 8 },
    { name: 'Recruitment', count: 7 },
    { name: 'Performance', count: 6 },
    { name: 'Culture', count: 5 },
    { name: 'Technology', count: 4 },
    { name: 'DEI', count: 3 },
  ];

  return (
    <div className="flex flex-col">
      <title>HR Blog - PreciseHR</title>
      <meta name="description" content="Expert insights, best practices, and trends in HR management for Canadian businesses." />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">HR Insights & Resources</h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Expert advice, industry trends, and practical tips to help you excel in HR management
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid lg:grid-cols-2 gap-0">
                <div 
                  className="h-64 lg:h-auto bg-cover bg-center"
                  style={{ backgroundImage: `url(${featuredPost.image})` }}
                />
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge className="w-fit mb-4">{featuredPost.category}</Badge>
                  <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">By {featuredPost.author}</span>
                    <Button>
                      Read Article <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center justify-between group"
                      >
                        <span className="text-sm group-hover:text-primary transition-colors">
                          {category.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">Stay Updated</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest HR insights delivered to your inbox
                  </p>
                  <Button className="w-full" variant="outline">
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content - Blog Posts */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow group cursor-pointer">
                      <CardContent className="pt-6">
                        <Badge className="mb-3" variant="secondary">{post.category}</Badge>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <span className="text-xs font-medium">By {post.author}</span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-12 text-center">
                <Button size="lg" variant="outline">
                  Load More Articles
                </Button>
              </div>
            </div>
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
              Need Expert HR Guidance?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Our team is ready to help you implement these strategies in your organization
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
