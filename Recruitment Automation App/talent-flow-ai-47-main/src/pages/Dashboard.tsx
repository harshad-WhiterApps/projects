import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  Briefcase, 
  Clock, 
  TrendingUp,
  Plus,
  Filter,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

export const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const stats = [
    {
      title: "Total Candidates",
      value: "1,248",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: Users,
      description: "Active in pipeline"
    },
    {
      title: "Open Positions",
      value: "24",
      change: "+3 new this week",
      changeType: "positive" as const,
      icon: Briefcase,
      description: "Across all departments"
    },
    {
      title: "Avg. Time to Hire",
      value: "18 days",
      change: "-5 days improvement",
      changeType: "positive" as const,
      icon: Clock,
      description: "From application to offer"
    },
    {
      title: "Success Rate",
      value: "89%",
      change: "+7% from last month",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Successful hires"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good morning, John! 👋</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your recruitment today.
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="hero" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Job
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard
              key={stat.title}
              {...stat}
              className="animate-slide-up"
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="xl:col-span-2">
            <RecentActivity />
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-card">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Review Candidates
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  Search Talent Pool
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <h3 className="text-lg font-semibold mb-4">Pipeline Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Applied</span>
                  <span className="font-medium">324</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Screening</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Interview</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Offer</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Jobs Preview */}
        <div className="mt-8">
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Job Postings</h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {[
                { title: "Senior React Developer", applicants: 45, status: "Active" },
                { title: "UX Designer", applicants: 32, status: "Active" },
                { title: "Product Manager", applicants: 28, status: "Paused" },
              ].map((job, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">{job.applicants} applicants</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      job.status === "Active" 
                        ? "bg-success/10 text-success" 
                        : "bg-warning/10 text-warning"
                    }`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};