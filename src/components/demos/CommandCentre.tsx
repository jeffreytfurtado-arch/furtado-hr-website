import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Activity, Clock, Ticket, DollarSign, AlertTriangle, TrendingUp, CheckCircle2 } from 'lucide-react';

function Stat({
  label, value, prefix = '', suffix = '', decimals = 0, run, Icon,
}: {
  label: string; value: number; prefix?: string; suffix?: string; decimals?: number; run: boolean; Icon: any;
}) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!run) return;
    if (reduce) { setV(value); return; }
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, reduce, value]);
  const display = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString();
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground mb-1.5">
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-[11px] font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-2xl font-bold tabular-nums">{prefix}{display}{suffix}</div>
    </div>
  );
}

function Sparkline({ points, run, color = '#003366' }: { points: number[]; run: boolean; color?: string }) {
  const reduce = useReducedMotion();
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const norm = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 32 - ((p - min) / span) * 26 - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="w-full h-8">
      <motion.polyline
        points={norm}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={run ? { pathLength: 1 } : {}}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      />
    </svg>
  );
}

const ALERTS = [
  { Icon: AlertTriangle, cls: 'text-amber-500', text: 'Warehouse attrition up 4% month-over-month' },
  { Icon: TrendingUp, cls: 'text-primary', text: '3 deals flagged at-risk — $980k exposed' },
  { Icon: CheckCircle2, cls: 'text-emerald-500', text: 'Helpdesk SLA restored to target' },
  { Icon: Clock, cls: 'text-slate-400', text: 'Overtime trending up — review staffing' },
];

export default function CommandCentre() {
  const reduce = useReducedMotion();
  const [run, setRun] = useState(reduce);

  return (
    <motion.div
      onViewportEnter={() => setRun(true)}
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-2xl border bg-muted/30 p-5"
    >
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-semibold">Operations — Live</span>
        </div>
        <span className="text-[11px] text-muted-foreground">Northpoint Logistics</span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <Stat label="Active shipments" value={1284} run={run} Icon={Activity} />
        <Stat label="On-time" value={96.2} suffix="%" decimals={1} run={run} Icon={CheckCircle2} />
        <Stat label="Open tickets" value={86} run={run} Icon={Ticket} />
        <Stat label="Pipeline" value={4.2} prefix="$" suffix="M" decimals={1} run={run} Icon={DollarSign} />
      </div>

      {/* sparklines */}
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl border bg-card p-3">
          <div className="text-[11px] text-muted-foreground mb-1">Throughput (7d)</div>
          <Sparkline points={[42, 48, 45, 60, 58, 72, 81]} run={run} color="#003366" />
        </div>
        <div className="rounded-xl border bg-card p-3">
          <div className="text-[11px] text-muted-foreground mb-1">Avg. resolution time (7d)</div>
          <Sparkline points={[70, 64, 66, 55, 48, 44, 38]} run={run} color="#0891b2" />
        </div>
      </div>

      {/* alerts */}
      <div className="rounded-xl border bg-card divide-y">
        {ALERTS.map((a, i) => {
          const Icon = a.Icon;
          return (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={run ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.18 }}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm"
            >
              <Icon className={`w-4 h-4 shrink-0 ${a.cls}`} />
              <span className="text-foreground/80">{a.text}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
