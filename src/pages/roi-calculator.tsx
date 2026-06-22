import { useState } from 'react';
import { motion } from 'motion/react';
import { ToolPageSchema } from '@/components/StructuredData';
import { Calculator, CheckCircle2, Clock, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

interface CostBreakdown {
  hrStaffAndBenefits: number;
  hrSoftwareAndTools: number;
  recruitmentCosts: number;
  complianceAndLegal: number;
  trainingAndDevelopment: number;
  outsourcedHRServices: number;
}

function calculateROI(
  employees: number,
  avgSalary: number,
  hrStaff: number,
  avgHRSalary: number,
  turnoverRate: number,
  complianceIssues: number
) {
  // Current costs
  const hrStaffCost = hrStaff * avgHRSalary * 1.3; // 30% benefits overhead
  const hrSoftwareCost = employees * 120; // $120/employee/year for tools
  const recruitmentCost = Math.round(employees * (turnoverRate / 100) * avgSalary * 0.33);
  const complianceCost = complianceIssues * 15000;
  const trainingCost = employees * 500;
  const currentTotal = hrStaffCost + hrSoftwareCost + recruitmentCost + complianceCost + trainingCost;

  // Outsourced costs - economies of scale
  const basePerEmployee = employees <= 25 ? 250 : employees <= 50 ? 200 : employees <= 100 ? 175 : 150;
  const outsourcedCost = employees * basePerEmployee * 12 * 0.25; // quarterly equivalent

  // Savings breakdown
  const breakdown: CostBreakdown = {
    hrStaffAndBenefits: Math.round(hrStaffCost * 0.7),
    hrSoftwareAndTools: Math.round(hrSoftwareCost * 0.4),
    recruitmentCosts: Math.round(recruitmentCost * 0.6),
    complianceAndLegal: Math.round(complianceCost * 0.7),
    trainingAndDevelopment: Math.round(trainingCost * 0.5),
    outsourcedHRServices: Math.round(outsourcedCost),
  };

  const totalSavings = breakdown.hrStaffAndBenefits + breakdown.hrSoftwareAndTools +
    breakdown.recruitmentCosts + breakdown.complianceAndLegal +
    breakdown.trainingAndDevelopment - breakdown.outsourcedHRServices;

  const roi = currentTotal > 0 ? Math.round((totalSavings / currentTotal) * 100) : 0;

  return { currentTotal: Math.round(currentTotal), outsourcedCost: Math.round(outsourcedCost), totalSavings: Math.round(totalSavings), roi, breakdown };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(value);
}

export default function ROICalculatorPage() {
  const [employees, setEmployees] = useState(50);
  const [avgSalary, setAvgSalary] = useState(60000);
  const [hrStaff, setHrStaff] = useState(1);
  const [avgHRSalary, setAvgHRSalary] = useState(75000);
  const [turnoverRate, setTurnoverRate] = useState(15);
  const [complianceIssues, setComplianceIssues] = useState(2);
  const [calculated, setCalculated] = useState(false);

  const result = calculateROI(employees, avgSalary, hrStaff, avgHRSalary, turnoverRate, complianceIssues);

  const benefits = [
    'Access to HR experts without hiring costs',
    'Reduced compliance and legal risks',
    'Scalable services as you grow',
    'Latest HR technology included',
    'Focus on core business activities',
  ];

  return (
    <div className="min-h-screen">
      <title>HR Outsourcing ROI Calculator - PreciseHR</title>
      <ToolPageSchema name="Free HR Outsourcing ROI Calculator" description="Calculate how much your organization could save by outsourcing HR to PreciseHR." url="/roi-calculator" />

      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">HR Outsourcing ROI Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how much your organization could save by outsourcing HR services to PreciseHR
          </p>
        </motion.div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <span className="text-primary">👥</span> Your Organization
                    </h2>
                    <p className="text-sm text-muted-foreground">Enter your current HR information</p>
                  </div>

                  {/* Number of Employees */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <span className="text-muted-foreground">👥</span> Number of Employees
                      </label>
                      <span className="text-sm font-semibold">{employees}</span>
                    </div>
                    <Slider value={[employees]} onValueChange={(v) => setEmployees(v[0])} min={5} max={250} step={5} />
                  </div>

                  {/* Average Employee Salary */}
                  <div>
                    <label className="text-sm font-medium block mb-2">Average Employee Salary</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        type="number"
                        value={avgSalary}
                        onChange={(e) => setAvgSalary(Number(e.target.value))}
                        className="pl-7"
                      />
                    </div>
                  </div>

                  {/* Current HR Staff */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Current HR Staff</label>
                      <span className="text-sm font-semibold">{hrStaff}</span>
                    </div>
                    <Slider value={[hrStaff]} onValueChange={(v) => setHrStaff(v[0])} min={0} max={10} step={1} />
                  </div>

                  {/* Average HR Staff Salary */}
                  <div>
                    <label className="text-sm font-medium block mb-2">Average HR Staff Salary</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        type="number"
                        value={avgHRSalary}
                        onChange={(e) => setAvgHRSalary(Number(e.target.value))}
                        className="pl-7"
                      />
                    </div>
                  </div>

                  {/* Annual Turnover Rate */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Annual Turnover Rate</label>
                      <span className="text-sm font-semibold">{turnoverRate}%</span>
                    </div>
                    <Slider value={[turnoverRate]} onValueChange={(v) => setTurnoverRate(v[0])} min={0} max={50} step={1} />
                  </div>

                  {/* Compliance Issues */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Compliance Issues/Year</label>
                      <span className="text-sm font-semibold">{complianceIssues}</span>
                    </div>
                    <Slider value={[complianceIssues]} onValueChange={(v) => setComplianceIssues(v[0])} min={0} max={10} step={1} />
                  </div>

                  <Button className="w-full" size="lg" onClick={() => setCalculated(true)}>
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Your Savings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Panel */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <span className="text-primary">📈</span> Your Potential Savings
                    </h2>
                    <p className="text-sm text-muted-foreground">Based on your inputs</p>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">Current Annual Cost</p>
                      <p className="text-2xl font-bold text-destructive">{formatCurrency(result.currentTotal)}</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">Outsourced Cost</p>
                      <p className="text-2xl font-bold">{formatCurrency(result.outsourcedCost)}</p>
                    </div>
                  </div>

                  {/* Big Savings Number */}
                  <div className="bg-primary text-primary-foreground rounded-lg p-6 text-center">
                    <p className="text-sm opacity-90 mb-1">Estimated Annual Savings</p>
                    <p className="text-4xl font-bold">{formatCurrency(result.totalSavings)}</p>
                    <p className="text-sm opacity-90 mt-1">ROI: {result.roi}%</p>
                  </div>

                  {/* Cost Breakdown */}
                  <div>
                    <h3 className="font-semibold mb-3">Cost Breakdown</h3>
                    <div className="space-y-2">
                      {[
                        { label: 'HR Staff & Benefits', value: result.breakdown.hrStaffAndBenefits },
                        { label: 'HR Software & Tools', value: result.breakdown.hrSoftwareAndTools },
                        { label: 'Recruitment Costs', value: result.breakdown.recruitmentCosts },
                        { label: 'Compliance & Legal', value: result.breakdown.complianceAndLegal },
                        { label: 'Training & Development', value: result.breakdown.trainingAndDevelopment },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center text-sm">
                          <span>{item.label}</span>
                          <span className="text-green-600 font-medium">Save {formatCurrency(item.value)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center text-sm pt-2 border-t">
                        <span>Outsourced HR Services</span>
                        <span className="font-medium">{formatCurrency(result.breakdown.outsourcedHRServices)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="font-semibold mb-3">Additional Benefits</h3>
                    <div className="space-y-2">
                      {benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to="/contact">
                    <Button variant="outline" className="w-full" size="lg">
                      <Clock className="w-4 h-4 mr-2" />
                      Schedule a Free Consultation
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-muted-foreground">
                    Get a personalized ROI analysis from our HR experts
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
