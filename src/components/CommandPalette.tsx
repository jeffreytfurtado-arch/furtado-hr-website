import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, CornerDownLeft, Home, Info, Briefcase, Sparkles, FlaskConical, Mail, BookOpen,
  FileBarChart, FolderOpen, User, Shield, FileText, FileSignature, ScanSearch, Calculator,
  ClipboardCheck, TrendingUp, UserMinus, DollarSign, Bell, Calendar, Phone, Moon,
} from 'lucide-react';

type Item = {
  label: string;
  group: string;
  icon: any;
  keywords?: string;
  to?: string;
  href?: string;
  action?: () => void;
};

const CALENDLY = 'https://calendly.com/precisehr-info/precisehr-consult';

function toggleTheme() {
  const root = document.documentElement;
  const next = !root.classList.contains('dark');
  root.classList.toggle('dark', next);
  try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch { /* ignore */ }
}

const ITEMS: Item[] = [
  // Pages
  { label: 'Home', group: 'Pages', icon: Home, to: '/' },
  { label: 'About', group: 'Pages', icon: Info, to: '/about', keywords: 'company team' },
  { label: 'Services', group: 'Pages', icon: Briefcase, to: '/services', keywords: 'hr consulting fractional' },
  { label: 'AI Consulting', group: 'Pages', icon: Sparkles, to: '/ai', keywords: 'artificial intelligence automation' },
  { label: 'Live AI Demos', group: 'Pages', icon: FlaskConical, to: '/ai/demos', keywords: 'labs demo data unification' },
  { label: 'PreciseHR App & Pricing', group: 'Pages', icon: Sparkles, to: '/app', keywords: 'pricing hris software waitlist product early access' },
  { label: 'HR Services by Province', group: 'Pages', icon: Briefcase, to: '/hr-services', keywords: 'province ontario bc alberta quebec location near me' },
  { label: 'Contact', group: 'Pages', icon: Mail, to: '/contact' },
  { label: 'Blog', group: 'Pages', icon: BookOpen, to: '/blog', keywords: 'articles insights' },
  { label: 'Case Studies', group: 'Pages', icon: FileBarChart, to: '/case-studies', keywords: 'results clients' },
  { label: 'HR Resources', group: 'Pages', icon: FolderOpen, to: '/resources', keywords: 'templates guides' },
  { label: 'Jeffrey T. Furtado', group: 'Pages', icon: User, to: '/about/jeffrey-furtado', keywords: 'founder managing partner bio' },
  { label: 'David Suckling', group: 'Pages', icon: User, to: '/about/david-suckling', keywords: 'co-founder bio' },
  // AI tools
  { label: 'Policy & Handbook Generator', group: 'AI Tools', icon: FileText, to: '/policy-generator', keywords: 'policy handbook compliance' },
  { label: 'Offer Letter Generator', group: 'AI Tools', icon: FileSignature, to: '/offer-letter', keywords: 'hiring offer' },
  { label: 'Policy Red-Flag Scanner', group: 'AI Tools', icon: ScanSearch, to: '/policy-scanner', keywords: 'audit compliance gaps' },
  { label: 'JD Generator', group: 'AI Tools', icon: Sparkles, to: '/jd-generator', keywords: 'job description' },
  { label: 'Compliance Checker', group: 'AI Tools', icon: Shield, to: '/compliance-checker', keywords: 'compliance gaps' },
  // Calculators & resources
  { label: 'Net Pay Calculator', group: 'Calculators', icon: Calculator, to: '/net-pay-calculator', keywords: 'payroll take home 2026' },
  { label: 'ROI Calculator', group: 'Calculators', icon: Calculator, to: '/roi-calculator', keywords: 'savings outsourcing' },
  { label: 'HR Health Check', group: 'Calculators', icon: ClipboardCheck, to: '/hr-assessment', keywords: 'assessment quiz' },
  { label: 'Salary Benchmarking', group: 'Calculators', icon: TrendingUp, to: '/salary-benchmarking', keywords: 'compensation' },
  { label: 'Turnover Cost Calculator', group: 'Calculators', icon: UserMinus, to: '/turnover-calculator' },
  { label: 'Hiring Cost Calculator', group: 'Calculators', icon: DollarSign, to: '/hiring-calculator', keywords: 'cost per hire' },
  { label: 'Minimum Wage Tracker', group: 'Calculators', icon: DollarSign, to: '/minimum-wage' },
  { label: 'Statutory Holidays', group: 'Calculators', icon: Calendar, to: '/statutory-holidays', keywords: 'stat holiday pay' },
  { label: 'Compliance Updates', group: 'Calculators', icon: Bell, to: '/compliance-updates', keywords: 'law changes' },
  // Actions
  { label: 'Book a free consult', group: 'Actions', icon: Calendar, href: CALENDLY, keywords: 'calendly meeting demo' },
  { label: 'Call (437) 887-2263', group: 'Actions', icon: Phone, href: 'tel:+14378872263' },
  { label: 'Toggle dark mode', group: 'Actions', icon: Moon, action: toggleTheme, keywords: 'theme light' },
];

export default function CommandPalette() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter((i) => `${i.label} ${i.group} ${i.keywords || ''}`.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    function onOpen() { setOpen(true); }
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-command-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-palette', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  useEffect(() => { setActive(0); }, [query]);

  function run(item: Item) {
    setOpen(false);
    if (item.to) navigate(item.to);
    else if (item.href) window.open(item.href, item.href.startsWith('http') ? '_blank' : '_self');
    else if (item.action) item.action();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (results[active]) run(results[active]); }
  }

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  let flatIndex = -1;
  let lastGroup = '';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 bg-black/50 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-xl bg-popover text-popover-foreground rounded-xl border shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-2 px-4 border-b">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, tools, actions…"
            className="flex-1 bg-transparent py-3.5 text-sm focus:outline-none"
          />
          <kbd className="hidden sm:inline text-[10px] font-medium text-muted-foreground border rounded px-1.5 py-0.5">ESC</kbd>
        </div>

        <div ref={listRef} className="max-h-[55vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <p className="px-4 py-6 text-sm text-muted-foreground text-center">No matches for “{query}”.</p>
          )}
          {results.map((item) => {
            flatIndex += 1;
            const idx = flatIndex;
            const Icon = item.icon;
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <div key={item.label}>
                {showGroup && (
                  <p className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{item.group}</p>
                )}
                <button
                  data-idx={idx}
                  onMouseEnter={() => setActive(idx)}
                  onClick={() => run(item)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                    active === idx ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 opacity-80" />
                  <span className="flex-1">{item.label}</span>
                  {active === idx && <CornerDownLeft className="w-3.5 h-3.5 opacity-50" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
