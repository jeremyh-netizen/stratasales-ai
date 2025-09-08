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

// Mock tasks with comprehensive examples - Multiple tasks per account, multiple contacts per account
export const mockTasks: Task[] = [
  // ========== TechCorp Inc. (Hot Account - 5 tasks, 4 contacts) ==========
  {
    id: "1",
    title: "Follow up on enterprise pricing discussion",
    description: "Sarah Chen from TechCorp is ready to move forward with the enterprise plan. She's confirmed budget approval and wants to discuss implementation timeline.",
    type: "call",
    priority: "high",
    dueDate: "2025-09-08",
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
    title: "Technical integration deep-dive with CTO",
    description: "John Miller needs to review API documentation and security protocols before final approval. Schedule 2-hour technical session.",
    type: "meeting",
    priority: "high", 
    dueDate: "2025-09-08",
    contact: { id: "ct2", name: "John Miller", company: "TechCorp Inc.", avatar: "https://i.pravatar.cc/40?img=2" },
    account: { id: "a1", name: "TechCorp Inc." },
    campaign: { id: "c1", name: "Q1 Enterprise Outreach" },
    predictiveScore: 91,
    aiInsights: ["Technical stakeholder engaged", "Security requirements clarified", "Integration timeline discussed", "Team resources allocated"],
    tags: ["technical", "integration", "security", "stakeholder"],
    completed: false,
    createdDate: "2024-01-14",
    industry: "Technology",
    lastInteraction: "2024-01-17",
    buyingSignalsScore: 88,
    taskSource: "manual"
  },
  {
    id: "3",
    title: "Vendor evaluation process with Procurement",
    description: "Amy Liu is leading vendor selection. Need to submit compliance documentation and references by Friday.",
    type: "email",
    priority: "high",
    dueDate: "2025-09-08",
    contact: { id: "ct3", name: "Amy Liu", company: "TechCorp Inc.", avatar: "https://i.pravatar.cc/40?img=3" },
    account: { id: "a1", name: "TechCorp Inc." },
    campaign: { id: "c1", name: "Q1 Enterprise Outreach" },
    predictiveScore: 85,
    aiInsights: ["Procurement process initiated", "Compliance requirements defined", "Reference checks in progress", "Contract terms negotiable"],
    tags: ["procurement", "compliance", "documentation", "vendor-selection"],
    completed: false,
    createdDate: "2024-01-16",
    industry: "Technology",
    lastInteraction: "2024-01-18",
    buyingSignalsScore: 82,
    taskSource: "manual"
  },
  {
    id: "4",
    title: "Implementation planning workshop",
    description: "Mark Davis wants to plan rollout strategy and training schedule for 500+ users across 3 locations.",
    type: "meeting",
    priority: "medium",
    dueDate: "2025-09-09",
    contact: { id: "ct4", name: "Mark Davis", company: "TechCorp Inc.", avatar: "https://i.pravatar.cc/40?img=4" },
    account: { id: "a1", name: "TechCorp Inc." },
    campaign: { id: "c1", name: "Q1 Enterprise Outreach" },
    predictiveScore: 89,
    aiInsights: ["Implementation team identified", "Training requirements scoped", "Rollout timeline proposed", "Success metrics defined"],
    tags: ["implementation", "training", "rollout", "planning"],
    completed: false,
    createdDate: "2024-01-15",
    industry: "Technology",
    lastInteraction: "2024-01-19",
    buyingSignalsScore: 86,
    taskSource: "automation"
  },
  {
    id: "5",
    title: "Contract negotiation follow-up",
    description: "Sarah requested contract amendments for data residency and SLA terms. Legal review completed, ready to discuss.",
    type: "call",
    priority: "high",
    dueDate: "2025-09-08",
    contact: { id: "ct1", name: "Sarah Chen", company: "TechCorp Inc.", avatar: "https://i.pravatar.cc/40?img=1" },
    account: { id: "a1", name: "TechCorp Inc." },
    campaign: { id: "c1", name: "Q1 Enterprise Outreach" },
    predictiveScore: 93,
    aiInsights: ["Contract terms negotiated", "Legal review completed", "Data residency addressed", "Ready for signature"],
    tags: ["contract", "legal", "data-residency", "sla"],
    completed: false,
    createdDate: "2024-01-17",
    industry: "Technology",
    lastInteraction: "2024-01-19",
    buyingSignalsScore: 95,
    taskSource: "manual"
  },

  // ========== DataCorp Solutions (Warm Account - 4 tasks, 3 contacts) ==========
  {
    id: "6", 
    title: "Demo follow-up with DataCorp development team",
    description: "Technical demo went well. Need to address integration questions and API rate limits concerns.",
    type: "email",
    priority: "high", 
    dueDate: "2025-09-08",
    contact: { id: "ct5", name: "Mike Rodriguez", company: "DataCorp Solutions", avatar: "https://i.pravatar.cc/40?img=5" },
    account: { id: "a2", name: "DataCorp Solutions" },
    campaign: { id: "c2", name: "SaaS Demo Campaign" },
    predictiveScore: 92,
    aiInsights: ["Technical demo successful", "Integration questions raised", "API concerns addressed", "Timeline discussed"],
    tags: ["demo", "technical", "integration", "api"],
    completed: false,
    createdDate: "2024-01-12",
    industry: "Technology",
    lastInteraction: "2024-01-16",
    buyingSignalsScore: 85,
    taskSource: "manual"
  },
  {
    id: "7",
    title: "Budget approval discussion with CFO",
    description: "Jennifer needs to present ROI case to board. Prepare business justification and cost-benefit analysis.",
    type: "call",
    priority: "high",
    dueDate: "2025-09-10",
    contact: { id: "ct6", name: "Jennifer Walsh", company: "DataCorp Solutions", avatar: "https://i.pravatar.cc/40?img=6" },
    account: { id: "a2", name: "DataCorp Solutions" },
    campaign: { id: "c2", name: "SaaS Demo Campaign" },
    predictiveScore: 79,
    aiInsights: ["CFO engaged in process", "ROI analysis requested", "Board presentation scheduled", "Budget authority confirmed"],
    tags: ["budget", "roi", "cfo", "board-presentation"],
    completed: false,
    createdDate: "2024-01-18",
    industry: "Technology",
    lastInteraction: "2024-01-20",
    buyingSignalsScore: 73,
    taskSource: "manual"
  },
  {
    id: "8",
    title: "Competitive analysis for Head of Product",
    description: "Tom is evaluating 3 vendors including us. Need to highlight our differentiators and unique value proposition.",
    type: "email",
    priority: "medium",
    dueDate: "2025-09-11",
    contact: { id: "ct7", name: "Tom Bradley", company: "DataCorp Solutions", avatar: "https://i.pravatar.cc/40?img=7" },
    account: { id: "a2", name: "DataCorp Solutions" },
    campaign: { id: "c2", name: "SaaS Demo Campaign" },
    predictiveScore: 68,
    aiInsights: ["Competitive evaluation in progress", "Feature comparison requested", "Price sensitivity detected", "Decision timeline defined"],
    tags: ["competitive", "features", "differentiation", "evaluation"],
    completed: false,
    createdDate: "2024-01-19",
    industry: "Technology",
    lastInteraction: "2024-01-22",
    buyingSignalsScore: 61,
    taskSource: "ai-generated"
  },
  {
    id: "9",
    title: "Security audit results review",
    description: "Mike's team completed security audit. Review findings and address any gaps before final decision.",
    type: "meeting",
    priority: "medium",
    dueDate: "2025-09-16",
    contact: { id: "ct5", name: "Mike Rodriguez", company: "DataCorp Solutions", avatar: "https://i.pravatar.cc/40?img=5" },
    account: { id: "a2", name: "DataCorp Solutions" },
    campaign: { id: "c2", name: "SaaS Demo Campaign" },
    predictiveScore: 74,
    aiInsights: ["Security audit completed", "Compliance requirements met", "Minor gaps identified", "Remediation plan needed"],
    tags: ["security", "audit", "compliance", "review"],
    completed: false,
    createdDate: "2024-01-20",
    industry: "Technology",
    lastInteraction: "2024-01-23",
    buyingSignalsScore: 71,
    taskSource: "automation"
  },

  // ========== HealthTech Solutions (Won Account - 3 tasks, 3 contacts) ==========
  {
    id: "10",
    title: "Implementation kickoff meeting",
    description: "Contract signed! Ready to begin implementation phase with Dr. Williams and her team.",
    type: "meeting",
    priority: "high",
    dueDate: "2025-09-08",
    contact: { id: "ct8", name: "Dr. Emily Williams", company: "HealthTech Solutions", avatar: "https://i.pravatar.cc/40?img=8" },
    account: { id: "a3", name: "HealthTech Solutions" },
    campaign: { id: "c3", name: "Healthcare Vertical" },
    predictiveScore: 95,
    aiInsights: ["Contract executed", "Implementation team assigned", "Go-live date confirmed", "Success metrics defined"],
    tags: ["closed-won", "implementation", "healthcare", "kickoff"],
    completed: false,
    createdDate: "2024-01-14",
    industry: "Healthcare",
    lastInteraction: "2024-01-16",
    buyingSignalsScore: 98,
    taskSource: "automation"
  },
  {
    id: "11",
    title: "HIPAA compliance training coordination",
    description: "Marcus requires all team members to complete HIPAA training before system access. Schedule training sessions.",
    type: "email",
    priority: "high",
    dueDate: "2025-09-08",
    contact: { id: "ct9", name: "Marcus Johnson", company: "HealthTech Solutions", avatar: "https://i.pravatar.cc/40?img=9" },
    account: { id: "a3", name: "HealthTech Solutions" },
    campaign: { id: "c3", name: "Healthcare Vertical" },
    predictiveScore: 88,
    aiInsights: ["HIPAA compliance mandatory", "Training schedule required", "Team access dependent", "Audit trail needed"],
    tags: ["compliance", "hipaa", "training", "implementation"],
    completed: false,
    createdDate: "2024-01-19",
    industry: "Healthcare",
    lastInteraction: "2024-01-22",
    buyingSignalsScore: 85,
    taskSource: "manual"
  },
  {
    id: "12",
    title: "Data migration planning with IT Director",
    description: "Lisa needs detailed migration timeline for patient records. Critical to maintain system uptime during transition.",
    type: "call",
    priority: "high",
    dueDate: "2025-09-12",
    contact: { id: "ct10", name: "Lisa Rodriguez", company: "HealthTech Solutions", avatar: "https://i.pravatar.cc/40?img=10" },
    account: { id: "a3", name: "HealthTech Solutions" },
    campaign: { id: "c3", name: "Healthcare Vertical" },
    predictiveScore: 91,
    aiInsights: ["Data migration critical", "Uptime requirements strict", "Patient records sensitive", "Backup plan required"],
    tags: ["data-migration", "uptime", "patient-records", "planning"],
    completed: false,
    createdDate: "2024-01-21",
    industry: "Healthcare",
    lastInteraction: "2024-01-24",
    buyingSignalsScore: 89,
    taskSource: "manual"
  },

  // ========== FinanceFirst Bank (Evaluation Account - 4 tasks, 4 contacts) ==========
  {
    id: "13",
    title: "Address security concerns with CISO",
    description: "Robert raised concerns about data encryption and compliance. Need to provide detailed security documentation.",
    type: "email",
    priority: "high",
    dueDate: "2025-09-08",
    contact: { id: "ct11", name: "Robert Kim", company: "FinanceFirst Bank", avatar: "https://i.pravatar.cc/40?img=11" },
    account: { id: "a4", name: "FinanceFirst Bank" },
    campaign: { id: "c4", name: "Financial Services Outreach" },
    predictiveScore: 78,
    aiInsights: ["Security concerns identified", "Compliance requirements discussed", "CISO involvement indicates serious evaluation", "Risk assessment in progress"],
    tags: ["security", "compliance", "finance", "ciso"],
    completed: false,
    createdDate: "2024-01-13",
    industry: "Financial Services",
    lastInteraction: "2024-01-17",
    buyingSignalsScore: 65,
    taskSource: "manual"
  },
  {
    id: "14",
    title: "Risk assessment presentation to Board",
    description: "Patricia needs comprehensive risk analysis for board approval. Include disaster recovery and business continuity plans.",
    type: "meeting",
    priority: "high",
    dueDate: "2025-09-13",
    contact: { id: "ct12", name: "Patricia Moore", company: "FinanceFirst Bank", avatar: "https://i.pravatar.cc/40?img=12" },
    account: { id: "a4", name: "FinanceFirst Bank" },
    campaign: { id: "c4", name: "Financial Services Outreach" },
    predictiveScore: 72,
    aiInsights: ["Board presentation scheduled", "Risk analysis required", "Disaster recovery critical", "Regulatory approval needed"],
    tags: ["risk-assessment", "board", "disaster-recovery", "regulatory"],
    completed: false,
    createdDate: "2024-01-22",
    industry: "Financial Services",
    lastInteraction: "2024-01-25",
    buyingSignalsScore: 69,
    taskSource: "manual"
  },
  {
    id: "15",
    title: "Cost justification for VP Finance",
    description: "Steven requires detailed TCO analysis comparing current system costs vs our solution over 3-year period.",
    type: "email",
    priority: "medium",
    dueDate: "2025-09-18",
    contact: { id: "ct13", name: "Steven Clark", company: "FinanceFirst Bank", avatar: "https://i.pravatar.cc/40?img=13" },
    account: { id: "a4", name: "FinanceFirst Bank" },
    campaign: { id: "c4", name: "Financial Services Outreach" },
    predictiveScore: 66,
    aiInsights: ["TCO analysis requested", "3-year comparison needed", "Cost optimization focus", "Budget planning in progress"],
    tags: ["tco", "cost-analysis", "budget", "finance"],
    completed: false,
    createdDate: "2024-01-24",
    industry: "Financial Services",
    lastInteraction: "2024-01-27",
    buyingSignalsScore: 58,
    taskSource: "ai-generated"
  },
  {
    id: "16",
    title: "Regulatory compliance discussion",
    description: "Michael needs assurance on SOX compliance and audit trail capabilities. Schedule demo of compliance features.",
    type: "call",
    priority: "medium",
    dueDate: "2025-09-20",
    contact: { id: "ct14", name: "Michael Brown", company: "FinanceFirst Bank", avatar: "https://i.pravatar.cc/40?img=14" },
    account: { id: "a4", name: "FinanceFirst Bank" },
    campaign: { id: "c4", name: "Financial Services Outreach" },
    predictiveScore: 71,
    aiInsights: ["SOX compliance critical", "Audit trail required", "Regulatory demo requested", "Compliance team engaged"],
    tags: ["sox", "compliance", "audit-trail", "regulatory"],
    completed: false,
    createdDate: "2024-01-26",
    industry: "Financial Services",
    lastInteraction: "2024-01-29",
    buyingSignalsScore: 63,
    taskSource: "manual"
  },

  // ========== Manufacturing Corp (Nurture Account - 3 tasks, 2 contacts) ==========
  {
    id: "17",
    title: "ROI case study presentation",
    description: "Share similar customer success story from manufacturing industry to build confidence with James.",
    type: "email",
    priority: "medium",
    dueDate: "2025-09-14",
    contact: { id: "ct15", name: "James Wilson", company: "Manufacturing Corp", avatar: "https://i.pravatar.cc/40?img=15" },
    account: { id: "a5", name: "Manufacturing Corp" },
    campaign: { id: "c5", name: "Manufacturing Vertical" },
    predictiveScore: 65,
    aiInsights: ["ROI concerns raised", "Industry examples requested", "Budget discussions ongoing", "Multiple stakeholders involved"],
    tags: ["nurture", "roi", "manufacturing", "case-study"],
    completed: false,
    createdDate: "2024-01-11",
    industry: "Manufacturing",
    lastInteraction: "2024-01-18",
    buyingSignalsScore: 58,
    taskSource: "ai-generated"
  },
  {
    id: "18",
    title: "Process optimization workshop",
    description: "Carol wants to understand how our solution can streamline their production planning process. Schedule demo.",
    type: "meeting",
    priority: "medium",
    dueDate: "2025-09-22",
    contact: { id: "ct16", name: "Carol Davis", company: "Manufacturing Corp", avatar: "https://i.pravatar.cc/40?img=16" },
    account: { id: "a5", name: "Manufacturing Corp" },
    campaign: { id: "c5", name: "Manufacturing Vertical" },
    predictiveScore: 59,
    aiInsights: ["Process optimization interest", "Production planning focus", "Efficiency gains desired", "Workshop requested"],
    tags: ["process-optimization", "production", "efficiency", "workshop"],
    completed: false,
    createdDate: "2024-01-23",
    industry: "Manufacturing",
    lastInteraction: "2024-01-28",
    buyingSignalsScore: 52,
    taskSource: "manual"
  },
  {
    id: "19",
    title: "Budget timeline discussion",
    description: "Follow up with James on Q2 budget planning. Manufacturing Corp reviewing technology investments for next quarter.",
    type: "call",
    priority: "low",
    dueDate: "2025-09-25",
    contact: { id: "ct15", name: "James Wilson", company: "Manufacturing Corp", avatar: "https://i.pravatar.cc/40?img=15" },
    account: { id: "a5", name: "Manufacturing Corp" },
    campaign: { id: "c5", name: "Manufacturing Vertical" },
    predictiveScore: 61,
    aiInsights: ["Q2 budget planning", "Technology investment review", "Timeline discussions", "Decision makers identified"],
    tags: ["budget", "timeline", "q2-planning", "investment"],
    completed: false,
    createdDate: "2024-01-28",
    industry: "Manufacturing",
    lastInteraction: "2024-02-01",
    buyingSignalsScore: 54,
    taskSource: "automation"
  },

  // ========== RetailPlus Stores (Cold Account - 2 tasks, 2 contacts) ==========
  {
    id: "20",
    title: "Cold outreach to expansion opportunity",
    description: "New location opening in Q2. Perfect timing to introduce our retail analytics solution to Lisa.",
    type: "call",
    priority: "medium",
    dueDate: "2025-09-08",
    contact: { id: "ct17", name: "Lisa Thompson", company: "RetailPlus Stores", avatar: "https://i.pravatar.cc/40?img=17" },
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
    id: "21",
    title: "Technology modernization discussion",
    description: "Kevin mentioned they're upgrading POS systems. Our analytics platform could integrate with new infrastructure.",
    type: "email",
    priority: "low",
    dueDate: "2025-09-30",
    contact: { id: "ct18", name: "Kevin Martinez", company: "RetailPlus Stores", avatar: "https://i.pravatar.cc/40?img=18" },
    account: { id: "a6", name: "RetailPlus Stores" },
    campaign: { id: "c6", name: "Retail Expansion Campaign" },
    predictiveScore: 38,
    aiInsights: ["POS system upgrade planned", "Integration opportunities", "Technology budget allocated", "Vendor evaluation starting"],
    tags: ["pos-systems", "integration", "modernization", "opportunity"],
    completed: false,
    createdDate: "2024-02-01",
    industry: "Retail",
    lastInteraction: "2024-02-05",
    buyingSignalsScore: 29,
    taskSource: "manual"
  },

  // ========== Additional Overdue/Urgent Tasks ==========
  {
    id: "22",
    title: "OVERDUE: Contract renewal with EduTech",
    description: "Maria hasn't responded to renewal offer. Contract expires next week. Need immediate escalation to avoid service interruption.",
    type: "call",
    priority: "high",
    dueDate: "2025-09-08",
    contact: { id: "ct19", name: "Maria Garcia", company: "EduTech Institute", avatar: "https://i.pravatar.cc/40?img=19" },
    account: { id: "a7", name: "EduTech Institute" },
    campaign: { id: "c7", name: "Customer Success" },
    predictiveScore: 25,
    aiInsights: ["Contract expiring soon", "No response to renewal", "Risk of churn", "Escalation required"],
    tags: ["overdue", "renewal", "churn-risk", "escalation"],
    completed: false,
    createdDate: "2023-12-20",
    industry: "Education",
    lastInteraction: "2024-01-05",
    buyingSignalsScore: 15,
    taskSource: "automation"
  },
  {
    id: "23",
    title: "Competitive response for LogisticsPro",
    description: "David needs competitive analysis against two other vendors. RFP response due tomorrow!",
    type: "email",
    priority: "high",
    dueDate: "2025-09-08",
    contact: { id: "ct20", name: "David Chen", company: "LogisticsPro Inc", avatar: "https://i.pravatar.cc/40?img=20" },
    account: { id: "a8", name: "LogisticsPro Inc" },
    campaign: { id: "c8", name: "Competitive Displacement" },
    predictiveScore: 83,
    aiInsights: ["RFP due tomorrow", "Competitive evaluation", "Decision makers engaged", "High win probability"],
    tags: ["competitive", "rfp", "urgent", "logistics"],
    completed: false,
    createdDate: "2024-01-16",
    industry: "Logistics",
    lastInteraction: "2024-01-16",
    buyingSignalsScore: 89,
    taskSource: "manual"
  },
  {
    id: "24",
    title: "AI-generated follow-up: FinTech startup opportunity",
    description: "Sarah Kim from FinTech Innovations showed interest in our API. High growth startup with Series A funding.",
    type: "follow-up",
    priority: "medium",
    dueDate: "2025-09-15",
    contact: { id: "ct21", name: "Sarah Kim", company: "FinTech Innovations", avatar: "https://i.pravatar.cc/40?img=21" },
    account: { id: "a9", name: "FinTech Innovations" },
    campaign: { id: "c9", name: "Startup Outreach" },
    predictiveScore: 71,
    aiInsights: ["Series A funded", "API integration interest", "High growth potential", "Technical decision maker"],
    tags: ["ai-generated", "startup", "api", "fintech"],
    completed: false,
    createdDate: "2024-01-20",
    industry: "Financial Technology",
    lastInteraction: "2024-01-23",
    buyingSignalsScore: 67,
    taskSource: "ai-generated"
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