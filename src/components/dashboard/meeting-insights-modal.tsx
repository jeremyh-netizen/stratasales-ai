import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { 
  CalendarIcon,
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Clock,
  Phone,
  ArrowRight,
  Target,
  Lightbulb
} from "lucide-react";

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
  campaign?: {
    id: string;
    name: string;
  };
  aiInsights: {
    signals: string[];
    nextSteps: string[];
    competitorMentions: Array<{ name: string; count: number; context: string }>;
    objections: string[];
    buyingSignals: string[];
  };
}

// Mock data - same structure as call transcripts
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
    summary: "Productive discussion about pricing and implementation timeline.",
    campaign: { id: "c1", name: "Q1 Enterprise Outreach" },
    aiInsights: {
      signals: ["Budget authority confirmed", "Technical fit confirmed"],
      nextSteps: [
        "Send detailed ROI calculator within 24 hours",
        "Schedule technical demo with her development team",
        "Prepare competitive analysis vs HubSpot"
      ],
      competitorMentions: [],
      objections: [
        "Budget constraints for Q1 implementation",
        "Concerns about implementation complexity"
      ],
      buyingSignals: [
        "Requested ROI calculations",
        "Asked about pilot program options",
        "Mentioned specific use cases and requirements"
      ]
    }
  },
  {
    id: "2",
    contact: {
      name: "Mike Rodriguez",
      avatar: "https://i.pravatar.cc/40?img=2",
      company: "StartupXYZ"
    },
    date: "2024-01-14",
    duration: "18:45",
    sentiment: "neutral",
    sentimentScore: 65,
    summary: "Initial discovery call to understand their current process.",
    campaign: { id: "c2", name: "Startup Acceleration Program" },
    aiInsights: {
      signals: ["Need confirmed", "Timeline discussed"],
      nextSteps: [
        "Send product demo video",
        "Connect with technical team lead",
        "Provide case study from similar company"
      ],
      competitorMentions: [],
      objections: [
        "Limited budget as early-stage startup",
        "Need to validate with technical team first"
      ],
      buyingSignals: [
        "Expressed clear pain points",
        "Asked about implementation time",
        "Requested technical documentation"
      ]
    }
  },
  {
    id: "3",
    contact: {
      name: "Emily Watson",
      avatar: "https://i.pravatar.cc/40?img=3",
      company: "Global Enterprises"
    },
    date: "2024-01-13",
    duration: "32:15",
    sentiment: "negative",
    sentimentScore: 42,
    summary: "Concerns raised about integration complexity and cost.",
    aiInsights: {
      signals: ["Integration concerns", "Cost sensitivity"],
      nextSteps: [
        "Address integration concerns with technical documentation",
        "Provide detailed cost breakdown",
        "Schedule call with customer success team"
      ],
      competitorMentions: [],
      objections: [
        "Current system working adequately",
        "High integration costs concern",
        "Uncertain about ROI timeline"
      ],
      buyingSignals: [
        "Asked detailed technical questions",
        "Inquired about support during transition"
      ]
    }
  }
];

interface MeetingInsightsModalProps {
  children: React.ReactNode;
}

export function MeetingInsightsModal({ children }: MeetingInsightsModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);

  // Filter transcripts by selected date (mock implementation)
  const filteredTranscripts = mockTranscripts.filter(transcript => {
    const transcriptDate = new Date(transcript.date);
    return transcriptDate.toDateString() === selectedDate.toDateString() ||
           Math.abs(transcriptDate.getTime() - selectedDate.getTime()) < 7 * 24 * 60 * 60 * 1000; // Within a week
  });

  // Aggregate insights
  const aggregatedBuyingSignals = filteredTranscripts.flatMap(t => 
    t.aiInsights.buyingSignals.map(signal => ({
      signal,
      contact: t.contact,
      campaign: t.campaign?.name,
      callId: t.id
    }))
  );

  const aggregatedObjections = filteredTranscripts.flatMap(t => 
    t.aiInsights.objections.map(objection => ({
      objection,
      contact: t.contact,
      campaign: t.campaign?.name,
      callId: t.id
    }))
  );

  const handleNextStepClick = (callId: string) => {
    // In a real implementation, this would navigate to the specific call's next steps
    console.log(`Navigate to call ${callId} next steps`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Meeting Insights
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Date Picker */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Filter by date:</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="insights" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="mt-4">
              <ScrollArea className="h-[500px]">
                <div className="space-y-6">
                  {/* Buying Signals */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        Buying Signals ({aggregatedBuyingSignals.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {aggregatedBuyingSignals.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                                {item.signal}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Avatar className="h-4 w-4">
                                  <AvatarImage src={item.contact.avatar} />
                                  <AvatarFallback>{item.contact.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">
                                  {item.contact.name} • {item.contact.company}
                                </span>
                                {item.campaign && (
                                  <>
                                    <span className="text-xs text-muted-foreground">•</span>
                                    <Badge variant="secondary" className="text-xs">
                                      {item.campaign}
                                    </Badge>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Objections */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        Objections ({aggregatedObjections.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {aggregatedObjections.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                {item.objection}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Avatar className="h-4 w-4">
                                  <AvatarImage src={item.contact.avatar} />
                                  <AvatarFallback>{item.contact.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">
                                  {item.contact.name} • {item.contact.company}
                                </span>
                                {item.campaign && (
                                  <>
                                    <span className="text-xs text-muted-foreground">•</span>
                                    <Badge variant="secondary" className="text-xs">
                                      {item.campaign}
                                    </Badge>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="next-steps" className="mt-4">
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {filteredTranscripts.map((transcript) => (
                    <Card key={transcript.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={transcript.contact.avatar} />
                            <AvatarFallback>{transcript.contact.name[0]}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-sm">{transcript.contact.name}</h3>
                              <Badge 
                                variant={transcript.sentiment === 'positive' ? 'default' : 
                                        transcript.sentiment === 'negative' ? 'destructive' : 'secondary'}
                                className="text-xs"
                              >
                                {transcript.sentiment}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{transcript.contact.company}</span>
                              {transcript.campaign && (
                                <>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">Campaign: {transcript.campaign.name}</span>
                                </>
                              )}
                              <span className="text-xs text-muted-foreground">•</span>
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{transcript.duration}</span>
                            </div>

                            {/* Next Steps Preview */}
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">Next Steps ({transcript.aiInsights.nextSteps.length})</span>
                              </div>
                              
                              {transcript.aiInsights.nextSteps.slice(0, 2).map((step, index) => (
                                <div key={index} className="flex items-start gap-2 ml-6">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto p-1 justify-start text-left hover:bg-primary/10"
                                    onClick={() => handleNextStepClick(transcript.id)}
                                  >
                                    <span className="text-xs">{step}</span>
                                    <ArrowRight className="h-3 w-3 ml-1 flex-shrink-0" />
                                  </Button>
                                </div>
                              ))}
                              
                              {transcript.aiInsights.nextSteps.length > 2 && (
                                <div className="ml-6">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                                    onClick={() => handleNextStepClick(transcript.id)}
                                  >
                                    +{transcript.aiInsights.nextSteps.length - 2} more steps
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}