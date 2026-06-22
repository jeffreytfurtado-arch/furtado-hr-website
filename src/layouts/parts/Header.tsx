import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Calculator, ClipboardCheck, TrendingUp, DollarSign, UserMinus, BookOpen, FileBarChart, FolderOpen, Sparkles, Shield, Bell, Calendar, FileText, FileSignature, ScanSearch, Search, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

// The PreciseHR app (HRIS) lives on its own subdomain, separate from this marketing site.
const APP_URL = 'https://app.precisehr.ca';

const toolsMenu = [
  { name: 'Compliance Checker', href: '/compliance-checker', description: 'Check your HR compliance gaps', icon: Shield },
  { name: 'JD Generator', href: '/jd-generator', description: 'Generate job descriptions instantly', icon: Sparkles },
  { name: 'Policy & Handbook Generator', href: '/policy-generator', description: 'Draft Canadian-compliant HR policies', icon: FileText },
  { name: 'Offer Letter Generator', href: '/offer-letter', description: 'Create a ready-to-send offer letter', icon: FileSignature },
  { name: 'Policy Red-Flag Scanner', href: '/policy-scanner', description: 'Spot compliance gaps in a policy', icon: ScanSearch },
  { name: 'Net Pay Calculator', href: '/net-pay-calculator', description: 'Calculate take-home pay for 2026', icon: Calculator },
  { name: 'ROI Calculator', href: '/roi-calculator', description: 'Calculate HR outsourcing savings', icon: Calculator },
  { name: 'HR Health Check', href: '/hr-assessment', description: 'Assess your HR compliance', icon: ClipboardCheck },
  { name: 'Salary Benchmarking', href: '/salary-benchmarking', description: 'Compare Canadian salaries', icon: TrendingUp },
  { name: 'Turnover Cost Calculator', href: '/turnover-calculator', description: 'Calculate turnover costs', icon: UserMinus },
  { name: 'Hiring Cost Calculator', href: '/hiring-calculator', description: 'Calculate cost-per-hire', icon: DollarSign },
];

const resourcesMenu = [
  { name: 'Compliance Updates', href: '/compliance-updates', description: 'Latest Canadian HR law changes', icon: Bell },
  { name: 'Statutory Holidays', href: '/statutory-holidays', description: '2026 holiday calendar & pay calculator', icon: Calendar },
  { name: 'Minimum Wage Tracker', href: '/minimum-wage', description: 'Current rates across Canada', icon: DollarSign },
  { name: 'Blog', href: '/blog', description: 'HR insights and best practices', icon: BookOpen },
  { name: 'Articles', href: '/articles', description: 'Leadership essays by Jeffrey T. Furtado', icon: FileText },
  { name: 'Case Studies', href: '/case-studies', description: 'Client success stories', icon: FileBarChart },
  { name: 'HR Resources', href: '/resources', description: 'Templates, guides & downloads', icon: FolderOpen },
];

// Highest-population provinces shown inline in the picker (~90% of Canadians).
// The full list of 13 lives on the /hr-services hub via the "All" link.
const TOP_PROVINCES = [
  { name: 'Ontario', slug: 'ontario' },
  { name: 'Quebec', slug: 'quebec' },
  { name: 'British Columbia', slug: 'british-columbia' },
  { name: 'Alberta', slug: 'alberta' },
  { name: 'Manitoba', slug: 'manitoba' },
  { name: 'Nova Scotia', slug: 'nova-scotia' },
];

function Dropdown({ label, items, isOpen, onToggle, buttonRef, isHighlighted }: {
  label: string;
  items: typeof toolsMenu;
  isOpen: boolean;
  onToggle: () => void;
  buttonRef: React.RefObject<HTMLDivElement | null>;
  isHighlighted?: boolean;
}) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const hasActivePage = items.some((t) => location.pathname === t.href);

  return (
    <div ref={buttonRef} className="relative">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          isHighlighted
            ? hasActivePage || isOpen
              ? 'bg-primary text-primary-foreground'
              : 'bg-primary/90 text-primary-foreground hover:bg-primary'
            : hasActivePage || isOpen
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:bg-muted'
        } ${isHighlighted ? 'rounded-full' : ''}`}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div role="menu" className="absolute right-0 mt-2 w-72 rounded-lg border bg-background shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                role="menuitem"
                className={`flex items-start gap-3 px-4 py-3 hover:bg-muted transition-colors ${
                  isActive(item.href) ? 'bg-muted' : ''
                }`}
              >
                <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MobileDropdown({ label, items, isOpen, onToggle, onNavigate, isActive }: {
  label: string;
  items: typeof toolsMenu;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  isActive: boolean;
}) {
  const location = useLocation();

  return (
    <>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
        }`}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div role="menu" className="ml-4 space-y-1">
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              role="menuitem"
              className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                location.pathname === item.href
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              onClick={onNavigate}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

