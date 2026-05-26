import { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import PortalLayout from '@/layouts/PortalLayout';

export default function TimeOffPage() {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [requestData, setRequestData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleSubmitRequest = () => {
    console.log('Submitting time off request:', requestData);
    alert(`Time off request submitted successfully!\nType: ${requestData.type}\nDates: ${requestData.startDate} to ${requestData.endDate}`);
    setIsRequestDialogOpen(false);
    setRequestData({ type: '', startDate: '', endDate: '', reason: '' });
  };

  const handleApprove = (id: number, employee: string) => {
    alert(`Approved time off request for ${employee}`);
  };

  const handleReject = (id: number, employee: string) => {
    alert(`Rejected time off request for ${employee}`);
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getRequestsForDate = (date: Date) => {
    return requests.filter(req => {
      const start = new Date(req.startDate);
      const end = new Date(req.endDate);
      return date >= start && date <= end;
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i);

  const requests = [
    { id: 1, employee: 'Sarah Johnson', type: 'Vacation', dates: 'Feb 15-19, 2026', startDate: '2026-02-15', endDate: '2026-02-19', days: 5, status: 'pending' },
    { id: 2, employee: 'Michael Chen', type: 'Sick Leave', dates: 'Feb 10, 2026', startDate: '2026-02-10', endDate: '2026-02-10', days: 1, status: 'approved' },
    { id: 3, employee: 'Emily Rodriguez', type: 'Personal', dates: 'Feb 22, 2026', startDate: '2026-02-22', endDate: '2026-02-22', days: 1, status: 'pending' },
    { id: 4, employee: 'David Kim', type: 'Vacation', dates: 'Feb 24-28, 2026', startDate: '2026-02-24', endDate: '2026-02-28', days: 5, status: 'approved' },
    { id: 5, employee: 'Lisa Anderson', type: 'Personal', dates: 'Feb 14, 2026', startDate: '2026-02-14', endDate: '2026-02-14', days: 1, status: 'approved' },
    { id: 6, employee: 'James Wilson', type: 'Sick Leave', dates: 'Feb 12-13, 2026', startDate: '2026-02-12', endDate: '2026-02-13', days: 2, status: 'rejected' },
  ];

  return (
    <PortalLayout>
      <title>Time Off - PreciseHR Portal</title>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Time Off</h1>
            <p className="text-muted-foreground mt-1">Manage employee time off requests</p>
          </div>
          <div className="flex gap-2">
            <div className="flex border rounded-lg">
              <Button 
                variant={viewMode === 'list' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-r-none"
              >
                List
              </Button>
              <Button 
                variant={viewMode === 'calendar' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('calendar')}
                className="rounded-l-none"
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Calendar
              </Button>
            </div>
            <Button onClick={() => setIsRequestDialogOpen(true)}><Plus className="w-4 h-4 mr-2" />New Request</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">8</div></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Approved This Month</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">24</div></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Days Off</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">142</div></CardContent></Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Recent Requests</CardTitle><CardDescription>Review and approve time off requests</CardDescription></CardHeader>
          <CardContent>
            {viewMode === 'list' ? (
            <Table>
              <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Type</TableHead><TableHead>Dates</TableHead><TableHead>Days</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.employee}</TableCell>
                    <TableCell><Badge variant="outline">{req.type}</Badge></TableCell>
                    <TableCell>{req.dates}</TableCell>
                    <TableCell>{req.days}</TableCell>
                    <TableCell><Badge variant={req.status === 'approved' ? 'default' : 'secondary'}>{req.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      {req.status === 'pending' && (
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleApprove(req.id, req.employee)}><Check className="w-4 h-4" /></Button>
                          <Button size="sm" variant="outline" onClick={() => handleReject(req.id, req.employee)}><X className="w-4 h-4" /></Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            ) : (
              <div className="space-y-4">
                {/* Calendar Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{monthName}</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={previousMonth}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={nextMonth}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Day headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                  
                  {/* Empty cells for days before month starts */}
                  {emptyDays.map(i => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}
                  
                  {/* Calendar days */}
                  {days.map(day => {
                    const date = new Date(year, month, day);
                    const dayRequests = getRequestsForDate(date);
                    const isToday = new Date().toDateString() === date.toDateString();
                    
                    return (
                      <div
                        key={day}
                        className={`aspect-square border rounded-lg p-2 relative ${
                          isToday ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                      >
                        <div className={`text-sm font-medium ${
                          isToday ? 'text-primary' : 'text-foreground'
                        }`}>
                          {day}
                        </div>
                        {dayRequests.length > 0 && (
                          <div className="mt-1 space-y-1">
                            {dayRequests.slice(0, 2).map(req => (
                              <div
                                key={req.id}
                                className={`text-xs px-1 py-0.5 rounded truncate ${
                                  req.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                                  req.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                }`}
                                title={`${req.employee} - ${req.type}`}
                              >
                                {req.employee.split(' ')[0]}
                              </div>
                            ))}
                            {dayRequests.length > 2 && (
                              <div className="text-xs text-muted-foreground">
                                +{dayRequests.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-100 border border-green-200 dark:bg-green-900 dark:border-green-800" />
                    <span className="text-sm">Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-200 dark:bg-yellow-900 dark:border-yellow-800" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-100 border border-red-200 dark:bg-red-900 dark:border-red-800" />
                    <span className="text-sm">Rejected</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* New Time Off Request Dialog */}
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Time Off</DialogTitle>
            <DialogDescription>
              Submit a new time off request for approval.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={requestData.type}
                onValueChange={(value) => setRequestData({ ...requestData, type: value })}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select time off type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacation">Vacation</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="personal">Personal Day</SelectItem>
                  <SelectItem value="bereavement">Bereavement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={requestData.startDate}
                onChange={(e) => setRequestData({ ...requestData, startDate: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={requestData.endDate}
                onChange={(e) => setRequestData({ ...requestData, endDate: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason (Optional)</Label>
              <Textarea
                id="reason"
                placeholder="Provide additional details..."
                value={requestData.reason}
                onChange={(e) => setRequestData({ ...requestData, reason: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitRequest} disabled={!requestData.type || !requestData.startDate || !requestData.endDate}>
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
