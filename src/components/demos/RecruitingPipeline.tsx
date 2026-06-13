import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FileText, ScanSearch, BarChart3, ListChecks, CalendarCheck, Database, RotateCcw, Check } from 'lucide-react';

const STAGES = [
  { icon: FileText, label: 'Resume received', detail: '4 applications parsed' },
  { icon: ScanSearch, label: 'AI screen', detail: 'Skills & experience matched' },
  { icon: BarChart3, label: 'Score & rank', detail: 'Top candidate 92 / 100' },
  { icon: ListChecks, label: 'Shortlist', detail: '3 advanced to interview' },
  { icon: CalendarCheck, label: 'Auto-schedule', detail: 'Booked — Tue 2:00 PM' },
  { icon: Database, label: 'CRM sync', detail: 'ATS & calendar updated' },
];

export default function RecruitingPipeline() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? STAGES.length : -1);
  const [running, setRunning] = useState(false);
  const startedRef = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const clear = () => { if (timer.current) clearTimeout(timer.current); };

  const run = () => {
    if (reduce) { setStep(STAGES.length); return; }
    clear();
    startedRef.current = true;
    setStep(0);
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    if (step >= STAGES.length) { setRunning(false); return; }
    timer.current = setTimeout(() => setStep((s) => s + 1), 950);
    return clear;
  }, [running, step]);

  useEffect(() => () => clear(), []);

  return (
    <motion.div
      onViewportEnter={() => { if (!startedRef.current && !reduce) run(); }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {STAGES.map((s, i) => {
          const done = step > i;
          const isActive = step === i;
          const reached = step >= i;
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              animate={{ opacity: reached ? 1 : 0.45 }}
              transition={{ duration: 0.3 }}
              className={`relative rounded-xl border p-3 bg-card transition-colors duration-300 ${
                isActive ? 'border-primary ring-2 ring-primary/20' : done ? 'border-primary/40' : 'border-border'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 transition-colors duration-300 ${
                  done ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <div className="text-xs font-semibold leading-tight">{s.label}</div>
              <div className="text-[11px] text-muted-foreground mt-1 min-h-[28px]">
                {reached ? s.detail : ''}
              </div>
              {isActive && !reduce && (
                <motion.div
                  layoutId="recruit-pulse"
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-muted-foreground">
          {step >= STAGES.length ? 'Candidate processed end-to-end — zero manual steps.' : 'Watch a candidate move through the pipeline automatically.'}
        </p>
        <button
          onClick={run}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Run it again
        </button>
      </div>
    </motion.div>
  );
}
