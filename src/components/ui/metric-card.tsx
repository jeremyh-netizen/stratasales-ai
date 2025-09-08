import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  className?: string;
  format?: "number" | "percentage" | "currency";
  description?: string;
}

export function MetricCard({
  title,
  value,
  change,
  trend,
  className,
  format = "number",
  description,
}: MetricCardProps) {
  const formatValue = (val: string | number) => {
    if (format === "percentage") return `${val}%`;
    if (format === "currency") return `$${val}`;
    return val;
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={cn("p-6 bg-gradient-card border-border shadow-soft hover:shadow-medium transition-all", className)}>
      <div className="flex items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {change !== undefined && (
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
            <span className={cn("text-xs font-medium", getTrendColor())}>
              {change > 0 ? "+" : ""}{change}%
            </span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold tracking-tight text-foreground">
          {formatValue(value)}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </Card>
  );
}