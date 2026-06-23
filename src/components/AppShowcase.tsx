import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Network, BarChart3, ShieldCheck, FileSignature, ClipboardList,
  Check, ChevronDown, User, Users,
} from 'lucide-react';

/* ---------- shared chrome wrapper --------- */
function BrowserChrome({ children, url }: { children: React.ReactNode; url?: string }) {
  return (
    <div className="rounded-xl border bg-card shadow-xl overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b bg-muted/40">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 text-[11px] text-muted-foreground/70 font-mono truncate">
          {url ?? 'app.precisehr.ca'}
        </span>
      </div>
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        {children}
      </div>
    </div>
  );
}

/* ============================================
   1. ORG CHART MOCKUP
   ============================================ */
function OrgChartMockup() {
  const box = (name: string, role: string, highlight?: boolean) => (
    <div
      className={`rounded-lg border px-3 py-2 text-center shadow-sm min-w-[90px] sm:min-w-[110px] ${
        highlight
          ? 'bg-primary/10 border-primary/30 dark:bg-primary/20'
          : 'bg-white dark:bg-slate-800 border-border'
      }`}
    >
      <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-1">
        <User className="w-3.5 h-3.5 text-primary" />
      </div>
      <p className="text-xs font-semibold text-foreground leading-tight">{name}</p>
      <p className="text-[10px] text-muted-foreground">{role}</p>
    </div>
  );

  return (
    <BrowserChrome url="app.precisehr.ca/org-chart">
      <div className="p-4 sm:p-6 min-h-[320px] flex flex-col items-center overflow-x-auto">
        {/* Top bar */}
        <div className="w-full flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Organization Chart</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">12 Employees</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-medium">2 Open Roles</span>
          </div>
        </div>

        {/* Tree */}
        <div className="flex flex-col items-center gap-0">
          {box('Sarah Chen', 'CEO', true)}
          <div className="w-px h-5 bg-border" />
          <div className="flex items-start gap-4 sm:gap-8 relative">
            {/* horizontal connector */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-110px)] h-px bg-border" />
            {[
              { name: 'James Park', role: 'VP Engineering' },
              { name: 'Priya Sharma', role: 'VP People' },
              { name: 'Marc Dupont', role: 'VP Sales' },
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-px h-5 bg-border" />
                {box(p.name, p.role)}
                {i === 0 && (
                  <>
                    <div className="w-px h-4 bg-border" />
                    <div className="flex gap-4">
                      {box('Lin Wei', 'Sr. Developer')}
                      <div className="rounded-lg border border-dashed border-primary/40 px-3 py-2 text-center min-w-[90px] sm:min-w-[110px] bg-primary/5">
                        <div className="w-7 h-7 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center mx-auto mb-1">
                          <Users className="w-3.5 h-3.5 text-primary/50" />
                        </div>
                        <p className="text-[10px] font-medium text-primary/70">Open Role</p>
                        <p className="text-[10px] text-muted-foreground">Developer</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ============================================
   2. PAYROLL DASHBOARD MOCKUP
   ============================================ */
function PayrollMockup() {
  const stats = [
    { label: 'Gross Pay', value: '$142,850', sub: 'This period' },
    { label: 'Net Pay', value: '$108,360', sub: 'After deductions' },
    { label: 'Employees', value: '24', sub: 'Active payroll' },
  ];

  const deductions = [
    { label: 'CPP', amount: '$4,280.50', pct: 62 },
    { label: 'EI', amount: '$2,134.20', pct: 31 },
    { label: 'Fed. Tax', amount: '$18,420.00', pct: 85 },
    { label: 'Prov. Tax', amount: '$9,655.30', pct: 55 },
  ];

  return (
    <BrowserChrome url="app.precisehr.ca/payroll">
      <div className="p-5 min-h-[320px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Payroll Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white dark:bg-slate-800 border rounded-md px-2.5 py-1 shadow-sm">
            Jun 1 - Jun 15, 2026 <ChevronDown className="w-3 h-3" />
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {stats.map((s, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-lg border p-3 shadow-sm">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Deduction bars */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border p-4 shadow-sm">
          <p className="text-xs font-semibold text-foreground mb-3">Deduction Breakdown</p>
          <div className="space-y-2.5">
            {deductions.map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[11px] text-muted-foreground w-16 shrink-0">{d.label}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary/70"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <span className="text-[11px] font-medium text-foreground w-20 text-right">{d.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ============================================
   3. COMPLIANCE TRACKING MOCKUP
   ============================================ */
function ComplianceMockup() {
  const items = [
    { rule: 'Minimum wage updated', status: 'done' },
    { rule: 'Overtime policy reviewed', status: 'done' },
    { rule: 'Vacation accrual compliant', status: 'done' },
    { rule: 'Statutory holiday schedule', status: 'warn' },
    { rule: 'Termination notice periods', status: 'done' },
    { rule: 'Pregnancy/parental leave policy', status: 'pending' },
  ];

  return (
    <BrowserChrome url="app.precisehr.ca/compliance">
      <div className="p-5 min-h-[320px]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">ESA Compliance Tracker</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white dark:bg-slate-800 border rounded-md px-2.5 py-1 shadow-sm">
            Ontario <ChevronDown className="w-3 h-3" />
          </div>
        </div>

        {/* Score card */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border p-4 shadow-sm mb-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border-4 border-emerald-400 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">83%</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Compliance Score</p>
            <p className="text-[11px] text-muted-foreground">5 of 6 requirements met for Ontario ESA</p>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border shadow-sm divide-y">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5">
              {item.status === 'done' ? (
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                </div>
              ) : item.status === 'warn' ? (
                <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">!</span>
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0" />
              )}
              <span className="text-xs text-foreground">{item.rule}</span>
              {item.status === 'done' && (
                <span className="ml-auto text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Compliant</span>
              )}
              {item.status === 'warn' && (
                <span className="ml-auto text-[10px] text-amber-600 dark:text-amber-400 font-medium">Review needed</span>
              )}
              {item.status === 'pending' && (
                <span className="ml-auto text-[10px] text-muted-foreground font-medium">Not started</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ============================================
   4. DOCUMENTS & E-SIGNATURES MOCKUP
   ============================================ */
function DocumentsMockup() {
  const docs = [
    { name: 'Employment Agreement - L. Wei', type: 'Contract', status: 'Signed', statusColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' },
    { name: 'Offer Letter - A. Nguyen', type: 'Offer', status: 'Pending', statusColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' },
    { name: 'NDA - M. Rodriguez', type: 'Legal', status: 'Signed', statusColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' },
    { name: 'Remote Work Policy', type: 'Policy', status: 'Draft', statusColor: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' },
    { name: 'Benefits Enrollment - J. Park', type: 'Benefits', status: 'Pending', statusColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' },
  ];

  return (
    <BrowserChrome url="app.precisehr.ca/documents">
      <div className="p-5 min-h-[320px]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <FileSignature className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Documents & E-Signatures</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-medium">2 Signed</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 font-medium">2 Pending</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_80px_70px] gap-2 px-4 py-2.5 bg-muted/50 border-b text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Document</span>
            <span>Type</span>
            <span className="text-right">Status</span>
          </div>
          {docs.map((doc, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_80px_70px] gap-2 px-4 py-2.5 items-center ${
                i < docs.length - 1 ? 'border-b border-border/50' : ''
              } ${i % 2 === 1 ? 'bg-muted/20' : ''}`}
            >
              <span className="text-xs text-foreground truncate">{doc.name}</span>
              <span className="text-[10px] text-muted-foreground">{doc.type}</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full text-right w-fit ml-auto ${doc.statusColor}`}>
                {doc.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ============================================
   5. EMPLOYEE ONBOARDING MOCKUP
   ============================================ */
function OnboardingMockup() {
  const steps = [
    { label: 'Personal information', done: true },
    { label: 'Tax forms (TD1 Federal & Provincial)', done: true },
    { label: 'Direct deposit setup', done: true },
    { label: 'Sign employment agreement', done: false, active: true },
    { label: 'Emergency contacts', done: false },
    { label: 'IT equipment request', done: false },
    { label: 'Welcome orientation', done: false },
  ];
  const completed = steps.filter((s) => s.done).length;
  const pct = Math.round((completed / steps.length) * 100);

  return (
    <BrowserChrome url="app.precisehr.ca/onboarding">
      <div className="p-5 min-h-[320px]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Employee Onboarding</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
            New Hire: Anika Nguyen
          </span>
        </div>

        {/* Progress */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-foreground">Onboarding Progress</p>
            <span className="text-xs font-bold text-primary">{pct}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5">{completed} of {steps.length} steps completed</p>
        </div>

        {/* Steps */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border shadow-sm divide-y">
          {steps.map((step, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-2.5 ${step.active ? 'bg-primary/5' : ''}`}>
              {step.done ? (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
              ) : step.active ? (
                <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary/10 shrink-0 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/25 shrink-0" />
              )}
              <span className={`text-xs ${step.done ? 'text-muted-foreground line-through' : step.active ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                {step.label}
              </span>
              {step.active && (
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-primary text-white font-medium">In Progress</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ============================================
   TABS CONFIG
   ============================================ */
const SHOWCASE_TABS = [
  {
    key: 'orgchart',
    icon: Network,
    label: 'Org Chart',
    title: 'Plan your org, visually',
    desc: 'Drag-and-drop reporting lines, model headcount, and see open roles at a glance. Your whole company structure on one interactive canvas.',
    Mockup: OrgChartMockup,
  },
  {
    key: 'payroll',
    icon: BarChart3,
    label: 'Payroll Dashboard',
    title: 'Payroll-ready, built for Canada',
    desc: 'CPP, EI, federal and provincial tax deductions calculated automatically. See the full picture for every pay period before you run payroll.',
    Mockup: PayrollMockup,
  },
  {
    key: 'compliance',
    icon: ShieldCheck,
    label: 'Compliance',
    title: 'Stay on the right side of the ESA',
    desc: 'Province-by-province employment standards tracking with a live compliance score. Get flagged on what needs attention before it becomes a problem.',
    Mockup: ComplianceMockup,
  },
  {
    key: 'documents',
    icon: FileSignature,
    label: 'Documents & E-Sign',
    title: 'Send, sign, done',
    desc: 'Generate offer letters, contracts, and policies from templates. Collect legally binding e-signatures without leaving the platform.',
    Mockup: DocumentsMockup,
  },
  {
    key: 'onboarding',
    icon: ClipboardList,
    label: 'Onboarding',
    title: 'Onboard new hires without the chaos',
    desc: 'Guided checklists walk every new hire through tax forms, documents, and equipment requests. You see progress in real time.',
    Mockup: OnboardingMockup,
  },
];

/* ============================================
   EXPORTED SECTION
   ============================================ */
export default function AppShowcase() {
  const [active, setActive] = useState(0);
  const tab = SHOWCASE_TABS[active];
  const TabIcon = tab.icon;

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">See what's inside</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Canadian HR teams</h2>
          <p className="text-muted-foreground text-lg">
            Everything your people team needs — org charts, payroll, compliance, documents, and onboarding — in one platform that actually looks like it was made this decade.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SHOWCASE_TABS.map((t, i) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setActive(i)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  i === active
                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                    : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content: mockup left, description right */}
        <div className="grid lg:grid-cols-5 gap-8 items-center max-w-6xl mx-auto">
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.key}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <tab.Mockup />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.key}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <TabIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{tab.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{tab.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
