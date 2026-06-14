import { useState } from 'react';
import { track } from '@/lib/track';
import { motion } from 'motion/react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'inline';
  showBenefits?: boolean;
}

export function NewsletterSignup({ variant = 'default', showBenefits = true }: NewsletterSignupProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      track('newsletter_signup');
      setIsSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', company: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      title: 'Monthly Insights',
      description: 'Expert articles on HR trends, best practices, and industry news'
    },
    {
      title: 'Compliance Updates',
      description: 'Stay ahead of changing employment laws and regulations'
    },
    {
      title: 'Exclusive Resources',
      description: 'Free templates, checklists, and guides for HR success'
    }
  ];

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-xl border bg-card/50 p-5"
      >
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 justify-center py-1"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium">You're subscribed! Check your email for a welcome message.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold whitespace-nowrap">Stay Informed</span>
            </div>
            <div className="flex flex-1 gap-2 items-center">
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                disabled={isSubmitting}
                className="h-9 text-sm"
              />
              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                disabled={isSubmitting}
                className="h-9 text-sm"
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isSubmitting}
                className="h-9 text-sm"
              />
              <Button type="submit" size="sm" disabled={isSubmitting} className="h-9 px-5 flex-shrink-0">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
              </Button>
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
          </form>
        )}
      </motion.div>
    );
  }

  if (variant === 'inline') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary/15 via-accent/10 to-primary/5 border-2 border-primary/30 rounded-xl p-6 shadow-lg relative overflow-hidden"
      >
        {/* Animated background accent */}
        <motion.div
          animate={{ 
            x: ['-100%', '100%']
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-2" />
            <h3 className="font-bold mb-1">You're Subscribed!</h3>
            <p className="text-sm text-muted-foreground">Check your email for a welcome message.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 relative z-10">
            <Input
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              disabled={isSubmitting}
              className="md:w-1/4"
            />
            <Input
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              disabled={isSubmitting}
              className="md:w-1/4"
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isSubmitting}
              className="md:flex-1"
            />
            <Button type="submit" disabled={isSubmitting} className="md:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
          </form>
        )}
        {error && <p className="text-sm text-red-600 mt-2 relative z-10">{error}</p>}
      </motion.div>
    );
  }

  // Default variant - full featured
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="overflow-hidden border-2 border-primary/20 shadow-2xl relative">
          {/* Decorative gradient orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
          
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
            {/* Form Section */}
            <div className="p-8 bg-gradient-to-br from-primary/10 via-background to-accent/5 relative">
              {/* Floating accent circle */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full opacity-20 blur-xl"
              />
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">You're Subscribed!</h3>
                  <p className="text-muted-foreground mb-4">
                    Check your email for a welcome message with your first insights.
                  </p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline">
                    Subscribe Another Email
                  </Button>
                </motion.div>
              ) : (
                <>
                  <motion.div 
                    className="flex items-center gap-3 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div 
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Mail className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Stay Informed</h3>
                      <p className="text-sm text-muted-foreground">on HR Best Practices</p>
                    </div>
                  </motion.div>
                  <p className="text-muted-foreground mb-6">
                    Get monthly insights, compliance updates, and expert tips delivered to your inbox.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">First Name</label>
                        <Input
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Last Name</label>
                        <Input
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email Address</label>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Company Name (Optional)</label>
                      <Input
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        disabled={isSubmitting}
                      />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        'Subscribe to Newsletter'
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      We respect your privacy. Unsubscribe anytime. No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Benefits Section */}
            {showBenefits && (
              <div className="p-8 bg-gradient-to-br from-muted/50 to-primary/5 relative">
                {/* Floating decoration */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute bottom-4 right-4 w-32 h-32 bg-accent rounded-full blur-2xl"
                />
                <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
                  What You'll Receive
                </h4>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <div>
                        <h5 className="font-semibold mb-1">{benefit.title}</h5>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
