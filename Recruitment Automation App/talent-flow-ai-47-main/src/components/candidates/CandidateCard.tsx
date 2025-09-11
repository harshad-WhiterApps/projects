import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  MapPin, 
  Calendar, 
  Star, 
  Mail, 
  Phone,
  Download,
  MessageCircle,
  MoreHorizontal
} from "lucide-react";

interface CandidateCardProps {
  candidate: {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    location: string;
    experience: string;
    skills: string[];
    score: number;
    status: "new" | "screening" | "interview" | "shortlisted" | "rejected" | "hired";
    appliedDate: string;
    avatar?: string;
  };
  onMessage?: (candidateId: string) => void;
  onDownload?: (candidateId: string) => void;
  onViewProfile?: (candidateId: string) => void;
}

const getStatusColor = (status: string) => {
  const colors = {
    new: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    screening: "bg-warning/10 text-warning-foreground border-warning/20",
    interview: "bg-accent/10 text-accent-foreground border-accent/20",
    shortlisted: "bg-success/10 text-success-foreground border-success/20",
    rejected: "bg-destructive/10 text-destructive-foreground border-destructive/20",
    hired: "bg-primary/10 text-primary-foreground border-primary/20",
  };
  return colors[status as keyof typeof colors] || colors.new;
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-destructive";
};

export const CandidateCard = ({ 
  candidate, 
  onMessage, 
  onDownload, 
  onViewProfile 
}: CandidateCardProps) => {
  const initials = candidate.name
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="p-6 bg-gradient-card hover:shadow-medium transition-all duration-200 group">
      <div className="flex items-start space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage 
            src={candidate.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.name}`} 
          />
          <AvatarFallback className="bg-gradient-primary text-white">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {candidate.name}
              </h3>
              <p className="text-sm text-muted-foreground">{candidate.position}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className={`h-4 w-4 ${getScoreColor(candidate.score)}`} />
                <span className={`text-sm font-medium ${getScoreColor(candidate.score)}`}>
                  {candidate.score}%
                </span>
              </div>
              <Badge variant="outline" className={getStatusColor(candidate.status)}>
                {candidate.status}
              </Badge>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{candidate.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{candidate.experience}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span className="truncate">{candidate.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>{candidate.phone}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {candidate.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{candidate.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-xs text-muted-foreground">
              Applied {candidate.appliedDate}
            </span>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onMessage?.(candidate.id)}
                className="h-8 w-8 p-0"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDownload?.(candidate.id)}
                className="h-8 w-8 p-0"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => onViewProfile?.(candidate.id)}
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};