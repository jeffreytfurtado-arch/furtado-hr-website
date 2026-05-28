import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  Shield,
  DollarSign,
  MapPin,
  Phone,
  TrendingDown,
  Wallet,
  Info,
  Calculator,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

function useInView(opts?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.15, ...opts });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } };

/* ── 2026 Tax Data ── */
const FEDERAL_BRACKETS = [
  { min: 0, max: 58523, rate: 0.14 },
  { min: 58523, max: 117045, rate: 0.205 },
  { min: 117045, max: 181440, rate: 0.26 },
  { min: 181440, max: 258482, rate: 0.29 },
  { min: 258482, max: Infinity, rate: 0.33 },
];
const FEDERAL_BPA = 16452;

const PROVINCIAL_TAX: Record<string, { brackets: { min: number; max: number; rate: number }[]; bpa: number; name: string }> = {
  AB: { name: 'Alberta', bpa: 22323, brackets: [
    { min: 0, max: 61200, rate: 0.08 }, { min: 61200, max: 154259, rate: 0.10 },
    { min: 154259, max: 185111, rate: 0.12 }, { min: 185111, max: 246813, rate: 0.13 },
    { min: 246813, max: 370220, rate: 0.14 }, { min: 370220, max: Infinity, rate: 0.15 },
  ]},
  BC: { name: 'British Columbia', bpa: 12932, brackets: [
    { min: 0, max: 50363, rate: 0.0506 }, { min: 50363, max: 100728, rate: 0.077 },
    { min: 100728, max: 115648, rate: 0.105 }, { min: 115648, max: 140430, rate: 0.1229 },
    { min: 140430, max: 190405, rate: 0.147 }, { min: 190405, max: 265545, rate: 0.168 },
    { min: 265545, max: Infinity, rate: 0.205 },
  ]},
  MB: { name: 'Manitoba', bpa: 15969, brackets: [
    { min: 0, max: 47000, rate: 0.108 }, { min: 47000, max: 100000, rate: 0.1275 },
    { min: 100000, max: Infinity, rate: 0.174 },
  ]},
  NB: { name: 'New Brunswick', bpa: 13396, brackets: [
    { min: 0, max: 52333, rate: 0.094 }, { min: 52333, max: 104666, rate: 0.14 },
    { min: 104666, max: 193861, rate: 0.16 }, { min: 193861, max: Infinity, rate: 0.195 },
  ]},
  NL: { name: 'Newfoundland & Labrador', bpa: 11067, brackets: [
    { min: 0, max: 44678, rate: 0.087 }, { min: 44678, max: 89354, rate: 0.145 },
    { min: 89354, max: 159528, rate: 0.158 }, { min: 159528, max: 223340, rate: 0.178 },
    { min: 223340, max: 285319, rate: 0.198 }, { min: 285319, max: Infinity, rate: 0.208 },
  ]},
  NS: { name: 'Nova Scotia', bpa: 8481, brackets: [
    { min: 0, max: 30995, rate: 0.0879 }, { min: 30995, max: 61991, rate: 0.1495 },
    { min: 61991, max: 97417, rate: 0.1667 }, { min: 97417, max: 157124, rate: 0.175 },
    { min: 157124, max: Infinity, rate: 0.21 },
  ]},
  NT: { name: 'Northwest Territories', bpa: 17373, brackets: [
    { min: 0, max: 51964, rate: 0.059 }, { min: 51964, max: 103930, rate: 0.086 },
    { min: 103930, max: 169104, rate: 0.122 }, { min: 169104, max: Infinity, rate: 0.1405 },
  ]},
  NU: { name: 'Nunavut', bpa: 18767, brackets: [
    { min: 0, max: 55867, rate: 0.04 }, { min: 55867, max: 111733, rate: 0.07 },
    { min: 111733, max: 181440, rate: 0.09 }, { min: 181440, max: Infinity, rate: 0.115 },
  ]},
  ON: { name: 'Ontario', bpa: 12399, brackets: [
    { min: 0, max: 53891, rate: 0.0505 }, { min: 53891, max: 107785, rate: 0.0915 },
    { min: 107785, max: 150000, rate: 0.1116 }, { min: 150000, max: 220000, rate: 0.1216 },
    { min: 220000, max: Infinity, rate: 0.1316 },
  ]},
  PE: { name: 'Prince Edward Island', bpa: 13500, brackets: [
    { min: 0, max: 33928, rate: 0.095 }, { min: 33928, max: 65820, rate: 0.1347 },
    { min: 65820, max: 106890, rate: 0.166 }, { min: 106890, max: 142250, rate: 0.1762 },
    { min: 142250, max: Infinity, rate: 0.19 },
  ]},
  QC: { name: 'Quebec', bpa: 18571, brackets: [
    { min: 0, max: 53255, rate: 0.14 }, { min: 53255, max: 106510, rate: 0.19 },
    { min: 106510, max: 129590, rate: 0.24 }, { min: 129590, max: Infinity, rate: 0.2575 },
  ]},
  SK: { name: 'Saskatchewan', bpa: 18491, brackets: [
    { min: 0, max: 54532, rate: 0.105 }, { min: 54532, max: 155805, rate: 0.125 },
    { min: 155805, max: Infinity, rate: 0.145 },
  ]},
  YT: { name: 'Yukon', bpa: 16452, brackets: [
    { min: 0, max: 58523, rate: 0.064 }, { min: 58523, max: 117045, rate: 0.09 },
    { min: 117045, max: 181440, rate: 0.109 }, { min: 181440, max: 500000, rate: 0.128 },
    { min: 500000, max: Infinity, rate: 0.15 },
  ]},
};

