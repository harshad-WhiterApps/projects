import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Shield, Clock, Users } from "lucide-react";
import heroImage from "@/assets/hero-doctor.jpg";

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-subtle overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                🩺 White-Label Telemedicine Platform
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Transform Your Clinic with 
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Professional </span>
                Telemedicine
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Complete white-label telemedicine solution for clinics and hospitals. 
                Secure video consultations, patient management, and custom branding - all in one platform.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 hover:bg-accent transition-all duration-300"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-success" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-secondary" />
                <span>500+ Clinics</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Professional doctor conducting telemedicine consultation"
                className="w-full h-auto rounded-2xl shadow-large"
              />
            </div>
            
            {/* Floating cards */}
            <Card className="absolute -top-4 -left-4 p-4 bg-card/95 backdrop-blur-sm shadow-medium border-0">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Consultation</span>
              </div>
            </Card>
            
            <Card className="absolute -bottom-4 -right-4 p-4 bg-card/95 backdrop-blur-sm shadow-medium border-0">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;