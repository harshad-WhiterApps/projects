import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Brain, 
  Clock, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Shield,
  BarChart3
} from "lucide-react";
import heroImage from "@/assets/hero-recruitment.jpg";
import dashboardFeature from "@/assets/dashboard-feature.jpg";
import aiParsingImage from "@/assets/ai-parsing.jpg";

export const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Resume Parsing",
      description: "Automatically extract and analyze candidate information from resumes in seconds.",
      image: aiParsingImage,
    },
    {
      icon: Target,
      title: "Smart Candidate Matching",
      description: "Match candidates to job requirements with intelligent scoring algorithms.",
      image: dashboardFeature,
    },
    {
      icon: Clock,
      title: "Automated Workflows",
      description: "Streamline your hiring process with configurable automation pipelines.",
      image: dashboardFeature,
    },
  ];

  const benefits = [
    { icon: Zap, title: "85% Faster Screening", description: "Reduce time-to-hire significantly" },
    { icon: Shield, title: "99.9% Accuracy", description: "Advanced AI ensures precise matching" },
    { icon: BarChart3, title: "60% Cost Reduction", description: "Lower recruitment costs per hire" },
  ];

  const handleGetStarted = () => {
    // This would typically navigate to signup or dashboard
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-gradient-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                RecruitAI
              </span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </a>
              <a href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
                Benefits
              </a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button variant="hero" size="sm" onClick={handleGetStarted}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <Badge variant="secondary" className="mb-4">
                ✨ AI-Powered Recruitment Platform
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your
                <span className="bg-gradient-hero bg-clip-text text-transparent block">
                  Hiring Process
                </span>
                with AI
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Automate resume parsing, candidate screening, and job matching with our 
                intelligent recruitment platform. Reduce time-to-hire by 85% and find 
                the perfect candidates faster than ever.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" onClick={handleGetStarted} className="group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="xl">
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-hero rounded-3xl blur-3xl opacity-20 animate-glow"></div>
              <img
                src={heroImage}
                alt="Recruitment automation platform"
                className="relative rounded-3xl shadow-strong w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose RecruitAI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform delivers measurable results that transform your recruitment process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="p-8 text-center bg-gradient-card hover:shadow-medium transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Powerful Features for Modern Recruitment
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to streamline your hiring process and find the best talent.
            </p>
          </div>

          <div className="space-y-20">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">
                    {feature.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-sm">Automated processing in seconds</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-sm">99.9% accuracy rate</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-sm">Multiple file format support</span>
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-accent rounded-2xl blur-2xl opacity-20"></div>
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="relative rounded-2xl shadow-medium w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Recruitment?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using RecruitAI to find the best talent faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="xl" 
              onClick={handleGetStarted}
              className="bg-white text-primary hover:bg-white/90"
            >
              Start Free Trial
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-8 w-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              RecruitAI
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 RecruitAI. All rights reserved. Built with ❤️ for modern recruiters.
          </p>
        </div>
      </footer>
    </div>
  );
};