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
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { filterTasks, type Task } from "@/lib/task-filters";
import type { FilterState } from "@/pages/Tasks";

// Mock tasks with proper structure
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Follow up on enterprise pricing discussion",
    description: "Sarah Chen from TechCorp is ready to move forward with the enterprise plan.",
    type: "call",
    priority: "high",
    dueDate: "2024-01-16",
    contact: { id: "ct1", name: "Sarah Chen", company: "TechCorp Inc.", avatar: "https://i.pravatar.cc/40?img=1" },
    account: { id: "a1", name: "TechCorp Inc." },
    campaign: { id: "c1", name: "Q1 Enterprise Outreach" },
    predictiveScore: 87,
    aiInsights: ["Contact shows strong buying signals", "Decision maker confirmed"],
    tags: ["enterprise", "hot-lead"],
    completed: false,
    createdDate: "2024-01-10"
  },
  {
    id: "2", 
    title: "Demo follow-up with DataCorp development team",
    description: "Technical demo went well. Need to address integration questions.",
    type: "email",
    priority: "high", 
    dueDate: "2024-01-17",
    contact: { id: "ct2", name: "Mike Rodriguez", company: "DataCorp Solutions", avatar: "https://i.pravatar.cc/40?img=2" },
    account: { id: "a2", name: "DataCorp Solutions" },
    campaign: { id: "c2", name: "SaaS Demo Campaign" },
    predictiveScore: 92,
    aiInsights: ["Competitor mentioned 3 times", "Price sensitivity detected"],
    tags: ["competitive", "technical"],
    completed: false,
    createdDate: "2024-01-12"
  }
];

export { type Task } from "@/lib/task-filters";

interface TasksListProps {
  viewType?: string;
  filters?: FilterState;
}

export function TasksList({ filters }: TasksListProps) {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  
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
        
        return (
          <Card key={task.id} className={cn("hover:shadow-medium", isCompleted && "opacity-60")}>
            <div className="p-6 flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleTaskComplete(task.id)}
                  className="mt-1 p-1 h-8 w-8"
                >
                  <CheckCircle2 className={cn("w-5 h-5", isCompleted ? "text-success" : "text-muted-foreground")} />
                </Button>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <TypeIcon className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">{task.title}</h3>
                    <Badge variant="outline" className="text-xs">{task.priority}</Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={task.contact.avatar} />
                      <AvatarFallback>{task.contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{task.contact.name}</p>
                      <p className="text-xs text-muted-foreground">{task.account.name}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {task.dueDate}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}