import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import PortalLayout from '@/layouts/PortalLayout';

export default function PortalDashboard() {
  const navigate = useNavigate();
  
  const [stats, setStats] = useState([
    {
      title: 'Total Employees',
      value: '0',
      change: '',
      trend: 'neutral',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Active Documents',
      value: '0',
      change: '',
      trend: 'neutral',
      icon: FileText,
      color: 'text-green-500'
    },
    {
      title: 'Pending Requests',
      value: '0',
      change: '',
      trend: 'neutral',
      icon: Clock,
      color: 'text-orange-500'
    },
    {
      title: 'Performance Reviews',
      value: '0',
      change: '',
      trend: 'neutral',
      icon: CheckCircle2,
      color: 'text-purple-500'
    },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/portal/stats');
        if (response.ok) {
          const data = await response.json();
          setStats([
            {
              title: 'Total Employees',
              value: String(data.employees || 0),
              change: '',
              trend: 'neutral',
              icon: Users,
              color: 'text-blue-500'
            },
            {
              title: 'Active Documents',
              value: String(data.documents || 0),
              change: '',
              trend: 'neutral',
              icon: FileText,
              color: 'text-green-500'
            },
            {
              title: 'Pending Requests',
              value: String(data.pendingTimeOffRequests || 0),
              change: '',
              trend: 'neutral',
              icon: Clock,
              color: 'text-orange-500'
            },
            {
              title: 'Performance Reviews',
              value: String(data.performanceReviews || 0),
              change: '',
              trend: 'neutral',
              icon: CheckCircle2,
              color: 'text-purple-500'
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const recentActivity = [
    {
      id: 1,
      action: 'New employee onboarded',
      user: 'Sarah Johnson',
      time: '2 hours ago',
      type: 'success'
    },
    {
      id: 2,
      action: 'Time off request submitted',
      user: 'Michael Chen',
      time: '4 hours ago',
      type: 'pending'
    },
    {
      id: 3,
      action: 'Training completed',
      user: 'Emily Rodriguez',
      time: '6 hours ago',
      type: 'success'
    },
    {
      id: 4,
      action: 'Document uploaded',
      user: 'David Kim',
      time: '1 day ago',
      type: 'info'
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Review performance evaluations',
      dueDate: 'Today',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Approve time off requests',
      dueDate: 'Tomorrow',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Update employee handbook',
      dueDate: 'Feb 15',
      priority: 'low'
    },
  ];

  const trainingProgress = [
    { name: 'Workplace Safety', completion: 85 },
    { name: 'Anti-Harassment', completion: 92 },
    { name: 'Data Privacy', completion: 68 },
  ];

  return (
    <PortalLayout>
      <title>Dashboard - PreciseHR Portal</title>
      <meta name="description" content="Your HR management dashboard" />

      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your team.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.trend === 'up';
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      {isPositive ? (
                        <ArrowUpRight className="w-3 h-3 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-red-500" />
                      )}
                      <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
                        {stat.change}
                      </span>
                      <span>from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`
                        w-2 h-2 rounded-full mt-2 flex-shrink-0
                        ${activity.type === 'success' ? 'bg-green-500' : ''}
                        ${activity.type === 'pending' ? 'bg-orange-500' : ''}
                        ${activity.type === 'info' ? 'bg-blue-500' : ''}
                      `} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/portal/employees')}>
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Items that need your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-2 h-2 rounded-full
                          ${task.priority === 'high' ? 'bg-red-500' : ''}
                          ${task.priority === 'medium' ? 'bg-orange-500' : ''}
                          ${task.priority === 'low' ? 'bg-green-500' : ''}
                        `} />
                        <div>
                          <p className="text-sm font-medium">{task.title}</p>
                          <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/portal/time-off')}>
                  View All Tasks
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Training Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Training Progress</CardTitle>
              <CardDescription>Company-wide training completion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {trainingProgress.map((training) => (
                  <div key={training.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{training.name}</span>
                      <span className="text-muted-foreground">{training.completion}%</span>
                    </div>
                    <Progress value={training.completion} className="h-2" />
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/portal/training')}>
                View All Training
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="justify-start" onClick={() => navigate('/portal/employees')}>
                  <Users className="w-4 h-4 mr-2" />
                  Add Employee
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => navigate('/portal/documents')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => navigate('/portal/time-off')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Approve Time Off
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => navigate('/portal/reports')}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PortalLayout>
  );
}
