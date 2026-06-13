import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useReducedMotion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  Users, TrendingUp, Banknote, LifeBuoy, PieChart,
  Sparkles, Send, Loader2, ArrowRight, Phone, FlaskConical,
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

/* ── Animated data-unification network ── */
const CX = 300;
const CY = 185;
const SOURCES = [
  { key: 'HRIS', label: 'HRIS', icon: Users, x: 110, y: 78 },
  { key: 'CRM', label: 'CRM', icon: TrendingUp, x: 490, y: 78 },
  { key: 'Payroll', label: 'Payroll', icon: Banknote, x: 66, y: 210 },
  { key: 'Helpdesk', label: 'Helpdesk', icon: LifeBuoy, x: 534, y: 210 },
  { key: 'Finance', label: 'Finance', icon: PieChart, x: 300, y: 332 },
];
const pct = (v: number, max: number) => `${(v / max) * 100}%`;

function UnificationNetwork({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full aspect-[5/3] select-none">
      <svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="flow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#003366" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* core glow */}
        <motion.circle
          cx={CX} cy={CY} fill="url(#coreGlow)"
          animate={reduce ? { r: 46, opacity: 0.32 } : {
            r: active ? [42, 54, 42] : [44, 49, 44],
            opacity: active ? [0.5, 0.85, 0.5] : [0.24, 0.4, 0.24],
          }}
          transition={{ duration: active ? 1.1 : 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* connector lines (flow toward the core) */}
        {SOURCES.map((s) => (
          <motion.line
            key={s.key}
            x1={s.x} y1={s.y} x2={CX} y2={CY}
            stroke="url(#flow)" strokeWidth={1.6} strokeLinecap="round" strokeDasharray="5 7"
            opacity={active ? 0.95 : 0.5}
            animate={reduce ? {} : { strokeDashoffset: [0, -24] }}
            transition={{ duration: active ? 0.5 : 2.4, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        {/* data pulses traveling into the core while querying */}
        {active && !reduce && SOURCES.map((s, i) => (
          <motion.circle
            key={s.key + '-pulse'}
            r={3.4} fill="#67e8f9"
            initial={{ cx: s.x, cy: s.y, opacity: 0 }}
            animate={{ cx: [s.x, CX], cy: [s.y, CY], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.95, repeat: Infinity, ease: 'easeIn', delay: i * 0.12 }}
          />
        ))}
      </svg>

      {/* source nodes (HTML overlay) */}
      {SOURCES.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.key}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-lg border bg-background/90 backdrop-blur px-2.5 py-1.5 shadow-sm"
            style={{ left: pct(s.x, 600), top: pct(s.y, 360) }}
          >
            <Icon className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium">{s.label}</span>
          </div>
        );
      })}

      {/* AI core (HTML overlay) */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: pct(CX, 600), top: pct(CY, 360) }}
        animate={reduce ? {} : { scale: active ? [1, 1.06, 1] : [1, 1.03, 1] }}
        transition={{ duration: active ? 1.1 : 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-primary to-[#003566] text-white px-3 py-2 shadow-lg ring-2 ring-cyan-300/40">
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span className="text-xs font-semibold whitespace-nowrap">AI Engine</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Render answer text with [SOURCE] tags as badges ── */
function renderAnswer(text: string) {
  return text.split(/(\[[^\]]+\])/g).map((part, i) => {
    if (/^\[[^\]]+\]$/.test(part)) {
      return (
        <span key={i} className="inline-block align-baseline mx-0.5 px-1.5 py-0.5 rounded text-[11px] font-semibold bg-primary/10 text-primary">
          {part.replace(/[[\]]/g, '')}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const SAMPLE_QUESTIONS = [
  "What's our attrition and where is it worst?",
  'Draft an offer for a Senior Analyst in Ontario',
  'Which deals are at risk, and what should we do?',
  'Where is our overtime spend going?',
];

export default function DemosPage() {
  const reduce = useReducedMotion();
  const [question, setQuestion] = useState('');
  const [raw, setRaw] = useState('');      // full answer from the API
  const [shown, setShown] = useState('');  // progressively revealed text
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [error, setError] = useState('');

  async function ask(qArg?: string) {
    const q = (qArg ?? question).trim();
    if (!q || loading) return;
    setQuestion(q);
    setError(''); setRaw(''); setShown(''); setLoading(true); setActive(true);
    try {
      const res = await fetch('/api/ai-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (!res.ok || !data.answer) throw new Error(data.error || 'No answer');
      setLoading(false);
      if (reduce) { setShown(data.answer); setActive(false); }
      else { setRaw(data.answer); }
    } catch {
      setError('The demo had trouble reaching the engine — please try again.');
      setLoading(false); setActive(false);
    }
  }

  // typewriter reveal of the answer
  useEffect(() => {
    if (!raw) return;
    setShown('');
    let i = 0;
    const step = Math.max(2, Math.round(raw.length / 130));
    const id = setInterval(() => {
      i += step;
      setShown(raw.slice(0, i));
      if (i >= raw.length) { clearInterval(id); setActive(false); }
    }, 16);
    return () => clearInterval(id);
  }, [raw]);

  return (
    <div className="flex flex-col">
      <SEO
        title="AI Demos — PreciseHR Labs"
        description="Try PreciseHR's AI live. Ask a fictional company anything and watch our AI engine answer by unifying data from HR, payroll, CRM, helpdesk, and finance in real time."
        path="/ai/demos"
      />
      <Helmet>
        <link rel="canonical" href="https://www.precisehr.ca/ai/demos" />
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.06)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 py-20 md:py-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 mb-5">
              <FlaskConical className="w-3.5 h-3.5 text-cyan-300" />
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">PreciseHR Labs</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">AI you can actually try</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              These are live, working demos — not screenshots. See the kind of AI we build, running right here in your browser.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Flagship: Data Unification */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Flagship Demo</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The AI Data Unification Engine</h2>
            <p className="text-muted-foreground">
              Most companies have data trapped in disconnected systems. Our engines connect them into a single brain you can simply ask. Below is <span className="font-medium text-foreground">Northpoint Logistics</span> — a fictional company whose HR, payroll, CRM, helpdesk, and finance data live in five separate tools. Ask it anything.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
            {/* Animation */}
            <motion.div {...fadeUp} className="rounded-2xl border bg-muted/30 p-4">
              <UnificationNetwork active={active} />
            </motion.div>

            {/* Interactive panel */}
            <motion.div {...fadeUp} className="rounded-2xl border bg-card shadow-sm p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {SAMPLE_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => ask(q)}
                    disabled={loading}
                    className="text-xs px-3 py-1.5 rounded-full border bg-background hover:border-primary/40 hover:text-primary transition-colors disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') ask(); }}
                  placeholder="Ask Northpoint anything…"
                  disabled={loading}
                  className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
                />
                <Button onClick={() => ask()} disabled={loading || !question.trim()} className="shrink-0">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>

              <div className="mt-4 min-h-[160px] rounded-lg bg-muted/40 p-4 text-sm leading-relaxed">
                {loading && !shown && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Querying HRIS, CRM, Payroll, Helpdesk &amp; Finance…</span>
                  </div>
                )}
                {error && <p className="text-destructive">{error}</p>}
                {shown && (
                  <p className="whitespace-pre-wrap text-foreground/90">
                    {renderAnswer(shown)}
                    {active && <span className="inline-block w-1.5 h-4 -mb-0.5 ml-0.5 bg-primary animate-pulse" />}
                  </p>
                )}
                {!loading && !shown && !error && (
                  <p className="text-muted-foreground">Tap a question above or type your own — the answer streams in, citing the systems it pulled from.</p>
                )}
              </div>

              <p className="mt-3 text-[11px] text-muted-foreground">
                Demo data is fictional. The same engine connects to your real systems.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Imagine this on your data</h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              This is a glimpse of what we build. Book a consult and we&apos;ll map the AI that would move your organization forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a href="https://calendly.com/precisehr-info/precisehr-consult" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                  Book a consult <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Link to="/ai" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium">
                Explore our AI services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