function ProvinceDropdown({ isOpen, onToggle, buttonRef }: {
  isOpen: boolean;
  onToggle: () => void;
  buttonRef: React.RefObject<HTMLDivElement | null>;
}) {
  const location = useLocation();
  const onProvincePage = location.pathname.startsWith('/hr-services');

  return (
    <div ref={buttonRef} className="relative">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          onProvincePage || isOpen ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
        }`}
      >
        <MapPin className="h-4 w-4" />
        HR by province
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div role="menu" className="absolute right-0 mt-2 w-80 rounded-lg border bg-background shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-2 pt-1 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            HR services by province
          </div>
          <div className="grid grid-cols-2 gap-0.5">
            {TOP_PROVINCES.map((p) => (
              <Link
                key={p.slug}
                to={`/hr-services/${p.slug}`}
                role="menuitem"
                className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted ${
                  location.pathname === `/hr-services/${p.slug}` ? 'bg-muted text-primary font-medium' : ''
                }`}
              >
                {p.name}
              </Link>
            ))}
          </div>
          <Link
            to="/hr-services"
            role="menuitem"
            className="mt-1.5 flex items-center justify-between border-t border-border px-3 pt-3 pb-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            All 13 provinces &amp; territories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [isMac, setIsMac] = useState(true);
  const toolsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const provincesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.userAgent));
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'AI', href: '/ai' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isToolsActive = toolsMenu.some((t) => location.pathname === t.href);
  const isResourcesActive = resourcesMenu.some((t) => location.pathname === t.href);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const inside =
        (toolsRef.current && toolsRef.current.contains(target)) ||
        (resourcesRef.current && resourcesRef.current.contains(target)) ||
        (provincesRef.current && provincesRef.current.contains(target));
      if (!inside) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setOpenDropdown(null);
    setIsMenuOpen(false);
    setMobileOpen(null);
  }, [location.pathname]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/precisehr-logo.svg" alt="PreciseHR" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
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
            <Dropdown
              label="Tools"
              items={toolsMenu}
              isOpen={openDropdown === 'tools'}
              onToggle={() => toggleDropdown('tools')}
              buttonRef={toolsRef}
              isHighlighted
            />

            {/* Resources Dropdown */}
            <Dropdown
              label="Resources"
              items={resourcesMenu}
              isOpen={openDropdown === 'resources'}
              onToggle={() => toggleDropdown('resources')}
              buttonRef={resourcesRef}
            />

            {/* HR by Province Dropdown */}
            <ProvinceDropdown
              isOpen={openDropdown === 'provinces'}
              onToggle={() => toggleDropdown('provinces')}
              buttonRef={provincesRef}
            />

            <Link
              to="/app"
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors text-foreground hover:bg-muted"
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
              aria-label="Search"
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <Search className="w-4 h-4" />
              <kbd className="text-[10px] font-medium border rounded px-1.5 py-0.5">{isMac ? '⌘K' : 'Ctrl+K'}</kbd>
            </button>
            <ThemeToggle />
            <a
              href={APP_URL}
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Log In
            </a>
            <Link to="/contact">
              <Button>Get Free Assessment</Button>
            </Link>
          </div>

          {/* Mobile: search + theme + menu */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-foreground hover:bg-muted"
              onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <ThemeToggle />
            <button
              type="button"
              className="p-2 rounded-md text-foreground hover:bg-muted"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-2">
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

            <MobileDropdown
              label="Tools"
              items={toolsMenu}
              isOpen={mobileOpen === 'tools'}
              onToggle={() => setMobileOpen(mobileOpen === 'tools' ? null : 'tools')}
              onNavigate={() => setIsMenuOpen(false)}
              isActive={isToolsActive}
            />

            <MobileDropdown
              label="Resources"
              items={resourcesMenu}
              isOpen={mobileOpen === 'resources'}
              onToggle={() => setMobileOpen(mobileOpen === 'resources' ? null : 'resources')}
              onNavigate={() => setIsMenuOpen(false)}
              isActive={isResourcesActive}
            />

            {/* HR by province (mobile) */}
            <button
              onClick={() => setMobileOpen(mobileOpen === 'provinces' ? null : 'provinces')}
              aria-expanded={mobileOpen === 'provinces'}
              aria-haspopup="true"
              className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname.startsWith('/hr-services') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
              }`}
            >
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> HR by province</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen === 'provinces' ? 'rotate-180' : ''}`} />
            </button>
            {mobileOpen === 'provinces' && (
              <div role="menu" className="ml-4 space-y-1">
                {TOP_PROVINCES.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/hr-services/${p.slug}`}
                    role="menuitem"
                    className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                      location.pathname === `/hr-services/${p.slug}`
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {p.name}
                  </Link>
                ))}
                <Link
                  to="/hr-services"
                  role="menuitem"
                  className="block px-4 py-2 text-sm rounded-md font-medium text-primary hover:bg-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All 13 provinces &amp; territories →
                </Link>
              </div>
            )}

            <Link
              to="/app"
              className="block px-4 py-2 text-sm font-medium rounded-md transition-colors text-foreground hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            <a
              href={APP_URL}
              className="block px-4 py-2 text-sm font-medium rounded-md transition-colors text-foreground hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </a>

            <div className="pt-4">
              <Link to="/contact" className="block" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Contact Us</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
