import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  Sparkles,
  Loader2,
  Copy,
  Check,
  Download,
  RefreshCw,
  Briefcase,
  MapPin,
  Building2,
  BarChart3,
  Clock,
  Phone,
  Zap,
  Bot,
  FileText,
  CheckCircle2,
  Users,
  Shield,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.2, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const staggerChild = (delay: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay },
});

/* ── Multi-stage loading animation for JD Generator ── */
function JDLoadingAnimation({ jobTitle, industry }: { jobTitle: string; industry: string }) {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { icon: Building2, label: `Analyzing ${industry} role requirements` },
    { icon: Shield, label: 'Applying Canadian employment standards' },
    { icon: Users, label: 'Crafting responsibilities & qualifications' },
    { icon: Sparkles, label: 'Writing your job description' },
  ];

  useEffect(() => {
    const totalDuration = 12000;
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / totalDuration) * 100, 95));
    }, 100);

    const stepDurations = [2500, 3000, 3500, 3000];
    let currentStep = 0;
    let stepTimeout: ReturnType<typeof setTimeout>;
    const advanceStep = () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        setActiveStep(currentStep);
        stepTimeout = setTimeout(advanceStep, stepDurations[currentStep]);
      }
    };
    stepTimeout = setTimeout(advanceStep, stepDurations[0]);

    return () => { clearInterval(progressInterval); clearTimeout(stepTimeout); };
  }, []);

  return (
    <div className="rounded-2xl border bg-card overflow-hidden min-h-[400px] flex flex-col">
      <div className="h-1 bg-muted">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-cyan-500 to-primary"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'linear' }}
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="relative mb-6">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-2xl bg-primary/20"
          />
          <div className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <FileText className="w-7 h-7 text-primary" />
            </motion.div>
          </div>
        </div>

        <h3 className="text-lg font-bold mb-1">Generating: {jobTitle}</h3>
        <p className="text-xs text-muted-foreground mb-6">{industry}</p>

        <div className="space-y-2 w-full max-w-xs">
          {steps.map((step, i) => {
            const Icon = step.icon;
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
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-all duration-500 ${
                  isComplete ? 'bg-green-100 dark:bg-green-950' : isActive ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  {isComplete ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  ) : isActive ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}>
                      <Loader2 className="w-3.5 h-3.5 text-primary" />
                    </motion.div>
                  ) : (
                    <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </div>
                <span className={`text-xs ${isActive ? 'font-medium' : isComplete ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <p className="text-[10px] text-muted-foreground mt-4">{Math.round(progress)}% complete</p>
      </div>
    </div>
  );
}

export default function JDGeneratorPage() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    industry: '',
    employmentType: 'Full-time',
    location: '',
    seniorityLevel: 'Mid-level',
    keyResponsibilities: '',
  });
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jobTitle || !formData.industry) return;

    setIsGenerating(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('/api/generate-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate');
      }

      setResult(data.jobDescription);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.jobTitle.replace(/\s+/g, '-').toLowerCase()}-job-description.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setResult('');
    setFormData({
      jobTitle: '',
      industry: '',
      employmentType: 'Full-time',
      location: '',
      seniorityLevel: 'Mid-level',
      keyResponsibilities: '',
    });
  };

  const industries = [
    'Technology', 'Healthcare', 'Financial Services', 'Manufacturing',
    'Retail', 'Professional Services', 'Construction', 'Education',
    'Non-Profit', 'Government', 'Hospitality', 'Other',
  ];

  const seniorityLevels = ['Entry-level', 'Junior', 'Mid-level', 'Senior', 'Lead', 'Manager', 'Director', 'VP', 'C-Suite'];
  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];

  return (
    <div className="flex flex-col">
      <SEO title="Free Job Description Generator" description="Generate professional, Canadian-compliant job descriptions in seconds. Enter the role and industry — our system does the rest." path="/jd-generator" />
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
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              Intelligent HR Tool — Free to Use
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Job Description
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">Generator</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Generate a professional, Canadian-compliant job description in seconds. Just tell us the role — our intelligent system handles the rest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Generator Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8">

              {/* Form — left side */}
              <motion.div {...fadeUp} className="md:col-span-2">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <h2 className="font-bold">Role Details</h2>
                    </div>

                    <form onSubmit={handleGenerate} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Job Title *</label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="e.g. Marketing Manager"
                            value={formData.jobTitle}
                            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                            required
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Industry *</label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <select
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            required
                            className="w-full h-10 pl-10 pr-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Select industry</option>
                            {industries.map((ind) => (
                              <option key={ind} value={ind}>{ind}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Type</label>
                          <select
                            value={formData.employmentType}
                            onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                            className="w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            {employmentTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Level</label>
                          <select
                            value={formData.seniorityLevel}
                            onChange={(e) => setFormData({ ...formData, seniorityLevel: e.target.value })}
                            className="w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            {seniorityLevels.map((level) => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="e.g. Toronto, ON"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Key Focus Areas <span className="text-muted-foreground font-normal">(optional)</span></label>
                        <textarea
                          placeholder="e.g. social media strategy, team leadership, budget management"
                          value={formData.keyResponsibilities}
                          onChange={(e) => setFormData({ ...formData, keyResponsibilities: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        />
                      </div>

                      {error && (
                        <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg">{error}</p>
                      )}

                      <Button type="submit" className="w-full" size="lg" disabled={isGenerating || !formData.jobTitle || !formData.industry}>
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Job Description
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Result — right side */}
              <motion.div {...staggerChild(0.1)} className="md:col-span-3" ref={resultRef}>
                {!result && !isGenerating ? (
                  <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Your job description will appear here</h3>
                    <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                      Fill in the role details and click generate. You'll get a professional, Canadian-compliant job description in seconds.
                    </p>
                  </div>
                ) : isGenerating ? (
                  <JDLoadingAnimation jobTitle={formData.jobTitle} industry={formData.industry} />
                ) : (
                  <Card className="overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b bg-muted/30">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-sm">Generated Job Description</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 text-xs">
                          {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                          {copied ? 'Copied' : 'Copy'}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleDownload} className="h-8 text-xs">
                          <Download className="w-3.5 h-3.5 mr-1" />
                          Download
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 text-xs">
                          <RefreshCw className="w-3.5 h-3.5 mr-1" />
                          New
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap leading-relaxed text-sm">
                        {result}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-3xl font-bold mb-4">Intelligent document generation</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              This tool is a taste of what PreciseHR's intelligent platform can do — from job descriptions to policies, contracts, and compliance documents.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Briefcase, title: 'You provide the role', desc: 'Tell us the job title, industry, and any specific requirements.' },
              { icon: Zap, title: 'We do the work', desc: 'Our system generates a tailored, Canadian-compliant job description instantly.' },
              { icon: FileText, title: 'You use it immediately', desc: 'Copy, download, and post — or refine it further with our consulting team.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} {...staggerChild(i * 0.1)}>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp} className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Like what you see?
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              This is just one of the intelligent tools built into the PreciseHR platform. Imagine this for policies, contracts, compliance documents, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto font-semibold">
                  Get Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+14378872263">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                  <Phone className="mr-2 w-4 h-4" />
                  (437) 887-2263
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
