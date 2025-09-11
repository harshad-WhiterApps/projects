import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Building2, TrendingUp, FileText, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: TrendingUp },
    { name: "Apply for Loan", href: "/apply", icon: FileText },
    { name: "My Applications", href: "/applications", icon: Building2 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const NavLink = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => {
    const isActive = location.pathname === href;
    return (
      <Link
        to={href}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
          isActive 
            ? "bg-primary text-primary-foreground shadow-soft" 
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        } ${className}`}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LendFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.name} href={item.href}>
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline">Sign In</Button>
            <Button variant="hero">Get Started</Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink key={item.name} href={item.href} className="w-full">
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
                <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                  <Button variant="outline" className="w-full">Sign In</Button>
                  <Button variant="hero" className="w-full">Get Started</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};