// CPP 2026
const CPP_RATE = 0.0595;
const CPP_EXEMPTION = 3500;
const CPP_MAX_EARNINGS = 74600;
const CPP_MAX_CONTRIBUTION = 4230.45;
// CPP2
const CPP2_RATE = 0.04;
const CPP2_MAX_EARNINGS = 85000;
const CPP2_MAX_CONTRIBUTION = 416.00;
// EI 2026
const EI_RATE = 0.0163;
const EI_MAX_EARNINGS = 68900;
const EI_MAX_CONTRIBUTION = 1123.07;
// QC has different EI
const QC_EI_RATE = 0.013;
const QC_EI_MAX = 895.70;

function calcBracketTax(income: number, brackets: { min: number; max: number; rate: number }[], bpa: number): number {
  let tax = 0;
  for (const bracket of brackets) {
    if (income <= bracket.min) break;
    const taxable = Math.min(income, bracket.max) - bracket.min;
    tax += taxable * bracket.rate;
  }
  const credit = bpa * brackets[0].rate;
  return Math.max(0, tax - credit);
}

function calcDeductions(grossAnnual: number, province: string) {
  const isQC = province === 'QC';

  // Federal tax
  const federalTax = calcBracketTax(grossAnnual, FEDERAL_BRACKETS, FEDERAL_BPA);

  // Provincial tax
  const provData = PROVINCIAL_TAX[province];
  const provincialTax = provData ? calcBracketTax(grossAnnual, provData.brackets, provData.bpa) : 0;

  // CPP
  const cppEarnings = Math.min(grossAnnual, CPP_MAX_EARNINGS) - CPP_EXEMPTION;
  const cpp = Math.min(Math.max(0, cppEarnings) * CPP_RATE, CPP_MAX_CONTRIBUTION);

  // CPP2
  let cpp2 = 0;
  if (grossAnnual > CPP_MAX_EARNINGS) {
    const cpp2Earnings = Math.min(grossAnnual, CPP2_MAX_EARNINGS) - CPP_MAX_EARNINGS;
    cpp2 = Math.min(Math.max(0, cpp2Earnings) * CPP2_RATE, CPP2_MAX_CONTRIBUTION);
  }

  // EI
  const eiRate = isQC ? QC_EI_RATE : EI_RATE;
  const eiMax = isQC ? QC_EI_MAX : EI_MAX_CONTRIBUTION;
  const eiEarnings = Math.min(grossAnnual, EI_MAX_EARNINGS);
  const ei = Math.min(eiEarnings * eiRate, eiMax);

  const totalDeductions = federalTax + provincialTax + cpp + cpp2 + ei;
  const netAnnual = grossAnnual - totalDeductions;

  return {
    grossAnnual,
    federalTax,
    provincialTax,
    cpp,
    cpp2,
    ei,
    totalDeductions,
    netAnnual,
    effectiveRate: grossAnnual > 0 ? (totalDeductions / grossAnnual) * 100 : 0,
    marginalRate: grossAnnual > 0 ? getMarginalRate(grossAnnual, province) : 0,
  };
}

