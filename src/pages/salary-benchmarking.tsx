import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, BarChart3, Users, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

interface SalaryData {
  min: number;
  median: number;
  max: number;
  p25: number;
  p75: number;
}

interface PositionData {
  label: string;
  salaryByProvince: Record<string, SalaryData>;
}

const positions: Record<string, PositionData> = {
  'hr-manager': {
    label: 'HR Manager',
    salaryByProvince: {
      'Ontario': { min: 75000, median: 95000, max: 130000, p25: 82000, p75: 115000 },
      'British Columbia': { min: 72000, median: 92000, max: 125000, p25: 80000, p75: 110000 },
      'Alberta': { min: 78000, median: 98000, max: 135000, p25: 85000, p75: 118000 },
      'Quebec': { min: 68000, median: 85000, max: 115000, p25: 75000, p75: 100000 },
      'Manitoba': { min: 65000, median: 82000, max: 110000, p25: 72000, p75: 95000 },
      'Saskatchewan': { min: 67000, median: 84000, max: 112000, p25: 73000, p75: 97000 },
      'Nova Scotia': { min: 62000, median: 78000, max: 105000, p25: 68000, p75: 90000 },
      'New Brunswick': { min: 60000, median: 76000, max: 102000, p25: 66000, p75: 88000 },
      'Newfoundland': { min: 63000, median: 80000, max: 108000, p25: 70000, p75: 92000 },
      'Prince Edward Island': { min: 58000, median: 74000, max: 98000, p25: 64000, p75: 85000 },
    },
  },
  'hr-coordinator': {
    label: 'HR Coordinator',
    salaryByProvince: {
      'Ontario': { min: 45000, median: 55000, max: 72000, p25: 48000, p75: 64000 },
      'British Columbia': { min: 43000, median: 53000, max: 70000, p25: 47000, p75: 62000 },
      'Alberta': { min: 47000, median: 57000, max: 75000, p25: 50000, p75: 66000 },
      'Quebec': { min: 40000, median: 50000, max: 65000, p25: 44000, p75: 58000 },
      'Manitoba': { min: 38000, median: 48000, max: 62000, p25: 42000, p75: 55000 },
      'Saskatchewan': { min: 39000, median: 49000, max: 63000, p25: 43000, p75: 56000 },
      'Nova Scotia': { min: 37000, median: 46000, max: 60000, p25: 40000, p75: 53000 },
      'New Brunswick': { min: 36000, median: 45000, max: 58000, p25: 39000, p75: 52000 },
      'Newfoundland': { min: 38000, median: 47000, max: 61000, p25: 41000, p75: 54000 },
      'Prince Edward Island': { min: 35000, median: 44000, max: 56000, p25: 38000, p75: 50000 },
    },
  },
  'recruiter': {
    label: 'Recruiter',
    salaryByProvince: {
      'Ontario': { min: 50000, median: 65000, max: 90000, p25: 55000, p75: 78000 },
      'British Columbia': { min: 48000, median: 63000, max: 88000, p25: 53000, p75: 75000 },
      'Alberta': { min: 52000, median: 68000, max: 92000, p25: 58000, p75: 80000 },
      'Quebec': { min: 45000, median: 58000, max: 78000, p25: 50000, p75: 68000 },
      'Manitoba': { min: 42000, median: 55000, max: 74000, p25: 47000, p75: 64000 },
      'Saskatchewan': { min: 43000, median: 56000, max: 75000, p25: 48000, p75: 65000 },
      'Nova Scotia': { min: 40000, median: 52000, max: 70000, p25: 45000, p75: 60000 },
      'New Brunswick': { min: 39000, median: 51000, max: 68000, p25: 44000, p75: 58000 },
      'Newfoundland': { min: 41000, median: 54000, max: 72000, p25: 46000, p75: 62000 },
      'Prince Edward Island': { min: 38000, median: 50000, max: 66000, p25: 42000, p75: 56000 },
    },
  },
  'payroll-specialist': {
    label: 'Payroll Specialist',
    salaryByProvince: {
      'Ontario': { min: 48000, median: 60000, max: 80000, p25: 52000, p75: 70000 },
      'British Columbia': { min: 46000, median: 58000, max: 78000, p25: 50000, p75: 68000 },
      'Alberta': { min: 50000, median: 62000, max: 82000, p25: 54000, p75: 72000 },
      'Quebec': { min: 43000, median: 54000, max: 72000, p25: 47000, p75: 63000 },
      'Manitoba': { min: 40000, median: 51000, max: 68000, p25: 44000, p75: 60000 },
      'Saskatchewan': { min: 41000, median: 52000, max: 69000, p25: 45000, p75: 61000 },
      'Nova Scotia': { min: 38000, median: 49000, max: 65000, p25: 42000, p75: 57000 },
      'New Brunswick': { min: 37000, median: 48000, max: 63000, p25: 41000, p75: 55000 },
      'Newfoundland': { min: 39000, median: 50000, max: 67000, p25: 43000, p75: 58000 },
      'Prince Edward Island': { min: 36000, median: 46000, max: 61000, p25: 40000, p75: 53000 },
    },
  },
  'hr-director': {
    label: 'HR Director',
    salaryByProvince: {
      'Ontario': { min: 95000, median: 125000, max: 175000, p25: 105000, p75: 150000 },
      'British Columbia': { min: 92000, median: 120000, max: 170000, p25: 102000, p75: 145000 },
      'Alberta': { min: 98000, median: 130000, max: 180000, p25: 110000, p75: 155000 },
      'Quebec': { min: 85000, median: 110000, max: 155000, p25: 95000, p75: 135000 },
      'Manitoba': { min: 80000, median: 105000, max: 145000, p25: 90000, p75: 125000 },
      'Saskatchewan': { min: 82000, median: 107000, max: 148000, p25: 92000, p75: 128000 },
      'Nova Scotia': { min: 78000, median: 100000, max: 140000, p25: 86000, p75: 120000 },
      'New Brunswick': { min: 75000, median: 98000, max: 135000, p25: 84000, p75: 118000 },
      'Newfoundland': { min: 80000, median: 102000, max: 142000, p25: 88000, p75: 122000 },
      'Prince Edward Island': { min: 73000, median: 95000, max: 130000, p25: 82000, p75: 112000 },
    },
  },
  'training-specialist': {
    label: 'Training Specialist',
    salaryByProvince: {
      'Ontario': { min: 52000, median: 68000, max: 90000, p25: 58000, p75: 80000 },
      'British Columbia': { min: 50000, median: 65000, max: 88000, p25: 56000, p75: 78000 },
      'Alberta': { min: 54000, median: 70000, max: 92000, p25: 60000, p75: 82000 },
      'Quebec': { min: 47000, median: 60000, max: 80000, p25: 52000, p75: 72000 },
      'Manitoba': { min: 44000, median: 57000, max: 76000, p25: 49000, p75: 68000 },
      'Saskatchewan': { min: 45000, median: 58000, max: 77000, p25: 50000, p75: 69000 },
      'Nova Scotia': { min: 42000, median: 54000, max: 72000, p25: 47000, p75: 64000 },
      'New Brunswick': { min: 41000, median: 53000, max: 70000, p25: 46000, p75: 62000 },
      'Newfoundland': { min: 43000, median: 56000, max: 74000, p25: 48000, p75: 66000 },
      'Prince Edward Island': { min: 40000, median: 52000, max: 68000, p25: 44000, p75: 60000 },
    },
  },
  'compensation-analyst': {
    label: 'Compensation Analyst',
    salaryByProvince: {
      'Ontario': { min: 60000, median: 78000, max: 105000, p25: 67000, p75: 92000 },
      'British Columbia': { min: 58000, median: 75000, max: 100000, p25: 64000, p75: 88000 },
      'Alberta': { min: 62000, median: 80000, max: 108000, p25: 69000, p75: 95000 },
      'Quebec': { min: 54000, median: 70000, max: 92000, p25: 60000, p75: 82000 },
      'Manitoba': { min: 50000, median: 65000, max: 86000, p25: 56000, p75: 76000 },
      'Saskatchewan': { min: 52000, median: 67000, max: 88000, p25: 57000, p75: 78000 },
      'Nova Scotia': { min: 48000, median: 62000, max: 82000, p25: 54000, p75: 72000 },
      'New Brunswick': { min: 47000, median: 60000, max: 80000, p25: 52000, p75: 70000 },
      'Newfoundland': { min: 50000, median: 64000, max: 84000, p25: 55000, p75: 74000 },
      'Prince Edward Island': { min: 45000, median: 58000, max: 76000, p25: 50000, p75: 68000 },
    },
  },
  'hris-analyst': {
    label: 'HRIS Analyst',
    salaryByProvince: {
      'Ontario': { min: 58000, median: 75000, max: 100000, p25: 64000, p75: 88000 },
      'British Columbia': { min: 55000, median: 72000, max: 96000, p25: 62000, p75: 85000 },
      'Alberta': { min: 60000, median: 78000, max: 104000, p25: 66000, p75: 92000 },
      'Quebec': { min: 52000, median: 67000, max: 88000, p25: 58000, p75: 78000 },
      'Manitoba': { min: 48000, median: 63000, max: 82000, p25: 54000, p75: 73000 },
      'Saskatchewan': { min: 50000, median: 64000, max: 84000, p25: 55000, p75: 74000 },
      'Nova Scotia': { min: 46000, median: 60000, max: 78000, p25: 52000, p75: 70000 },
      'New Brunswick': { min: 45000, median: 58000, max: 76000, p25: 50000, p75: 68000 },
      'Newfoundland': { min: 48000, median: 62000, max: 80000, p25: 53000, p75: 72000 },
      'Prince Edward Island': { min: 43000, median: 56000, max: 73000, p25: 48000, p75: 65000 },
    },
  },
  'labour-relations': {
    label: 'Labour Relations Specialist',
    salaryByProvince: {
      'Ontario': { min: 65000, median: 85000, max: 115000, p25: 72000, p75: 100000 },
      'British Columbia': { min: 62000, median: 82000, max: 110000, p25: 70000, p75: 96000 },
      'Alberta': { min: 68000, median: 88000, max: 118000, p25: 75000, p75: 104000 },
      'Quebec': { min: 58000, median: 75000, max: 100000, p25: 65000, p75: 88000 },
      'Manitoba': { min: 55000, median: 72000, max: 95000, p25: 62000, p75: 84000 },
      'Saskatchewan': { min: 56000, median: 73000, max: 97000, p25: 63000, p75: 85000 },
      'Nova Scotia': { min: 52000, median: 68000, max: 90000, p25: 58000, p75: 80000 },
      'New Brunswick': { min: 50000, median: 66000, max: 88000, p25: 56000, p75: 78000 },
      'Newfoundland': { min: 54000, median: 70000, max: 92000, p25: 60000, p75: 82000 },
      'Prince Edward Island': { min: 48000, median: 64000, max: 84000, p25: 54000, p75: 74000 },
    },
  },
};

