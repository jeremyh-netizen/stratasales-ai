import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  Building2, 
  Users,
  DollarSign,
  TrendingUp,
  Target,
  Brain,
  Shield,
  Zap,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Award,
  Lightbulb
} from "lucide-react";
import type { StrategicAccount } from "@/lib/strategic-intelligence";

interface StrategicAccountDetailsProps {
  account: StrategicAccount;
  onClose: () => void;
}

export function StrategicAccountDetails({ account, onClose }: StrategicAccountDetailsProps) {
  const [activePlaybook, setActivePlaybook] = useState<string | null>(null);

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getGrowthStageInfo = (stage: string) => {
    switch (stage) {
      case "startup": 
        return { color: "bg-blue-100 text-blue-800 border-blue-200", icon: "🚀", description: "Early stage, rapid iteration" };
      case "growth": 
        return { color: "bg-green-100 text-green-800 border-green-200", icon: "📈", description: "Scaling operations and team" };
      case "scale": 
        return { color: "bg-purple-100 text-purple-800 border-purple-200", icon: "⚡", description: "Optimizing for efficiency" };
      case "enterprise": 
        return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: "🏢", description: "Mature operations" };
      default: 
        return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: "🏢", description: "Unknown stage" };
    }
  };

  const stageInfo = getGrowthStageInfo(account.strategicProfile.growthStage);

  return (
    <div className="h-full overflow-hidden flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-card">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${account.name}`} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">
                {account.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-foreground">{account.name}</h1>
                <Badge className={stageInfo.color}>
                  {stageInfo.icon} {account.strategicProfile.growthStage}
                </Badge>
              </div>
              <p className="text-muted-foreground">{account.industry} • {account.strategicProfile.employees} employees</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`text-3xl font-bold ${getHealthScoreColor(account.healthScore)}`}>
                    {account.healthScore}
                  </div>
                  <div className="text-sm text-muted-foreground">Health Score</div>
                </div>
                {account.strategicProfile.recentFunding && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {account.strategicProfile.recentFunding.amount} Series A
                  </Badge>
                )}
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

        {/* Mission Statement */}
        <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Target className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold text-primary mb-1">Strategic Mission</h3>
              <p className="text-sm text-foreground">{account.strategicProfile.mission}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="intelligence" className="w-full">
          <TabsList className="grid w-full grid-cols-5 m-4">
            <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
            <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="playbook">Playbook</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="intelligence" className="p-4 space-y-4">
            {/* Business Intelligence Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Key Pressures */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                    Key Pressures
                  </CardTitle>
                  <CardDescription>Strategic challenges driving decision-making</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {account.strategicProfile.keyPressures.map((pressure, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                      <span className="text-sm text-foreground">{pressure}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Buying Signals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                    Buying Signals
                  </CardTitle>
                  <CardDescription>Indicators of purchase readiness</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {account.businessIntelligence.buyingSignals.map((signal, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-foreground">{signal}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Pain Points */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Brain className="w-5 h-5 mr-2 text-red-500" />
                    Pain Points
                  </CardTitle>
                  <CardDescription>Current operational challenges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {account.businessIntelligence.painPoints.map((pain, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                      <span className="text-sm text-foreground">{pain}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Technology Stack */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="w-5 h-5 mr-2 text-blue-500" />
                    Technology Stack
                  </CardTitle>
                  <CardDescription>Current technical infrastructure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {account.businessIntelligence.technologyStack.map((tech, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Funding Information */}
            {account.strategicProfile.recentFunding && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg text-green-800">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Recent Funding Round
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-800">
                        {account.strategicProfile.recentFunding.amount}
                      </div>
                      <div className="text-sm text-green-600">Amount</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-800">
                        {account.strategicProfile.recentFunding.round}
                      </div>
                      <div className="text-sm text-green-600">Round</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-800">
                        {account.strategicProfile.recentFunding.date}
                      </div>
                      <div className="text-sm text-green-600">Date</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-800">
                        {account.strategicProfile.recentFunding.leadInvestor}
                      </div>
                      <div className="text-sm text-green-600">Lead Investor</div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-700">Total Funding to Date</span>
                      <span className="font-bold text-green-800">
                        {account.strategicProfile.recentFunding.totalFunding}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Decision Making Context */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="w-5 h-5 mr-2 text-purple-500" />
                  Decision Context
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Budget Authority</h4>
                    <p className="text-sm text-muted-foreground">{account.businessIntelligence.budgetAuthority}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Decision Timeline</h4>
                    <p className="text-sm text-muted-foreground">{account.businessIntelligence.decisionTimeline}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stakeholders" className="p-4 space-y-4">
            <div className="grid gap-4">
              {account.stakeholders.map((contact) => (
                <Card key={contact.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${contact.name}`} />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{contact.name}</h3>
                          <p className="text-muted-foreground">{contact.title}</p>
                          <p className="text-sm text-muted-foreground">{contact.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={contact.decisionMaking.authority === "high" ? "default" : "outline"}>
                          {contact.decisionMaking.authority} authority
                        </Badge>
                        <Badge variant={contact.decisionMaking.influence === "high" ? "default" : "outline"}>
                          {contact.decisionMaking.influence} influence
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Professional Background */}
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        Background
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">{contact.professionalBackground.education}</p>
                      <div className="space-y-1">
                        {contact.professionalBackground.careerPath.slice(0, 2).map((role, index) => (
                          <p key={index} className="text-xs text-muted-foreground">• {role}</p>
                        ))}
                      </div>
                    </div>

                    {/* Strategic Priorities */}
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Strategic Priorities
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {contact.strategicPriorities.primary.slice(0, 4).map((priority, index) => (
                          <div key={index} className="text-xs bg-muted/30 p-2 rounded">
                            {priority}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Communication Style */}
                    <div>
                      <h4 className="font-medium mb-2">Communication Style</h4>
                      <Badge variant="outline" className="text-xs">
                        {contact.strategicPriorities.communicationStyle}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="strategy" className="p-4 space-y-4">
            {/* Value Proposition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  Value Proposition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground font-medium mb-4">{account.outreachStrategy.valueProposition}</p>
                
                <h4 className="font-medium mb-3">Messaging Framework</h4>
                <div className="space-y-2">
                  {account.outreachStrategy.messagingFramework.map((message, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-muted/30 rounded-lg">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm">{message}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ROI Model */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-green-800">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  ROI Projection Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white border border-green-200 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {account.outreachStrategy.roiModel.costSavings}
                    </div>
                    <div className="text-sm text-green-700">Cost Savings</div>
                  </div>
                  <div className="text-center p-4 bg-white border border-green-200 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {account.outreachStrategy.roiModel.efficiencyGains}
                    </div>
                    <div className="text-sm text-green-700">Efficiency Gains</div>
                  </div>
                  <div className="text-center p-4 bg-white border border-green-200 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {account.outreachStrategy.roiModel.revenueImpact}
                    </div>
                    <div className="text-sm text-green-700">Revenue Impact</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Competitive Positioning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="w-5 h-5 mr-2 text-blue-500" />
                  Competitive Positioning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{account.outreachStrategy.competitivePositioning}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playbook" className="p-4">
            <div className="text-center py-8">
              <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Strategic Playbooks</h3>
              <p className="text-muted-foreground mb-4">
                Detailed outreach playbooks coming soon. This will include the full strategic narrative framework like the Clerkie.io example.
              </p>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Create Playbook
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="p-4">
            <div className="text-center py-8">
              <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-muted-foreground mb-4">
                AI analysis of account readiness, optimal outreach timing, and personalized recommendations.
              </p>
              <Button variant="outline">
                <Brain className="w-4 h-4 mr-2" />
                Generate Insights
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}