function getMarginalRate(income: number, province: string): number {
  let fedRate = 0;
  for (const b of FEDERAL_BRACKETS) {
    if (income > b.min) fedRate = b.rate;
  }
  let provRate = 0;
  const provData = PROVINCIAL_TAX[province];
  if (provData) {
    for (const b of provData.brackets) {
      if (income > b.min) provRate = b.rate;
    }
  }
  return (fedRate + provRate) * 100;
}

const PAY_FREQUENCIES: Record<string, { label: string; divisor: number }> = {
  annual: { label: 'Annual', divisor: 1 },
  monthly: { label: 'Monthly', divisor: 12 },
  semiMonthly: { label: 'Semi-Monthly', divisor: 24 },
  biWeekly: { label: 'Bi-Weekly', divisor: 26 },
  weekly: { label: 'Weekly', divisor: 52 },
  daily: { label: 'Daily', divisor: 260 },
};

/* ── Animated Number ── */
function AnimatedAmount({ value, prefix = '$', className = '' }: { value: number; prefix?: string; className?: string }) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    const prev = prevRef.current;
    const diff = value - prev;
    if (Math.abs(diff) < 0.01) { setDisplay(value); prevRef.current = value; return; }
    let start: number | null = null;
    let frame: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 600, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(prev + diff * eased);
      if (progress < 1) frame = requestAnimationFrame(animate);
      else prevRef.current = value;
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span className={className}>{prefix}{display.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>;
}

