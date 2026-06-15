import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { ArticleSchema, BreadcrumbSchema } from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { getArticleById, articles } from '@/data/articles-data';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function ArticlePostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getArticleById(slug) : undefined;

  if (!post) return <Navigate to="/articles" replace />;

  const currentIndex = articles.findIndex((p) => p.id === post.id);
  const nextPost = articles[currentIndex + 1];
  const prevPost = articles[currentIndex - 1];

  const postUrl = `https://www.precisehr.ca/articles/${post.id}`;
  const paragraphs = post.body.split('\n\n');

  return (
    <div className="min-h-screen bg-background">
      <SEO title={post.title} description={post.excerpt} path={`/articles/${post.id}`} />
      <ArticleSchema post={post} url={postUrl} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.precisehr.ca/' },
          { name: 'Articles', url: 'https://www.precisehr.ca/articles' },
          { name: post.title, url: postUrl },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <Link to="/articles" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Articles
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

            <motion.div {...fadeUp} className="space-y-6">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed text-foreground/90">
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Author */}
            <div className="mt-14 p-6 rounded-xl border bg-muted/40">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">About the author</p>
              <p className="font-bold">{post.author}</p>
              <p className="text-sm text-muted-foreground mb-3">{post.authorRole}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{post.authorBio}</p>
              <Link to="/about/jeffrey-furtado" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                More about Jeffrey <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Prev / Next */}
            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              {prevPost ? (
                <Link to={`/articles/${prevPost.id}`} className="group p-5 rounded-lg border hover:border-primary transition-colors">
                  <span className="text-xs text-muted-foreground">Newer</span>
                  <p className="font-medium group-hover:text-primary transition-colors line-clamp-2">{prevPost.title}</p>
                </Link>
              ) : <div className="hidden sm:block" />}
              {nextPost ? (
                <Link to={`/articles/${nextPost.id}`} className="group p-5 rounded-lg border hover:border-primary transition-colors sm:text-right">
                  <span className="text-xs text-muted-foreground">Older</span>
                  <p className="font-medium group-hover:text-primary transition-colors line-clamp-2">{nextPost.title}</p>
                </Link>
              ) : <div className="hidden sm:block" />}
            </div>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Work with PreciseHR</h2>
            <p className="text-white/80 mb-8">Practical help building teams, leading change, and doing the human side of growth well.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                  Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+14378872263">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold">
                  <Phone className="mr-2 w-5 h-5" /> (437) 887-2263
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
