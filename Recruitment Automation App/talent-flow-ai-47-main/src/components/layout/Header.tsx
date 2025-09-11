import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Users, 
  Briefcase, 
  BarChart3, 
  Settings,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Header = ({ currentPage = "dashboard", onNavigate }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", id: "dashboard", icon: BarChart3 },
    { name: "Jobs", id: "jobs", icon: Briefcase },
    { name: "Candidates", id: "candidates", icon: Users },
    { name: "Settings", id: "settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-card backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                RecruitAI
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate?.(item.id)}
                  className="flex items-center space-x-2"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.name}</span>
                </Button>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full"></div>
            </Button>
            
            <div className="hidden sm:flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-white">JD</span>
              </div>
              <span className="text-sm font-medium">John Doe</span>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-slide-up">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "secondary" : "ghost"}
                    className="justify-start space-x-2"
                    onClick={() => {
                      onNavigate?.(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};