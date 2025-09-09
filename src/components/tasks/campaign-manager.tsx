import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TemplateSelectionDialog } from "@/components/tasks/template-selection-dialog";
import { 
  Mail, 
  Linkedin, 
  Brain, 
  Target, 
  Play,
  Pause,
  Settings,
  BarChart3,
  Users,
  Clock,
  TrendingUp,
  Eye,
  MousePointer,
  Reply,
  Phone
} from "lucide-react";
import type { FilterState } from "@/pages/Tasks";

interface Campaign {
  id: string;
  name: string;
  type: "email" | "linkedin" | "multi-channel";
  status: "active" | "paused" | "completed" | "draft";
  contacts: number;
  sequence: {
    emails: number;
    linkedin: number;
  };
  performance: {
    sent: number;
    opened: number;
    clicked: number;
    replied: number;
  };
  aiPersonalization: boolean;
  startDate: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Q1 Enterprise Outreach - DataGOL Style",
    type: "multi-channel",
    status: "active",
    contacts: 87,
    sequence: { emails: 3, linkedin: 2 },
    performance: { sent: 174, opened: 98, clicked: 23, replied: 12 },
    aiPersonalization: true,
    startDate: "2024-01-10"
  },
  {
    id: "2", 
    name: "SaaS Startup Follow-up Sequence",
    type: "email",
    status: "active",
    contacts: 45,
    sequence: { emails: 4, linkedin: 0 },
    performance: { sent: 135, opened: 89, clicked: 34, replied: 18 },
    aiPersonalization: true,
    startDate: "2024-01-05"
  }
];

const campaignTemplates = [
  {
    name: "Engage with Prospects who open email",
    description: "Multi-channel sequence triggered by email opens with intelligent follow-up timing",
    emails: 4,
    linkedin: 3,
    phone: 3,
    aiFeatures: ["Email open tracking", "Behavioral triggers", "Smart timing optimization", "Multi-channel orchestration"]
  },
  {
    name: "Enterprise Decision Makers",
    description: "Multi-touch sequence for C-level executives with social proof and ROI focus",
    emails: 3,
    linkedin: 2,
    aiFeatures: ["Persona analysis", "Competitor intelligence", "Timing optimization"]
  },
  {
    name: "Technical Buyers",
    description: "Developer and IT-focused sequence with technical case studies and integrations",
    emails: 4,
    linkedin: 1,
    aiFeatures: ["Technical content matching", "Integration examples", "API documentation"]
  },
  {
    name: "Mid-Market Nurture",
    description: "Longer nurture sequence for mid-market prospects with educational content",
    emails: 6,
    linkedin: 3,
    aiFeatures: ["Content personalization", "Industry insights", "Behavioral triggers"]
  }
];

interface CampaignManagerProps {
  organizationType?: string;
  filters?: FilterState;
  updateFilter?: (key: keyof FilterState, value: any) => void;
  clearAllFilters?: () => void;
}

export function CampaignManager({ organizationType, filters }: CampaignManagerProps) {
  const [selectedCampaign, setSelectedCampaign] = useState(mockCampaigns[0]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active": return "secondary";
      case "paused": return "outline";
      case "completed": return "secondary";
      default: return "outline";
    }
  };

  const getTypeIcon = (type: Campaign["type"]) => {
    switch (type) {
      case "email": return Mail;
      case "linkedin": return Linkedin;
      case "multi-channel": return Target;
    }
  };

  return (
    <div className="space-y-6">
      {/* Campaign Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4</div>
            <div className="flex items-center gap-2 mt-1">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-success">+2 this week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">14.2%</div>
            <div className="flex items-center gap-2 mt-1">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-success">+3.1% vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">AI Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">87%</div>
            <div className="flex items-center gap-2 mt-1">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Personalization active</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active-campaigns">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active-campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="create-campaign">Create Campaign</TabsTrigger>
          <TabsTrigger value="templates">AI Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active-campaigns" className="space-y-4">
          {mockCampaigns.map((campaign) => {
            const TypeIcon = getTypeIcon(campaign.type);
            const openRate = Math.round((campaign.performance.opened / campaign.performance.sent) * 100);
            const responseRate = Math.round((campaign.performance.replied / campaign.performance.sent) * 100);
            
            return (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <TypeIcon className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                          <Badge variant={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                          {campaign.aiPersonalization && (
                            <Badge className="bg-gradient-primary">
                              AI Powered
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <span className="text-sm text-muted-foreground">Contacts</span>
                            <div className="font-medium">{campaign.contacts}</div>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Sequence</span>
                            <div className="font-medium">
                              {campaign.sequence.emails}E + {campaign.sequence.linkedin}L
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Open Rate</span>
                            <div className="font-medium text-success">{openRate}%</div>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Response Rate</span>
                            <div className="font-medium text-primary">{responseRate}%</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Sent: {campaign.performance.sent}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Opened: {campaign.performance.opened}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MousePointer className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Clicked: {campaign.performance.clicked}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Reply className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Replied: {campaign.performance.replied}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button size="sm">
                        {campaign.status === "active" ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Resume
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
        
        <TabsContent value="create-campaign" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create AI-Powered Campaign</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-card rounded-lg p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-primary">AI Campaign Builder</h3>
                    <p className="text-sm text-muted-foreground">
                      Let AI analyze your prospects and create personalized campaigns
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium text-foreground">Persona Analysis</h4>
                    <p className="text-xs text-muted-foreground">AI analyzes LinkedIn profiles and company data</p>
                  </div>
                  <div className="text-center">
                    <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium text-foreground">Dynamic Content</h4>
                    <p className="text-xs text-muted-foreground">Personalized subject lines and messaging</p>
                  </div>
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium text-foreground">Smart Timing</h4>
                    <p className="text-xs text-muted-foreground">Optimal send times based on engagement data</p>
                  </div>
                </div>
                
                <Button className="w-full mt-6 gap-2">
                  <Brain className="w-4 h-4" />
                  Start AI Campaign Builder
                </Button>
              </div>
              
              <div className="text-center text-muted-foreground">
                <p className="text-sm">
                  <strong>Note:</strong> Full campaign automation requires connecting your email and LinkedIn accounts.
                  <br />
                  This feature will be available after Supabase integration is set up.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          {campaignTemplates.map((template, idx) => (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <h3 className="font-semibold text-foreground">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{template.emails} emails</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{template.linkedin} LinkedIn</span>
                      </div>
                      {template.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{template.phone} phone calls</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {template.aiFeatures.map((feature, featureIdx) => (
                        <Badge key={featureIdx} variant="outline" className="text-xs">
                          <Brain className="w-3 h-3 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      setSelectedTemplate(template);
                      setIsTemplateDialogOpen(true);
                    }}
                  >
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <TemplateSelectionDialog
        template={selectedTemplate}
        open={isTemplateDialogOpen}
        onOpenChange={setIsTemplateDialogOpen}
      />
    </div>
  );
}