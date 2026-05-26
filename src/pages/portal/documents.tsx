import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Plus, Search, Filter, Download, Upload, Folder, File, MoreVertical } from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PortalLayout from '@/layouts/PortalLayout';

export default function DocumentsPage() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadData, setUploadData] = useState({
    name: '',
    category: '',
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadData({ ...uploadData, file: e.target.files[0] });
    }
  };

  const handleUpload = () => {
    // In a real app, this would upload the file to a server
    console.log('Uploading document:', uploadData);
    alert(`Document "${uploadData.name}" uploaded successfully!`);
    setIsUploadDialogOpen(false);
    setUploadData({ name: '', category: '', file: null });
  };

  const documents = [
    {
      id: 1,
      name: 'Employee Handbook 2024',
      type: 'PDF',
      category: 'Policies',
      size: '2.4 MB',
      modified: '2 days ago',
      modifiedBy: 'Admin User'
    },
    {
      id: 2,
      name: 'Workplace Safety Guidelines',
      type: 'PDF',
      category: 'Compliance',
      size: '1.8 MB',
      modified: '1 week ago',
      modifiedBy: 'Sarah Johnson'
    },
    {
      id: 3,
      name: 'Benefits Package Overview',
      type: 'DOCX',
      category: 'Benefits',
      size: '856 KB',
      modified: '2 weeks ago',
      modifiedBy: 'Michael Chen'
    },
    {
      id: 4,
      name: 'Performance Review Template',
      type: 'XLSX',
      category: 'Templates',
      size: '124 KB',
      modified: '3 weeks ago',
      modifiedBy: 'Emily Rodriguez'
    },
  ];

  const categories = [
    { name: 'Policies', count: 12 },
    { name: 'Compliance', count: 8 },
    { name: 'Benefits', count: 6 },
    { name: 'Templates', count: 15 },
    { name: 'Training', count: 10 },
  ];

  return (
    <PortalLayout>
      <title>Documents - PreciseHR Portal</title>
      <meta name="description" content="Manage your HR documents" />

      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Documents</h1>
            <p className="text-muted-foreground mt-1">
              Access and manage your HR documents and files
            </p>
          </div>
          <Button onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Storage Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124 MB</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Shared
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Categories sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents list */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Documents</CardTitle>
                  <CardDescription>Browse and manage your files</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Modified</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <File className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{doc.name}</div>
                              <div className="text-xs text-muted-foreground">{doc.type}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.category}</Badge>
                        </TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>
                          <div className="text-sm">{doc.modified}</div>
                          <div className="text-xs text-muted-foreground">by {doc.modifiedBy}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuItem>Rename</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upload Document Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Upload a new document to your HR library.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="doc-name">Document Name</Label>
              <Input
                id="doc-name"
                placeholder="Employee Handbook 2024"
                value={uploadData.name}
                onChange={(e) => setUploadData({ ...uploadData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={uploadData.category}
                onValueChange={(value) => setUploadData({ ...uploadData, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="policies">Policies</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="benefits">Benefits</SelectItem>
                  <SelectItem value="templates">Templates</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">File</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
              {uploadData.file && (
                <p className="text-sm text-muted-foreground">
                  Selected: {uploadData.file.name}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!uploadData.name || !uploadData.category || !uploadData.file}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
