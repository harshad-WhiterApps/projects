import { Card, CardContent } from "@/components/ui/card";
import { 
  Video, 
  Calendar, 
  FileText, 
  Shield, 
  Palette, 
  CreditCard,
  Users,
  BarChart3,
  Smartphone
} from "lucide-react";
import featuresImage from "@/assets/features-medical.jpg";

const features = [
  {
    icon: Video,
    title: "HD Video Consultations",
    description: "Crystal-clear video calls with secure WebRTC technology. Screen sharing and recording capabilities."
  },
  {
    icon: Calendar,
    title: "Smart Scheduling", 
    description: "Automated appointment booking with calendar sync. SMS and email reminders for patients."
  },
  {
    icon: FileText,
    title: "Digital Prescriptions",
    description: "E-prescriptions with digital signatures. Branded templates for professional documentation."
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "End-to-end encryption and secure data storage. Full compliance with healthcare regulations."
  },
  {
    icon: Palette,
    title: "White-Label Branding",
    description: "Complete customization with your logo, colors, and domain. Professional patient-facing experience."
  },
  {
    icon: CreditCard,
    title: "Integrated Payments",
    description: "Multiple payment gateways supported. Automated billing and insurance claim processing."
  },
  {
    icon: Users,
    title: "Multi-Role Dashboard",
    description: "Separate portals for patients, doctors, and clinic administrators with role-based permissions."
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Comprehensive insights on consultations, revenue, and patient satisfaction metrics."
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native iOS and Android apps for patients and doctors. Seamless cross-platform experience."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
            ⚡ Powerful Features
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Everything You Need for 
            <span className="bg-gradient-secondary bg-clip-text text-transparent"> Modern Healthcare</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive telemedicine platform with advanced features designed for healthcare professionals
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-medium transition-all duration-300 border-border/50 hover:border-primary/20"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex p-3 rounded-lg bg-gradient-primary/10 group-hover:bg-gradient-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature Highlight */}
        <div className="bg-gradient-subtle rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Built for Healthcare Professionals
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our platform is designed with input from healthcare professionals to ensure 
                  it meets the real-world needs of modern medical practice.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                  <p className="text-muted-foreground">Enterprise-grade security and compliance</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <p className="text-muted-foreground">Scalable infrastructure for any clinic size</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                  <p className="text-muted-foreground">24/7 technical support and training</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={featuresImage} 
                alt="Healthcare technology features"
                className="w-full h-auto rounded-xl shadow-soft"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;