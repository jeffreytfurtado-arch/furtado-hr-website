import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, FileText } from 'lucide-react';

const TYPES = [
  { key: 'jd', label: 'Job Description', placeholder: 'e.g. Warehouse Team Lead, Mississauga' },
  { key: 'policy', label: 'HR Policy', placeholder: 'e.g. Remote work policy' },
  { key: 'review', label: 'Performance Review', placeholder: 'e.g. Account manager — strong Q2, missed admin deadlines' },
];

export default function DocumentBuilder() {
  const reduce = useReducedMotion();
  const [type, setType] = useState('jd');
  const [topic, setTopic] = useState('');
  const [raw, setRaw] = useState('');
  const [shown, setShown] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const current = TYPES.find((t) => t.key === type)!;
  const revealing = !!shown && shown !== raw && !!raw;

  function pickType(k: string) {
    setType(k);
    setRaw(''); setShown(''); setError('');
  }

  async function build() {
    if (!topic.trim() || loading) return;
    setError(''); setRaw(''); setShown(''); setLoading(true);
    try {
      const res = await fetch('/api/ai-build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docType: type, topic }),
      });
      const data = await res.json();
      if (!res.ok || !data.document) throw new Error(data.error || 'No document');
      setLoading(false);
      if (reduce) setShown(data.document);
      else setRaw(data.document);
    } catch {
      setError('The builder had trouble — please try again.');
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!raw) return;
    setShown('');
    let i = 0;
    const step = Math.max(2, Math.round(raw.length / 160));
    const id = setInterval(() => {
      i += step;
      setShown(raw.slice(0, i));
      if (i >= raw.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [raw]);

  return (
    <div className="rounded-2xl border bg-card shadow-sm p-6">
      {/* type toggle */}
      <div className="flex flex-wrap gap-2 mb-4">
        {TYPES.map((t) => (
          <button
            key={t.key}
            onClick={() => pickType(t.key)}
            disabled={loading}
            className={`text-sm px-3.5 py-1.5 rounded-full border transition-colors disabled:opacity-50 ${
              type === t.key ? 'bg-primary text-white border-primary' : 'bg-background hover:border-primary/40'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* input */}
      <div className="flex gap-2">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') build(); }}
          placeholder={current.placeholder}
          disabled={loading}
          className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
        />
        <Button onClick={build} disabled={loading || !topic.trim()} className="shrink-0">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4 mr-1.5" /> Generate</>}
        </Button>
      </div>

      {/* document */}
      <div className="mt-4 min-h-[220px] rounded-lg border bg-background p-5 text-sm leading-relaxed">
        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Drafting your {current.label.toLowerCase()}…</span>
          </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {shown && (
          <p className="whitespace-pre-wrap text-foreground/90">
            {shown}
            {revealing && <span className="inline-block w-1.5 h-4 -mb-0.5 ml-0.5 bg-primary animate-pulse" />}
          </p>
        )}
        {!loading && !shown && !error && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileText className="w-4 h-4" />
            <span>Pick a type, enter a topic, and watch a polished, Canadian-compliant draft write itself.</span>
          </div>
        )}
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        Generated drafts are a starting point — our team tailors the final version to your business.
      </p>
    </div>
  );
}
