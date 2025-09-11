import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Target, 
  TrendingUp, 
  Users, 
  Award, 
  Calendar, 
  MessageSquare,
  BarChart3,
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";
import dashboardHero from "@/assets/dashboard-hero.jpg";

interface OKRItem {
  id: string;
  title: string;
  progress: number;
  status: "on-track" | "at-risk" | "behind";
  dueDate: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  performance: number;
  status: "excellent" | "good" | "average" | "poor";
}

const Dashboard = () => {
  const currentOKRs: OKRItem[] = [
    {
      id: "1",
      title: "Increase Customer Satisfaction Score to 4.5/5",
      progress: 78,
      status: "on-track",
      dueDate: "Dec 31, 2024"
    },
    {
      id: "2", 
      title: "Launch New Product Feature Suite",
      progress: 45,
      status: "at-risk",
      dueDate: "Nov 15, 2024"
    },
    {
      id: "3",
      title: "Reduce Support Response Time to <2 hours",
      progress: 92,
      status: "on-track", 
      dueDate: "Oct 30, 2024"
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Product Manager",
      avatar: "",
      performance: 94,
      status: "excellent"
    },
    {
      id: "2", 
      name: "Michael Chen",
      role: "Senior Developer",
      avatar: "",
      performance: 87,
      status: "good"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "UX Designer", 
      avatar: "",
      performance: 91,
      status: "excellent"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
      case "excellent":
        return "bg-performance-excellent text-success-foreground";
      case "good":
        return "bg-performance-good text-warning-foreground";
      case "at-risk":
      case "average":
        return "bg-performance-average text-warning-foreground";
      case "behind":
      case "poor":
        return "bg-performance-poor text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      {/* Header */}
      <header className="bg-card border-b border-border/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Performance Hub</h1>
                <p className="text-muted-foreground">Track goals, monitor progress, drive success</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-success border-0">Q4 2024</Badge>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-primary-foreground py-12">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={dashboardHero} 
            alt="Performance Dashboard" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm">Overall Performance</p>
                  <p className="text-3xl font-bold">89%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm">Active OKRs</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <Target className="w-8 h-8 text-warning" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm">Team Members</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <Users className="w-8 h-8 text-accent" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm">Achievements</p>
                  <p className="text-3xl font-bold">47</p>
                </div>
                <Award className="w-8 h-8 text-performance-excellent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Current OKRs */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Current OKRs</span>
                </CardTitle>
                <CardDescription>
                  Track progress on your key objectives and results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentOKRs.map((okr) => (
                  <div key={okr.id} className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{okr.title}</h4>
                        <div className="flex items-center space-x-3 mt-2">
                          <Badge className={getStatusColor(okr.status)}>
                            {okr.status.charAt(0).toUpperCase() + okr.status.slice(1).replace('-', ' ')}
                          </Badge>
                          <span className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {okr.dueDate}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-primary">{okr.progress}%</span>
                      </div>
                    </div>
                    <Progress value={okr.progress} className="h-2" />
                  </div>
                ))}
                <Button className="w-full bg-gradient-primary border-0 hover:opacity-90">
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  View All OKRs
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Team Performance */}
          <div>
            <Card className="bg-gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Team Performance</span>
                </CardTitle>
                <CardDescription>
                  Recent performance overview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{member.performance}%</p>
                      <Badge className={`${getStatusColor(member.status)} text-xs`}>
                        {member.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View Team Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span>Recent Feedback & Recognition</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Sarah completed Q3 OKR</p>
                      <p className="text-sm text-muted-foreground">Exceeded customer satisfaction target by 15%</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Michael received praise</p>
                      <p className="text-sm text-muted-foreground">"Excellent code quality and teamwork"</p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">New OKR assigned</p>
                      <p className="text-sm text-muted-foreground">Q1 2025 objectives now available</p>
                      <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;