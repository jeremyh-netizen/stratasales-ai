import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScoreBadge, ScoreRing } from "@/components/ui/score-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X, 
  Mail, 
  Phone, 
  Calendar,
  Building2,
  MapPin,
  Globe,
  Download,
  MessageSquare,
  TrendingUp,
  Clock,
  Target,
  Activity,
  Brain
} from "lucide-react";
import { Lead } from "@/pages/Leads";

interface LeadDetailsProps {
  lead: Lead;
  onClose: () => void;
}

export function LeadDetails({ lead, onClose }: LeadDetailsProps) {
  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-yellow-100 text-yellow-800";
      case "qualified":
        return "bg-green-100 text-green-800";
      case "nurturing":
        return "bg-purple-100 text-purple-800";
      case "converted":
        return "bg-emerald-100 text-emerald-800";
      case "lost":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const mockEmails = [
    {
      id: "1",
      subject: "Welcome to AI Solutions Platform",
      date: "2024-01-15 09:30",
      status: "opened",
      content: "Thank you for your interest in our AI platform...",
    },
    {
      id: "2",
      subject: "Exclusive AI Implementation Guide",
      date: "2024-01-12 14:20",
      status: "clicked",
      content: "Discover how leading companies implement AI...",
    },
    {
      id: "3",
      subject: "Pricing Information Request",
      date: "2024-01-10 11:15",
      status: "opened",
      content: "As requested, here's our pricing breakdown...",
    },
  ];

  const mockActivities = [
    {
      id: "1",
      type: "email_opened",
      title: "Opened pricing email",
      time: "2 hours ago",
      description: "Email: 'Pricing Information Request'",
    },
    {
      id: "2",
      type: "call_completed",
      title: "Discovery call completed",
      time: "1 day ago",
      description: "Duration: 45 minutes. Discussed AI needs and budget.",
    },
    {
      id: "3",
      type: "download",
      title: "Downloaded whitepaper",
      time: "2 days ago",
      description: "AI Implementation Best Practices Guide",
    },
    {
      id: "4",
      type: "website_visit",
      title: "Visited pricing page",
      time: "3 days ago",
      description: "Spent 5 minutes reviewing enterprise features",
    },
  ];

  return (
    <div className="h-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-card">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
              {lead.contact.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-foreground">{lead.contact}</h2>
              <p className="text-sm text-muted-foreground">{lead.title}</p>
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{lead.company}</span>
                <Badge className={getStatusColor(lead.status)}>
                  {lead.status}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ScoreRing score={lead.score} size={60} />
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mt-4">
          <Button size="sm" className="bg-gradient-primary">
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Note
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 m-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="p-4 space-y-4">
            {/* Contact Info */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{lead.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span>{lead.industry} • {lead.source}</span>
                </div>
              </div>
            </Card>

            {/* Lead Scorecard */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Lead Scorecard
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{lead.emails.sent}</div>
                  <div className="text-xs text-muted-foreground">Emails Sent</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-success">{lead.emails.opened}</div>
                  <div className="text-xs text-muted-foreground">Emails Opened</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-warning">{lead.meetings}</div>
                  <div className="text-xs text-muted-foreground">Meetings</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-accent">{lead.downloads}</div>
                  <div className="text-xs text-muted-foreground">Downloads</div>
                </div>
              </div>
            </Card>

            {/* Revenue Potential */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Revenue Potential</h3>
              <div className="text-2xl font-bold text-foreground mb-1">
                ${lead.revenue.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">
                Estimated deal value based on company size and industry
              </p>
            </Card>

            {/* Next Action */}
            <Card className="p-4 border-primary/20 bg-primary/5">
              <h3 className="font-semibold mb-2 flex items-center text-primary">
                <Clock className="w-4 h-4 mr-2" />
                Next Action
              </h3>
              <p className="text-sm text-foreground">{lead.nextAction}</p>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="p-4 space-y-4">
            <div className="space-y-3">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-card rounded-lg border border-border">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">{activity.title}</h4>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emails" className="p-4 space-y-4">
            <div className="space-y-3">
              {mockEmails.map((email) => (
                <Card key={email.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground">{email.subject}</h4>
                    <Badge variant={email.status === "opened" ? "secondary" : "default"}>
                      {email.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{email.content}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{email.date}</span>
                    <Button variant="ghost" size="sm">View Full Email</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="p-4 space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Brain className="w-4 h-4 mr-2 text-primary" />
                AI Score Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Engagement</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-success w-4/5" />
                    </div>
                    <span className="text-sm font-medium">80%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Company Fit</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-full" />
                    </div>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Recent Activity</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-warning w-3/5" />
                    </div>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-success/20 bg-success/5">
              <h3 className="font-semibold mb-2 text-success">Recommended Actions</h3>
              <ul className="space-y-1 text-sm">
                <li>• Schedule product demo within next 3 days</li>
                <li>• Send personalized case study from similar company</li>
                <li>• Follow up on pricing questions from last call</li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}