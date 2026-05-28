import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  DollarSign,
  MapPin,
  Clock,
  TrendingUp,
  AlertTriangle,
  Phone,
  Info,
  Calendar,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

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

interface WageData {
  jurisdiction: string;
  abbrev: string;
  currentRate: number;
  effectiveDate: string;
  upcomingRate?: number;
  upcomingDate?: string;
  notes?: string;
  isLowest?: boolean;
  isHighest?: boolean;
}

// Verified as of May 2026 from ADP, GovDocs, and provincial government sources
const wageData: WageData[] = [
  { jurisdiction: 'Nunavut', abbrev: 'NU', currentRate: 19.00, effectiveDate: 'Jan 1, 2024', isHighest: true, notes: 'Highest in Canada — reflects extreme cost of living' },
  { jurisdiction: 'Yukon', abbrev: 'YT', currentRate: 18.51, effectiveDate: 'Apr 1, 2026', notes: 'Adjusted annually based on CPI' },
  { jurisdiction: 'British Columbia', abbrev: 'BC', currentRate: 17.85, effectiveDate: 'Jun 1, 2025', upcomingRate: 18.25, upcomingDate: 'Jun 1, 2026' },
  { jurisdiction: 'Federal', abbrev: 'FED', currentRate: 18.15, effectiveDate: 'Apr 1, 2026', notes: 'Applies to federally regulated industries (banks, telecom, transport, postal)' },
  { jurisdiction: 'Ontario', abbrev: 'ON', currentRate: 17.20, effectiveDate: 'Oct 1, 2025', upcomingRate: 17.60, upcomingDate: 'Oct 1, 2026' },
  { jurisdiction: 'Northwest Territories', abbrev: 'NT', currentRate: 16.95, effectiveDate: 'Sep 1, 2025', notes: 'Adjusted annually' },
  { jurisdiction: 'Nova Scotia', abbrev: 'NS', currentRate: 16.75, effectiveDate: 'Apr 1, 2025', upcomingRate: 17.00, upcomingDate: 'Oct 1, 2026' },
  { jurisdiction: 'Prince Edward Island', abbrev: 'PE', currentRate: 16.00, effectiveDate: 'Apr 1, 2025' },
  { jurisdiction: 'Newfoundland & Labrador', abbrev: 'NL', currentRate: 16.35, effectiveDate: 'Apr 1, 2026' },
  { jurisdiction: 'Quebec', abbrev: 'QC', currentRate: 16.60, effectiveDate: 'May 1, 2026' },
  { jurisdiction: 'Manitoba', abbrev: 'MB', currentRate: 16.00, effectiveDate: 'Oct 1, 2025', upcomingRate: 16.40, upcomingDate: 'Oct 1, 2026' },
  { jurisdiction: 'New Brunswick', abbrev: 'NB', currentRate: 15.90, effectiveDate: 'Apr 1, 2026' },
  { jurisdiction: 'Saskatchewan', abbrev: 'SK', currentRate: 15.00, effectiveDate: 'Oct 1, 2024', notes: 'Tied with Alberta as lowest in Canada' },
  { jurisdiction: 'Alberta', abbrev: 'AB', currentRate: 15.00, effectiveDate: 'Oct 1, 2018', isLowest: true, notes: 'Unchanged since 2018 — lowest in Canada' },
];

const sortedByRate = [...wageData].sort((a, b) => b.currentRate - a.currentRate);
const upcomingChanges = wageData.filter(w => w.upcomingRate).sort((a, b) => {
  if (!a.upcomingDate || !b.upcomingDate) return 0;
  return new Date(a.upcomingDate).getTime() - new Date(b.upcomingDate).getTime();
});

const maxRate = Math.max(...wageData.map(w => w.currentRate));

