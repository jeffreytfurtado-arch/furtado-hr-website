import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  Shield,
  Calendar,
  MapPin,
  DollarSign,
  Phone,
  Clock,
  ChevronDown,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useRef, useEffect, useMemo } from 'react';

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

/* ── Holiday Data ── */
interface Holiday {
  name: string;
  date: string; // ISO date
  displayDate: string;
  dayOfWeek: string;
  scope: 'federal' | 'provincial' | 'both';
  provinces: string[]; // abbreviations
  alternateNames?: Record<string, string>; // province-specific names
  payRule: string;
  notes?: string;
}

const ALL_PROVS = ['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT','FED'];

const holidays: Holiday[] = [
  {
    name: 'New Year\'s Day',
    date: '2026-01-01', displayDate: 'January 1', dayOfWeek: 'Thursday',
    scope: 'both', provinces: [...ALL_PROVS],
    payRule: 'Paid day off. If worked: regular wages + holiday pay (typically 1.5x). Qualifications vary by province.',
  },
  {
    name: 'Family Day',
    date: '2026-02-16', displayDate: 'February 16', dayOfWeek: 'Monday',
    scope: 'provincial',
    provinces: ['AB','BC','NB','ON','SK'],
    alternateNames: { 'MB': 'Louis Riel Day', 'PE': 'Islander Day', 'NS': 'Heritage Day' },
    payRule: 'Paid day off. If worked: holiday premium pay applies. Not observed in QC, NL, NT, NU, YT, or federally.',
    notes: 'Known as Louis Riel Day (MB), Islander Day (PE), Heritage Day (NS)',
  },
  {
    name: 'Louis Riel Day',
    date: '2026-02-16', displayDate: 'February 16', dayOfWeek: 'Monday',
    scope: 'provincial', provinces: ['MB'],
    payRule: 'Paid day off with holiday premium if worked.',
  },
  {
    name: 'Islander Day',
    date: '2026-02-16', displayDate: 'February 16', dayOfWeek: 'Monday',
    scope: 'provincial', provinces: ['PE'],
    payRule: 'Paid day off with holiday premium if worked.',
  },
  {
    name: 'Heritage Day',
    date: '2026-02-16', displayDate: 'February 16', dayOfWeek: 'Monday',
    scope: 'provincial', provinces: ['NS'],
    payRule: 'Paid day off with holiday premium if worked.',
  },
  {
    name: 'St. Patrick\'s Day',
    date: '2026-03-17', displayDate: 'March 17', dayOfWeek: 'Tuesday',
    scope: 'provincial', provinces: ['NL'],
    payRule: 'Provincial holiday in NL only. Paid day off with premium if worked.',
  },
  {
    name: 'Good Friday',
    date: '2026-04-03', displayDate: 'April 3', dayOfWeek: 'Friday',
    scope: 'both', provinces: [...ALL_PROVS],
    payRule: 'Paid day off in all jurisdictions. If worked: premium pay (1.5x in most provinces). Creates a long weekend with Easter.',
    notes: 'In QC, employers must give either Good Friday OR Easter Monday.',
  },
  {
    name: 'Easter Monday',
    date: '2026-04-06', displayDate: 'April 6', dayOfWeek: 'Monday',
    scope: 'provincial', provinces: ['QC','FED'],
    payRule: 'Not a statutory holiday in most provinces. Federal employees and QC employers observe it. QC: must give Good Friday OR Easter Monday.',
    notes: 'Optional for most provinces. Federal and QC only.',
  },
  {
    name: 'St. George\'s Day',
    date: '2026-04-20', displayDate: 'April 20', dayOfWeek: 'Monday',
    scope: 'provincial', provinces: ['NL'],
    payRule: 'Provincial holiday in NL only. Observed nearest Monday.',
  },
  {
    name: 'Victoria Day',
    date: '2026-05-18', displayDate: 'May 18', dayOfWeek: 'Monday',
    scope: 'both', provinces: ['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','SK','YT','FED'],
    alternateNames: { 'QC': 'National Patriots\' Day' },
    payRule: 'Paid day off. If worked: holiday premium. Monday before May 25. Not observed in NS or PE in some cases.',
    notes: 'Called National Patriots\' Day in Quebec.',
  },
  {
    name: 'National Patriots\' Day',
    date: '2026-05-18', displayDate: 'May 18', dayOfWeek: 'Monday',
    scope: 'provincial', provinces: ['QC'],
    payRule: 'Paid day off. Same date as Victoria Day. Quebec-specific observance.',
  },
  {
    name: 'National Indigenous Peoples Day',
    date: '2026-06-21', displayDate: 'June 21', dayOfWeek: 'Sunday',
    scope: 'provincial', provinces: ['NT','YT'],
    payRule: 'Statutory in NT and YT. Federal employees may observe. Falls on Sunday in 2026 — check for substitute Monday.',
  },
  {
    name: 'Discovery Day (NL)',
    date: '2026-06-22', displayDate: 'June 22', dayOfWeek: 'Monday',
    scope: 'provincial', provinces: ['NL'],
    payRule: 'Provincial holiday in NL only. Nearest Monday observance.',
  },
  {
    name: 'St. Jean Baptiste Day',
    date: '2026-06-24', displayDate: 'June 24', dayOfWeek: 'Wednesday',
    scope: 'provincial', provinces: ['QC'],
    payRule: 'Major provincial statutory holiday in Quebec. Paid day off. If worked: premium pay. Mid-week in 2026.',
    notes: 'One of Quebec\'s most significant holidays.',
  },
  {
    name: 'Canada Day',
    date: '2026-07-01', displayDate: 'July 1', dayOfWeek: 'Wednesday',
    scope: 'both', provinces: [...ALL_PROVS],
    payRule: 'Paid day off. If worked: holiday premium pay. Mid-week in 2026. QC: also coincides with Moving Day.',
    notes: 'Falls on a Wednesday — no automatic long weekend. In QC, overlaps with Moving Day.',
  },
  {
    name: 'Orangemen\'s Day',
    date: '2026-07-13', displayDate: 'July 13', dayOfWeek: 'Monday',
    scope: 'provincial', provinces: ['NL'],
    payRule: 'Provincial holiday in NL. July 12 falls on Sunday, observed Monday July 13.',
  },
  {
    name: 'Civic Holiday',
    date: '2026-08-03', displayDate: 'August 3', dayOfWeek: 'Monday',
    scope: 'provincial',
    provinces: ['AB','BC','MB','NB','NS','NT','NU','ON','PE','SK','YT'],
    alternateNames: { 'AB': 'Heritage Day', 'BC': 'British Columbia Day', 'NB': 'New Brunswick Day', 'SK': 'Saskatchewan Day' },
    payRule: 'First Monday in August. Statutory in some provinces, optional in others. Varies significantly — check your province.',
    notes: 'Different names by province: Heritage Day (AB), BC Day (BC), New Brunswick Day (NB), Saskatchewan Day (SK). Optional in ON.',
  },
  {
    name: 'Discovery Day (YT)',
    date: '2026-08-17', displayDate: 'August 17', dayOfWeek: 'Monday',
    scope: 'provincial', provinces: ['YT'],
    payRule: 'Yukon territorial holiday. Third Monday in August.',
  },
  {
    name: 'Labour Day',
    date: '2026-09-07', displayDate: 'September 7', dayOfWeek: 'Monday',
    scope: 'both', provinces: [...ALL_PROVS],
    payRule: 'Paid day off in all jurisdictions. If worked: premium pay (1.5x). First Monday in September.',
  },
  {
    name: 'National Day for Truth & Reconciliation',
    date: '2026-09-30', displayDate: 'September 30', dayOfWeek: 'Wednesday',
    scope: 'both', provinces: ['BC','MB','PE','NT','NU','YT','FED'],
    payRule: 'Federal statutory holiday. Statutory in BC, MB, PE, NT, NU, YT. NOT statutory in AB, SK, ON, QC, NB, NS, NL. Mid-week in 2026.',
    notes: 'Also known as Orange Shirt Day. Provincial adoption varies.',
  },
  {
    name: 'Thanksgiving',
    date: '2026-10-12', displayDate: 'October 12', dayOfWeek: 'Monday',
    scope: 'both',
    provinces: ['AB','BC','MB','NT','NU','ON','QC','SK','YT','FED'],
    payRule: 'Paid day off. If worked: premium pay. Second Monday in October. Not statutory in NS, NL, NB, PE.',
    notes: 'Not observed in Atlantic provinces (NS, NL, NB, PE).',
  },
  {
    name: 'Remembrance Day',
    date: '2026-11-11', displayDate: 'November 11', dayOfWeek: 'Wednesday',
    scope: 'both',
    provinces: ['AB','BC','NB','NL','NT','NU','PE','SK','YT','FED'],
    payRule: 'Federal statutory. Statutory in most provinces except ON, NS, MB, QC. If worked: premium pay. Mid-week in 2026.',
    notes: 'Not a statutory paid holiday in ON, NS, MB, QC for private sector.',
  },
  {
    name: 'Christmas Day',
    date: '2026-12-25', displayDate: 'December 25', dayOfWeek: 'Friday',
    scope: 'both', provinces: [...ALL_PROVS],
    payRule: 'Paid day off in all jurisdictions. If worked: premium pay (1.5x or higher). Falls on Friday — automatic long weekend.',
    notes: 'Friday in 2026 — automatic 3-day weekend with Boxing Day Saturday.',
  },
  {
    name: 'Boxing Day',
    date: '2026-12-26', displayDate: 'December 26', dayOfWeek: 'Saturday',
    scope: 'both', provinces: ['ON','NL','NT','FED'],
    payRule: 'Statutory in ON, NL, NT, and federally. Falls on Saturday — substitute day likely Monday Dec 28 for Mon-Fri workers.',
    notes: 'Saturday in 2026. Many provinces observe informally. Substitute Monday Dec 28 for standard schedules.',
  },
];

