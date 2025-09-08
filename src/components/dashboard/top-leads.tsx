import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/ui/score-badge";
import { 
  Building2, 
  Mail, 
  Phone, 
  Calendar,
  TrendingUp,
  ExternalLink
} from "lucide-react";

interface Lead {
  id: string;
  contact: string;
  title: string;
  company: string;
  industry: string;
  score: number;
  engagement: "high" | "medium" | "low";
  nextAction: string;
  revenue: number;
  lastActivity: string;
}

const leads: Lead[] = [
  {
    id: "1",
    contact: "Sarah Johnson",
    title: "CTO",
    company: "TechCorp Inc",
    industry: "Technology",
    score: 92,
    engagement: "high",
    nextAction: "Schedule demo",
    revenue: 125000,
    lastActivity: "Opened pricing email",
  },
  {
    id: "2",
    contact: "Emma Davis",
    title: "VP Engineering",
    company: "CloudNet Solutions",
    industry: "Cloud Services",
    score: 87,
    engagement: "high",
    nextAction: "Follow up call",
    revenue: 89000,
    lastActivity: "Downloaded whitepaper",
  },
  {
    id: "3",
    contact: "Mike Chen",
    title: "Data Director",
    company: "DataFlow Systems",
    industry: "Analytics",
    score: 74,
    engagement: "medium",
    nextAction: "Send case study",
    revenue: 67000,
    lastActivity: "Viewed demo video",
  },
  {
    id: "4",
    contact: "Robert Taylor",
    title: "Head of AI",
    company: "InnovateLab",
    industry: "Research",
    score: 81,
    engagement: "medium",
    nextAction: "Product demo",
    revenue: 95000,
    lastActivity: "Website visit",
  },
];

export function TopLeads() {
  const getEngagementColor = (engagement: Lead["engagement"]) => {
    switch (engagement) {
      case "high":
        return "bg-success/10 text-success";
      case "medium":
        return "bg-warning/10 text-warning";
      case "low":
        return "bg-destructive/10 text-destructive";
    }
  };

  return (
    <Card className="p-6 bg-gradient-card">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">Top Scoring Leads</h3>
          <p className="text-sm text-muted-foreground">Prioritized by AI prediction</p>
        </div>
        <Button variant="outline" size="sm">
          <ExternalLink className="w-4 h-4 mr-2" />
          View All Leads
        </Button>
      </div>
      
      <div className="space-y-4">
        {leads.map((lead, index) => (
          <div
            key={lead.id}
            className="flex items-center space-x-4 p-4 rounded-lg border border-border bg-card hover:shadow-soft transition-all cursor-pointer group"
          >
            <div className="flex-shrink-0">
              <ScoreRing score={lead.score} size={60} />
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-semibold text-foreground">{lead.contact}</h4>
                    <Badge variant="outline" className={getEngagementColor(lead.engagement)}>
                      {lead.engagement}
                    </Badge>
                    {index < 2 && (
                      <Badge className="bg-gradient-primary text-primary-foreground">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {lead.title} • {lead.company}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    ${lead.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Potential revenue</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center text-muted-foreground">
                    <Building2 className="w-3 h-3 mr-1" />
                    {lead.industry}
                  </span>
                  <span className="text-primary font-medium">{lead.nextAction}</span>
                </div>
                <span className="text-muted-foreground">{lead.lastActivity}</span>
              </div>
            </div>
            
            <div className="flex-shrink-0 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Mail className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Calendar className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}