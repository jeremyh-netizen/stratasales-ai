import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  Phone, 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Clock,
  Play,
  Pause,
  Download,
  MessageSquare,
  Lightbulb,
  Plus
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { FilterState } from "@/pages/Tasks";

interface CallTranscript {
  id: string;
  contact: {
    name: string;
    avatar: string;
    company: string;
  };
  date: string;
  duration: string;
  sentiment: "positive" | "neutral" | "negative";
  sentimentScore: number;
  summary: string;
  aiInsights: {
    signals: string[];
    nextSteps: string[];
    competitorMentions: Array<{ name: string; count: number; context: string }>;
    objections: string[];
    buyingSignals: string[];
  };
  transcript: Array<{
    speaker: "user" | "contact";
    text: string;
    timestamp: string;
  }>;
}

const mockTranscripts: CallTranscript[] = [
  {
    id: "1",
    contact: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/40?img=1",
      company: "TechCorp"
    },
    date: "2024-01-15",
    duration: "24:30",
    sentiment: "positive",
    sentimentScore: 78,
    summary: "Productive discussion about pricing and implementation timeline. Sarah expressed strong interest but has budget concerns for Q1. Competitor comparison with HubSpot came up multiple times. Decision timeline confirmed for end of Q1.",
    aiInsights: {
      signals: [
        "Budget authority confirmed - Sarah is final decision maker",
        "Urgency level: Medium - no immediate pressure",
        "Technical fit confirmed by her team",
        "ROI calculation requested - strong buying signal"
      ],
      nextSteps: [
        "Send detailed ROI calculator within 24 hours",
        "Schedule technical demo with her development team",
        "Prepare competitive analysis vs HubSpot",
        "Follow up on pilot program pricing options"
      ],
      competitorMentions: [
        { name: "HubSpot", count: 5, context: "Price comparison and feature gaps discussed" },
        { name: "Salesforce", count: 2, context: "Mentioned as 'too complex' for their needs" }
      ],
      objections: [
        "Budget constraints for Q1 implementation",
        "Concerns about implementation complexity",
        "Team bandwidth for onboarding"
      ],
      buyingSignals: [
        "Requested ROI calculations",
        "Asked about pilot program options",
        "Mentioned specific use cases and requirements",
        "Inquired about implementation timeline"
      ]
    },
    transcript: [
      { speaker: "user", text: "Hi Sarah, thanks for taking the time to chat today. How's everything going at TechCorp?", timestamp: "00:00:15" },
      { speaker: "contact", text: "Hi! Going well, thanks. We're really busy with our Q1 planning right now, which is actually perfect timing for this conversation.", timestamp: "00:00:22" },
      { speaker: "user", text: "That's great to hear. I know you mentioned you're looking at solutions to improve your sales team's productivity. Can you tell me more about what's driving that?", timestamp: "00:00:35" },
      { speaker: "contact", text: "Absolutely. Our team is growing fast - we went from 10 to 25 reps last year - but our conversion rates are actually declining. We think it's because reps are spending too much time on admin tasks instead of selling.", timestamp: "00:00:48" }
    ]
  },
  {
    id: "2",
    contact: {
      name: "Marcus Rodriguez",
      avatar: "https://i.pravatar.cc/40?img=3",
      company: "FinanceFirst Bank"
    },
    date: "2024-01-14",
    duration: "18:45",
    sentiment: "negative",
    sentimentScore: 32,
    summary: "Challenging call with Marcus regarding security concerns and regulatory compliance. Current vendor satisfaction is high, making switching difficult. Strong objections raised about data migration and downtime risks.",
    aiInsights: {
      signals: [
        "Regulatory compliance is top priority",
        "Current solution working well - high satisfaction",
        "Risk-averse decision making culture",
        "Security team has final veto power"
      ],
      nextSteps: [
        "Prepare detailed security and compliance documentation",
        "Schedule call with security team lead",
        "Provide case studies from similar financial institutions",
        "Address data migration concerns with technical team"
      ],
      competitorMentions: [
        { name: "Oracle", count: 8, context: "Current vendor - very satisfied with security posture" },
        { name: "IBM", count: 3, context: "Previously evaluated but rejected due to cost" }
      ],
      objections: [
        "Regulatory audit scheduled next quarter",
        "High satisfaction with current Oracle system",
        "Data migration risks and potential downtime",
        "Security team skeptical of cloud solutions"
      ],
      buyingSignals: [
        "Asked about compliance certifications",
        "Inquired about implementation timeline flexibility"
      ]
    },
    transcript: [
      { speaker: "user", text: "Marcus, thank you for making time today. I understand you're evaluating options to modernize your current systems.", timestamp: "00:00:12" },
      { speaker: "contact", text: "Yes, though I have to be honest - we're quite happy with our Oracle setup. This is more of an exploratory conversation at this point.", timestamp: "00:00:18" },
      { speaker: "user", text: "I appreciate the honesty. What would need to change for you to consider a switch?", timestamp: "00:00:32" },
      { speaker: "contact", text: "Well, we have a regulatory audit coming up, and any major changes right now would be... problematic. Security is our number one concern.", timestamp: "00:00:41" }
    ]
  },
  {
    id: "3",
    contact: {
      name: "Emily Watson",
      avatar: "https://i.pravatar.cc/40?img=5",
      company: "RetailMax Solutions"
    },
    date: "2024-01-13",
    duration: "31:20",
    sentiment: "positive",
    sentimentScore: 85,
    summary: "Excellent discovery call with Emily. Strong fit identified for e-commerce analytics needs. Budget approved and team excited about AI capabilities. Ready to move forward with pilot program in February.",
    aiInsights: {
      signals: [
        "Budget pre-approved - $50K for pilot program",
        "Executive sponsor identified (CMO)",
        "Pain point clearly articulated - lost revenue from poor analytics",
        "Timeline urgency - peak season preparation"
      ],
      nextSteps: [
        "Send pilot program proposal by end of week",
        "Schedule technical demo with analytics team",
        "Prepare customer success stories from retail clients",
        "Coordinate with legal team for contract review"
      ],
      competitorMentions: [
        { name: "Google Analytics", count: 4, context: "Current solution - frustrated with limitations" },
        { name: "Adobe Analytics", count: 2, context: "Evaluated but too expensive for their needs" }
      ],
      objections: [
        "Integration complexity with existing e-commerce platform",
        "Training requirements for marketing team"
      ],
      buyingSignals: [
        "Asked for pilot program pricing immediately",
        "Mentioned specific budget allocation",
        "Requested customer references in retail",
        "Inquired about implementation support included"
      ]
    },
    transcript: [
      { speaker: "user", text: "Emily, I'm excited to learn more about RetailMax's analytics challenges. What's driving your search for a new solution?", timestamp: "00:00:08" },
      { speaker: "contact", text: "We're losing money because we can't get actionable insights from our current Google Analytics setup. Our CMO has allocated budget specifically to fix this problem.", timestamp: "00:00:15" },
      { speaker: "user", text: "That's exactly the type of problem we solve best. Can you quantify what this is costing you?", timestamp: "00:00:28" },
      { speaker: "contact", text: "We estimate we're losing at least $200K per quarter in missed opportunities. We need something that can predict customer behavior, not just report on what happened.", timestamp: "00:00:35" }
    ]
  },
  {
    id: "4",
    contact: {
      name: "David Park",
      avatar: "https://i.pravatar.cc/40?img=7",
      company: "MedTech Innovations"
    },
    date: "2024-01-12",
    duration: "27:15",
    sentiment: "neutral",
    sentimentScore: 58,
    summary: "Mixed signals from David. Strong technical interest but concerned about regulatory validation in healthcare space. FDA compliance requirements adding complexity to decision process.",
    aiInsights: {
      signals: [
        "Technical team very interested in AI capabilities",
        "FDA validation process is lengthy but manageable",
        "Decision involves multiple stakeholders",
        "Q2 implementation target mentioned"
      ],
      nextSteps: [
        "Provide FDA compliance documentation and certifications",
        "Connect with existing healthcare customers for references",
        "Schedule technical deep-dive with R&D team",
        "Prepare regulatory timeline and support offering"
      ],
      competitorMentions: [
        { name: "Epic Systems", count: 6, context: "Current EHR provider - integration requirements discussed" },
        { name: "Cerner", count: 2, context: "Alternative they're also evaluating" }
      ],
      objections: [
        "FDA validation timeline uncertainty",
        "Integration complexity with Epic Systems",
        "Multiple stakeholder approval required",
        "Healthcare-specific compliance requirements"
      ],
      buyingSignals: [
        "Asked about healthcare customer references",
        "Inquired about FDA compliance support",
        "Mentioned Q2 implementation timeline",
        "Requested technical architecture review"
      ]
    },
    transcript: [
      { speaker: "user", text: "David, thanks for connecting today. I know healthcare tech decisions involve unique considerations around compliance.", timestamp: "00:00:10" },
      { speaker: "contact", text: "Exactly right. We love what we're seeing technically, but FDA validation is always our biggest concern with new platforms.", timestamp: "00:00:17" },
      { speaker: "user", text: "Completely understand. We have several healthcare clients who've successfully navigated that process. What's your typical timeline for regulatory review?", timestamp: "00:00:30" },
      { speaker: "contact", text: "Usually 3-6 months depending on the complexity. Do you have documentation on your existing FDA compliance certifications?", timestamp: "00:00:42" }
    ]
  },
  {
    id: "5",
    contact: {
      name: "Lisa Thompson",
      avatar: "https://i.pravatar.cc/40?img=9",
      company: "EduTech Academy"
    },
    date: "2024-01-11",
    duration: "22:50",
    sentiment: "positive",
    sentimentScore: 72,
    summary: "Good alignment with Lisa on student analytics needs. Budget constraints typical for education sector but strong value proposition identified. Potential for pilot program in summer semester.",
    aiInsights: {
      signals: [
        "Strong alignment on student success metrics",
        "Summer pilot program interest expressed",
        "Grant funding potential mentioned",
        "Board presentation scheduled for March"
      ],
      nextSteps: [
        "Prepare education sector pricing proposal",
        "Send case studies from other universities",
        "Research available education technology grants",
        "Schedule demo for academic affairs team"
      ],
      competitorMentions: [
        { name: "Blackboard", count: 5, context: "Current LMS provider - limited analytics capabilities" },
        { name: "Canvas", count: 3, context: "Alternative LMS they're considering" }
      ],
      objections: [
        "Limited budget typical for education sector",
        "Academic calendar constraints on implementation",
        "Faculty adoption and training concerns",
        "Integration requirements with existing LMS"
      ],
      buyingSignals: [
        "Asked about education sector discounts",
        "Mentioned summer pilot timeline",
        "Inquired about grant funding assistance",
        "Requested academic references"
      ]
    },
    transcript: [
      { speaker: "user", text: "Lisa, I'm really excited to discuss how we can help EduTech Academy improve student outcomes through better analytics.", timestamp: "00:00:12" },
      { speaker: "contact", text: "We're definitely interested. Student retention is our biggest challenge, and our current Blackboard analytics just aren't giving us actionable insights.", timestamp: "00:00:18" },
      { speaker: "user", text: "That's a common challenge we help solve. What's your ideal timeline for implementing something like this?", timestamp: "00:00:32" },
      { speaker: "contact", text: "Summer semester would be perfect for a pilot. Less disruption to students, and we could have it ready for the fall rush if it works well.", timestamp: "00:00:45" }
    ]
  },
  {
    id: "6",
    contact: {
      name: "James Mitchell",
      avatar: "https://i.pravatar.cc/40?img=11",
      company: "Manufacturing Plus"
    },
    date: "2024-01-10",
    duration: "35:40",
    sentiment: "positive",
    sentimentScore: 81,
    summary: "Strong interest from James in predictive maintenance capabilities. Clear ROI case identified through reduced downtime. Decision maker confirmed with implementation budget allocated for Q1.",
    aiInsights: {
      signals: [
        "Confirmed decision maker and budget authority",
        "Clear ROI calculation completed during call",
        "Immediate pain point - recent costly equipment failure",
        "Q1 implementation budget already allocated"
      ],
      nextSteps: [
        "Send formal proposal within 48 hours",
        "Schedule plant visit and technical assessment",
        "Prepare ROI model with specific equipment data",
        "Connect with implementation team for scoping"
      ],
      competitorMentions: [
        { name: "GE Digital", count: 4, context: "Previously evaluated but found too complex" },
        { name: "Siemens", count: 3, context: "Current equipment vendor - limited software capabilities" }
      ],
      objections: [
        "Integration with legacy Siemens equipment",
        "Plant floor network connectivity limitations",
        "Operator training and adoption concerns"
      ],
      buyingSignals: [
        "Calculated specific ROI during the call",
        "Asked for formal proposal immediately",
        "Mentioned Q1 budget allocation",
        "Requested plant visit for technical assessment",
        "Discussed specific implementation timeline"
      ]
    },
    transcript: [
      { speaker: "user", text: "James, I understand you had some recent equipment failures that could have been prevented with better predictive analytics.", timestamp: "00:00:15" },
      { speaker: "contact", text: "Yes, we had a $300K unplanned shutdown last month. If we could prevent just one of those per year, this solution would pay for itself immediately.", timestamp: "00:00:22" },
      { speaker: "user", text: "That's exactly the type of ROI our other manufacturing clients see. What's your typical maintenance budget annually?", timestamp: "00:00:38" },
      { speaker: "contact", text: "About $2M total, with roughly 30% going to unplanned repairs. We've allocated $150K specifically for predictive maintenance technology this quarter.", timestamp: "00:00:45" }
    ]
  }
];

