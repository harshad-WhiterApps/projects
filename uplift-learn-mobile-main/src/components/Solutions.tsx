import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Users, 
  GraduationCap, 
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Solutions = () => {
  const solutions = [
    {
      icon: Shield,
      title: "Admin Dashboard",
      role: "System Administrator",
      description: "Complete control over your learning ecosystem",
      features: [
        "User management & role assignments",
        "Course catalog administration",
        "Advanced analytics & reporting",
        "Payment & subscription management",
        "System configuration & settings"
      ],
      color: "primary"
    },
    {
      icon: GraduationCap,
      title: "Trainer Portal",
      role: "Content Creator & Instructor",
      description: "Powerful tools for creating engaging learning experiences",
      features: [
        "Content creation & course building",
        "Assessment design & grading",
        "Learner progress monitoring",
        "Discussion forum management",
        "Live session scheduling"
      ],
      color: "secondary"
    },
    {
      icon: Users,
      title: "Employee Experience",
      role: "Learner & Professional",
      description: "Intuitive learning journey designed for busy professionals",
      features: [
        "Mobile-first learning interface",
        "Personalized learning paths",
        "Progress tracking & achievements",
        "Offline content access",
        "Peer collaboration & discussions"
      ],
      color: "success"
    }
  ];

  return (
    <section id="solutions" className="py-16 lg:py-24 bg-gradient-feature">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            <span>Role-Based Solutions</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Tailored Experiences for
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Every User</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform adapts to different user needs, providing optimized interfaces and 
            features for administrators, trainers, and employees.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Card key={index} className="group hover:shadow-large transition-smooth border-0 bg-background">
                <CardContent className="p-8">
                  {/* Icon & Title */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-${solution.color}/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-bounce`}>
                      <Icon className={`h-8 w-8 text-${solution.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {solution.role}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-center mb-6">
                    {solution.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className={`h-5 w-5 text-${solution.color} mt-0.5 flex-shrink-0`} />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button 
                    variant={solution.color === 'primary' ? 'hero' : 'outline'} 
                    className="w-full group"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-background rounded-2xl p-8 shadow-soft border border-border max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Corporate Training?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of companies already using LearnPro to upskill their workforce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;