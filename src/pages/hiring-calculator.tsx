import { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, Users, Clock, ArrowRight, Phone, Briefcase, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Link } from 'react-router-dom';

const recruitmentMethods = [
  { value: 'internal', label: 'Internal HR / Job Boards', costMultiplier: 0.10 },
  { value: 'agency', label: 'Recruitment Agency', costMultiplier: 0.20 },
  { value: 'executive', label: 'Executive Search Firm', costMultiplier: 0.30 },
  { value: 'mixed', label: 'Mixed Methods', costMultiplier: 0.15 },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(value);
}

function calculateHiringCost(
  salary: number,
  method: string,
  hires: number,
  timeToFill: number
) {
  const methodData = recruitmentMethods.find((m) => m.value === method) || recruitmentMethods[0];

  const recruitmentFee = salary * methodData.costMultiplier;
  const jobPostingCost = method === 'agency' || method === 'executive' ? 200 : 800;
  const interviewCost = 2500; // internal time for interviews
  const screeningCost = 500; // background checks, assessments
  const onboardingCost = salary * 0.05; // ~5% of salary for onboarding
  const trainingCost = salary * 0.08; // ~8% for initial training
  const productivityLoss = (salary / 260) * timeToFill * 0.5; // 50% productivity during vacancy
  const adminCost = 1200; // HR admin time

  const costPerHire = Math.round(
    recruitmentFee + jobPostingCost + interviewCost + screeningCost +
    onboardingCost + trainingCost + adminCost
  );
  const totalCost = costPerHire * hires;
  const vacancyCost = Math.round(productivityLoss) * hires;

  const breakdown = [
    { label: 'Recruitment Fees', description: `${methodData.label} - ${Math.round(methodData.costMultiplier * 100)}% of salary`, amount: Math.round(recruitmentFee) },
    { label: 'Job Postings & Advertising', description: 'Job boards, social media, career sites', amount: Math.round(jobPostingCost) },
    { label: 'Interview Process', description: 'Internal staff time for screening & interviews', amount: Math.round(interviewCost) },
    { label: 'Background & Assessments', description: 'Background checks, skills assessments', amount: Math.round(screeningCost) },
    { label: 'Onboarding', description: 'Equipment, access setup, orientation', amount: Math.round(onboardingCost) },
    { label: 'Initial Training', description: 'Role-specific training and ramp-up', amount: Math.round(trainingCost) },
    { label: 'Administrative', description: 'Contracts, compliance, HR processing', amount: Math.round(adminCost) },
  ];

  return { costPerHire, totalCost, vacancyCost, totalWithVacancy: totalCost + vacancyCost, breakdown };
}

export default function HiringCalculatorPage() {
  const [salary, setSalary] = useState('65000');
  const [method, setMethod] = useState('internal');
  const [hires, setHires] = useState('3');
  const [timeToFill, setTimeToFill] = useState(30);
  const [showResults, setShowResults] = useState(false);

  const result = calculateHiringCost(Number(salary), method, Number(hires), timeToFill);

  const handleCalculate = () => {
    if (salary && method && hires) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen">
      <title>Hiring Cost Calculator - PreciseHR</title>

      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <DollarSign className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Hiring Cost Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understand the true cost-per-hire and see how outsourcing recruitment can save your organization money.
          </p>
        </motion.div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-7 h-7 text-primary" />
                <h2 className="text-xl font-bold">Cost-Per-Hire Calculator</h2>
              </div>
              <p className="text-muted-foreground mb-8">Calculate the full cost of hiring new employees</p>

              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" /> Position Salary
                  </label>
                  <Input
                    type="number"
                    value={salary}
                    onChange={(e) => { setSalary(e.target.value); setShowResults(false); }}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Recruitment Method</label>
                  <Select value={method} onValueChange={(v) => { setMethod(v); setShowResults(false); }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {recruitmentMethods.map((m) => (
                        <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-muted-foreground" /> Number of Hires
                  </label>
                  <Input
                    type="number"
                    value={hires}
                    onChange={(e) => { setHires(e.target.value); setShowResults(false); }}
                    min={1}
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" /> Avg. Time to Fill (days)
                    </label>
                    <span className="text-sm font-semibold">{timeToFill}</span>
                  </div>
                  <Slider value={[timeToFill]} onValueChange={(v) => { setTimeToFill(v[0]); setShowResults(false); }} min={7} max={120} step={1} />
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleCalculate}>
                Calculate Hiring Cost
              </Button>

              {/* Results */}
              {showResults && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-primary text-primary-foreground rounded-lg p-4">
                      <p className="text-xs opacity-90 mb-1">Cost Per Hire</p>
                      <p className="text-2xl font-bold">{formatCurrency(result.costPerHire)}</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">Total Hiring Cost</p>
                      <p className="text-2xl font-bold">{formatCurrency(result.totalCost)}</p>
                      <p className="text-xs text-muted-foreground">{hires} hire{Number(hires) !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 col-span-2 md:col-span-1">
                      <p className="text-xs text-amber-600 mb-1">Vacancy Cost</p>
                      <p className="text-2xl font-bold text-amber-700">{formatCurrency(result.vacancyCost)}</p>
                      <p className="text-xs text-amber-600">{timeToFill} days unfilled</p>
                    </div>
                  </div>

                  {/* Total with Vacancy */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-sm text-destructive/70 mb-1">Total Cost Including Vacancy Impact</p>
                    <p className="text-3xl font-bold text-destructive">{formatCurrency(result.totalWithVacancy)}</p>
                  </div>

                  {/* Breakdown */}
                  <div>
                    <h3 className="font-semibold mb-3">Cost Breakdown (Per Hire)</h3>
                    <div className="space-y-3">
                      {result.breakdown.map((item) => (
                        <div key={item.label} className="flex items-center justify-between border rounded-lg p-4">
                          <div>
                            <p className="font-medium text-sm">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          <p className="font-semibold">{formatCurrency(item.amount)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Savings Tip */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Outsource & Save</h4>
                      <p className="text-sm text-green-700">
                        Companies that outsource recruitment save an average of 30-40% on hiring costs while filling positions 25% faster.
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Quality Matters</h4>
                      <p className="text-sm text-blue-700">
                        A bad hire can cost up to 5x their salary. Investing in better recruitment processes pays for itself.
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-primary/5 rounded-lg p-6 text-center">
                    <h3 className="font-bold mb-2">Let PreciseHR Handle Your Hiring</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our recruitment experts help Canadian businesses hire better candidates faster and for less.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a href="tel:+14378872263">
                        <Button>
                          <Phone className="w-4 h-4 mr-2" />
                          Call (437) 887-2263
                        </Button>
                      </a>
                      <Link to="/contact">
                        <Button variant="outline">
                          Get a Quote
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">40% Cost Savings</h3>
                <p className="text-sm text-muted-foreground">Average savings when outsourcing recruitment to PreciseHR</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">21 Days Average</h3>
                <p className="text-sm text-muted-foreground">Our average time-to-fill vs. 42 days industry average</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">95% Retention</h3>
                <p className="text-sm text-muted-foreground">First-year retention rate for candidates we place</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
