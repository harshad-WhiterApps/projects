import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { CandidateCard } from "@/components/candidates/CandidateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  Filter,
  SortDesc,
  Upload,
  Users,
  Star
} from "lucide-react";

export const Candidates = () => {
  const [currentPage, setCurrentPage] = useState("candidates");
  const [searchQuery, setSearchQuery] = useState("");

  const candidates = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      position: "Senior React Developer",
      location: "San Francisco, CA",
      experience: "5+ years",
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker"],
      score: 92,
      status: "shortlisted" as const,
      appliedDate: "2 days ago",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      position: "UX Designer",
      location: "New York, NY",
      experience: "4 years",
      skills: ["Figma", "Sketch", "User Research", "Prototyping", "Design Systems"],
      score: 88,
      status: "interview" as const,
      appliedDate: "3 days ago",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      position: "Product Manager",
      location: "Austin, TX",
      experience: "6+ years",
      skills: ["Product Strategy", "Agile", "Data Analysis", "User Stories", "Roadmapping"],
      score: 85,
      status: "screening" as const,
      appliedDate: "1 week ago",
    },
    {
      id: "4",
      name: "David Kumar",
      email: "david.kumar@email.com",
      phone: "+1 (555) 456-7890",
      position: "DevOps Engineer",
      location: "Seattle, WA",
      experience: "7+ years",
      skills: ["Kubernetes", "Docker", "CI/CD", "AWS", "Terraform", "Monitoring"],
      score: 90,
      status: "hired" as const,
      appliedDate: "2 weeks ago",
    },
    {
      id: "5",
      name: "Lisa Zhang",
      email: "lisa.zhang@email.com",
      phone: "+1 (555) 567-8901",
      position: "Data Scientist",
      location: "Boston, MA",
      experience: "3 years",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
      score: 78,
      status: "new" as const,
      appliedDate: "1 day ago",
    },
    {
      id: "6",
      name: "Alex Thompson",
      email: "alex.thompson@email.com",
      phone: "+1 (555) 678-9012",
      position: "Frontend Developer",
      location: "Remote",
      experience: "2 years",
      skills: ["Vue.js", "JavaScript", "CSS", "HTML", "Git"],
      score: 65,
      status: "rejected" as const,
      appliedDate: "1 week ago",
    },
  ];

  const handleMessage = (candidateId: string) => {
    console.log("Message candidate:", candidateId);
  };

  const handleDownload = (candidateId: string) => {
    console.log("Download resume:", candidateId);
  };

  const handleViewProfile = (candidateId: string) => {
    console.log("View profile:", candidateId);
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const statusCounts = {
    new: candidates.filter(c => c.status === "new").length,
    screening: candidates.filter(c => c.status === "screening").length,
    interview: candidates.filter(c => c.status === "interview").length,
    shortlisted: candidates.filter(c => c.status === "shortlisted").length,
    hired: candidates.filter(c => c.status === "hired").length,
    rejected: candidates.filter(c => c.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Candidates</h1>
            <p className="text-muted-foreground">
              Review and manage candidate applications.
            </p>
          </div>
          
          <Button variant="hero" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Resume
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">New</p>
                <p className="text-lg font-bold">{statusCounts.new}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-warning/10 text-warning-foreground rounded-lg flex items-center justify-center">
                <Search className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Screening</p>
                <p className="text-lg font-bold">{statusCounts.screening}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-accent/10 text-accent-foreground rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Interview</p>
                <p className="text-lg font-bold">{statusCounts.interview}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-success/10 text-success-foreground rounded-lg flex items-center justify-center">
                <Star className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Shortlisted</p>
                <p className="text-lg font-bold">{statusCounts.shortlisted}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary/10 text-primary-foreground rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Hired</p>
                <p className="text-lg font-bold">{statusCounts.hired}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-destructive/10 text-destructive-foreground rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Rejected</p>
                <p className="text-lg font-bold">{statusCounts.rejected}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search candidates by name, position, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <SortDesc className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCandidates.map((candidate, index) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onMessage={handleMessage}
              onDownload={handleDownload}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No candidates found matching your search.</p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};