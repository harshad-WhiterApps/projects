import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Users, Award, BarChart3 } from "lucide-react";
import heroImage from "@/assets/hero-learning.jpg";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-feature">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              <span>Trusted by 500+ Companies</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Transform Your
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Workforce </span>
              with Mobile Learning
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Empower your employees with personalized, mobile-first training experiences. 
              Track progress, earn certifications, and boost productivity with our comprehensive LMS platform.
            </p>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">10,000+ Active Learners</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">89% Completion Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-warning" />
                <span className="text-sm text-muted-foreground">5,000+ Certificates Issued</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="group">
                Start Free Trial
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-large">
              <img
                src={heroImage}
                alt="Corporate team learning on mobile devices"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-soft font-semibold text-sm">
              📈 94% Engagement
            </div>
            <div className="absolute -bottom-4 -left-4 bg-background border border-border px-4 py-2 rounded-lg shadow-soft font-semibold text-sm">
              🎯 Mobile-First Design
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;