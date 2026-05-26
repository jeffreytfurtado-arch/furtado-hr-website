import { useState } from 'react';
import { motion } from 'motion/react';
import { UserMinus, AlertCircle, Phone, ArrowRight, TrendingDown, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

const positionLevels = [
  { value: 'entry', label: 'Entry Level (0-2 years)', multiplier: 0.5 },
  { value: 'mid', label: 'Mid Level (3-5 years)', multiplier: 1.0 },
  { value: 'senior', label: 'Senior Level (6-10 years)', multiplier: 1.5 },
  { value: 'executive', label: 'Executive (10+ years)', multiplier: 2.0 },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(value);
}

function calculateTurnover(salary: number, level: string, employeesLost: number) {
  const levelData = positionLevels.find((l) => l.value === level) || positionLevels[2];
  const multiplier = levelData.multiplier;
  const costPerEmployee = salary * multiplier;
  const totalCost = costPerEmployee * employeesLost;
  const multiplierPercent = Math.round(multiplier * 100);

  // Breakdown percentages
  const breakdown = [
    { label: 'Recruitment Costs', description: 'Job postings, screening, interviews', pct: 0.25 },
    { label: 'Training & Onboarding', description: 'New hire training, orientation, ramp-up time', pct: 0.20 },
    { label: 'Productivity Loss', description: 'Reduced output during transition', pct: 0.35 },
    { label: 'Administrative Costs', description: 'HR processing, paperwork, exit interviews', pct: 0.10 },
    { label: 'Cultural Impact', description: 'Team morale, knowledge loss', pct: 0.10 },
  ];

  return {
    costPerEmployee: Math.round(costPerEmployee),
    totalCost: Math.round(totalCost),
    multiplierPercent,
    breakdown: breakdown.map((b) => ({
      ...b,
      amount: Math.round(costPerEmployee * b.pct),
    })),
  };
}

export default function TurnoverCalculatorPage() {
  const [salary, setSalary] = useState('60000');
  const [level, setLevel] = useState('senior');
  const [employeesLost, setEmployeesLost] = useState('1');
  const [showResults, setShowResults] = useState(false);

  const result = calculateTurnover(Number(salary), level, Number(employeesLost));

  const handleCalculate = () => {
    if (salary && level && employeesLost) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen">
      <title>Employee Turnover Cost Calculator - PreciseHR</title>

      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Employee Turnover Cost Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the true cost of employee turnover and learn how retention strategies can save your business thousands.
          </p>
        </motion.div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-2">
                <UserMinus className="w-7 h-7 text-primary" />
                <h2 className="text-xl font-bold">Employee Turnover Cost Calculator</h2>
              </div>
              <p className="text-muted-foreground mb-8">Calculate the true cost of employee turnover for your business</p>

              {/* Inputs */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" /> Annual Salary
                  </label>
                  <Input
                    type="number"
                    value={salary}
                    onChange={(e) => { setSalary(e.target.value); setShowResults(false); }}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Position Level</label>
                  <Select value={level} onValueChange={(v) => { setLevel(v); setShowResults(false); }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {positionLevels.map((l) => (
                        <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Employees Lost</label>
                  <Input
                    type="number"
                    value={employeesLost}
                    onChange={(e) => { setEmployeesLost(e.target.value); setShowResults(false); }}
                    min={1}
                  />
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleCalculate}>
                Calculate Turnover Cost
              </Button>

              {/* Results */}
              {showResults && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
                  {/* Total Cost */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-destructive" />
                      <h3 className="font-bold text-destructive">Total Turnover Cost</h3>
                    </div>
                    <p className="text-4xl font-bold text-destructive">{formatCurrency(result.totalCost)}</p>
                    <p className="text-sm text-destructive/70 mt-1">
                      Cost for {employeesLost} employee{Number(employeesLost) !== 1 ? 's' : ''} at {result.multiplierPercent}% of annual salary
                    </p>
                  </div>

                  {/* Per Employee + Multiplier */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-blue-600 mb-1">Cost Per Employee</p>
                      <p className="text-2xl font-bold">{formatCurrency(result.costPerEmployee)}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-blue-600 mb-1">Cost Multiplier</p>
                      <p className="text-2xl font-bold">{result.multiplierPercent}% of Salary</p>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div>
                    <h3 className="font-semibold mb-3">Cost Breakdown (Per Employee)</h3>
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

                  {/* Info Cards */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-800 mb-2">Did You Know?</h4>
                      <p className="text-sm text-amber-700">
                        The average cost of replacing an employee is 50-200% of their annual salary, depending on their role and seniority.
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Retention Saves Money</h4>
                      <p className="text-sm text-green-700">
                        Investing in employee retention programs typically costs 20-30% less than the cost of turnover.
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-primary/5 rounded-lg p-6 text-center">
                    <h3 className="font-bold mb-2">Reduce Turnover with Expert HR Support</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our retention strategies have helped Canadian businesses reduce turnover by 50% and save millions in replacement costs.
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
                          Get Retention Strategy
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
                <TrendingDown className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">50% Reduction</h3>
                <p className="text-sm text-muted-foreground">Average turnover reduction with our retention programs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">$2M+ Saved</h3>
                <p className="text-sm text-muted-foreground">Total savings for our clients through reduced turnover</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">90 Days</h3>
                <p className="text-sm text-muted-foreground">Average time to see measurable retention improvements</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
