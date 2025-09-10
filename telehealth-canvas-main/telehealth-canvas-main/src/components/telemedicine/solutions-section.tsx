import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  UserCheck, 
  Building2, 
  Crown,
  ArrowRight,
  Calendar,
  Video,
  FileText
} from "lucide-react";
import dashboardImage from "@/assets/dashboard-preview.jpg";

const solutions = [
  {
    icon: User,
    title: "For Patients",
    description: "Book appointments, attend video consultations, and manage your health records from anywhere.",
    features: [
      "Easy online booking",
      "Secure video consultations", 
      "Digital prescriptions",
      "Medical history access"
    ],
    cta: "Book Consultation"
  },
  {
    icon: UserCheck,
    title: "For Doctors",
    description: "Manage your practice efficiently with integrated scheduling, consultation tools, and patient records.",
    features: [
      "Smart scheduling system",
      "Professional video platform",
      "Digital prescription tools",
      "Patient management dashboard"
    ],
    cta: "Join as Doctor"
  },
  {
    icon: Building2,
    title: "For Clinics",
    description: "Complete white-label solution with custom branding, multi-doctor support, and business analytics.",
    features: [
      "Custom branding & domain",
      "Multi-doctor management",
      "Revenue analytics",
      "Patient relationship tools"
    ],
    cta: "Start Free Trial"
  },
  {
    icon: Crown,
    title: "Enterprise",
    description: "Advanced features for large healthcare organizations with custom integrations and dedicated support.",
    features: [
      "Custom integrations",
      "Dedicated support team",
      "Advanced compliance tools",
      "Multi-location management"
    ],
    cta: "Contact Sales"
  }
];

const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            🎯 Tailored Solutions
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Solutions for Every 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Healthcare Need</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're a patient seeking care, a doctor building your practice, or a clinic expanding your services
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-large transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/80 backdrop-blur-sm"
              >
                <CardContent className="p-6 space-y-6 h-full flex flex-col">
                  <div className="space-y-4">
                    <div className="inline-flex p-3 rounded-lg bg-gradient-primary/10 group-hover:bg-gradient-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {solution.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 flex-1">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  >
                    {solution.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Dashboard Preview */}
        <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-medium border border-border/50">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Powerful Dashboard for All Users
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Intuitive interfaces designed for each user type, ensuring optimal workflow 
                  and user experience across all touchpoints.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-gradient-subtle">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium text-foreground">Smart Scheduling</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-subtle">
                  <Video className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <div className="text-sm font-medium text-foreground">HD Video Calls</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-subtle">
                  <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium text-foreground">Digital Records</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-20 blur-xl"></div>
              <img 
                src={dashboardImage} 
                alt="Professional healthcare dashboard interface"
                className="relative w-full h-auto rounded-xl shadow-large border border-border/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;