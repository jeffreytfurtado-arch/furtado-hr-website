import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  Shield,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Phone,
  Building2,
  MapPin,
  Users,
  ChevronRight,
  Sparkles,
  RefreshCw,
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

/* Score ring component */
function ScoreRing({ score, riskLevel }: { score: number; riskLevel: string }) {
  const { ref, inView } = useInView();
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div ref={ref} className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" className="text-muted/20" strokeWidth="8" />
        <motion.circle
          cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {score}%
        </motion.span>
        <span className="text-xs text-muted-foreground font-medium">{riskLevel} Risk</span>
      </div>
    </div>
  );
}

/* Status icon */
function StatusIcon({ status }: { status: string }) {
  if (status === 'likely_compliant') return <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />;
  if (status === 'at_risk') return <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />;
  return <XCircle className="w-5 h-5 text-red-500 shrink-0" />;
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    critical: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
    high: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
    medium: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
    low: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  };
  return (
    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${styles[priority] || styles.medium}`}>
      {priority}
    </span>
  );
}

export default function ComplianceCheckerPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    province: '',
    companySize: '',
    industry: '',
    currentPractices: [] as string[],
  });
  const [result, setResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  const provinces = [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
    'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia',
    'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon',
    'Federal (federally regulated)',
  ];

  const companySizes = [
    '1-5 employees', '6-25 employees', '26-50 employees',
    '51-100 employees', '101-250 employees', '251-500 employees', '500+ employees',
  ];

  const industries = [
    'Technology', 'Healthcare', 'Financial Services', 'Manufacturing',
    'Retail', 'Professional Services', 'Construction', 'Education',
    'Non-Profit', 'Government', 'Hospitality', 'Transportation', 'Other',
  ];

  const practices = [
    { id: 'handbook', label: 'Employee handbook / policy manual' },
    { id: 'contracts', label: 'Written employment contracts' },
    { id: 'health_safety', label: 'Health & safety program / committee' },
    { id: 'harassment_policy', label: 'Workplace harassment & violence policy' },
    { id: 'privacy_policy', label: 'Employee privacy policy' },
    { id: 'termination_process', label: 'Documented termination procedures' },
    { id: 'pay_equity', label: 'Pay equity / compensation review' },
    { id: 'accessibility', label: 'Accessibility policies (AODA or equivalent)' },
    { id: 'training_records', label: 'Training records & compliance tracking' },
    { id: 'hr_software', label: 'HR management software' },
  ];

  const togglePractice = (id: string) => {
    setFormData(prev => ({
      ...prev,
      currentPractices: prev.currentPractices.includes(id)
        ? prev.currentPractices.filter(p => p !== id)
        : [...prev.currentPractices, id],
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');

    // Map practice IDs to readable labels
    const practiceLabels = formData.currentPractices.map(
      id => practices.find(p => p.id === id)?.label || id
    );

    try {
      const response = await fetch('/api/compliance-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          currentPractices: practiceLabels,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate');
      }

      setResult(data.result);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep(1);
    setFormData({ province: '', companySize: '', industry: '', currentPractices: [] });
  };

  const handleDownload = () => {
    if (!result) return;
    let text = `HR COMPLIANCE ASSESSMENT\n${'='.repeat(50)}\n\n`;
    text += `Overall Score: ${result.overallScore}% | Risk Level: ${result.riskLevel}\n\n`;
    text += `Summary: ${result.summary}\n\n`;
    text += `TOP RISKS\n${'-'.repeat(30)}\n`;
    result.topRisks?.forEach((r: string, i: number) => { text += `${i + 1}. ${r}\n`; });
    text += `\nCOMPLIANCE REQUIREMENTS\n${'-'.repeat(30)}\n`;
    result.requirements?.forEach((r: any) => {
      text += `\n[${r.status.toUpperCase()}] ${r.requirement} (${r.priority})\n`;
      text += `  Category: ${r.category}\n  ${r.description}\n  Action: ${r.detail}\n`;
    });
    text += `\nRECOMMENDED NEXT STEPS\n${'-'.repeat(30)}\n`;
    result.nextSteps?.forEach((s: string, i: number) => { text += `${i + 1}. ${s}\n`; });
    text += `\n\nGenerated by PreciseHR Compliance Checker — precisehr.ca\n`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance-assessment-${formData.province.toLowerCase().replace(/\s/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const canProceedStep1 = formData.province && formData.companySize && formData.industry;

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
              <Shield className="w-3.5 h-3.5 text-cyan-300" />
              Intelligent Compliance Tool — Free to Use
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              HR Compliance
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">Checker</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Find out where your business stands in 30 seconds. Get a personalized compliance assessment based on your province, size, and industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">

            {/* Step indicator */}
            {!result && !isGenerating && (
              <motion.div {...fadeUp} className="flex items-center justify-center gap-2 mb-10">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      step === s ? 'bg-primary text-white' : step > s ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                    }`}>
                      {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                    </div>
                    <span className={`text-sm font-medium hidden sm:inline ${step === s ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {s === 1 ? 'Company Info' : 'Current Practices'}
                    </span>
                    {s < 2 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </div>
                ))}
              </motion.div>
            )}

            {/* Step 1: Company Info */}
            {step === 1 && !result && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-6">Tell us about your business</h2>
                    <div className="space-y-5">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Province / Jurisdiction *</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <select
                            value={formData.province}
                            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                            className="w-full h-11 pl-10 pr-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Select province</option>
                            {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Company Size *</label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <select
                            value={formData.companySize}
                            onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                            className="w-full h-11 pl-10 pr-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Select size</option>
                            {companySizes.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Industry *</label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <select
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            className="w-full h-11 pl-10 pr-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Select industry</option>
                            {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                          </select>
                        </div>
                      </div>

                      <Button
                        onClick={() => setStep(2)}
                        disabled={!canProceedStep1}
                        className="w-full"
                        size="lg"
                      >
                        Next: Current Practices
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Current Practices */}
            {step === 2 && !result && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-2">What do you currently have in place?</h2>
                    <p className="text-sm text-muted-foreground mb-6">Select all that apply. Don't worry if you're unsure — that's what this tool is for.</p>

                    <div className="grid gap-3 mb-6">
                      {practices.map((practice) => {
                        const isSelected = formData.currentPractices.includes(practice.id);
                        return (
                          <button
                            key={practice.id}
                            onClick={() => togglePractice(practice.id)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/5 text-foreground'
                                : 'border-border hover:border-primary/30 text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                              isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                            }`}>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                            </div>
                            {practice.label}
                          </button>
                        );
                      })}
                    </div>

                    {error && (
                      <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg mb-4">{error}</p>
                    )}

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-shrink-0">
                        Back
                      </Button>
                      <Button onClick={handleGenerate} className="flex-1" size="lg">
                        <Shield className="w-4 h-4 mr-2" />
                        Run Compliance Check
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Loading state */}
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                >
                  <Shield className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">Running your compliance check...</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
                  Analyzing {formData.province} employment law requirements for a {formData.companySize} {formData.industry.toLowerCase()} company. This takes about 15 seconds.
                </p>
              </motion.div>
            )}

            {/* Results */}
            {result && (
              <motion.div
                ref={resultRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Score header */}
                <Card className="overflow-hidden">
                  <div className={`h-1.5 ${
                    result.overallScore >= 70 ? 'bg-green-500' : result.overallScore >= 40 ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  <CardContent className="p-6 md:p-8">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                      <div className="md:col-span-1">
                        <ScoreRing score={result.overallScore} riskLevel={result.riskLevel} />
                      </div>
                      <div className="md:col-span-2">
                        <h2 className="text-xl font-bold mb-3">Your Compliance Assessment</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{result.summary}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span>{result.requirements?.filter((r: any) => r.status === 'missing').length || 0} Missing</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                            <span>{result.requirements?.filter((r: any) => r.status === 'at_risk').length || 0} At Risk</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>{result.requirements?.filter((r: any) => r.status === 'likely_compliant').length || 0} Compliant</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top risks */}
                {result.topRisks && result.topRisks.length > 0 && (
                  <Card className="border-red-200 dark:border-red-900/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <h3 className="font-bold">Top Risks</h3>
                      </div>
                      <div className="space-y-3">
                        {result.topRisks.map((risk: string, i: number) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="flex items-start gap-3 text-sm"
                          >
                            <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-red-600 dark:text-red-400">{i + 1}</span>
                            </div>
                            <span className="text-muted-foreground">{risk}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Requirements list */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4">Detailed Requirements</h3>
                    <div className="space-y-3">
                      {result.requirements?.sort((a: any, b: any) => {
                        const order: Record<string, number> = { missing: 0, at_risk: 1, likely_compliant: 2 };
                        return (order[a.status] ?? 2) - (order[b.status] ?? 2);
                      }).map((req: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className={`p-4 rounded-xl border transition-all ${
                            req.status === 'missing' ? 'bg-red-50/50 border-red-200 dark:bg-red-950/10 dark:border-red-900/30' :
                            req.status === 'at_risk' ? 'bg-amber-50/50 border-amber-200 dark:bg-amber-950/10 dark:border-amber-900/30' :
                            'bg-green-50/50 border-green-200 dark:bg-green-950/10 dark:border-green-900/30'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <StatusIcon status={req.status} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-semibold text-sm">{req.requirement}</span>
                                <PriorityBadge priority={req.priority} />
                              </div>
                              <p className="text-xs text-muted-foreground mb-1">{req.category}</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">{req.detail}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Next steps */}
                {result.nextSteps && result.nextSteps.length > 0 && (
                  <Card className="border-primary/30">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h3 className="font-bold">Recommended Next Steps</h3>
                      </div>
                      <div className="space-y-3">
                        {result.nextSteps.map((step: string, i: number) => (
                          <div key={i} className="flex items-start gap-3 text-sm">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">{i + 1}</span>
                            </div>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" onClick={handleDownload} className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" onClick={handleReset} className="flex-1">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Run New Check
                  </Button>
                </div>

                {/* CTA after results */}
                <Card className="bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white border-0">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold mb-3">Want help fixing these gaps?</h3>
                    <p className="text-white/80 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                      Our team can build a customized compliance plan for your business — addressing every item flagged above and keeping you protected going forward.
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
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA (when no result showing) */}
      {!result && (
        <section className="py-16 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div {...fadeUp} className="max-w-xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Don't leave compliance to chance
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                Non-compliance can cost Canadian businesses $50,000+ in fines and legal fees. Find your gaps in 30 seconds.
              </p>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
