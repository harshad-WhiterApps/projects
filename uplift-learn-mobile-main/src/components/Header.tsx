import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">LearnPro</h1>
              <p className="text-xs text-muted-foreground">Corporate Training</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-smooth">
              Features
            </a>
            <a href="#solutions" className="text-foreground hover:text-primary transition-smooth">
              Solutions
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-smooth">
              Pricing
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-smooth">
              Contact
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost">Sign In</Button>
            <Button variant="hero" size="lg">
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#solutions"
                className="text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </a>
              <a
                href="#pricing"
                className="text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost">Sign In</Button>
                <Button variant="hero">Start Free Trial</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;