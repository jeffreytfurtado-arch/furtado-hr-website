import { motion } from 'motion/react';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Mail, ArrowRight, Calendar } from 'lucide-react';

const APP_SIGNIN = 'https://app.precisehr.ca';
const CALENDLY = 'https://calendly.com/precisehr-info/precisehr-consult';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center">
      <SEO
        title="Welcome to PreciseHR"
        description="Your PreciseHR subscription is active. Check your email to set your password and sign in."
        path="/welcome"
      />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <Card className="border-primary/30">
            <CardContent className="p-8 sm:p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3">You&apos;re in — welcome to PreciseHR 🎉</h1>
              <p className="text-muted-foreground mb-6">
                Your subscription is active and we&apos;re setting up your workspace now.
              </p>

              <div className="rounded-lg border bg-muted/40 px-5 py-4 text-left flex items-start gap-3 mb-7">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Check your email.</strong> We&apos;ve sent a link to the
                  address you used at checkout — click it to set your password, then sign in. If it isn&apos;t
                  there in a few minutes, check spam or email{' '}
                  <a href="mailto:info@precisehr.ca" className="text-primary hover:underline">info@precisehr.ca</a>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={APP_SIGNIN}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Go to sign-in <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Calendar className="mr-2 w-4 h-4" /> Book your free consult
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
