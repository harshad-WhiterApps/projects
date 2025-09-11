import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  MoreHorizontal,
  Edit,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    department: string;
    location: string;
    type: "full-time" | "part-time" | "contract" | "remote";
    salary: string;
    postedDate: string;
    applications: number;
    status: "active" | "paused" | "closed";
    urgency: "low" | "medium" | "high";
  };
  onEdit?: (jobId: string) => void;
  onView?: (jobId: string) => void;
}

const getStatusColor = (status: string) => {
  const colors = {
    active: "bg-success/10 text-success-foreground border-success/20",
    paused: "bg-warning/10 text-warning-foreground border-warning/20",
    closed: "bg-muted text-muted-foreground border-border",
  };
  return colors[status as keyof typeof colors] || colors.active;
};

const getUrgencyColor = (urgency: string) => {
  const colors = {
    low: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    medium: "bg-warning/10 text-warning-foreground border-warning/20",
    high: "bg-destructive/10 text-destructive-foreground border-destructive/20",
  };
  return colors[urgency as keyof typeof colors] || colors.medium;
};

export const JobCard = ({ job, onEdit, onView }: JobCardProps) => {
  return (
    <Card className="p-6 bg-gradient-card hover:shadow-medium transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {job.title}
          </h3>
          <p className="text-sm text-muted-foreground">{job.department}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className={getStatusColor(job.status)}>
            {job.status}
          </Badge>
          <Badge variant="outline" className={getUrgencyColor(job.urgency)}>
            {job.urgency} priority
          </Badge>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span className="capitalize">{job.type.replace("-", " ")}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{job.applications} applications</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <span className="text-xs text-muted-foreground">
          Posted {job.postedDate}
        </span>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onView?.(job.id)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onEdit?.(job.id)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};