const provinces = [
  'Ontario', 'British Columbia', 'Alberta', 'Quebec', 'Manitoba',
  'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland', 'Prince Edward Island',
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(value);
}

export default function SalaryBenchmarkingPage() {
  const [position, setPosition] = useState('');
  const [province, setProvince] = useState('');
  const [currentSalary, setCurrentSalary] = useState('');
  const [showResults, setShowResults] = useState(false);

  const posData = position ? positions[position] : null;
  const salaryData = posData && province ? posData.salaryByProvince[province] : null;
  const salary = Number(currentSalary);

  const handleCalculate = () => {
    if (position && province && currentSalary) {
      setShowResults(true);
    }
  };

  const getDifference = () => {
    if (!salaryData || !salary) return 0;
    return salary - salaryData.median;
  };

  const getPercentile = () => {
    if (!salaryData || !salary) return '';
    if (salary <= salaryData.min) return 'Below minimum';
    if (salary <= salaryData.p25) return 'Bottom 25%';
    if (salary <= salaryData.median) return '25th–50th percentile';
    if (salary <= salaryData.p75) return '50th–75th percentile';
    if (salary <= salaryData.max) return 'Top 25%';
    return 'Above maximum';
  };

  return (
    <div className="min-h-screen">
      <title>Canadian Salary Benchmarking Tool - PreciseHR</title>

      {/* Hero */}
      <section className="py-8 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Compensation Intelligence
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-7 h-7 text-primary" />
                <h1 className="text-2xl font-bold">Canadian Salary Benchmarking Tool</h1>
              </div>
              <p className="text-muted-foreground mb-8">
                Compare salaries across Canadian provinces and ensure your compensation is competitive
              </p>

              {/* Inputs */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <span>🏢</span> Position
                  </label>
                  <Select value={position} onValueChange={(v) => { setPosition(v); setShowResults(false); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(positions).map(([key, pos]) => (
                        <SelectItem key={key} value={key}>{pos.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <span>📍</span> Province
                  </label>
                  <Select value={province} onValueChange={(v) => { setProvince(v); setShowResults(false); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <span>💰</span> Current Salary
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      type="number"
                      value={currentSalary}
                      onChange={(e) => { setCurrentSalary(e.target.value); setShowResults(false); }}
                      placeholder="e.g., 75000"
                      className="pl-7"
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleCalculate} disabled={!position || !province || !currentSalary}>
                Calculate Benchmark
              </Button>

              {/* Results */}
              {showResults && salaryData && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
                  {/* Salary Range Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="border rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">Minimum</p>
                      <p className="text-xl font-bold">{formatCurrency(salaryData.min)}</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">Median</p>
                      <p className="text-xl font-bold">{formatCurrency(salaryData.median)}</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">Maximum</p>
                      <p className="text-xl font-bold">{formatCurrency(salaryData.max)}</p>
                    </div>
                    <div className="bg-primary text-primary-foreground rounded-lg p-4">
                      <p className="text-xs opacity-90 mb-1">Your Salary</p>
                      <p className="text-xl font-bold">{formatCurrency(salary)}</p>
                    </div>
                  </div>

                  {/* Difference */}
                  <div className={`rounded-lg p-6 text-center ${getDifference() >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <p className="text-sm text-muted-foreground mb-1">Difference from Median</p>
                    <p className={`text-3xl font-bold ${getDifference() >= 0 ? 'text-green-600' : 'text-destructive'}`}>
                      {getDifference() >= 0 ? '+' : ''}{formatCurrency(getDifference())}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{getPercentile()}</p>
                  </div>

                  {/* Visual Bar */}
                  <div>
                    <h3 className="font-semibold mb-3">Salary Range Visualization</h3>
                    <div className="relative h-8 bg-gradient-to-r from-red-100 via-yellow-100 to-green-100 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 h-full w-1 bg-primary rounded-full"
                        style={{
                          left: `${Math.min(100, Math.max(0, ((salary - salaryData.min) / (salaryData.max - salaryData.min)) * 100))}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{formatCurrency(salaryData.min)}</span>
                      <span>{formatCurrency(salaryData.median)}</span>
                      <span>{formatCurrency(salaryData.max)}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-primary/5 rounded-lg p-6 text-center">
                    <h3 className="font-bold mb-2">Need Compensation Strategy Help?</h3>
                    <p className="text-sm text-muted-foreground mb-4">Our HR experts can help you develop competitive compensation packages.</p>
                    <Link to="/contact">
                      <Button>Get Expert Advice</Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardContent className="p-6">
                <BarChart3 className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold mb-2">Accurate Data</h3>
                <p className="text-sm text-muted-foreground">
                  Our salary data is based on current Canadian market rates across all provinces and territories.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold mb-2">Multiple Positions</h3>
                <p className="text-sm text-muted-foreground">
                  Compare salaries for HR roles from coordinators to directors across different regions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Award className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold mb-2">Expert Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized compensation strategy recommendations from our HR experts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