/* Animated bar */
function WageBar({ data, index }: { data: WageData; index: number }) {
  const { ref, inView } = useInView();
  const widthPercent = (data.currentRate / maxRate) * 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 text-right">
          <span className="text-xs font-bold text-muted-foreground">{data.abbrev}</span>
        </div>
        <div className="flex-1 relative">
          <div className="h-9 bg-muted/50 rounded-lg overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${widthPercent}%` } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full rounded-lg flex items-center justify-end pr-3 ${
                data.isHighest ? 'bg-gradient-to-r from-green-500 to-green-400' :
                data.isLowest ? 'bg-gradient-to-r from-red-400 to-red-300' :
                data.upcomingRate ? 'bg-gradient-to-r from-primary to-cyan-500' :
                'bg-gradient-to-r from-primary/80 to-primary/60'
              }`}
            >
              <span className="text-xs font-bold text-white whitespace-nowrap">${data.currentRate.toFixed(2)}</span>
            </motion.div>
          </div>
        </div>
        <div className="w-28 flex items-center gap-1">
          {data.upcomingRate && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-1.5 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              ${data.upcomingRate.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function MinimumWagePage() {
  const avgRate = (wageData.reduce((sum, w) => sum + w.currentRate, 0) / wageData.length).toFixed(2);
  const federalRate = wageData.find(w => w.abbrev === 'FED')?.currentRate.toFixed(2);

  return (
    <div className="flex flex-col">
      <SEO title="Canadian Minimum Wage Tracker 2026" description="Current minimum wage rates for all Canadian provinces and territories. Compare rates and see upcoming increases." path="/minimum-wage" />
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
              <DollarSign className="w-3.5 h-3.5 text-cyan-300" />
              Updated for 2026
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Canadian Minimum Wage
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">Tracker</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Current rates across all 13 provinces and territories, plus upcoming scheduled increases. Updated as changes are announced.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key stats */}
      <section className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Highest Rate', value: `$${maxRate.toFixed(2)}`, sub: 'Nunavut' },
              { label: 'Lowest Rate', value: '$15.00', sub: 'Alberta / Saskatchewan' },
              { label: 'Federal Rate', value: `$${federalRate}`, sub: 'Regulated industries' },
              { label: 'Upcoming Changes', value: String(upcomingChanges.length), sub: 'Scheduled for 2026' },
            ].map((stat, i) => (
              <motion.div key={i} {...fadeUp} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-0.5">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bar chart */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp} className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Rates by Jurisdiction</h2>
              <p className="text-sm text-muted-foreground">
                Current minimum hourly wage across Canada, sorted highest to lowest. Green arrows indicate scheduled increases.
              </p>
            </motion.div>

            <div className="space-y-2">
              {sortedByRate.map((data, i) => (
                <WageBar key={data.abbrev} data={data} index={i} />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-400" /> Highest</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary" /> Upcoming increase</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary/60" /> Standard</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-300" /> Lowest</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming changes */}
      {upcomingChanges.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div {...fadeUp} className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold">Upcoming Changes</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Scheduled minimum wage increases for the rest of 2026. Plan your compensation adjustments now.
                </p>
              </motion.div>

              <div className="grid gap-4">
                {upcomingChanges.map((change, i) => (
                  <motion.div
                    key={change.abbrev}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <Card className="overflow-hidden border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <MapPin className="w-4 h-4 text-primary" />
                              <h3 className="font-bold">{change.jurisdiction}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              ${change.currentRate.toFixed(2)} → <span className="font-semibold text-green-600 dark:text-green-400">${change.upcomingRate?.toFixed(2)}</span>
                              <span className="ml-2 text-xs">(+${((change.upcomingRate || 0) - change.currentRate).toFixed(2)}/hr)</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Effective</div>
                            <div className="font-semibold text-sm">{change.upcomingDate}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div {...fadeUp} className="mt-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Employer Action Required</p>
                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                      Employers must update payroll systems before each effective date. Failure to pay the updated minimum wage is a violation of provincial employment standards and can result in fines, back-pay orders, and complaints to the Ministry of Labour.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Detailed table */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp} className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Complete Rate Table</h2>
              <p className="text-sm text-muted-foreground">All current minimum wage rates with effective dates and notes.</p>
            </motion.div>

            <motion.div {...fadeUp}>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 font-semibold">Jurisdiction</th>
                        <th className="text-right p-3 font-semibold">Rate</th>
                        <th className="text-right p-3 font-semibold hidden sm:table-cell">Effective</th>
                        <th className="text-right p-3 font-semibold">Upcoming</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedByRate.map((data, i) => (
                        <tr key={data.abbrev} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="font-medium">{data.jurisdiction}</div>
                            {data.notes && <div className="text-[10px] text-muted-foreground mt-0.5">{data.notes}</div>}
                          </td>
                          <td className="p-3 text-right">
                            <span className={`font-bold ${data.isHighest ? 'text-green-600 dark:text-green-400' : data.isLowest ? 'text-red-500' : ''}`}>
                              ${data.currentRate.toFixed(2)}
                            </span>
                          </td>
                          <td className="p-3 text-right text-muted-foreground hidden sm:table-cell text-xs">{data.effectiveDate}</td>
                          <td className="p-3 text-right">
                            {data.upcomingRate ? (
                              <div>
                                <span className="font-semibold text-green-600 dark:text-green-400">${data.upcomingRate.toFixed(2)}</span>
                                <div className="text-[10px] text-muted-foreground">{data.upcomingDate}</div>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </td>
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
                Rates verified from provincial government announcements, ADP Canada, and GovDocs as of May 2026.
                Some provinces have special rates for students, liquor servers, or home workers. Contact us for jurisdiction-specific guidance.
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
              Need help adjusting your compensation?
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed text-sm">
              Minimum wage changes affect payroll, contracts, and compliance. Let us review your compensation structure and ensure you're covered.
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
