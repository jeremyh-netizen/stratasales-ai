import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Mail, 
  Linkedin, 
  Phone, 
  Clock, 
  ArrowDown,
  Play,
  Settings,
  Eye
} from "lucide-react";

interface WorkflowVisualizationProps {
  template: any;
}

// Workflow data for "Engage with Prospects who open email" template
const engageWorkflowSteps = [
  {
    id: 1,
    day: 1,
    type: "email",
    title: "Follow-up Email",
    description: "Thank for engagement, provide additional value",
    enabled: true,
    icon: Mail
  },
  {
    id: 2,
    day: 1,
    type: "phone",
    title: "Phone Call",
    description: "Same day call while interest is high",
    enabled: true,
    icon: Phone
  },
  {
    id: 3,
    day: 4,
    type: "linkedin",
    title: "LinkedIn Connection",
    description: "Connect with personalized message",
    enabled: true,
    icon: Linkedin
  },
  {
    id: 4,
    day: 7,
    type: "email",
    title: "Value-Add Email",
    description: "Share relevant case study or resource",
    enabled: true,
    icon: Mail
  },
  {
    id: 5,
    day: 7,
    type: "phone",
    title: "Follow-up Call",
    description: "Discussion about shared resource",
    enabled: true,
    icon: Phone
  },
  {
    id: 6,
    day: 10,
    type: "linkedin",
    title: "LinkedIn Message",
    description: "Engage with their recent posts/updates",
    enabled: true,
    icon: Linkedin
  },
  {
    id: 7,
    day: 12,
    type: "email",
    title: "Final Outreach",
    description: "Last attempt with clear value proposition",
    enabled: true,
    icon: Mail
  },
  {
    id: 8,
    day: 12,
    type: "phone",
    title: "Closing Call",
    description: "Final phone attempt before moving to nurture",
    enabled: false,
    icon: Phone
  }
];

export function WorkflowVisualization({ template }: WorkflowVisualizationProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "email": return "bg-blue-500";
      case "linkedin": return "bg-blue-600";
      case "phone": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "email": return "default";
      case "linkedin": return "secondary";
      case "phone": return "outline";
      default: return "outline";
    }
  };

  // Use engage workflow for the specific template, generic for others
  const workflowSteps = template.name === "Engage with Prospects who open email" 
    ? engageWorkflowSteps 
    : [];

  if (template.name !== "Engage with Prospects who open email") {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
              <Settings className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Custom Workflow Builder</h3>
              <p className="text-sm text-muted-foreground">
                This template includes a {template.emails}-step email sequence with {template.linkedin} LinkedIn touchpoints
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview Sequence
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Trigger */}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-primary">Trigger: Email Opened</h4>
              <p className="text-sm text-muted-foreground">
                Prospect opens any email from previous campaigns
              </p>
            </div>
            <Badge className="bg-gradient-primary">Active</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Steps */}
      <div className="space-y-3">
        {workflowSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="relative">
              <Card className={`border-l-4 ${step.enabled ? 'border-l-primary' : 'border-l-muted'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 ${getTypeColor(step.type)} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">
                          Day {step.day}: {step.title}
                        </h4>
                        <Badge variant={getTypeBadgeVariant(step.type)}>
                          {step.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Switch checked={step.enabled} />
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Arrow connector */}
              {index < workflowSteps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Workflow Stats */}
      <Card className="bg-accent/50">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-semibold text-foreground">12 days</div>
              <div className="text-sm text-muted-foreground">Total duration</div>
            </div>
            <div>
              <div className="font-semibold text-foreground">8 touchpoints</div>
              <div className="text-sm text-muted-foreground">Multi-channel</div>
            </div>
            <div>
              <div className="font-semibold text-foreground">~22% avg</div>
              <div className="text-sm text-muted-foreground">Response rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}