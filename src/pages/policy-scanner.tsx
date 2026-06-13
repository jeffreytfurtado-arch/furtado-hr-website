import SEO from '@/components/SEO';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ScanSearch, Loader2 } from 'lucide-react';
import { PROVINCES } from '@/lib/canada';
import { useTypewriter } from '@/lib/useTypewriter';
import ToolResult from '@/components/tools/ToolResult';
import LeadCapture from '@/components/tools/LeadCapture';

const field = 'w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50';

export default function PolicyScannerPage() {
  const reduce = useReducedMotion();
  const [policyText, setPolicyText] = useState('');
  const [province, setProvince] = useState('Ontario');
  const [raw, setRaw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const shown = useTypewriter(raw, !reduce);

  async function scan() {
    if (loading || !policyText.trim()) return;
    setError(''); setRaw(''); setLoading(true);
    try {
      const res = await fetch('/api/hr-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'scan', policyText, province }),
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
        title="Policy Red-Flag Scanner"
        description="Paste an existing workplace policy and let AI flag potential Canadian compliance gaps, risky language, and missing clauses by severity."
        path="/policy-scanner"
      />
      <Helmet><link rel="canonical" href="https://www.precisehr.ca/policy-scanner" /></Helmet>

      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.06)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 mb-4">
            <ScanSearch className="w-3.5 h-3.5 text-cyan-300" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">AI Tool</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Policy Red-Flag Scanner</h1>
          <p className="text-white/80 max-w-2xl mx-auto">Paste a workplace policy and get a quick read on compliance gaps, risky language, and missing clauses — flagged by severity.</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-2xl border bg-card shadow-sm p-6 mb-6">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Province / Territory</label>
                <select value={province} onChange={(e) => setProvince(e.target.value)} disabled={loading} className={`${field} sm:max-w-xs`}>
                  {PROVINCES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Paste your policy</label>
                <textarea
                  value={policyText}
                  onChange={(e) => setPolicyText(e.target.value)}
                  disabled={loading}
                  rows={10}
                  placeholder="Paste the full text of an existing workplace policy here…"
                  className={`${field} resize-y`}
                />
                <p className="text-[11px] text-muted-foreground mt-1">{policyText.length.toLocaleString()} characters</p>
              </div>
            </div>
            <Button onClick={scan} disabled={loading || !policyText.trim()} className="mt-2 w-full sm:w-auto">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Scanning…</> : <><ScanSearch className="w-4 h-4 mr-2" />Scan for red flags</>}
            </Button>
          </div>

          <ToolResult loading={loading} shown={shown} raw={raw} error={error} loadingLabel="Reviewing your policy…" emptyLabel="Findings will appear here, grouped by severity." />

          {raw && !loading && (
            <LeadCapture tool="scan" summary={`Policy scan (${province})`} document={raw} />
          )}

          <p className="mt-6 text-sm text-muted-foreground text-center">
            This is general guidance, not legal advice. For a thorough policy audit, <a href="https://calendly.com/precisehr-info/precisehr-consult" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">book a consult →</a>
          </p>
        </div>
      </section>
    </div>
  );
}
