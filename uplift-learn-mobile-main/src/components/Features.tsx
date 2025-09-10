import { Card, CardContent } from "@/components/ui/card";
import { 
  Smartphone, 
  Award, 
  BarChart3, 
  Users, 
  BookOpen, 
  MessageSquare,
  Download,
  Trophy,
  Clock
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Mobile-First Learning",
      description: "Access courses anywhere, anytime with our responsive mobile app. Offline downloads ensure learning never stops.",
      gradient: "from-primary to-primary-light"
    },
    {
      icon: Award,
      title: "Certification & Badges",
      description: "Earn industry-recognized certifications and digital badges. Gamification elements boost engagement and motivation.",
      gradient: "from-warning to-warning"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track learning progress, identify skill gaps, and measure ROI with comprehensive reporting and analytics.",
      gradient: "from-success to-success-light"
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Tailored experiences for admins, trainers, and employees. Manage permissions and content access effortlessly.",
      gradient: "from-secondary to-secondary"
    },
    {
      icon: BookOpen,
      title: "Rich Content Library",
      description: "Support for videos, documents, SCORM packages, and interactive assessments. Create engaging learning paths.",
      gradient: "from-primary to-secondary"
    },
    {
      icon: MessageSquare,
      title: "Collaboration Tools",
      description: "Discussion forums, Q&A sessions, and direct messaging between trainers and learners foster community learning.",
      gradient: "from-success to-primary"
    },
    {
      icon: Download,
      title: "Offline Learning",
      description: "Download courses for offline access. Perfect for remote workers and areas with limited connectivity.",
      gradient: "from-warning to-success"
    },
    {
      icon: Trophy,
      title: "Gamification",
      description: "Points, leaderboards, and achievement systems make learning fun and competitive, driving higher engagement.",
      gradient: "from-primary to-warning"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Self-paced learning with deadline management. Automated reminders keep learners on track.",
      gradient: "from-secondary to-primary"
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="h-4 w-4" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need for
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Effective Training</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive LMS platform provides all the tools necessary to create, 
            deliver, and track corporate training programs that drive real business results.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-medium transition-smooth border-0 bg-gradient-feature">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-bounce`}>
                    <Icon className="h-6 w-6 text-background" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;