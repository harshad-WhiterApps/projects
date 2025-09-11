import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  description,
  className,
}: StatsCardProps) => {
  return (
    <Card className={cn(
      "p-6 bg-gradient-card hover:shadow-medium transition-all duration-200",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="space-y-1">
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <p className={cn(
                "text-xs font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </Card>
  );
};