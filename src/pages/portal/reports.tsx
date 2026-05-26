import { BarChart3, Download, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PortalLayout from '@/layouts/PortalLayout';

export default function ReportsPage() {
  const reports = [
    { id: 1, title: 'Employee Headcount Report', description: 'Current employee count by department', lastRun: '2 hours ago' },
    { id: 2, title: 'Turnover Analysis', description: 'Employee retention and turnover rates', lastRun: '1 day ago' },
    { id: 3, title: 'Time Off Summary', description: 'PTO usage and balance report', lastRun: '3 days ago' },
    { id: 4, title: 'Training Completion', description: 'Training program completion rates', lastRun: '1 week ago' },
  ];

  return (
    <PortalLayout>
      <title>Reports - PreciseHR Portal</title>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Generate and view HR reports</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Available Reports</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">24</div></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Generated This Month</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">156</div></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Scheduled Reports</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">8</div></CardContent></Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Popular Reports</CardTitle><CardDescription>Frequently used HR reports</CardDescription></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Last run: {report.lastRun}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm"><TrendingUp className="w-4 h-4 mr-2" />View</Button>
                    <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Export</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
