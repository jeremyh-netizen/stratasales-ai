import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScoreBadge } from "@/components/ui/score-badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Clock, 
  Phone, 
  Mail, 
  MessageSquare, 
  Target, 
  Brain,
  CheckCircle2,
  ChevronDown,
  Building2,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockTasks, type Task } from "./tasks-list";

interface AccountGroup {
  account: {
    id: string;
    name: string;
  };
  tasks: Task[];
  totalScore: number;
  highPriorityCount: number;
}

export function TasksByAccount() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [openAccounts, setOpenAccounts] = useState<Set<string>>(new Set(["a1", "a2"]));

  // Group tasks by account and sort by total AI score
  const accountGroups: AccountGroup[] = mockTasks
    .reduce((groups: AccountGroup[], task) => {
      const existingGroup = groups.find(g => g.account.id === task.account.id);
      if (existingGroup) {
        existingGroup.tasks.push(task);
        existingGroup.totalScore += task.predictiveScore;
        if (task.priority === "high") existingGroup.highPriorityCount++;
      } else {
        groups.push({
          account: task.account,
          tasks: [task],
          totalScore: task.predictiveScore,
          highPriorityCount: task.priority === "high" ? 1 : 0
        });
      }
      return groups;
    }, [])
    .sort((a, b) => b.totalScore - a.totalScore)
    .map(group => ({
      ...group,
      tasks: group.tasks.sort((a, b) => b.predictiveScore - a.predictiveScore)
    }));

  const toggleTaskComplete = (taskId: string) => {
    const newCompletedTasks = new Set(completedTasks);
    if (completedTasks.has(taskId)) {
      newCompletedTasks.delete(taskId);
    } else {
      newCompletedTasks.add(taskId);
    }
    setCompletedTasks(newCompletedTasks);
  };

  const toggleAccount = (accountId: string) => {
    const newOpenAccounts = new Set(openAccounts);
    if (openAccounts.has(accountId)) {
      newOpenAccounts.delete(accountId);
    } else {
      newOpenAccounts.add(accountId);
    }
    setOpenAccounts(newOpenAccounts);
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
    <div className="space-y-6">
      {accountGroups.map((group) => (
        <Card key={group.account.id} className="overflow-hidden">
          <Collapsible 
            open={openAccounts.has(group.account.id)}
            onOpenChange={() => toggleAccount(group.account.id)}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Building2 className="w-6 h-6 text-primary" />
                    <div>
                      <CardTitle className="text-xl">{group.account.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {group.tasks.length} tasks • {group.highPriorityCount} high priority
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Total AI Score</div>
                      <ScoreBadge score={Math.round(group.totalScore / group.tasks.length)} size="lg" />
                    </div>
                    <ChevronDown className={cn(
                      "w-5 h-5 transition-transform",
                      openAccounts.has(group.account.id) && "rotate-180"
                    )} />
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {group.tasks.map((task) => {
                    const TypeIcon = getTypeIcon(task.type);
                    const isCompleted = completedTasks.has(task.id);
                    
                    return (
                      <Card key={task.id} className={cn(
                        "transition-all duration-200 hover:shadow-medium",
                        isCompleted && "opacity-60 bg-muted/50"
                      )}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleTaskComplete(task.id)}
                                className="mt-1 p-1 h-6 w-6"
                              >
                                <CheckCircle2 className={cn(
                                  "w-4 h-4",
                                  isCompleted ? "text-success" : "text-muted-foreground"
                                )} />
                              </Button>
                              
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <TypeIcon className="w-3 h-3 text-muted-foreground" />
                                  <h4 className={cn(
                                    "font-medium text-sm",
                                    isCompleted && "line-through text-muted-foreground"
                                  )}>
                                    {task.title}
                                  </h4>
                                  <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                                    {task.priority}
                                  </Badge>
                                </div>
                                
                                <p className="text-xs text-muted-foreground">
                                  {task.description}
                                </p>
                                
                                <div className="flex items-center space-x-2">
                                  <Avatar className="w-5 h-5">
                                    <AvatarImage src={task.contact.avatar} />
                                    <AvatarFallback className="text-xs">{task.contact.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs font-medium">{task.contact.name}</span>
                                  {task.campaign && (
                                    <Badge variant="outline" className="text-xs">
                                      {task.campaign.name}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end space-y-2">
                              <ScoreBadge score={task.predictiveScore} size="sm" />
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                  <Brain className="w-3 h-3" />
                                </Button>
                                <Button size="sm" className="h-6 px-2 text-xs">
                                  <ExternalLink className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
}