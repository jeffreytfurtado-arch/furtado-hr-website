import SEO from '@/components/SEO';
import { motion } from 'motion/react';
import { HRAssessmentQuiz } from '@/components/HRAssessmentQuiz';
import { ClipboardCheck, Target, TrendingUp } from 'lucide-react';

export default function HRAssessmentPage() {
  return (
    <div className="min-h-screen">
      <title>Free HR Assessment - PreciseHR</title>
      <meta name="description" content="Take our free HR assessment to evaluate your organization's HR practices and get personalized recommendations." />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/10 via-background to-background relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-full mb-6 shadow-lg"
            >
              <ClipboardCheck className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Free HR Health Check</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                How Healthy Are Your HR Practices?
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Take our 2-minute assessment to discover your HR strengths and areas for improvement. Get personalized recommendations based on your unique situation.
            </p>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Identify Gaps</h3>
                <p className="text-sm text-muted-foreground">
                  Discover blind spots in your HR operations before they become problems
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold mb-2">Get Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Receive a detailed score across 5 key HR categories
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <ClipboardCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Take Action</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized recommendations to improve your HR operations
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <HRAssessmentQuiz />
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-sm text-muted-foreground mb-4">
              ✓ No credit card required  •  ✓ Takes less than 2 minutes  •  ✓ Instant results
            </p>
            <p className="text-xs text-muted-foreground">
              Your information is confidential and will only be used to provide you with personalized recommendations.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
