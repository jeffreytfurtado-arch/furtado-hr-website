import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter,
  Star,
  Calendar,
  User,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PortalLayout from '@/layouts/PortalLayout';

export default function PerformanceReviewsPage() {
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newReview, setNewReview] = useState({
    employeeId: '',
    reviewType: '',
    reviewPeriod: '',
    dueDate: '',
    notes: '',
  });

  // Mock data
  const reviews = [
    {
      id: 1,
      employee: 'Sarah Johnson',
      position: 'Senior Software Engineer',
      reviewType: 'Annual Review',
      period: 'Q4 2025',
      dueDate: '2026-02-28',
      status: 'in-progress',
      rating: 4.5,
      completedSections: 3,
      totalSections: 5,
    },
    {
      id: 2,
      employee: 'Michael Chen',
      position: 'Engineering Manager',
      reviewType: 'Mid-Year Review',
      period: 'H1 2026',
      dueDate: '2026-03-15',
      status: 'pending',
      rating: null,
      completedSections: 0,
      totalSections: 5,
    },
    {
      id: 3,
      employee: 'Emily Rodriguez',
      position: 'Marketing Coordinator',
      reviewType: 'Probation Review',
      period: 'Jan 2026',
      dueDate: '2026-02-10',
      status: 'completed',
      rating: 4.0,
      completedSections: 5,
      totalSections: 5,
    },
    {
      id: 4,
      employee: 'David Kim',
      position: 'Sales Representative',
      reviewType: 'Quarterly Review',
      period: 'Q1 2026',
      dueDate: '2026-04-01',
      status: 'pending',
      rating: null,
      completedSections: 0,
      totalSections: 4,
    },
  ];

  const stats = [
    { label: 'Total Reviews', value: '24', icon: Star, color: 'text-blue-600' },
    { label: 'In Progress', value: '8', icon: Clock, color: 'text-yellow-600' },
    { label: 'Completed', value: '12', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Overdue', value: '4', icon: AlertCircle, color: 'text-red-600' },
  ];

  const employees = [
    { id: 1, name: 'Sarah Johnson' },
    { id: 2, name: 'Michael Chen' },
    { id: 3, name: 'Emily Rodriguez' },
    { id: 4, name: 'David Kim' },
  ];

  const reviewTypes = [
    'Annual Review',
    'Mid-Year Review',
    'Quarterly Review',
    'Probation Review',
    '360-Degree Review',
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = searchQuery === '' ||
      review.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.reviewType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateReview = () => {
    console.log('Creating review:', newReview);
    alert('Performance review created successfully!');
    setIsCreateDialogOpen(false);
    setNewReview({ employeeId: '', reviewType: '', reviewPeriod: '', dueDate: '', notes: '' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Performance Reviews</h1>
          <p className="text-muted-foreground">Manage employee performance reviews and evaluations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Reviews Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Reviews</CardTitle>
                <CardDescription>View and manage performance reviews</CardDescription>
              </div>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Review
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by employee, position, or review type..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Review Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <Star className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
                        <p className="text-muted-foreground mb-4">
                          {searchQuery || statusFilter !== 'all'
                            ? 'Try adjusting your search or filters'
                            : 'Get started by creating your first performance review'}
                        </p>
                        {(searchQuery || statusFilter !== 'all') && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSearchQuery('');
                              setStatusFilter('all');
                            }}
                          >
                            Clear Filters
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReviews.map((review) => (
                      <TableRow
                        key={review.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => navigate(`/portal/performance-reviews/${review.id}`)}
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium text-primary hover:underline">{review.employee}</div>
                            <div className="text-sm text-muted-foreground">{review.position}</div>
                          </div>
                        </TableCell>
                        <TableCell>{review.reviewType}</TableCell>
                        <TableCell>{review.period}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {new Date(review.dueDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="text-sm">
                              {review.completedSections}/{review.totalSections}
                            </div>
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${(review.completedSections / review.totalSections) * 100}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {review.rating ? (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{review.rating}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(review.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Results count */}
            {(searchQuery || statusFilter !== 'all') && filteredReviews.length > 0 && (
              <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredReviews.length} of {reviews.length} reviews
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create Review Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Performance Review</DialogTitle>
              <DialogDescription>
                Start a new performance review for an employee
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="employee">Employee</Label>
                <Select
                  value={newReview.employeeId}
                  onValueChange={(value) => setNewReview({ ...newReview, employeeId: value })}
                >
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id.toString()}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reviewType">Review Type</Label>
                <Select
                  value={newReview.reviewType}
                  onValueChange={(value) => setNewReview({ ...newReview, reviewType: value })}
                >
                  <SelectTrigger id="reviewType">
                    <SelectValue placeholder="Select review type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reviewTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="period">Review Period</Label>
                <Input
                  id="period"
                  placeholder="e.g., Q1 2026, H1 2026"
                  value={newReview.reviewPeriod}
                  onChange={(e) => setNewReview({ ...newReview, reviewPeriod: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newReview.dueDate}
                  onChange={(e) => setNewReview({ ...newReview, dueDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes or instructions..."
                  value={newReview.notes}
                  onChange={(e) => setNewReview({ ...newReview, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateReview}
                disabled={!newReview.employeeId || !newReview.reviewType || !newReview.dueDate}
              >
                Create Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PortalLayout>
  );
}
