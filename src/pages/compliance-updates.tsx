import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  Shield,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Filter,
  Clock,
  MapPin,
  ExternalLink,
  Phone,
  RefreshCw,
  Sparkles,
  XCircle,
  AlertCircle,
  Info,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const categories = [
  'All',
  'Employment Standards',
  'Health & Safety',
  'Human Rights',
  'Pay Equity',
  'Privacy',
  'Termination',
  'Benefits',
  'Workplace Safety',
  'Tax & Payroll',
  'Immigration',
  'Accessibility',
];

const provinces = [
  'All Provinces',
  'Federal',
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Quebec',
  'Saskatchewan',
];

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, { bg: string; icon: typeof AlertTriangle }> = {
    critical: { bg: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400', icon: XCircle },
    high: { bg: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400', icon: AlertTriangle },
    medium: { bg: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400', icon: AlertCircle },
    low: { bg: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400', icon: Info },
  };
  const style = styles[severity] || styles.medium;
  const Icon = style.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${style.bg}`}>
      <Icon className="w-3 h-3" />
      {severity}
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary">
      {category}
    </span>
  );
}

/* Loading animation */
function UpdatesLoadingAnimation() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { label: 'Scanning government sources' },
    { label: 'Checking HR news feeds' },
    { label: 'Analyzing regulatory changes' },
    { label: 'Summarizing updates' },
    { label: 'Categorizing by province' },
  ];

  useEffect(() => {
    const totalDuration = 18000;
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / totalDuration) * 100, 95));
    }, 100);

    const durations = [3000, 3500, 4000, 4000, 3500];
    let currentStep = 0;
    let stepTimeout: ReturnType<typeof setTimeout>;
    const advanceStep = () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        setActiveStep(currentStep);
        stepTimeout = setTimeout(advanceStep, durations[currentStep]);
      }
    };
    stepTimeout = setTimeout(advanceStep, durations[0]);

    return () => { clearInterval(progressInterval); clearTimeout(stepTimeout); };
  }, []);

  return (
    <Card className="overflow-hidden max-w-lg mx-auto">
      <div className="h-1 bg-muted">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-cyan-500 to-primary"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'linear' }}
        />
      </div>
      <CardContent className="p-8">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-2xl bg-primary/20"
            />
            <div className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <Bell className="w-7 h-7 text-primary" />
              </motion.div>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-bold text-center mb-1">Fetching latest updates</h3>
        <p className="text-xs text-muted-foreground text-center mb-6">Scanning Canadian HR & employment law sources</p>

        <div className="space-y-2">
          {steps.map((step, i) => {
            const isActive = i === activeStep;
            const isComplete = i < activeStep;
            const isPending = i > activeStep;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isPending ? 0.3 : 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-500 ${
                  isActive ? 'bg-primary/5 border border-primary/20' : 'border border-transparent'
                }`}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-all ${
                  isComplete ? 'bg-green-100 dark:bg-green-950' : isActive ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  {isComplete ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  ) : isActive ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}>
                      <Loader2 className="w-3.5 h-3.5 text-primary" />
                    </motion.div>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <span className={`text-xs ${isActive ? 'font-medium' : isComplete ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-4">{Math.round(progress)}% complete</p>
      </CardContent>
    </Card>
  );
}

export default function ComplianceUpdatesPage() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProvince, setSelectedProvince] = useState('All Provinces');

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/compliance-updates');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setUpdates(data.updates || []);
      setLastUpdated(data.lastUpdated || '');
    } catch (err: any) {
      setError(err.message || 'Failed to load updates');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUpdates = updates.filter((update) => {
    const categoryMatch = selectedCategory === 'All' || update.category === selectedCategory;
    const provinceMatch = selectedProvince === 'All Provinces' ||
      update.provinces?.includes(selectedProvince) ||
      update.provinces?.includes('All Provinces') ||
      update.provinces?.includes('Federal');
    return categoryMatch && provinceMatch;
  });

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm mb-6 backdrop-blur-sm">
              <Bell className="w-3.5 h-3.5 text-cyan-300" />
              Auto-Updated from Government & Industry Sources
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Canadian HR
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">Compliance Updates</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Employment law changes, regulatory updates, and compliance alerts — summarized in plain language so you know exactly what affects your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Loading */}
            {isLoading && (
              <div className="py-10">
                <UpdatesLoadingAnimation />
              </div>
            )}

            {/* Error */}
            {error && !isLoading && (
              <div className="text-center py-16">
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Unable to load updates</h3>
                <p className="text-muted-foreground text-sm mb-4">{error}</p>
                <Button onClick={fetchUpdates} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            )}

            {/* Filters + Feed */}
            {!isLoading && !error && (
              <>
                {/* Filter bar */}
                <motion.div {...fadeUp} className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8 pb-6 border-b">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Last updated: {lastUpdated || 'Today'}</span>
                    <span className="text-primary font-medium">{filteredUpdates.length} updates</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <div className="relative">
                      <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="h-9 pl-8 pr-3 rounded-lg border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <select
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        className="h-9 pl-8 pr-3 rounded-lg border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                </motion.div>

                {/* Updates feed */}
                <div className="space-y-4">
                  {filteredUpdates.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No updates match your filters. Try broadening your selection.</p>
                    </div>
                  ) : (
                    filteredUpdates.map((update, i) => (
                      <motion.div
                        key={update.id || i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                      >
                        <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${
                          update.severity === 'critical' ? 'border-l-4 border-l-red-500' :
                          update.severity === 'high' ? 'border-l-4 border-l-amber-500' :
                          update.severity === 'medium' ? 'border-l-4 border-l-blue-500' :
                          'border-l-4 border-l-gray-300 dark:border-l-gray-600'
                        }`}>
                          <CardContent className="p-5 md:p-6">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <SeverityBadge severity={update.severity} />
                              <CategoryBadge category={update.category} />
                              {update.provinces?.map((p: string, j: number) => (
                                <span key={j} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                  {p}
                                </span>
                              ))}
                            </div>

                            <h3 className="text-base font-bold mb-2 leading-snug">{update.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{update.summary}</p>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-3 border-t border-border/50">
                              <div className="flex items-start gap-2 flex-1">
                                <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span className="text-xs text-foreground"><strong>Action:</strong> {update.actionRequired}</span>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                                {update.effectiveDate && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {update.effectiveDate}
                                  </span>
                                )}
                                {update.sourceUrl && (
                                  <a href={update.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                                    <ExternalLink className="w-3 h-3" />
                                    Source
                                  </a>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Subscribe CTA */}
                <motion.div {...fadeUp} className="mt-12">
                  <Card className="bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white border-0 overflow-hidden">
                    <CardContent className="p-8 text-center">
                      <Bell className="w-8 h-8 mx-auto mb-4 text-cyan-300" />
                      <h3 className="text-xl font-bold mb-3">Get these updates in your inbox</h3>
                      <p className="text-white/80 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                        Subscribe to our newsletter and receive weekly compliance digests — so you never miss a change that affects your business.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/compliance-checker">
                          <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto font-semibold">
                            <Shield className="mr-2 w-5 h-5" />
                            Check Your Compliance
                          </Button>
                        </Link>
                        <Link to="/contact">
                          <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                            Get Free Assessment
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
