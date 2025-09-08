import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Clock,
  Lightbulb,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface Insight {
  id: string;
  type: "opportunity" | "risk" | "action" | "prediction";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  confidence: number;
  action?: string;
}

const insights: Insight[] = [
  {
    id: "1",
    type: "opportunity",
    title: "High-Value Lead Cluster",
    description: "3 enterprise leads from healthcare showing similar engagement patterns. Consider targeted campaign.",
    impact: "high",
    confidence: 94,
    action: "Create healthcare-specific sequence",
  },
  {
    id: "2",
    type: "prediction",
    title: "Revenue Forecast Update",
    description: "Based on current pipeline activity, projected to exceed Q4 target by 12%.",
    impact: "high",
    confidence: 87,
  },
  {
    id: "3",
    type: "action",
    title: "Follow-up Opportunities",
    description: "8 leads haven't been contacted in 5+ days despite high scores. Immediate outreach recommended.",
    impact: "medium",
    confidence: 91,
    action: "Schedule immediate follow-ups",
  },
  {
    id: "4",
    type: "risk",
    title: "Engagement Drop Alert",
    description: "CloudNet Solutions engagement decreased 40% this week. Risk of losing opportunity.",
    impact: "medium",
    confidence: 76,
    action: "Priority check-in call",
  },
];

export function AIInsights() {
  const getTypeIcon = (type: Insight["type"]) => {
    switch (type) {
      case "opportunity":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "risk":
        return <Target className="w-4 h-4 text-destructive" />;
      case "action":
        return <Clock className="w-4 h-4 text-warning" />;
      case "prediction":
        return <Brain className="w-4 h-4 text-primary" />;
    }
  };

  const getTypeColor = (type: Insight["type"]) => {
    switch (type) {
      case "opportunity":
        return "bg-success/10 text-success";
      case "risk":
        return "bg-destructive/10 text-destructive";
      case "action":
        return "bg-warning/10 text-warning";
      case "prediction":
        return "bg-primary/10 text-primary";
    }
  };

  const getImpactColor = (impact: Insight["impact"]) => {
    switch (impact) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-6 bg-gradient-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
            <p className="text-sm text-muted-foreground">Intelligent recommendations</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
          <Brain className="w-3 h-3 mr-1" />
          4 New
        </Badge>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors group"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getTypeIcon(insight.type)}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-foreground">{insight.title}</h4>
                    <Badge variant="outline" className={getTypeColor(insight.type)}>
                      {insight.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getImpactColor(insight.impact)}>
                      {insight.impact} impact
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {insight.confidence}% confident
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                
                {insight.action && (
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-medium text-primary">
                      <Lightbulb className="w-3 h-3 inline mr-1" />
                      Recommended: {insight.action}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Take Action
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}