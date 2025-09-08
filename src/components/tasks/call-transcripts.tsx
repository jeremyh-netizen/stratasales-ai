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
  Lightbulb
} from "lucide-react";
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