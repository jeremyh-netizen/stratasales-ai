import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Phone, 
  Mail, 
  Calendar, 
  Clock,
  Brain,
  CheckCircle2,
  MessageSquare,
  Target,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Zap,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";
import { filterTasks, type Task } from "@/lib/task-filters";
import type { FilterState } from "@/pages/Tasks";

// Mock tasks with comprehensive examples
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Follow up on enterprise pricing discussion",
    description: "Sarah Chen from TechCorp is ready to move forward with the enterprise plan. She's confirmed budget approval and wants to discuss implementation timeline.",
    type: "call",
    priority: "high",
    dueDate: "2024-01-16",
    contact: { id: "ct1", name: "Sarah Chen", company: "TechCorp Inc.", avatar: "https://i.pravatar.cc/40?img=1" },
    account: { id: "a1", name: "TechCorp Inc." },
    campaign: { id: "c1", name: "Q1 Enterprise Outreach" },
    predictiveScore: 87,
    aiInsights: ["Contact shows strong buying signals", "Decision maker confirmed", "Budget approved for Q1", "Competitor evaluation completed"],
    tags: ["enterprise", "hot-lead", "pricing"],
    completed: false,
    createdDate: "2024-01-10",
    industry: "Technology",
    lastInteraction: "2024-01-15",
    buyingSignalsScore: 92,
    taskSource: "manual"
  },
  {
    id: "2", 
    title: "Demo follow-up with DataCorp development team",
    description: "Technical demo went well. Need to address integration questions and API rate limits concerns.",
    type: "email",
    priority: "high", 
    dueDate: "2024-01-17",
    contact: { id: "ct2", name: "Mike Rodriguez", company: "DataCorp Solutions", avatar: "https://i.pravatar.cc/40?img=2" },
    account: { id: "a2", name: "DataCorp Solutions" },
    campaign: { id: "c2", name: "SaaS Demo Campaign" },
    predictiveScore: 92,
    aiInsights: ["Competitor mentioned 3 times", "Price sensitivity detected", "Technical requirements confirmed", "Integration timeline discussed"],
    tags: ["competitive", "technical", "demo-ready"],
    completed: false,
    createdDate: "2024-01-12",
    industry: "Technology",
    lastInteraction: "2024-01-16",
    buyingSignalsScore: 85,
    taskSource: "manual"
  },
  {
    id: "3",
    title: "Schedule implementation kickoff with HealthTech",
    description: "Contract signed! Ready to begin implementation phase with Dr. Williams and her team.",
    type: "meeting",
    priority: "high",
    dueDate: "2024-01-18",
    contact: { id: "ct3", name: "Dr. Emily Williams", company: "HealthTech Solutions", avatar: "https://i.pravatar.cc/40?img=3" },
    account: { id: "a3", name: "HealthTech Solutions" },
    campaign: { id: "c3", name: "Healthcare Vertical" },
    predictiveScore: 95,
    aiInsights: ["Contract executed", "Implementation team assigned", "Go-live date confirmed", "Success metrics defined"],
    tags: ["closed-won", "implementation", "healthcare"],
    completed: false,
    createdDate: "2024-01-14",
    industry: "Healthcare",
    lastInteraction: "2024-01-16",
    buyingSignalsScore: 98,
    taskSource: "automation"
  },
  {
    id: "4",
    title: "Address security concerns for FinanceFirst",
    description: "CISO raised concerns about data encryption and compliance. Need to provide detailed security documentation.",
    type: "email",
    priority: "high",
    dueDate: "2024-01-19",
    contact: { id: "ct4", name: "Robert Kim", company: "FinanceFirst Bank", avatar: "https://i.pravatar.cc/40?img=4" },
    account: { id: "a4", name: "FinanceFirst Bank" },
    campaign: { id: "c4", name: "Financial Services Outreach" },
    predictiveScore: 78,
    aiInsights: ["Security concerns identified", "Compliance requirements discussed", "CISO involvement indicates serious evaluation", "Risk assessment in progress"],
    tags: ["security", "compliance", "finance", "objection-handling"],
    completed: false,
    createdDate: "2024-01-13",
    industry: "Financial Services",
    lastInteraction: "2024-01-17",
    buyingSignalsScore: 65,
    taskSource: "manual"
  },
  {
    id: "5",
    title: "Nurture Manufacturing Corp with ROI case study",
    description: "Share similar customer success story from manufacturing industry to build confidence.",
    type: "email",
    priority: "medium",
    dueDate: "2024-01-20",
    contact: { id: "ct5", name: "James Wilson", company: "Manufacturing Corp", avatar: "https://i.pravatar.cc/40?img=5" },
    account: { id: "a5", name: "Manufacturing Corp" },
    campaign: { id: "c5", name: "Manufacturing Vertical" },
    predictiveScore: 65,
    aiInsights: ["ROI concerns raised", "Looking for industry-specific examples", "Budget discussions ongoing", "Multiple stakeholders involved"],
    tags: ["nurture", "roi", "manufacturing", "case-study"],
    completed: false,
    createdDate: "2024-01-11",
    industry: "Manufacturing",
    lastInteraction: "2024-01-18",
    buyingSignalsScore: 58,
    taskSource: "ai-generated"
  },
  {
    id: "6",
    title: "Cold outreach to RetailPlus expansion opportunity",
    description: "New location opening in Q2. Perfect timing to introduce our retail analytics solution.",
    type: "call",
    priority: "medium",
    dueDate: "2024-01-21",
    contact: { id: "ct6", name: "Lisa Thompson", company: "RetailPlus Stores", avatar: "https://i.pravatar.cc/40?img=6" },
    account: { id: "a6", name: "RetailPlus Stores" },
    campaign: { id: "c6", name: "Retail Expansion Campaign" },
    predictiveScore: 42,
    aiInsights: ["Expansion announced publicly", "Technology modernization in progress", "Previous vendor contracts expiring", "Growth trajectory positive"],
    tags: ["cold-outreach", "retail", "expansion", "timing"],
    completed: false,
    createdDate: "2024-01-15",
    industry: "Retail",
    lastInteraction: null,
    buyingSignalsScore: 35,
    taskSource: "ai-generated"
  },
  {
    id: "7",
    title: "Re-engage with EduTech after 30-day silence",
    description: "Last touched base 30 days ago. Time to re-engage with a value-driven follow-up.",
    type: "email",
    priority: "low",
    dueDate: "2024-01-22",
    contact: { id: "ct7", name: "Maria Garcia", company: "EduTech Institute", avatar: "https://i.pravatar.cc/40?img=7" },
    account: { id: "a7", name: "EduTech Institute" },
    campaign: { id: "c7", name: "Education Sector Outreach" },
    predictiveScore: 38,
    aiInsights: ["Radio silence for 30 days", "Previous engagement was positive", "Budget cycle starts in Q2", "New leadership in IT department"],
    tags: ["re-engagement", "education", "nurture", "timing"],
    completed: false,
    createdDate: "2024-01-09",
    industry: "Education",
    lastInteraction: "2023-12-22",
    buyingSignalsScore: 28,
    taskSource: "automation"
  },
  {
    id: "8",
    title: "Competitive displacement at LogisticsPro",
    description: "Current vendor contract expires in Q2. They're evaluating alternatives after service issues.",
    type: "call",
    priority: "high",
    dueDate: "2024-01-17",
    contact: { id: "ct8", name: "David Chen", company: "LogisticsPro Inc", avatar: "https://i.pravatar.cc/40?img=8" },
    account: { id: "a8", name: "LogisticsPro Inc" },
    campaign: { id: "c8", name: "Competitive Displacement" },
    predictiveScore: 83,
    aiInsights: ["Current vendor issues documented", "Contract renewal window open", "Decision makers identified", "RFP process initiated"],
    tags: ["competitive", "displacement", "logistics", "rfp"],
    completed: false,
    createdDate: "2024-01-16",
    industry: "Logistics",
    lastInteraction: "2024-01-16",
    buyingSignalsScore: 89,
    taskSource: "manual"
  }
];

