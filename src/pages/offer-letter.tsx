import SEO from '@/components/SEO';
import { ToolPageSchema } from '@/components/StructuredData';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from 'motion/react';
import { FileSignature, Sparkles, Loader2 } from 'lucide-react';
import { PROVINCES } from '@/lib/canada';
import { useTypewriter } from '@/lib/useTypewriter';
import ToolResult from '@/components/tools/ToolResult';
import LeadCapture from '@/components/tools/LeadCapture';

const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Fixed-term Contract', 'Temporary'];
const field = 'w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50';

export default function OfferLetterPage() {
  const reduce = useReducedMotion();
  const [jobTitle, setJobTitle] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [employmentType, setEmploymentType] = useState(EMPLOYMENT_TYPES[0]);
  const [province, setProvince] = useState('Ontario');
  const [startDate, setStartDate] = useState('');
  const [compensation, setCompensation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [raw, setRaw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const shown = useTypewriter(raw, !reduce);

  async function generate() {
    if (loading || !jobTitle.trim()) return;
    setError(''); setRaw(''); setLoading(true);
    try {
      const res = await fetch('/api/hr-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'offer', jobTitle, candidateName, employmentType, province, startDate, compensation, companyName, managerName }),
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
        title="Offer Letter Generator"
        description="Create a professional, Canadian employment offer letter in seconds. Enter the role and terms and get a clean, ready-to-send draft."
        path="/offer-letter"
      />
      <ToolPageSchema name="Free Canadian Offer Letter Generator" description="Create professional, Canadian-compliant employment offer letters in seconds." url="/offer-letter" />


      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.06)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 mb-4">
            <FileSignature className="w-3.5 h-3.5 text-cyan-300" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">AI Tool</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Offer Letter Generator</h1>
          <p className="text-white/80 max-w-2xl mx-auto">Enter the role and terms and get a clean, Canadian-compliant offer letter — ready to review and send.</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-2xl border bg-card shadow-sm p-6 mb-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Job title <span className="text-destructive">*</span></label>
                <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} disabled={loading} placeholder="Operations Analyst" className={field} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Candidate name <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input value={candidateName} onChange={(e) => setCandidateName(e.target.value)} disabled={loading} placeholder="Jordan Smith" className={field} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Employment type</label>
                <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} disabled={loading} className={field}>
                  {EMPLOYMENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Province / Territory</label>
                <select value={province} onChange={(e) => setProvince(e.target.value)} disabled={loading} className={field}>
                  {PROVINCES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Start date <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} disabled={loading} className={field} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Compensation <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input value={compensation} onChange={(e) => setCompensation(e.target.value)} disabled={loading} placeholder="$75,000/year" className={field} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Company name <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} disabled={loading} placeholder="Acme Inc." className={field} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Reports to <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input value={managerName} onChange={(e) => setManagerName(e.target.value)} disabled={loading} placeholder="Alex Chen, Operations Manager" className={field} />
              </div>
            </div>
            <Button onClick={generate} disabled={loading || !jobTitle.trim()} className="mt-5 w-full sm:w-auto">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating…</> : <><Sparkles className="w-4 h-4 mr-2" />Generate offer letter</>}
            </Button>
          </div>

          <ToolResult loading={loading} shown={shown} raw={raw} error={error} loadingLabel="Drafting your offer letter…" emptyLabel="Your offer letter will appear here." />

          {raw && !loading && (
            <LeadCapture tool="offer" summary={`Offer letter — ${jobTitle} (${province})`} document={raw} />
          )}

          <p className="mt-6 text-sm text-muted-foreground text-center">
            Hiring at scale or need contracts reviewed? <a href="https://calendly.com/precisehr-info/precisehr-consult" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Book a consult →</a>
          </p>
        </div>
      </section>
    </div>
  );
}
