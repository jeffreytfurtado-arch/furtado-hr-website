import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  FileText,
  Clock,
  Edit,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import PortalLayout from '@/layouts/PortalLayout';

export default function EmployeeProfilePage() {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  // Mock employee data - in real app, fetch from API
  const employee = {
    id: employeeId,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '(416) 555-0123',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Toronto, ON',
    startDate: '2022-03-15',
    employeeId: 'EMP-001',
    manager: 'Michael Chen',
    status: 'active',
    avatar: 'SJ',
    salary: '$95,000',
    employmentType: 'Full-time',
  };

  const timeOffBalance = {
    vacation: { used: 5, total: 15, pending: 5 },
    sick: { used: 2, total: 10, pending: 0 },
    personal: { used: 1, total: 3, pending: 1 },
  };

  const documents = [
    { id: 1, name: 'Employment Contract', date: '2022-03-15', type: 'Contract' },
    { id: 2, name: 'Tax Forms (T4)', date: '2024-01-15', type: 'Tax' },
    { id: 3, name: 'Performance Review 2024', date: '2024-12-01', type: 'Review' },
    { id: 4, name: 'Benefits Enrollment', date: '2022-03-20', type: 'Benefits' },
  ];

  const recentActivity = [
    { id: 1, action: 'Submitted time off request', date: '2026-02-05', type: 'time-off' },
    { id: 2, action: 'Completed training: Workplace Safety', date: '2026-01-28', type: 'training' },
    { id: 3, action: 'Updated emergency contact', date: '2026-01-15', type: 'profile' },
    { id: 4, action: 'Uploaded document: Certification', date: '2025-12-10', type: 'document' },
  ];

  const performanceMetrics = [
    { label: 'Performance Rating', value: 4.5, max: 5 },
    { label: 'Project Completion', value: 92, max: 100 },
    { label: 'Team Collaboration', value: 88, max: 100 },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate('/portal/employees')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Employees
        </Button>

        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl">{employee.avatar}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{employee.name}</h1>
                    <p className="text-lg text-muted-foreground mb-2">{employee.position}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{employee.department}</Badge>
                      <Badge variant="outline">{employee.employmentType}</Badge>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        {employee.status}
                      </Badge>
                    </div>
                  </div>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{employee.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Started {new Date(employee.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span>Reports to: {employee.manager}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>ID: {employee.employeeId}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="time-off">Time Off</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Employment Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Employment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Employee ID</span>
                    <span className="font-medium">{employee.employeeId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department</span>
                    <span className="font-medium">{employee.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Position</span>
                    <span className="font-medium">{employee.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Employment Type</span>
                    <span className="font-medium">{employee.employmentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date</span>
                    <span className="font-medium">{new Date(employee.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manager</span>
                    <span className="font-medium">{employee.manager}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{metric.label}</span>
                        <span className="font-medium">{metric.value}{metric.max === 100 ? '%' : `/${metric.max}`}</span>
                      </div>
                      <Progress value={(metric.value / metric.max) * 100} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Time Off Tab */}
          <TabsContent value="time-off" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Vacation Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Used</span>
                      <span className="font-medium">{timeOffBalance.vacation.used} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-medium text-yellow-600">{timeOffBalance.vacation.pending} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Remaining</span>
                      <span className="font-medium text-green-600">
                        {timeOffBalance.vacation.total - timeOffBalance.vacation.used - timeOffBalance.vacation.pending} days
                      </span>
                    </div>
                    <Progress 
                      value={(timeOffBalance.vacation.used / timeOffBalance.vacation.total) * 100} 
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Sick Leave</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Used</span>
                      <span className="font-medium">{timeOffBalance.sick.used} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-medium text-yellow-600">{timeOffBalance.sick.pending} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Remaining</span>
                      <span className="font-medium text-green-600">
                        {timeOffBalance.sick.total - timeOffBalance.sick.used - timeOffBalance.sick.pending} days
                      </span>
                    </div>
                    <Progress 
                      value={(timeOffBalance.sick.used / timeOffBalance.sick.total) * 100} 
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Personal Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Used</span>
                      <span className="font-medium">{timeOffBalance.personal.used} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-medium text-yellow-600">{timeOffBalance.personal.pending} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Remaining</span>
                      <span className="font-medium text-green-600">
                        {timeOffBalance.personal.total - timeOffBalance.personal.used - timeOffBalance.personal.pending} days
                      </span>
                    </div>
                    <Progress 
                      value={(timeOffBalance.personal.used / timeOffBalance.personal.total) * 100} 
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Employee Documents</CardTitle>
                <CardDescription>All documents related to this employee</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.type} • {new Date(doc.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Employee activity history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
                      <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline">{activity.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
}