interface CallTranscriptsProps {
  organizationType?: string;
  filters?: FilterState;
  updateFilter?: (key: keyof FilterState, value: any) => void;
  clearAllFilters?: () => void;
}

export function CallTranscripts({ organizationType, filters }: CallTranscriptsProps) {
  const [selectedTranscript, setSelectedTranscript] = useState(mockTranscripts[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const getSentimentColor = (sentiment: CallTranscript["sentiment"]) => {
    switch (sentiment) {
      case "positive": return "secondary";
      case "negative": return "destructive";
      default: return "outline";
    }
  };

  const getSentimentIcon = (sentiment: CallTranscript["sentiment"]) => {
    switch (sentiment) {
      case "positive": return TrendingUp;
      case "negative": return TrendingDown;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Transcripts List */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Recent Calls
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {mockTranscripts.map((transcript) => {
                const SentimentIcon = getSentimentIcon(transcript.sentiment);
                
                return (
                  <div
                    key={transcript.id}
                    className={cn(
                      "p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors",
                      selectedTranscript.id === transcript.id && "bg-muted"
                    )}
                    onClick={() => setSelectedTranscript(transcript)}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={transcript.contact.avatar} />
                        <AvatarFallback>{transcript.contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm text-foreground truncate">
                            {transcript.contact.name}
                          </h4>
                          <Badge variant={getSentimentColor(transcript.sentiment)} className="text-xs">
                            <SentimentIcon className="w-3 h-3 mr-1" />
                            {transcript.sentimentScore}%
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{transcript.contact.company}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{transcript.duration}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{transcript.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Transcript Details */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedTranscript.contact.avatar} />
                  <AvatarFallback>{selectedTranscript.contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {selectedTranscript.contact.name}
                  </h2>
                  <p className="text-muted-foreground">{selectedTranscript.contact.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="summary">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">AI Summary</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="actions">Next Steps</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="space-y-6 mt-6">
                <div className="bg-gradient-card rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-primary">AI Summary</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedTranscript.summary}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Call Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Duration:</span>
                        <span className="text-sm font-medium">{selectedTranscript.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Sentiment:</span>
                        <Badge variant="secondary" className="bg-success text-success-foreground">
                          {selectedTranscript.sentiment} ({selectedTranscript.sentimentScore}%)
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Talk Ratio:</span>
                        <span className="text-sm font-medium">65% / 35%</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Key Signals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Buying Signals:</span>
                          <Badge variant="secondary">{selectedTranscript.aiInsights.buyingSignals.length}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Objections:</span>
                          <Badge variant="outline">{selectedTranscript.aiInsights.objections.length}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Competitors:</span>
                          <Badge variant="secondary">{selectedTranscript.aiInsights.competitorMentions.length}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Full Width Next Steps Section */}
                <Card className="mt-6">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        Next Steps
                      </CardTitle>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add action item
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedTranscript.aiInsights.nextSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                          <Checkbox 
                            id={`step-${idx}`}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <label 
                              htmlFor={`step-${idx}`}
                              className="text-sm text-foreground cursor-pointer leading-relaxed"
                            >
                              {step}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="insights" className="space-y-4 mt-6">
                <div className="grid gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-success">Buying Signals Detected</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedTranscript.aiInsights.buyingSignals.map((signal, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <TrendingUp className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            {signal}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-warning">Objections Raised</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedTranscript.aiInsights.objections.map((objection, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                            {objection}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Competitor Mentions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedTranscript.aiInsights.competitorMentions.map((competitor, idx) => (
                          <div key={idx} className="flex items-start justify-between">
                            <div>
                              <span className="font-medium text-sm">{competitor.name}</span>
                              <p className="text-xs text-muted-foreground">{competitor.context}</p>
                            </div>
                            <Badge variant="outline">{competitor.count}x</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="transcript" className="mt-6">
                <ScrollArea className="h-[400px] border border-border rounded-lg p-4">
                  <div className="space-y-4">
                    {selectedTranscript.transcript.map((entry, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="text-xs text-muted-foreground mt-1 min-w-[60px]">
                          {entry.timestamp}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {entry.speaker === "user" ? (
                              <Badge variant="secondary" className="text-xs">You</Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">{selectedTranscript.contact.name}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {entry.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="actions" className="space-y-4 mt-6">
                <div className="bg-gradient-card rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-primary">AI-Generated Next Steps</h3>
                    </div>
                    <Button size="sm" className="gap-2">
                      <Brain className="w-4 h-4" />
                      Refine with AI
                    </Button>
                  </div>
                  <ul className="space-y-3">
                    {selectedTranscript.aiInsights.nextSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{step}</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Create Task
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}