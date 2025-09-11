import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-lending.jpg";

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-6 py-20 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Fast, Simple
                <br />
                <span className="text-accent">SME Lending</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                Get the capital your business needs with our AI-powered lending platform. 
                Quick approvals, competitive rates, and transparent processes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="gradient" className="text-lg px-8 py-4">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24hrs</div>
                <div className="text-white/80 text-sm">Quick Approval</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">₹5L-50Cr</div>
                <div className="text-white/80 text-sm">Loan Amount</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">8.5%</div>
                <div className="text-white/80 text-sm">Starting Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src={heroImage} 
              alt="SME business owners working on their laptops" 
              className="rounded-2xl shadow-large w-full"
            />
            
            {/* Floating cards */}
            <Card className="absolute -bottom-6 -left-6 p-4 bg-card/95 backdrop-blur-sm shadow-medium">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Shield className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Secure & Compliant</div>
                  <div className="text-xs text-muted-foreground">RBI Guidelines</div>
                </div>
              </div>
            </Card>

            <Card className="absolute -top-6 -right-6 p-4 bg-card/95 backdrop-blur-sm shadow-medium">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">AI Powered</div>
                  <div className="text-xs text-muted-foreground">Smart Credit Scoring</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};