export { type Task } from "@/lib/task-filters";

interface TasksListProps {
  viewType?: string;
  filters?: FilterState;
}

export function TasksList({ filters }: TasksListProps) {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  
  let displayTasks = filters ? filterTasks(mockTasks, filters) : mockTasks;

  const toggleTaskComplete = (taskId: string) => {
    const newCompletedTasks = new Set(completedTasks);
    if (completedTasks.has(taskId)) {
      newCompletedTasks.delete(taskId);
    } else {
      newCompletedTasks.add(taskId);
    }
    setCompletedTasks(newCompletedTasks);
  };

  const toggleTaskExpansion = (taskId: string) => {
    const newExpandedTasks = new Set(expandedTasks);
    if (expandedTasks.has(taskId)) {
      newExpandedTasks.delete(taskId);
    } else {
      newExpandedTasks.add(taskId);
    }
    setExpandedTasks(newExpandedTasks);
  };

  const getTypeIcon = (type: Task["type"]) => {
    switch (type) {
      case "call": return Phone;
      case "email": return Mail;
      case "follow-up": return MessageSquare;
      case "meeting": return Calendar;
      case "ai-generated": return Brain;
    }
  };

  return (
    <div className="space-y-4">
      {displayTasks.map((task) => {
        const TypeIcon = getTypeIcon(task.type);
        const isCompleted = completedTasks.has(task.id);
        const isExpanded = expandedTasks.has(task.id);
        
        return (
          <Card key={task.id} className={cn(
            "transition-all duration-200 hover:shadow-medium cursor-pointer", 
            isCompleted && "opacity-60"
          )}>
            {/* Streamlined View */}
            <div 
              className="p-4 flex items-center justify-between"
              onClick={() => toggleTaskExpansion(task.id)}
            >
              <div className="flex items-center space-x-3 flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTaskComplete(task.id);
                  }}
                  className="p-1 h-8 w-8"
                >
                  <CheckCircle2 className={cn("w-5 h-5", isCompleted ? "text-success" : "text-muted-foreground")} />
                </Button>
                
                <TypeIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">{task.title}</h3>
                    <Badge 
                      variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"} 
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={task.contact.avatar} />
                    <AvatarFallback>{task.contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-right">
                    <p className="text-sm font-medium">{task.contact.name}</p>
                    <p className="text-xs text-muted-foreground">{task.contact.company}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 ml-4">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {task.dueDate}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      task.predictiveScore >= 80 ? "bg-success" :
                      task.predictiveScore >= 60 ? "bg-warning" : "bg-muted-foreground"
                    )} />
                    <span className="text-xs font-medium">{task.predictiveScore}</span>
                  </div>
                </div>
                
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </div>

            {/* Expanded View */}
            {isExpanded && (
              <div className="px-4 pb-4 border-t border-border animate-accordion-down">
                <div className="pt-4 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {task.description}
                  </p>
                  
                  {/* AI Insights */}
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">AI Insights</span>
                    </div>
                    <ul className="space-y-1">
                      {task.aiInsights.map((insight, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-xs"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        AI Assist
                      </Button>
                      <Button 
                        size="sm"
                        className="text-xs"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Take Action
                      </Button>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {task.campaign && (
                        <Badge variant="secondary" className="text-xs">
                          {task.campaign.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}