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

          <TabsContent value="playbook" className="p-4 space-y-6">
            {/* Executive Summary */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-blue-800">
                  <Target className="w-5 h-5 mr-2" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Strategic Imperative</h4>
                  <p className="text-sm text-blue-800">Position DataGOL as an essential partner to clerkie.io during its critical post-Series A scaling phase</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Core Premise</h4>
                  <p className="text-sm text-blue-800">Clerkie.io's data-dependent mission requires commensurate data infrastructure agility to avoid growth bottlenecks</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Key Thesis</h4>
                  <p className="text-sm text-blue-800 font-medium">Transform infrastructure liability into revenue-generating asset while de-risking scale</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded border border-blue-200 text-center">
                    <div className="font-bold text-blue-600">60%</div>
                    <div className="text-xs text-blue-700">Operational Efficiency</div>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200 text-center">
                    <div className="font-bold text-blue-600">40-86%</div>
                    <div className="text-xs text-blue-700">Cost Savings</div>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200 text-center">
                    <div className="font-bold text-blue-600">43%</div>
                    <div className="text-xs text-blue-700">Retention Uplift</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Persona Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="w-5 h-5 mr-2 text-purple-500" />
                  Persona Deep Dive: Johnny Krueger
                </CardTitle>
                <CardDescription>The Operations Architect - Professional trajectory and strategic receptivity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Professional Trajectory</h4>
                  <p className="text-sm text-muted-foreground">Classically trained finance and operations professional forged in Microsoft and GE Capital's disciplined corporate environments</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Core Competencies</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["Financial modeling and ROI analysis", "Information systems architecture", "Operational scaling and risk management", "P&L statements and TCO analysis"].map((competency, index) => (
                      <div key={index} className="text-xs bg-purple-50 p-2 rounded border border-purple-200">
                        {competency}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Decision-Making Context</h4>
                  <p className="text-sm text-muted-foreground">Managing future liability without clear balance sheet entry - needs concrete financial models to quantify infrastructure risk</p>
                </div>
              </CardContent>
            </Card>

            {/* Two-Act Messaging Framework */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MessageSquare className="w-5 h-5 mr-2 text-green-500" />
                  Two-Act Messaging Framework
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Act 1 */}
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h4 className="font-bold text-green-800 mb-2">Act 1: "De-Risk Your Scale"</h4>
                  <p className="text-sm text-green-700 mb-3">Address immediate operational challenges as COO</p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-green-800">Key Messages:</span>
                      <ul className="text-xs text-green-700 ml-4 mt-1">
                        <li>• Unify your data stack and eliminate redundant tool licensing</li>
                        <li>• Real-time, self-serve analytics for board reporting</li>
                        <li>• Single source of truth for all business data</li>
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-green-800">Proof Points:</span>
                      <ul className="text-xs text-green-700 ml-4 mt-1">
                        <li>• 60% operational efficiency improvement</li>
                        <li>• 40% direct cost savings</li>
                        <li>• Project timelines: 9+ months → 8-10 weeks</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Act 2 */}
                <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                  <h4 className="font-bold text-orange-800 mb-2">Act 2: "Accelerate Your Roadmap & Revenue"</h4>
                  <p className="text-sm text-orange-700 mb-3">Strategic top-line oriented message for revenue growth</p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-orange-800">Key Messages:</span>
                      <ul className="text-xs text-orange-700 ml-4 mt-1">
                        <li>• Accelerate 'Fiber' platform with embedded analytics</li>
                        <li>• Enable customer-facing dashboards in weeks, not months</li>
                        <li>• Improve customer retention through demonstrable ROI</li>
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-orange-800">Proof Points:</span>
                      <ul className="text-xs text-orange-700 ml-4 mt-1">
                        <li>• 86% cost reduction in dashboarding (Remo)</li>
                        <li>• 43% customer retention increase</li>
                        <li>• 3-4 weeks vs 4+ months delivery</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pain Point Matrix */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                  Pain Point to Value Proposition Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      pain: "Spiraling infrastructure costs during post-Series A scaling",
                      value: "Drastic TCO Reduction: Unify data stack and eliminate redundant tool licensing",
                      proof: "86% dashboarding cost reduction, 95% vs traditional AI stack"
                    },
                    {
                      pain: "Slow, manual reporting to board and CEO hindering decisions",
                      value: "Real-Time Analytics: Unified dashboards with natural language queries",
                      proof: "Immediate post-event reporting vs 1-2 day delay"
                    },
                    {
                      pain: "Data silos creating cross-functional friction",
                      value: "Single Source of Truth: Unified business data platform",
                      proof: "60% increase in operational efficiency"
                    }
                  ].map((item, index) => (
                    <div key={index} className="border rounded-lg p-3 bg-muted/30">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="font-medium text-red-600">Pain:</span>
                          <p className="mt-1">{item.pain}</p>
                        </div>
                        <div>
                          <span className="font-medium text-blue-600">Value:</span>
                          <p className="mt-1">{item.value}</p>
                        </div>
                        <div>
                          <span className="font-medium text-green-600">Proof:</span>
                          <p className="mt-1">{item.proof}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 4-Touch Email Sequence */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Mail className="w-5 h-5 mr-2 text-indigo-500" />
                  Strategic Outreach Cadence
                </CardTitle>
                <CardDescription>Multi-touch email sequence with strategic rationale</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Email 1: The Quantified Hook",
                      subject: "A question about Clerkie's scaling efficiency",
                      timing: "Initial outreach",
                      rationale: "Establish relevance and credibility with quantified result speaking directly to COO responsibilities",
                      preview: "Congratulations on the $33M Series A. We helped a healthcare company achieve 60% operational efficiency..."
                    },
                    {
                      title: "Email 2: The Strategic Pivot",
                      subject: "Re: Clerkie's scaling efficiency", 
                      timing: "2-3 business days later",
                      rationale: "Pivot from internal cost savings to external product enhancement and revenue generation",
                      preview: "Beyond cost savings, we helped Remo cut dashboarding costs 86% and increase retention 43%..."
                    },
                    {
                      title: "Email 3: The TCO Model",
                      subject: "A TCO model for your data stack",
                      timing: "3-4 business days later", 
                      rationale: "Provide tangible value asset addressing 'unquantified risk' with concrete financial model",
                      preview: "Data stack TCO can exceed $1M in 18 months. Attached model shows planning framework..."
                    },
                    {
                      title: "Email 4: The Breakup",
                      subject: "Closing the loop",
                      timing: "4-5 business days later",
                      rationale: "Professional closure creating subtle urgency while summarizing core value propositions",
                      preview: "Final outreach: Lower data infrastructure TCO while accelerating Fiber platform..."
                    }
                  ].map((email, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-indigo-600">{email.title}</h5>
                        <Badge variant="outline" className="text-xs">{email.timing}</Badge>
                      </div>
                      <p className="text-sm font-medium mb-1">Subject: {email.subject}</p>
                      <p className="text-xs text-muted-foreground mb-2">{email.rationale}</p>
                      <p className="text-xs bg-muted/50 p-2 rounded italic">{email.preview}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Objection Handling */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="w-5 h-5 mr-2 text-yellow-500" />
                  Objection Handling Framework
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      objection: "We have an engineering team; we're building this in-house",
                      rebuttal: "Value isn't replacing engineers, but liberating them to focus on core IP",
                      angle: "3-4 weeks delivery vs 9+ months in-house = massive speed-to-market advantage"
                    },
                    {
                      objection: "We're too busy scaling to consider new platforms",
                      rebuttal: "Platform designed to reduce scaling chaos, not add to it",
                      angle: "Prevent expensive data silos that are harder to fix later"
                    },
                    {
                      objection: "It sounds expensive",
                      rebuttal: "95% cost reduction vs self-built stack including tools + headcount",
                      angle: "Predictable cost model eliminates surprise infrastructure bills"
                    }
                  ].map((item, index) => (
                    <div key={index} className="border rounded-lg p-3 bg-yellow-50 border-yellow-200">
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs font-medium text-yellow-800">Objection:</span>
                          <p className="text-sm text-yellow-900">"{item.objection}"</p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-yellow-800">Rebuttal:</span>
                          <p className="text-sm text-yellow-900">{item.rebuttal}</p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-yellow-800">Strategic Angle:</span>
                          <p className="text-sm text-yellow-900">{item.angle}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="p-4 space-y-6">
            {/* Overall Readiness Score */}
            <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="flex items-center text-green-800">
                    <Brain className="w-5 h-5 mr-2" />
                    Account Readiness Score
                  </span>
                  <div className="text-3xl font-bold text-green-600">87</div>
                </CardTitle>
                <CardDescription>AI-powered analysis of purchase readiness and optimal engagement strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg border border-green-200">
                    <div className="text-xl font-bold text-green-600">92</div>
                    <div className="text-xs text-green-700">Funding Stage</div>
                    <Progress value={92} className="mt-2 h-2" />
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-green-200">
                    <div className="text-xl font-bold text-green-600">85</div>
                    <div className="text-xs text-green-700">Tech Stack Fit</div>
                    <Progress value={85} className="mt-2 h-2" />
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-green-200">
                    <div className="text-xl font-bold text-green-600">88</div>
                    <div className="text-xs text-green-700">Buying Signals</div>
                    <Progress value={88} className="mt-2 h-2" />
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-green-200">
                    <div className="text-xl font-bold text-green-600">90</div>
                    <div className="text-xs text-green-700">Timing</div>
                    <Progress value={90} className="mt-2 h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Scoring Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
                    Funding Stage Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Score</span>
                    <Badge className="bg-green-100 text-green-800">92 - Optimal</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Post-Series A company with $33M fresh capital and pressure to scale efficiently. Board includes data-centric fintech leaders creating urgency.</p>
                  <div className="space-y-2">
                    <h5 className="text-xs font-medium">Key Indicators:</h5>
                    {["Recent $33M Series A creates scaling pressure", "Board includes data-focused veterans", "Q1 2024 infrastructure decision timeline", "Growth targets require efficiency gains"].map((indicator, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5" />
                        <span className="text-xs">{indicator}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="w-5 h-5 mr-2 text-purple-500" />
                    Tech Stack Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Score</span>
                    <Badge className="bg-green-100 text-green-800">85 - Strong</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Modern microservices architecture with Node.js/AWS/MongoDB stack enables easy integration with minimal disruption.</p>
                  <div className="space-y-2">
                    <h5 className="text-xs font-medium">Compatibility Factors:</h5>
                    {["Modern tech stack enables easy integration", "Microservices create natural unification need", "Existing SQL knowledge reduces learning curve", "Cloud-first infrastructure alignment"].map((factor, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3 h-3 text-purple-500 mt-0.5" />
                        <span className="text-xs">{factor}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
                    Buying Signals Strength
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Score</span>
                    <Badge className="bg-green-100 text-green-800">88 - High</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Multiple strong buying signals indicate high purchase intent. B2B platform development creates urgency.</p>
                  <div className="space-y-2">
                    <h5 className="text-xs font-medium">Active Signals:</h5>
                    {["Building 'Fiber' platform requiring analytics", "Mentioned data silos in recent interviews", "Engineering hiring indicates capacity limits", "COO background suggests TCO focus"].map((signal, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3 h-3 text-orange-500 mt-0.5" />
                        <span className="text-xs">{signal}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Clock className="w-5 h-5 mr-2 text-red-500" />
                    Timing Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Score</span>
                    <Badge className="bg-green-100 text-green-800">90 - Exceptional</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Exceptional timing window due to funding cycle and infrastructure planning phase.</p>
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <h5 className="text-xs font-medium text-red-800 mb-1">Optimal Window:</h5>
                    <p className="text-sm text-red-700">Next 3-6 months during Q1 2024 infrastructure planning cycle</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Persona Intelligence */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="w-5 h-5 mr-2 text-indigo-500" />
                  Persona Intelligence Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg bg-indigo-50 border-indigo-200">
                    <h5 className="font-medium text-indigo-800 mb-2">Communication Style</h5>
                    <p className="text-sm text-indigo-700">Data-driven, ROI-focused, process-oriented communication with quantified benefits</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-indigo-50 border-indigo-200">
                    <h5 className="font-medium text-indigo-800 mb-2">Best Engagement</h5>
                    <p className="text-sm text-indigo-700">Tuesday-Thursday, 9-11 AM or 2-4 PM EST via multi-touch email sequence</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-indigo-50 border-indigo-200">
                    <h5 className="font-medium text-indigo-800 mb-2">Key Language</h5>
                    <p className="text-sm text-indigo-700">Financial modeling, TCO analysis, risk mitigation, operational efficiency</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Strategic Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  AI-Generated Strategic Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">Messaging Priority</h5>
                  <div className="space-y-2">
                    {["Lead with operational efficiency and cost savings (60% efficiency, 40% cost reduction)", "Emphasize risk mitigation and capital efficiency for post-Series A scaling", "Highlight Fiber platform acceleration and customer retention benefits", "Include concrete TCO model showing $1M+ infrastructure cost avoidance"].map((priority, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                          {index + 1}
                        </div>
                        <span>{priority}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Competitive Angles</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["Unified platform vs fragmented point solutions", "Speed-to-market advantage (weeks vs months)", "Predictable cost model vs unpredictable scaling", "Purpose-built for fintech compliance"].map((angle, index) => (
                      <div key={index} className="text-xs bg-yellow-50 p-2 rounded border border-yellow-200">
                        {angle}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Engagement Optimization</h5>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <span className="font-medium text-green-800">Best Approach:</span>
                        <span className="text-green-700 ml-1">Email sequence</span>
                      </div>
                      <div>
                        <span className="font-medium text-green-800">Primary Target:</span>
                        <span className="text-green-700 ml-1">Johnny Krueger (COO)</span>
                      </div>
                      <div>
                        <span className="font-medium text-green-800">Cadence:</span>
                        <span className="text-green-700 ml-1">4-touch over 2-3 weeks</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}