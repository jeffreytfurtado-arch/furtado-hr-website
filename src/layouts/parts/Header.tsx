import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Calculator, ClipboardCheck, TrendingUp, DollarSign, UserMinus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const toolsMenu = [
  { name: 'ROI Calculator', href: '/roi-calculator', description: 'Calculate HR outsourcing savings', icon: Calculator },
  { name: 'HR Health Check', href: '/hr-assessment', description: 'Assess your HR compliance', icon: ClipboardCheck },
  { name: 'Salary Benchmarking', href: '/salary-benchmarking', description: 'Compare Canadian salaries', icon: TrendingUp },
  { name: 'Turnover Cost Calculator', href: '/turnover-calculator', description: 'Calculate turnover costs', icon: UserMinus },
  { name: 'Hiring Cost Calculator', href: '/hiring-calculator', description: 'Calculate cost-per-hire', icon: DollarSign },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'PreciseHR App', href: '/client-portal' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isToolsActive = toolsMenu.some((t) => location.pathname === t.href);

  // Close tools dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setIsToolsOpen(false);
    setIsMenuOpen(false);
    setIsMobileToolsOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/precisehr-logo.svg" alt="PreciseHR" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Tools Dropdown */}
            <div ref={toolsRef} className="relative">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isToolsActive || isToolsOpen
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/90 text-primary-foreground hover:bg-primary'
                }`}
              >
                Tools
                <ChevronDown className={`h-4 w-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isToolsOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-lg border bg-background shadow-lg py-2 z-50">
                  {toolsMenu.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.name}
                        to={tool.href}
                        className={`flex items-start gap-3 px-4 py-3 hover:bg-muted transition-colors ${
                          isActive(tool.href) ? 'bg-muted' : ''
                        }`}
                      >
                        <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-medium">{tool.name}</div>
                          <div className="text-xs text-muted-foreground">{tool.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/contact">
              <Button>
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-foreground hover:bg-muted"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Tools Accordion */}
            <button
              onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
              className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isToolsActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              Tools
              <ChevronDown className={`h-4 w-4 transition-transform ${isMobileToolsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMobileToolsOpen && (
              <div className="ml-4 space-y-1">
                {toolsMenu.map((tool) => (
                  <Link
                    key={tool.name}
                    to={tool.href}
                    className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                      isActive(tool.href)
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            )}

            <div className="pt-4">
              <Link to="/contact" className="block" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
