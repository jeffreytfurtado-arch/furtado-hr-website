import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Mail, Briefcase, Plus, Trash2, Edit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PortalLayout from '@/layouts/PortalLayout';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position?: string;
  department?: string;
  status: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/portal/employees');
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/portal/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        await fetchEmployees();
        setIsAddDialogOpen(false);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', position: '', department: '' });
      }
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    try {
      const response = await fetch(`/api/portal/employees/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchEmployees();
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <PortalLayout>
      <title>Employees - PreciseHR Portal</title>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Employees</h1>
            <p className="text-muted-foreground">Manage your workforce</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>Enter employee details below</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full">Add Employee</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
            <CardDescription>{employees.length} total employees</CardDescription>
          </CardHeader>
          <CardContent>
            {employees.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No employees yet. Add your first employee to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {employees.map((employee) => (
                  <motion.div
                    key={employee.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{employee.firstName} {employee.lastName}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {employee.email}
                          </span>
                          {employee.position && (
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3" />
                              {employee.position}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
