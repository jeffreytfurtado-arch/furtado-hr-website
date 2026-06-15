import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { ArticleSchema, BreadcrumbSchema } from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { getPostById, blogPosts } from '@/data/blog-data';
import { AUTHOR_BIO } from '@/data/author';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostById(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const currentIndex = sortedPosts.findIndex((p) => p.id === post.id);
  const nextPost = sortedPosts[currentIndex + 1];
  const prevPost = sortedPosts[currentIndex - 1];

  const postUrl = `https://www.precisehr.ca/blog/${post.id}`;

  return (
    <div className="min-h-screen bg-background">
      <SEO title={post.title} description={post.excerpt} path={`/blog/${post.id}`} />
      <ArticleSchema post={post} url={postUrl} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.precisehr.ca/' },
          { name: 'Blog', url: 'https://www.precisehr.ca/blog' },
          { name: post.title, url: postUrl },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <Badge className="mb-4 bg-white/10 text-white border-white/20">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author.includes('Jeffrey') ? (
                  <Link to="/about/jeffrey-furtado" className="underline-offset-2 hover:underline hover:text-white">{post.author}</Link>
                ) : post.author}
                {' · '}{post.authorRole}
              </span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{post.date}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.p {...fadeUp} className="text-lg text-muted-foreground mb-8 italic border-l-4 border-primary pl-4">
              {post.excerpt}
            </motion.p>

            {post.sections.map((section, i) => (
              <motion.div key={i} {...fadeUp} className="mb-10">
                <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{section.content}</p>
                {section.bullets && (
                  <ul className="space-y-2 ml-1">
                    {section.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}

            {/* CTA */}
            <motion.div {...fadeUp} className="bg-primary/5 border border-primary/20 rounded-lg p-8 my-12 text-center">
              <p className="text-lg font-semibold mb-2">Need Help?</p>
              <p className="text-muted-foreground mb-6">{post.cta}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/contact">
                  <Button>
                    Get Free Assessment <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <a href="tel:+14378872263">
                  <Button variant="outline">
                    <Phone className="mr-2 w-4 h-4" /> (437) 887-2263
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Related tools (internal linking) */}
            <motion.div {...fadeUp} className="my-12">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Explore PreciseHR tools</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: 'ROI Calculator', to: '/roi-calculator', desc: 'Estimate the value of outsourced HR' },
                  { label: 'HR Health Check', to: '/hr-assessment', desc: 'Score your HR compliance in minutes' },
                  { label: 'Salary Benchmarking', to: '/salary-benchmarking', desc: 'Compare pay by role and province' },
                  { label: 'Net Pay Calculator', to: '/net-pay-calculator', desc: 'CPP, EI, and tax take-home by province' },
                ].map((t) => (
                  <Link key={t.to} to={t.to} className="group flex items-center justify-between gap-3 p-4 rounded-lg border hover:border-primary hover:shadow-sm transition-all">
                    <span>
                      <span className="block font-medium group-hover:text-primary transition-colors">{t.label}</span>
                      <span className="block text-xs text-muted-foreground">{t.desc}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* About the author */}
            {post.author.includes('Jeffrey') && (
              <motion.div {...fadeUp} className="mt-12 p-6 rounded-xl border bg-muted/40">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">About the author</p>
                <p className="font-bold">{post.author}</p>
                {post.authorRole && <p className="text-sm text-muted-foreground mb-3">{post.authorRole}</p>}
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{AUTHOR_BIO}</p>
                <Link to="/about/jeffrey-furtado" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  More about Jeffrey <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}

            {/* Nav between posts */}
            <div className="flex justify-between items-center pt-8 border-t">
              {prevPost ? (
                <Link to={`/blog/${prevPost.id}`} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="hidden sm:inline">{prevPost.title.length > 40 ? prevPost.title.slice(0, 40) + '...' : prevPost.title}</span>
                  <span className="sm:hidden">Previous</span>
                </Link>
              ) : <div />}
              {nextPost ? (
                <Link to={`/blog/${nextPost.id}`} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <span className="hidden sm:inline">{nextPost.title.length > 40 ? nextPost.title.slice(0, 40) + '...' : nextPost.title}</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : <div />}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
