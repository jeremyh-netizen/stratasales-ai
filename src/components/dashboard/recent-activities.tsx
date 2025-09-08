import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/ui/score-badge";
import { 
  Phone, 
  Mail, 
  Calendar, 
  Download,
  MessageSquare,
  ExternalLink
} from "lucide-react";

interface Activity {
  id: string;
  type: "call" | "email" | "meeting" | "download" | "message";
  title: string;
  description: string;
  contact: string;
  company: string;
  score: number;
  time: string;
  status: "completed" | "scheduled" | "pending";
}

const activities: Activity[] = [
  {
    id: "1",
    type: "call",
    title: "Discovery Call",
    description: "Discussed AI integration needs and budget",
    contact: "Sarah Johnson",
    company: "TechCorp Inc",
    score: 85,
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: "2",
    type: "email",
    title: "Follow-up Email Sent",
    description: "Product demo invitation and case study",
    contact: "Mike Chen",
    company: "DataFlow Systems",
    score: 72,
    time: "4 hours ago",
    status: "completed",
  },
  {
    id: "3",
    type: "meeting",
    title: "Product Demo",
    description: "AI platform walkthrough scheduled",
    contact: "Emma Davis",
    company: "CloudNet Solutions",
    score: 91,
    time: "Tomorrow 2:00 PM",
    status: "scheduled",
  },
  {
    id: "4",
    type: "download",
    title: "Whitepaper Downloaded",
    description: "AI Implementation Best Practices",
    contact: "Robert Taylor",
    company: "InnovateLab",
    score: 68,
    time: "1 day ago",
    status: "completed",
  },
];

export function RecentActivities() {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "call":
        return <Phone className="w-4 h-4 text-primary" />;
      case "email":
        return <Mail className="w-4 h-4 text-accent" />;
      case "meeting":
        return <Calendar className="w-4 h-4 text-success" />;
      case "download":
        return <Download className="w-4 h-4 text-warning" />;
      case "message":
        return <MessageSquare className="w-4 h-4 text-primary" />;
    }
  };

  const getStatusBadge = (status: Activity["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary" className="bg-success/10 text-success">Completed</Badge>;
      case "scheduled":
        return <Badge variant="secondary" className="bg-primary/10 text-primary">Scheduled</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-warning/10 text-warning">Pending</Badge>;
    }
  };

  return (
    <Card className="p-6 bg-gradient-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
        <Badge variant="outline" className="text-xs">
          <ExternalLink className="w-3 h-3 mr-1" />
          View All
        </Badge>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
          >
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-medium text-foreground">{activity.title}</h4>
                <div className="flex items-center space-x-2">
                  <ScoreBadge score={activity.score} size="sm" />
                  {getStatusBadge(activity.status)}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">
                  {activity.contact} • {activity.company}
                </span>
                <span className="text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}