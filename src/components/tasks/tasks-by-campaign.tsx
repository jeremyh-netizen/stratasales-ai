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
  Megaphone,
  Building2,
  User,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockTasks, type Task } from "./tasks-list";
import type { FilterState } from "@/pages/Tasks";

interface CampaignGroup {
  campaign: {
    id: string;
    name: string;
  };
  tasks: Task[];
  totalScore: number;
  highPriorityCount: number;
  uniqueAccounts: number;
  uniqueContacts: number;
}

interface TasksByCampaignProps {
  filters?: FilterState;
  updateFilter?: (key: keyof FilterState, value: any) => void;
  clearAllFilters?: () => void;
}

export function TasksByCampaign({ filters }: TasksByCampaignProps) {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [openCampaigns, setOpenCampaigns] = useState<Set<string>>(new Set(["cam1", "cam2"]));

  // Group tasks by campaign and sort by total AI score
  const campaignTasks = mockTasks.filter(task => task.campaign);
  const noCampaignTasks = mockTasks.filter(task => !task.campaign);

  const campaignGroups: CampaignGroup[] = campaignTasks
    .reduce((groups: CampaignGroup[], task) => {
      if (!task.campaign) return groups;
      
      const existingGroup = groups.find(g => g.campaign.id === task.campaign?.id);
      if (existingGroup) {
        existingGroup.tasks.push(task);
        existingGroup.totalScore += task.predictiveScore;
        if (task.priority === "high") existingGroup.highPriorityCount++;
      } else {
        groups.push({
          campaign: task.campaign,
          tasks: [task],
          totalScore: task.predictiveScore,
          highPriorityCount: task.priority === "high" ? 1 : 0,
          uniqueAccounts: 0,
          uniqueContacts: 0
        });
      }
      return groups;
    }, [])
    .map(group => {
      const accountIds = new Set(group.tasks.map(t => t.account.id));
      const contactIds = new Set(group.tasks.map(t => t.contact.id));
      return {
        ...group,
        uniqueAccounts: accountIds.size,
        uniqueContacts: contactIds.size,
        tasks: group.tasks.sort((a, b) => b.predictiveScore - a.predictiveScore)
      };
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  const toggleTaskComplete = (taskId: string) => {
    const newCompletedTasks = new Set(completedTasks);
    if (completedTasks.has(taskId)) {
      newCompletedTasks.delete(taskId);
    } else {
      newCompletedTasks.add(taskId);
    }
    setCompletedTasks(newCompletedTasks);
  };

  const toggleCampaign = (campaignId: string) => {
    const newOpenCampaigns = new Set(openCampaigns);
    if (openCampaigns.has(campaignId)) {
      newOpenCampaigns.delete(campaignId);
    } else {
      newOpenCampaigns.add(campaignId);
    }
    setOpenCampaigns(newOpenCampaigns);
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
      {campaignGroups.map((group) => (
        <Card key={group.campaign.id} className="overflow-hidden">
          <Collapsible 
            open={openCampaigns.has(group.campaign.id)}
            onOpenChange={() => toggleCampaign(group.campaign.id)}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Megaphone className="w-6 h-6 text-primary" />
                    <div>
                      <CardTitle className="text-xl">{group.campaign.name}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{group.tasks.length} tasks</span>
                        <div className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {group.uniqueAccounts} accounts
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {group.uniqueContacts} contacts
                        </div>
                        <span>{group.highPriorityCount} high priority</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Avg AI Score</div>
                      <ScoreBadge score={Math.round(group.totalScore / group.tasks.length)} size="lg" />
                    </div>
                    <ChevronDown className={cn(
                      "w-5 h-5 transition-transform",
                      openCampaigns.has(group.campaign.id) && "rotate-180"
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
                                
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-5 h-5">
                                    <AvatarImage src={task.contact.avatar} />
                                    <AvatarFallback className="text-xs">{task.contact.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs font-medium">{task.contact.name}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {task.account.name}
                                  </Badge>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    {task.dueDate}
                                  </div>
                                </div>

                                {task.aiInsights && (
                                  <div className="bg-gradient-card rounded p-2 border border-primary/20">
                                    <div className="flex items-center gap-1 mb-1">
                                      <Brain className="w-3 h-3 text-primary" />
                                      <span className="text-xs font-medium text-primary">Campaign AI Insights</span>
                                    </div>
                                    <ul className="space-y-0.5">
                                      {task.aiInsights.slice(0, 1).map((insight, idx) => (
                                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                                          <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                                          {insight}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
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

      {/* Tasks without campaigns */}
      {noCampaignTasks.length > 0 && (
        <Card className="border-dashed">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Target className="w-6 h-6 text-muted-foreground" />
              <div>
                <CardTitle className="text-xl text-muted-foreground">No Campaign</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {noCampaignTasks.length} tasks not assigned to any campaign
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {noCampaignTasks
                .sort((a, b) => b.predictiveScore - a.predictiveScore)
                .map((task) => {
                  const TypeIcon = getTypeIcon(task.type);
                  const isCompleted = completedTasks.has(task.id);
                  
                  return (
                    <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTaskComplete(task.id)}
                        className="p-1 h-6 w-6"
                      >
                        <CheckCircle2 className={cn(
                          "w-4 h-4",
                          isCompleted ? "text-success" : "text-muted-foreground"
                        )} />
                      </Button>
                      <TypeIcon className="w-3 h-3 text-muted-foreground" />
                      <span className={cn(
                        "text-sm flex-1",
                        isCompleted && "line-through text-muted-foreground"
                      )}>
                        {task.title}
                      </span>
                      <ScoreBadge score={task.predictiveScore} size="sm" />
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}