import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calculator, FileText, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-accounting.jpg";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium shadow-md">
                <Calculator className="w-4 h-4 mr-2" />
                SME Accounting Made Simple
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Transform Your
                </span>
                <br />
                Business Finances
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Streamline invoicing, expense tracking, GST compliance, and financial reporting with our comprehensive accounting platform designed for SMEs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">SMEs Trust Us</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">5-Min</div>
                <div className="text-sm text-muted-foreground">Setup Time</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-card">
              <img 
                src={heroImage} 
                alt="SME Accounting Dashboard Preview" 
                className="w-full h-auto object-cover"
              />
              
              {/* Floating cards */}
              <Card className="absolute -left-4 top-1/4 p-4 shadow-lg bg-card/95 backdrop-blur-sm border border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Invoice Generated</div>
                    <div className="text-xs text-muted-foreground">₹45,250 • #INV-2024-001</div>
                  </div>
                </div>
              </Card>

              <Card className="absolute -right-4 bottom-1/4 p-4 shadow-lg bg-card/95 backdrop-blur-sm border border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Monthly Revenue</div>
                    <div className="text-xs text-muted-foreground">+25% Growth</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;