/* ── Donut Chart ── */
function DeductionDonut({ result }: { result: ReturnType<typeof calcDeductions> }) {
  const { ref, inView } = useInView();
  if (result.grossAnnual <= 0) return null;

  const segments = [
    { label: 'Net Pay', value: result.netAnnual, color: '#22c55e' },
    { label: 'Federal Tax', value: result.federalTax, color: '#3b82f6' },
    { label: 'Provincial Tax', value: result.provincialTax, color: '#8b5cf6' },
    { label: 'CPP/CPP2', value: result.cpp + result.cpp2, color: '#f59e0b' },
    { label: 'EI', value: result.ei, color: '#ef4444' },
  ].filter(s => s.value > 0);

  const total = result.grossAnnual;
  let cumulative = 0;
  const r = 50; const cx = 60; const cy = 60;

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 120 120" className="w-32 h-32">
        {segments.map((seg, i) => {
          const startAngle = (cumulative / total) * 360 - 90;
          const sweepAngle = (seg.value / total) * 360;
          cumulative += seg.value;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = ((startAngle + sweepAngle) * Math.PI) / 180;
          const x1 = cx + r * Math.cos(startRad);
          const y1 = cy + r * Math.sin(startRad);
          const x2 = cx + r * Math.cos(endRad);
          const y2 = cy + r * Math.sin(endRad);
          const largeArc = sweepAngle > 180 ? 1 : 0;
          const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
          return (
            <motion.path
              key={i} d={d} fill={seg.color}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            />
          );
        })}
        <circle cx={cx} cy={cy} r="30" className="fill-background" />
        <text x={cx} y={cy - 4} textAnchor="middle" className="fill-foreground text-[8px] font-bold">
          {result.effectiveRate.toFixed(1)}%
        </text>
        <text x={cx} y={cy + 8} textAnchor="middle" className="fill-muted-foreground text-[5px]">
          effective rate
        </text>
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
        {segments.map((seg, i) => (
          <span key={i} className="flex items-center gap-1 text-[10px]">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
            {seg.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function NetPayCalculatorPage() {
  const [grossInput, setGrossInput] = useState('75000');
  const [province, setProvince] = useState('ON');
  const [frequency, setFrequency] = useState('biWeekly');

  const grossAnnual = parseFloat(grossInput.replace(/,/g, '')) || 0;
  const result = useMemo(() => calcDeductions(grossAnnual, province), [grossAnnual, province]);
  const freq = PAY_FREQUENCIES[frequency];

  const provName = PROVINCIAL_TAX[province]?.name || province;

  return (
    <div className="flex flex-col">
      <SEO title="Canadian Net Pay Calculator 2026" description="Calculate your take-home pay in any Canadian province for 2026. See federal tax, provincial tax, CPP, CPP2, and EI deductions for any pay frequency." path="/net-pay-calculator" />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm mb-6 backdrop-blur-sm">
              <Calculator className="w-3.5 h-3.5 text-cyan-300" />
              2026 Tax Rates · CPP2 Included
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Canadian Net Pay
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">Calculator</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              See exactly what you take home. Enter your salary, pick your province, and get an instant breakdown of every deduction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Input controls */}
            <motion.div {...fadeUp}>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Annual Gross Salary</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="text" inputMode="numeric"
                          value={grossInput}
                          onChange={(e) => setGrossInput(e.target.value.replace(/[^0-9.,]/g, ''))}
                          placeholder="75,000"
                          className="pl-10 text-lg font-semibold h-12"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Province</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <select
                          value={province} onChange={(e) => setProvince(e.target.value)}
                          className="w-full h-12 pl-10 pr-3 rounded-md border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          {Object.entries(PROVINCIAL_TAX).sort((a, b) => a[1].name.localeCompare(b[1].name)).map(([code, data]) => (
                            <option key={code} value={code}>{data.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Pay Frequency</label>
                      <select
                        value={frequency} onChange={(e) => setFrequency(e.target.value)}
                        className="w-full h-12 px-3 rounded-md border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {Object.entries(PAY_FREQUENCIES).map(([key, data]) => (
                          <option key={key} value={key}>{data.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {grossAnnual > 0 && (
              <>
                {/* Three-column display: Monthly | Selected | Daily */}
                <motion.div {...fadeUp} className="mb-8">
                  <div className="grid grid-cols-3 gap-4">
                    {/* Monthly */}
                    <Card className="text-center bg-muted/30">
                      <CardContent className="p-5">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Monthly</p>
                        <AnimatedAmount value={result.netAnnual / 12} className="text-xl md:text-2xl font-bold text-foreground" />
                        <p className="text-[10px] text-muted-foreground mt-1">net take-home</p>
                      </CardContent>
                    </Card>

                    {/* Selected frequency — hero card */}
                    <Card className="text-center border-primary/40 shadow-lg shadow-primary/5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan-500 to-primary" />
                      <CardContent className="p-5">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{freq.label}</p>
                        <AnimatedAmount value={result.netAnnual / freq.divisor} className="text-2xl md:text-4xl font-bold text-foreground" />
                        <p className="text-[10px] text-muted-foreground mt-1">net take-home</p>
                      </CardContent>
                    </Card>

                    {/* Daily */}
                    <Card className="text-center bg-muted/30">
                      <CardContent className="p-5">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Daily</p>
                        <AnimatedAmount value={result.netAnnual / 260} className="text-xl md:text-2xl font-bold text-foreground" />
                        <p className="text-[10px] text-muted-foreground mt-1">net take-home</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>

                {/* Breakdown + Donut */}
                <motion.div {...fadeUp}>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Deduction breakdown */}
                    <div className="md:col-span-2">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold mb-4">Annual Breakdown — {provName}</h3>
                          <div className="space-y-3">
                            {/* Gross */}
                            <div className="flex justify-between items-center pb-3 border-b">
                              <span className="font-semibold text-sm">Gross Salary</span>
                              <AnimatedAmount value={result.grossAnnual} className="font-bold text-sm" />
                            </div>

                            {/* Deductions */}
                            <div className="flex items-center gap-2 mb-1">
                              <TrendingDown className="w-4 h-4 text-red-500" />
                              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Deductions</span>
                            </div>

                            {[
                              { label: 'Federal Tax', value: result.federalTax, color: 'bg-blue-500' },
                              { label: `Provincial Tax (${province})`, value: result.provincialTax, color: 'bg-purple-500' },
                              { label: 'CPP', value: result.cpp, color: 'bg-amber-500' },
                              { label: 'CPP2 (Enhanced)', value: result.cpp2, color: 'bg-amber-400' },
                              { label: province === 'QC' ? 'EI (Quebec rate)' : 'EI', value: result.ei, color: 'bg-red-500' },
                            ].filter(d => d.value > 0).map((deduction, i) => (
                              <div key={i} className="flex justify-between items-center text-sm">
                                <span className="flex items-center gap-2 text-muted-foreground">
                                  <span className={`w-2 h-2 rounded-full ${deduction.color}`} />
                                  {deduction.label}
                                </span>
                                <span className="text-red-600 dark:text-red-400 font-medium">
                                  -<AnimatedAmount value={deduction.value} prefix="" className="" />
                                </span>
                              </div>
                            ))}

                            <div className="flex justify-between items-center pt-2 border-t text-sm">
                              <span className="text-muted-foreground font-medium">Total Deductions</span>
                              <span className="text-red-600 dark:text-red-400 font-bold">
                                -<AnimatedAmount value={result.totalDeductions} prefix="" className="" />
                              </span>
                            </div>

                            {/* Net */}
                            <div className="flex justify-between items-center pt-3 border-t-2 border-primary/20">
                              <span className="flex items-center gap-2 font-bold">
                                <Wallet className="w-4 h-4 text-green-500" />
                                Annual Net Pay
                              </span>
                              <AnimatedAmount value={result.netAnnual} className="font-bold text-lg text-green-600 dark:text-green-400" />
                            </div>

                            {/* Rates */}
                            <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                              <div className="text-center p-3 rounded-lg bg-muted/50">
                                <div className="text-lg font-bold">{result.effectiveRate.toFixed(1)}%</div>
                                <div className="text-[10px] text-muted-foreground">Effective Tax Rate</div>
                              </div>
                              <div className="text-center p-3 rounded-lg bg-muted/50">
                                <div className="text-lg font-bold">{result.marginalRate.toFixed(1)}%</div>
                                <div className="text-[10px] text-muted-foreground">Marginal Tax Rate</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Donut chart */}
                    <div>
                      <Card className="h-full">
                        <CardContent className="p-6 flex flex-col justify-center h-full">
                          <h3 className="font-bold mb-4 text-center text-sm">Where Your Money Goes</h3>
                          <DeductionDonut result={result} />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>

                {/* All frequencies table */}
                <motion.div {...fadeUp} className="mt-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-4">Net Pay by Frequency</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="text-left p-2.5 font-semibold">Period</th>
                              <th className="text-right p-2.5 font-semibold">Gross</th>
                              <th className="text-right p-2.5 font-semibold">Deductions</th>
                              <th className="text-right p-2.5 font-semibold text-green-600 dark:text-green-400">Net Pay</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(PAY_FREQUENCIES).map(([key, data]) => (
                              <tr key={key} className={`border-b last:border-0 ${key === frequency ? 'bg-primary/5 font-semibold' : 'hover:bg-muted/30'} transition-colors`}>
                                <td className="p-2.5">{data.label}</td>
                                <td className="p-2.5 text-right">${(result.grossAnnual / data.divisor).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className="p-2.5 text-right text-red-500">-${(result.totalDeductions / data.divisor).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className="p-2.5 text-right text-green-600 dark:text-green-400">${(result.netAnnual / data.divisor).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Disclaimer */}
                <motion.div {...fadeUp} className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>
                    This calculator provides estimates based on 2026 federal and provincial tax brackets, CPP/CPP2, and EI rates. It assumes employment income only, uses the basic personal amount, and does not account for RRSP contributions, union dues, benefits, other deductions, or tax credits. Quebec employees are subject to QPP/QPIP rates that may differ slightly. Consult a tax professional for precise calculations. Data sourced from CRA, KPMG, and provincial government publications.
                  </p>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp} className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need help with compensation planning?</h2>
            <p className="text-white/80 mb-8 leading-relaxed text-sm">
              Our platform automates payroll calculations, salary benchmarking, and total compensation analysis across every Canadian province.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/compliance-checker">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto font-semibold">
                  <Shield className="mr-2 w-5 h-5" />
                  Check Your Compliance
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
