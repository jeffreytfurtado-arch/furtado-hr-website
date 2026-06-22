import SEO from '@/components/SEO';
import { ToolPageSchema } from '@/components/StructuredData';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { FileText, Sparkles, Loader2 } from 'lucide-react';
import { PROVINCES } from '@/lib/canada';
import { useTypewriter } from '@/lib/useTypewriter';
import ToolResult from '@/components/tools/ToolResult';
import LeadCapture from '@/components/tools/LeadCapture';

const POLICY_TYPES = [
  'Code of Conduct',
  'Remote & Hybrid Work',
  'Workplace Harassment & Violence Prevention',
  'Health & Safety',
  'Vacation & Time Off',
  'Anti-Discrimination & Accommodation',
  'Social Media & Acceptable Use',
  'Privacy (PIPEDA)',
  'Attendance & Punctuality',
  'Performance Management',
  'Expense & Travel',
];
const SIZES = ['1–10', '11–50', '51–200', '201–500', '500+'];
const field = 'w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50';

export default function PolicyGeneratorPage() {
  const reduce = useReducedMotion();
  const [policyType, setPolicyType] = useState(POLICY_TYPES[0]);
  const [province, setProvince] = useState('Ontario');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [raw, setRaw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const shown = useTypewriter(raw, !reduce);

  async function generate() {
    if (loading) return;
    setError(''); setRaw(''); setLoading(true);
    try {
      const res = await fetch('/api/hr-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'policy', policyType, province, companyName, industry, companySize }),
      });
      const data = await res.json();
      if (!res.ok || !data.result) throw new Error();
      setRaw(data.result);
    } catch {
      setError('Something went wrong — please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      <SEO
        title="HR Policy & Handbook Generator"
        description="Generate a professional, Canadian-compliant HR policy in seconds. Choose a policy type and province and get a ready-to-adapt draft."
        path="/policy-generator"
      />
      <ToolPageSchema name="Free Canadian HR Policy Generator" description="Generate professional, Canadian-compliant HR policies tailored to your province and industry." url="/policy-generator" />
      <Helmet><link rel="canonical" href="https://www.precisehr.ca/policy-generator" /></Helmet>

      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.06)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 mb-4">
            <FileText className="w-3.5 h-3.5 text-cyan-300" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">AI Tool</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">HR Policy &amp; Handbook Generator</h1>
          <p className="text-white/80 max-w-2xl mx-auto">Pick a policy and your province — get a professional, Canadian-compliant draft you can adapt in minutes.</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-2xl border bg-card shadow-sm p-6 mb-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1.5">Policy type</label>
                <select value={policyType} onChange={(e) => setPolicyType(e.target.value)} disabled={loading} className={field}>
                  {POLICY_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Province / Territory</label>
                <select value={province} onChange={(e) => setProvince(e.target.value)} disabled={loading} className={field}>
                  {PROVINCES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Company size <span className="text-muted-foreground font-normal">(optional)</span></label>
                <select value={companySize} onChange={(e) => setCompanySize(e.target.value)} disabled={loading} className={field}>
                  <option value="">Select…</option>
                  {SIZES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Company name <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} disabled={loading} placeholder="Acme Inc." className={field} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Industry <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input value={industry} onChange={(e) => setIndustry(e.target.value)} disabled={loading} placeholder="Logistics" className={field} />
              </div>
            </div>
            <Button onClick={generate} disabled={loading} className="mt-5 w-full sm:w-auto">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating…</> : <><Sparkles className="w-4 h-4 mr-2" />Generate policy</>}
            </Button>
          </div>

          <ToolResult loading={loading} shown={shown} raw={raw} error={error} loadingLabel="Drafting your policy…" emptyLabel="Your generated policy will appear here." />

          {raw && !loading && (
            <LeadCapture tool="policy" summary={`${policyType} policy (${province})`} document={raw} />
          )}

          <p className="mt-6 text-sm text-muted-foreground text-center">
            Want it fully tailored and reviewed? <a href="https://calendly.com/precisehr-info/precisehr-consult" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Book a consult →</a>
          </p>
        </div>
      </section>
    </div>
  );
}
