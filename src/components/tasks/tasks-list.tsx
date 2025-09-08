import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScoreBadge } from "@/components/ui/score-badge";
import { 
  Clock, 
  Phone, 
  Mail, 
  MessageSquare, 
  Target, 
  Brain,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string;
  type: "call" | "email" | "follow-up" | "ai-generated";
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
  contact: {
    name: string;
    avatar: string;
    company: string;
  };
  predictiveScore: number;
  aiInsights?: string[];
  tags: string[];
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Follow up on pricing discussion",
    description: "Sarah mentioned budget concerns - address ROI calculation and propose pilot program",
    type: "ai-generated",
    priority: "high",
    status: "pending",
    dueDate: "2024-01-15",
    contact: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/40?img=1",
      company: "TechCorp"
    },
    predictiveScore: 87,
    aiInsights: [
      "Competitor 'HubSpot' mentioned 3x in last call",
      "Price sensitivity detected - suggest 20% pilot discount",
      "Decision timeline: Q1 2024"
    ],
    tags: ["pricing", "competitor-intel", "high-value"]
  },
  {
    id: "2",
    title: "Schedule demo with technical team",
    description: "Michael requested deep-dive technical demo for his development team",
    type: "call",
    priority: "high",
    status: "pending",
    dueDate: "2024-01-15",
    contact: {
      name: "Michael Rodriguez",
      avatar: "https://i.pravatar.cc/40?img=2",
      company: "DataFlow Inc"
    },
    predictiveScore: 92,
    aiInsights: [
      "Technical buyer confirmed - high influence",
      "Integration concerns about API rate limits",
      "Evaluating 2 other solutions"
    ],
    tags: ["demo", "technical", "integration"]
  },
  {
    id: "3",
    title: "Send case study: Similar company implementation",
    description: "Emma asked for proof of concept from similar manufacturing company",
    type: "email",
    priority: "medium",
    status: "in-progress",
    dueDate: "2024-01-16",
    contact: {
      name: "Emma Thompson",
      avatar: "https://i.pravatar.cc/40?img=3",
      company: "ManufacturingPro"
    },
    predictiveScore: 73,
    aiInsights: [
      "Similar company size and industry match found",
      "ROI case study shows 340% return",
      "Implementation timeline concern raised"
    ],
    tags: ["case-study", "manufacturing", "proof"]
  },
  {
    id: "4",
    title: "Address security compliance questions",
    description: "Legal team has questions about SOC2 and GDPR compliance",
    type: "follow-up",
    priority: "high",
    status: "pending",
    dueDate: "2024-01-14",
    contact: {
      name: "James Wilson",
      avatar: "https://i.pravatar.cc/40?img=4",
      company: "SecureBank"
    },
    predictiveScore: 68,
    aiInsights: [
      "Compliance blocker - must resolve for deal progress",
      "Similar questions resolved for 3 other financial clients",
      "Legal approval required before procurement"
    ],
    tags: ["compliance", "security", "legal", "blocker"]
  }
];

interface TasksListProps {
  filterType?: "outreach" | "calls" | "all";
}

export function TasksList({ filterType = "all" }: TasksListProps) {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const filteredTasks = mockTasks.filter(task => {
    if (filterType === "outreach") return task.type === "email" || task.type === "follow-up";
    if (filterType === "calls") return task.type === "call";
    return true;
  });

  const toggleTaskComplete = (taskId: string) => {
    const newCompletedTasks = new Set(completedTasks);
    if (completedTasks.has(taskId)) {
      newCompletedTasks.delete(taskId);
    } else {
      newCompletedTasks.add(taskId);
    }
    setCompletedTasks(newCompletedTasks);
  };

  const getTypeIcon = (type: Task["type"]) => {
    switch (type) {
      case "call": return Phone;
      case "email": return Mail;
      case "follow-up": return MessageSquare;
      case "ai-generated": return Brain;
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
    }
  };

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => {
        const TypeIcon = getTypeIcon(task.type);
        const isCompleted = completedTasks.has(task.id);
        
        return (
          <Card key={task.id} className={cn(
            "transition-all duration-200 hover:shadow-medium",
            isCompleted && "opacity-60 bg-muted/50"
          )}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTaskComplete(task.id)}
                    className="mt-1 p-1 h-8 w-8"
                  >
                    <CheckCircle2 className={cn(
                      "w-5 h-5",
                      isCompleted ? "text-success" : "text-muted-foreground"
                    )} />
                  </Button>
                  
                  <div className="flex-1 space-y-3">
                    {/* Task Header */}
                    <div className="flex items-center gap-3">
                      <TypeIcon className="w-4 h-4 text-muted-foreground" />
                      <h3 className={cn(
                        "font-semibold text-foreground",
                        isCompleted && "line-through text-muted-foreground"
                      )}>
                        {task.title}
                      </h3>
                      <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                        {task.priority}
                      </Badge>
                      {task.type === "ai-generated" && (
                        <Badge className="text-xs bg-gradient-primary">
                          AI Generated
                        </Badge>
                      )}
                    </div>
                    
                    {/* Task Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {task.description}
                    </p>
                    
                    {/* Contact Info */}
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={task.contact.avatar} />
                        <AvatarFallback>{task.contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{task.contact.name}</p>
                        <p className="text-xs text-muted-foreground">{task.contact.company}</p>
                      </div>
                    </div>
                    
                    {/* AI Insights */}
                    {task.aiInsights && (
                      <div className="bg-gradient-card rounded-lg p-3 border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-primary">AI Insights</span>
                        </div>
                        <ul className="space-y-1">
                          {task.aiInsights.map((insight, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full" />
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Score and Actions */}
                <div className="flex flex-col items-end space-y-4 ml-4">
                  <ScoreBadge score={task.predictiveScore} size="lg" />
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {task.dueDate}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Brain className="w-4 h-4" />
                      AI Assist
                    </Button>
                    <Button size="sm" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Take Action
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {/* AI Generate More Tasks */}
      <Card className="border-dashed border-primary/50 bg-gradient-card">
        <CardContent className="p-6 text-center">
          <Brain className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-2">Generate More Smart Tasks</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Let AI analyze your pipeline and create personalized next steps
          </p>
          <Button className="gap-2">
            <Target className="w-4 h-4" />
            Generate Tasks with AI
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}