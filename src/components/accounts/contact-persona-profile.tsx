import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  Mail, 
  Phone, 
  Calendar,
  Linkedin,
  Building2,
  GraduationCap,
  Target,
  Brain,
  MessageSquare,
  Award,
  TrendingUp,
  Clock,
  Shield,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import type { StrategicContact } from "@/lib/strategic-intelligence";

interface ContactPersonaProfileProps {
  contact: StrategicContact;
  onClose: () => void;
}

export function ContactPersonaProfile({ contact, onClose }: ContactPersonaProfileProps) {
  const getAuthorityColor = (level: string) => {
    switch (level) {
      case "high": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getInfluenceScore = (influence: string, authority: string) => {
    const scores = { high: 100, medium: 60, low: 30 };
    return (scores[influence as keyof typeof scores] + scores[authority as keyof typeof scores]) / 2;
  };

  const influenceScore = getInfluenceScore(contact.decisionMaking.influence, contact.decisionMaking.authority);

  return (
    <div className="h-full overflow-hidden flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-card">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${contact.name}`} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-foreground">{contact.name}</h1>
                <Badge className={getAuthorityColor(contact.decisionMaking.authority)}>
                  {contact.decisionMaking.authority} authority
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground">{contact.title}</p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>{contact.company} • {contact.department}</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-primary">{Math.round(influenceScore)}</div>
                  <div className="text-sm text-muted-foreground">Influence Score</div>
                </div>
                <Badge className={getAuthorityColor(contact.engagementStrategy.relationship_strength)}>
                  {contact.engagementStrategy.relationship_strength} relationship
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-gradient-primary">
              <MessageSquare className="w-4 h-4 mr-2" />
              Engage
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex items-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>{contact.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{contact.phone}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Decision Making Authority */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Shield className="w-5 h-5 mr-2 text-blue-500" />
              Decision Making Authority
            </CardTitle>
            <CardDescription>Level of control over vendor selection and budget decisions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Authority Level</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Decision Authority</span>
                    <Badge className={getAuthorityColor(contact.decisionMaking.authority)}>
                      {contact.decisionMaking.authority}
                    </Badge>
                  </div>
                  <Progress value={influenceScore} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Influence Level</span>
                    <Badge className={getAuthorityColor(contact.decisionMaking.influence)}>
                      {contact.decisionMaking.influence}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Control Areas</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Budget Control</span>
                    {contact.decisionMaking.budgetControl ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vendor Selection</span>
                    {contact.decisionMaking.vendorSelection ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Implementation Oversight</span>
                    {contact.decisionMaking.implementationOversight ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Background */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <GraduationCap className="w-5 h-5 mr-2 text-purple-500" />
              Professional Background
            </CardTitle>
            <CardDescription>Education, career path, and core competencies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Education
              </h4>
              <p className="text-sm text-muted-foreground">{contact.professionalBackground.education}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Career Path</h4>
              <div className="space-y-2">
                {contact.professionalBackground.careerPath.map((role, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-sm">{role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Core Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {contact.professionalBackground.expertise.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Priorities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Target className="w-5 h-5 mr-2 text-green-500" />
              Strategic Priorities & Pain Points
            </CardTitle>
            <CardDescription>What drives their decision-making process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Primary Priorities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {contact.strategicPriorities.primary.map((priority, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">{priority}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Key Pain Points</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {contact.strategicPriorities.painPoints.map((pain, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                    <span className="text-sm">{pain}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Communication Style</h4>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {contact.strategicPriorities.communicationStyle}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Strategy */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-primary">
              <Brain className="w-5 h-5 mr-2" />
              Engagement Strategy
            </CardTitle>
            <CardDescription>Optimal approach for outreach and relationship building</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Preferred Channels</h4>
              <div className="flex flex-wrap gap-2">
                {contact.engagementStrategy.preferredChannels.map((channel, index) => (
                  <Badge key={index} className="bg-primary/10 text-primary">
                    {channel}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Messaging Angles</h4>
              <div className="space-y-2">
                {contact.engagementStrategy.messagingAngles.map((angle, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 bg-white border border-primary/20 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
                    <span className="text-sm">{angle}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Value Drivers</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {contact.engagementStrategy.valueDrivers.map((driver, index) => (
                  <div key={index} className="text-sm p-2 bg-white border border-primary/20 rounded-lg">
                    • {driver}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button className="bg-gradient-primary">
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline">
            <Phone className="w-4 h-4 mr-2" />
            Schedule Call
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Book Meeting
          </Button>
          <Button variant="outline">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
        </div>
      </div>
    </div>
  );
}