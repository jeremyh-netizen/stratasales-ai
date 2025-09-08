import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ScoreBadgeProps {
  score: number;
  maxScore?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ScoreBadge({ score, maxScore = 100, className, size = "md" }: ScoreBadgeProps) {
  const percentage = (score / maxScore) * 100;
  
  const getScoreColor = () => {
    if (percentage >= 80) return "bg-success text-success-foreground";
    if (percentage >= 60) return "bg-warning text-warning-foreground";
    if (percentage >= 40) return "bg-primary text-primary-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs px-2 py-0.5";
      case "lg":
        return "text-base px-4 py-2";
      default:
        return "text-sm px-3 py-1";
    }
  };

  return (
    <Badge 
      className={cn(
        "font-semibold shadow-soft",
        getScoreColor(),
        getSizeClasses(),
        className
      )}
    >
      {Math.round(score)}/{maxScore}
    </Badge>
  );
}

interface ScoreRingProps {
  score: number;
  maxScore?: number;
  size?: number;
  className?: string;
}

export function ScoreRing({ score, maxScore = 100, size = 80, className }: ScoreRingProps) {
  const percentage = (score / maxScore) * 100;
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getScoreColor = () => {
    if (percentage >= 80) return "stroke-success";
    if (percentage >= 60) return "stroke-warning";
    if (percentage >= 40) return "stroke-primary";
    return "stroke-destructive";
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--border))"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={getScoreColor()}
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.5s ease-in-out",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-foreground">{Math.round(score)}</span>
      </div>
    </div>
  );
}