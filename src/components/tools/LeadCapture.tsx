import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';

export default function LeadCapture({
  tool, summary, document,
}: {
  tool: string;
  summary: string;
  document: string;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submit() {
    const value = email.trim();
    if (!value || status === 'sending') return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Please enter a valid email.');
      return;
    }
    setError(''); setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, tool, summary, document }),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
    } catch {
      setStatus('error');
      setError('Could not send right now — please try again.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-start gap-3 dark:border-emerald-800 dark:bg-emerald-950/40">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">Sent — check your inbox.</p>
          <p className="text-sm text-emerald-800/80 dark:text-emerald-300/80">We've emailed your draft and will follow up with a free review.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-xl border bg-primary/5 p-4">
      <p className="text-sm font-medium mb-1">Want this emailed to you with a free review?</p>
      <p className="text-xs text-muted-foreground mb-3">
        This draft is a starting point — our team adds province-specific review, risk assessment, and accountability.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
            placeholder="you@company.com"
            disabled={status === 'sending'}
            className="w-full rounded-lg border bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
          />
        </div>
        <Button onClick={submit} disabled={status === 'sending' || !email.trim()} className="shrink-0">
          {status === 'sending' ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending…</> : 'Email me this'}
        </Button>
      </div>
      {error && <p className="text-xs text-destructive mt-2">{error}</p>}
      <p className="text-[11px] text-muted-foreground mt-2">We'll only use your email to send this and follow up. No spam.</p>
    </div>
  );
}
