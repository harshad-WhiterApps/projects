import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { JobCard } from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter,
  SortDesc
} from "lucide-react";

export const Jobs = () => {
  const [currentPage, setCurrentPage] = useState("jobs");
  const [searchQuery, setSearchQuery] = useState("");

  const jobs = [
    {
      id: "1",
      title: "Senior React Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "full-time" as const,
      salary: "$120k - $160k",
      postedDate: "2 days ago",
      applications: 45,
      status: "active" as const,
      urgency: "high" as const,
    },
    {
      id: "2",
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      type: "full-time" as const,
      salary: "$80k - $110k",
      postedDate: "1 week ago",
      applications: 32,
      status: "active" as const,
      urgency: "medium" as const,
    },
    {
      id: "3",
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "full-time" as const,
      salary: "$130k - $170k",
      postedDate: "3 days ago",
      applications: 28,
      status: "paused" as const,
      urgency: "low" as const,
    },
    {
      id: "4",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Austin, TX",
      type: "contract" as const,
      salary: "$90k - $130k",
      postedDate: "5 days ago",
      applications: 19,
      status: "active" as const,
      urgency: "high" as const,
    },
    {
      id: "5",
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Los Angeles, CA",
      type: "part-time" as const,
      salary: "$50k - $70k",
      postedDate: "1 week ago",
      applications: 67,
      status: "closed" as const,
      urgency: "low" as const,
    },
    {
      id: "6",
      title: "Data Scientist",
      department: "Analytics",
      location: "Seattle, WA",
      type: "remote" as const,
      salary: "$110k - $150k",
      postedDate: "4 days ago",
      applications: 38,
      status: "active" as const,
      urgency: "medium" as const,
    },
  ];

  const handleEditJob = (jobId: string) => {
    console.log("Edit job:", jobId);
  };

  const handleViewJob = (jobId: string) => {
    console.log("View job:", jobId);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Job Postings</h1>
            <p className="text-muted-foreground">
              Manage and track your active job positions.
            </p>
          </div>
          
          <Button variant="hero" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search jobs by title or department..."
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

        {/* Status Overview */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Badge variant="outline" className="bg-success/10 text-success-foreground border-success/20">
            Active: {jobs.filter(job => job.status === "active").length}
          </Badge>
          <Badge variant="outline" className="bg-warning/10 text-warning-foreground border-warning/20">
            Paused: {jobs.filter(job => job.status === "paused").length}
          </Badge>
          <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
            Closed: {jobs.filter(job => job.status === "closed").length}
          </Badge>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job, index) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={handleEditJob}
              onView={handleViewJob}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No jobs found matching your search.</p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};