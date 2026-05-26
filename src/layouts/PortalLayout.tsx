import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSession, signOut } from '@/lib/auth/auth-client';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  GraduationCap, 
  BarChart3, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  Search,
  Star,
  LogOut,
  User,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface PortalLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/portal', icon: LayoutDashboard },
  { name: 'Employees', href: '/portal/employees', icon: Users },
  { name: 'Documents', href: '/portal/documents', icon: FileText },
  { name: 'Time Off', href: '/portal/time-off', icon: Calendar },
  { name: 'Performance', href: '/portal/performance-reviews', icon: Star },
  { name: 'Training', href: '/portal/training', icon: GraduationCap },
  { name: 'Reports', href: '/portal/reports', icon: BarChart3 },
  { name: 'Settings', href: '/portal/settings', icon: Settings },
];

export default function PortalLayout({ children }: PortalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const isActive = (path: string) => {
    if (path === '/portal') {
      return location.pathname === '/portal';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border
          transform transition-transform duration-200 ease-in-out lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PH</span>
            </div>
            <span className="font-bold text-lg">PreciseHR</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                  transition-colors
                  ${active 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User info at bottom */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session?.user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{session?.user?.email || ''}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-background border-b border-border">
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              {/* Search */}
              <div className="hidden md:flex items-center relative">
                <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-9 w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
                >
                  3
                </Badge>
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={session?.user?.image || ''} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {session?.user?.name?.substring(0, 2).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm">{session?.user?.name || 'User'}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/portal/settings')}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/portal/settings')}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
