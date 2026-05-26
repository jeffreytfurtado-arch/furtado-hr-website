import { GraduationCap, Plus, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import PortalLayout from '@/layouts/PortalLayout';

export default function TrainingPage() {
  const courses = [
    { id: 1, title: 'Workplace Safety', completion: 85, status: 'in-progress', employees: 102 },
    { id: 2, title: 'Anti-Harassment Training', completion: 92, status: 'in-progress', employees: 115 },
    { id: 3, title: 'Data Privacy & Security', completion: 68, status: 'in-progress', employees: 87 },
    { id: 4, title: 'Leadership Development', completion: 45, status: 'in-progress', employees: 24 },
  ];

  return (
    <PortalLayout>
      <title>Training - PreciseHR Portal</title>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Training & Development</h1>
            <p className="text-muted-foreground mt-1">Manage employee training programs</p>
          </div>
          <Button><Plus className="w-4 h-4 mr-2" />Add Course</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Courses</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12</div></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Enrolled</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">328</div></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">245</div></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Avg Completion</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">78%</div></CardContent></Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Training Courses</CardTitle><CardDescription>Track employee training progress</CardDescription></CardHeader>
          <CardContent>
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{course.title}</h3>
                      <Badge variant="outline">{course.employees} enrolled</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={course.completion} className="flex-1 h-2" />
                      <span className="text-sm text-muted-foreground w-12">{course.completion}%</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm"><Play className="w-4 h-4 mr-2" />View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