const PROVINCE_MAP: Record<string, string> = {
  'AB': 'Alberta', 'BC': 'British Columbia', 'MB': 'Manitoba', 'NB': 'New Brunswick',
  'NL': 'Newfoundland & Labrador', 'NS': 'Nova Scotia', 'NT': 'Northwest Territories',
  'NU': 'Nunavut', 'ON': 'Ontario', 'PE': 'Prince Edward Island', 'QC': 'Quebec',
  'SK': 'Saskatchewan', 'YT': 'Yukon', 'FED': 'Federal',
};

const PROVINCE_OPTIONS = Object.entries(PROVINCE_MAP).sort((a, b) => a[1].localeCompare(b[1]));

/* ── Pay Calculator ── */
function PayCalculator({ holiday }: { holiday: Holiday }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hourlyRate, setHourlyRate] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');

  const rate = parseFloat(hourlyRate) || 0;
  const hours = parseFloat(hoursWorked) || 0;
  const holidayPay = rate * 8; // standard day's pay
  const premiumPay = rate * 1.5 * hours;
  const totalPay = holidayPay + premiumPay;

  return (
    <div className="mt-3 pt-3 border-t border-border/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
      >
        <Calculator className="w-3.5 h-3.5" />
        {isOpen ? 'Hide' : 'Calculate'} Holiday Pay
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-3 bg-muted/50 rounded-xl p-4"
        >
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[10px] font-medium text-muted-foreground block mb-1">Hourly Rate ($)</label>
              <Input
                type="number"
                step="0.01"
                placeholder="e.g. 25.00"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-muted-foreground block mb-1">Hours Worked on Holiday</label>
              <Input
                type="number"
                step="0.5"
                placeholder="e.g. 8"
                value={hoursWorked}
                onChange={(e) => setHoursWorked(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
          </div>
          {rate > 0 && (
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Holiday pay (8 hrs × ${rate.toFixed(2)})</span>
                <span className="font-medium">${holidayPay.toFixed(2)}</span>
              </div>
              {hours > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Premium pay ({hours} hrs × ${(rate * 1.5).toFixed(2)})</span>
                  <span className="font-medium">${premiumPay.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-1.5 border-t font-bold text-sm">
                <span>Total</span>
                <span className="text-primary">${totalPay.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                * Estimate based on 1.5x premium. Actual rates vary by province, collective agreements, and employment type. Consult your provincial employment standards for exact calculations.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

/* ── Holiday Card ── */
function HolidayCard({ holiday, index }: { holiday: Holiday; index: number }) {
  const { ref, inView } = useInView();
  const today = new Date();
  const holidayDate = new Date(holiday.date + 'T00:00:00');
  const diffDays = Math.ceil((holidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  let badge = '';
  let badgeClass = '';
  if (diffDays < 0) {
    badge = 'Passed';
    badgeClass = 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';
  } else if (diffDays <= 7) {
    badge = 'This Week';
    badgeClass = 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400';
  } else if (diffDays <= 30) {
    badge = 'Upcoming';
    badgeClass = 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400';
  } else {
    badge = `${diffDays} days away`;
    badgeClass = 'bg-primary/10 text-primary';
  }

  const isPassed = diffDays < 0;
  const isNext = !isPassed && index === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${
        isPassed ? 'opacity-60' : isNext ? 'border-primary/40 shadow-lg shadow-primary/5' : ''
      }`}>
        {isNext && <div className="h-1 bg-gradient-to-r from-primary via-cyan-500 to-primary" />}
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-bold text-base">{holiday.name}</h3>
                {isNext && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-primary text-white">Next Holiday</span>}
              </div>
              <p className="text-sm text-muted-foreground">
                {holiday.dayOfWeek}, {holiday.displayDate}, 2026
              </p>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${badgeClass}`}>
              {badge}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              holiday.scope === 'both' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' :
              holiday.scope === 'federal' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400' :
              'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400'
            }`}>
              {holiday.scope === 'both' ? 'Federal + Provincial' : holiday.scope === 'federal' ? 'Federal' : 'Provincial'}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {holiday.provinces.length === ALL_PROVS.length ? 'All jurisdictions' :
                holiday.provinces.map(p => p).join(', ')}
            </span>
          </div>

          <div className="flex items-start gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">{holiday.payRule}</p>
          </div>

          {holiday.notes && (
            <div className="flex items-start gap-2 mt-2">
              <Info className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-muted-foreground">{holiday.notes}</p>
            </div>
          )}

          {!isPassed && <PayCalculator holiday={holiday} />}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function StatutoryHolidaysPage() {
  const [selectedProvince, setSelectedProvince] = useState('ON');

  const filteredHolidays = useMemo(() => {
    return holidays
      .filter(h => h.provinces.includes(selectedProvince))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [selectedProvince]);

  const today = new Date().toISOString().split('T')[0];
  const upcomingHolidays = filteredHolidays.filter(h => h.date >= today);
  const passedHolidays = filteredHolidays.filter(h => h.date < today);
  const sortedHolidays = [...upcomingHolidays, ...passedHolidays];

  // Year-at-a-glance data
  const comparisonProvs = ['ON', 'BC', 'AB', 'QC', 'MB', 'NS', 'NL', 'FED'];
  const uniqueHolidayDates = [...new Set(holidays.map(h => h.date))].sort();
  const uniqueHolidaysByDate = uniqueHolidayDates.map(date => {
    const hs = holidays.filter(h => h.date === date);
    const name = hs[0].name;
    return { date, name, displayDate: hs[0].displayDate, holidays: hs };
  });

  return (
    <div className="flex flex-col">
      <SEO title="Canadian Statutory Holidays 2026" description="Complete list of statutory holidays for every Canadian province in 2026. Holiday pay calculator, upcoming dates, and province-by-province comparison." path="/statutory-holidays" />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm mb-6 backdrop-blur-sm">
              <Calendar className="w-3.5 h-3.5 text-cyan-300" />
              2026 Complete Guide
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Canadian Statutory
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">Holiday Calendar</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Every statutory holiday for your province, with pay rules and a built-in calculator. Select your province and plan your year.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Province selector + stats */}
      <section className="border-b bg-card sticky top-16 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-primary" />
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="h-10 pl-3 pr-8 rounded-lg border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {PROVINCE_OPTIONS.map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-6 text-sm">
              <span className="text-muted-foreground">
                <strong className="text-foreground">{filteredHolidays.length}</strong> holidays
              </span>
              <span className="text-muted-foreground">
                <strong className="text-green-600 dark:text-green-400">{upcomingHolidays.length}</strong> upcoming
              </span>
              <span className="text-muted-foreground">
                Next: <strong className="text-primary">{upcomingHolidays[0]?.name || 'None'}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Holiday cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp} className="mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {PROVINCE_MAP[selectedProvince]} — 2026 Holidays
              </h2>
              <p className="text-sm text-muted-foreground">
                {upcomingHolidays.length} upcoming statutory holidays. Click "Calculate Holiday Pay" on any upcoming holiday to estimate earnings.
              </p>
            </motion.div>

            <div className="grid gap-4">
              {sortedHolidays.map((holiday, i) => (
                <HolidayCard key={holiday.date + holiday.name} holiday={holiday} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Year at a glance — province comparison */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Province Comparison</h2>
              <p className="text-sm text-muted-foreground">
                Which provinces observe which holidays — at a glance. Useful for multi-province employers.
              </p>
            </motion.div>

            <motion.div {...fadeUp}>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-2.5 font-semibold sticky left-0 bg-muted/50 min-w-[160px]">Holiday</th>
                        <th className="p-2.5 font-semibold text-center min-w-[44px]">Date</th>
                        {comparisonProvs.map(p => (
                          <th key={p} className={`p-2.5 font-semibold text-center min-w-[36px] ${p === selectedProvince ? 'bg-primary/10 text-primary' : ''}`}>{p}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {uniqueHolidaysByDate.map((row, i) => (
                        <tr key={row.date} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-2.5 font-medium sticky left-0 bg-card">{row.name}</td>
                          <td className="p-2.5 text-center text-muted-foreground whitespace-nowrap">{row.displayDate}</td>
                          {comparisonProvs.map(prov => {
                            const observed = row.holidays.some(h => h.provinces.includes(prov));
                            return (
                              <td key={prov} className={`p-2.5 text-center ${prov === selectedProvince ? 'bg-primary/5' : ''}`}>
                                {observed ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                                ) : (
                                  <span className="text-muted-foreground/30">—</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>

            <motion.div {...fadeUp} className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                Some holidays like the Civic Holiday (August) are not statutory in all provinces but are commonly observed. The table shows statutory obligations only. Provincial rules for substitute days, eligibility, and premium pay differ — contact us for jurisdiction-specific guidance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#001d3d] via-primary to-[#003566] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp} className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Managing holiday pay across provinces?
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed text-sm">
              Our platform automates holiday pay calculations, tracks provincial differences, and ensures your payroll stays compliant — across every jurisdiction you operate in.
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
