import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Star,
  Calendar,
  User,
  Target,
  MessageSquare,
  CheckCircle,
  Plus,
  Edit,
  Save
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import PortalLayout from '@/layouts/PortalLayout';

export default function ReviewDetailPage() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isAddFeedbackOpen, setIsAddFeedbackOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', dueDate: '', status: 'not-started' });
  const [newFeedback, setNewFeedback] = useState({ category: '', rating: '', comments: '' });

  // Mock review data
  const review = {
    id: reviewId,
    employee: 'Sarah Johnson',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    reviewType: 'Annual Review',
    period: 'Q4 2025',
    dueDate: '2026-02-28',
    status: 'in-progress',
    overallRating: 4.5,
    completedSections: 3,
    totalSections: 5,
    reviewer: 'Michael Chen',
    startDate: '2026-02-01',
  };

  const goals = [
    {
      id: 1,
      title: 'Complete React 19 Migration',
      description: 'Migrate all legacy components to React 19',
      dueDate: '2026-03-31',
      status: 'in-progress',
      progress: 65,
    },
    {
      id: 2,
      title: 'Mentor Junior Developers',
      description: 'Provide weekly mentorship sessions',
      dueDate: '2026-06-30',
      status: 'on-track',
      progress: 80,
    },
    {
      id: 3,
      title: 'Improve Code Review Process',
      description: 'Reduce average review time by 30%',
      dueDate: '2026-04-30',
      status: 'completed',
      progress: 100,
    },
  ];

  const feedback = [
    {
      id: 1,
      category: 'Technical Skills',
      rating: 5,
      comments: 'Excellent technical expertise. Consistently delivers high-quality code and helps others solve complex problems.',
      date: '2026-02-05',
    },
    {
      id: 2,
      category: 'Communication',
      rating: 4,
      comments: 'Good communicator. Could improve on providing more regular updates on project status.',
      date: '2026-02-05',
    },
    {
      id: 3,
      category: 'Leadership',
      rating: 5,
      comments: 'Takes initiative and leads by example. Great mentor to junior team members.',
      date: '2026-02-05',
    },
    {
      id: 4,
      category: 'Problem Solving',
      rating: 4,
      comments: 'Strong analytical skills. Approaches challenges methodically and finds creative solutions.',
      date: '2026-02-05',
    },
  ];

  const reviewSections = [
    { name: 'Goals & Objectives', completed: true },
    { name: 'Performance Feedback', completed: true },
    { name: 'Skills Assessment', completed: true },
    { name: 'Development Plan', completed: false },
    { name: 'Final Rating', completed: false },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Completed</Badge>;
      case 'on-track':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">On Track</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">In Progress</Badge>;
      case 'not-started':
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAddGoal = () => {
    console.log('Adding goal:', newGoal);
    alert('Goal added successfully!');
    setIsAddGoalOpen(false);
    setNewGoal({ title: '', description: '', dueDate: '', status: 'not-started' });
  };

  const handleAddFeedback = () => {
    console.log('Adding feedback:', newFeedback);
    alert('Feedback added successfully!');
    setIsAddFeedbackOpen(false);
    setNewFeedback({ category: '', rating: '', comments: '' });
  };

  const averageRating = feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length;

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate('/portal/performance-reviews')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Reviews
        </Button>

        {/* Review Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{review.employee}</h1>
                <p className="text-lg text-muted-foreground mb-2">{review.position}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{review.department}</Badge>
                  <Badge variant="outline">{review.reviewType}</Badge>
                  {getStatusBadge(review.status)}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Period:</span>
                    <span className="ml-2 font-medium">{review.period}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reviewer:</span>
                    <span className="ml-2 font-medium">{review.reviewer}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Started:</span>
                    <span className="ml-2 font-medium">{new Date(review.startDate).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Due:</span>
                    <span className="ml-2 font-medium">{new Date(review.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-1">{review.overallRating}</div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= review.overallRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Overall Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">
                    {review.completedSections}/{review.totalSections}
                  </div>
                  <Progress value={(review.completedSections / review.totalSections) * 100} className="w-32 mb-1" />
                  <p className="text-sm text-muted-foreground">Sections Complete</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Sections Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Review Progress</CardTitle>
            <CardDescription>Complete all sections to finalize the review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reviewSections.map((section, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {section.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted" />
                    )}
                    <span className={section.completed ? 'font-medium' : 'text-muted-foreground'}>
                      {section.name}
                    </span>
                  </div>
                  {section.completed ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Complete
                    </Badge>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Goals and Feedback */}
        <Tabs defaultValue="goals" className="space-y-4">
          <TabsList>
            <TabsTrigger value="goals">Goals & Objectives</TabsTrigger>
            <TabsTrigger value="feedback">Performance Feedback</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Goals & Objectives</CardTitle>
                    <CardDescription>Track progress on performance goals</CardDescription>
                  </div>
                  <Button onClick={() => setIsAddGoalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Goal
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{goal.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>Due: {new Date(goal.dueDate).toLocaleDateString()}</span>
                            </div>
                            {getStatusBadge(goal.status)}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Performance Feedback</CardTitle>
                    <CardDescription>Ratings and comments by category</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground">Average Rating</div>
                    </div>
                    <Button onClick={() => setIsAddFeedbackOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Feedback
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold mb-1">{item.category}</h4>
                          <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= item.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-2 font-medium">{item.rating}/5</span>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.comments}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Review Notes</CardTitle>
                <CardDescription>Additional notes and observations</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add notes about this review..."
                  rows={10}
                  className="mb-4"
                />
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <Button variant="outline">Save Draft</Button>
          <Button>Complete Review</Button>
        </div>

        {/* Add Goal Dialog */}
        <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Goal</DialogTitle>
              <DialogDescription>Set a new performance goal for this review period</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="goalTitle">Goal Title</Label>
                <Input
                  id="goalTitle"
                  placeholder="e.g., Complete certification"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="goalDescription">Description</Label>
                <Textarea
                  id="goalDescription"
                  placeholder="Describe the goal and success criteria..."
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="goalDueDate">Due Date</Label>
                <Input
                  id="goalDueDate"
                  type="date"
                  value={newGoal.dueDate}
                  onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGoal} disabled={!newGoal.title || !newGoal.dueDate}>
                Add Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Feedback Dialog */}
        <Dialog open={isAddFeedbackOpen} onOpenChange={setIsAddFeedbackOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Feedback</DialogTitle>
              <DialogDescription>Provide feedback on a specific performance area</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newFeedback.category}
                  onValueChange={(value) => setNewFeedback({ ...newFeedback, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical Skills">Technical Skills</SelectItem>
                    <SelectItem value="Communication">Communication</SelectItem>
                    <SelectItem value="Leadership">Leadership</SelectItem>
                    <SelectItem value="Problem Solving">Problem Solving</SelectItem>
                    <SelectItem value="Teamwork">Teamwork</SelectItem>
                    <SelectItem value="Time Management">Time Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Select
                  value={newFeedback.rating}
                  onValueChange={(value) => setNewFeedback({ ...newFeedback, rating: value })}
                >
                  <SelectTrigger id="rating">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 - Exceptional</SelectItem>
                    <SelectItem value="4">4 - Exceeds Expectations</SelectItem>
                    <SelectItem value="3">3 - Meets Expectations</SelectItem>
                    <SelectItem value="2">2 - Needs Improvement</SelectItem>
                    <SelectItem value="1">1 - Unsatisfactory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Provide specific examples and feedback..."
                  value={newFeedback.comments}
                  onChange={(e) => setNewFeedback({ ...newFeedback, comments: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddFeedbackOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddFeedback}
                disabled={!newFeedback.category || !newFeedback.rating || !newFeedback.comments}
              >
                Add Feedback
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PortalLayout>
  );
}
