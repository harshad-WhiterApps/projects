import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock, FileText, Users, CheckCircle } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "application" | "interview" | "shortlist" | "hire";
  candidate: string;
  position: string;
  time: string;
  status: "pending" | "completed" | "rejected";
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "application",
    candidate: "Sarah Johnson",
    position: "Senior React Developer",
    time: "2 minutes ago",
    status: "pending"
  },
  {
    id: "2",
    type: "shortlist",
    candidate: "Michael Chen",
    position: "UX Designer",
    time: "15 minutes ago",
    status: "completed"
  },
  {
    id: "3",
    type: "interview",
    candidate: "Emily Rodriguez",
    position: "Product Manager",
    time: "1 hour ago",
    status: "completed"
  },
  {
    id: "4",
    type: "hire",
    candidate: "David Kumar",
    position: "DevOps Engineer",
    time: "3 hours ago",
    status: "completed"
  },
  {
    id: "5",
    type: "application",
    candidate: "Lisa Zhang",
    position: "Data Scientist",
    time: "5 hours ago",
    status: "pending"
  }
];

const getActivityIcon = (type: ActivityItem["type"]) => {
  const icons = {
    application: FileText,
    interview: Users,
    shortlist: CheckCircle,
    hire: CheckCircle,
  };
  return icons[type];
};

const getStatusColor = (status: ActivityItem["status"]) => {
  const colors = {
    pending: "bg-warning/10 text-warning-foreground border-warning/20",
    completed: "bg-success/10 text-success-foreground border-success/20",
    rejected: "bg-destructive/10 text-destructive-foreground border-destructive/20",
  };
  return colors[status];
};

export const RecentActivity = () => {
  return (
    <Card className="p-6 bg-gradient-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <Badge variant="secondary" className="text-xs">
          Live Updates
        </Badge>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const IconComponent = getActivityIcon(activity.type);
          const initials = activity.candidate
            .split(" ")
            .map(name => name[0])
            .join("")
            .toUpperCase();

          return (
            <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.candidate}`} />
                <AvatarFallback className="bg-gradient-primary text-white text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium truncate">
                    {activity.candidate}
                  </p>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getStatusColor(activity.status)}`}
                  >
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Applied for {activity.position}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t">
        <button className="text-sm text-primary hover:underline">
          View all activity
        </button>
      </div>
    </Card>
  );
};