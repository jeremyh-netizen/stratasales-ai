import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface CalendarSyncDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CalendarSyncDialog({ open, onOpenChange }: CalendarSyncDialogProps) {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  // Mock task data
  const availableTasks = [
    {
      id: '1',
      title: 'Follow up with Acme Corp - Enterprise License Discussion',
      priority: 'high',
      estimatedTime: '45 mins',
      suggestedTime: 'Tomorrow 2:00 PM',
      leadScore: 92
    },
    {
      id: '2', 
      title: 'Product Demo for TechStart Solutions',
      priority: 'medium',
      estimatedTime: '60 mins',
      suggestedTime: 'Friday 10:00 AM',
      leadScore: 87
    },
    {
      id: '3',
      title: 'Contract Review Call - Global Industries',
      priority: 'high',
      estimatedTime: '30 mins',
      suggestedTime: 'Today 4:30 PM',
      leadScore: 95
    }
  ];

  const handleTaskToggle = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSync = async () => {
    setSyncStatus('syncing');
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSyncStatus('success');
    setTimeout(() => {
      onOpenChange(false);
      setSyncStatus('idle');
      setSelectedTasks([]);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Add Tasks to Calendar
          </DialogTitle>
          <DialogDescription>
            Select tasks to automatically schedule based on AI recommendations and lead activity patterns.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {syncStatus === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Tasks Successfully Scheduled!
              </h3>
              <p className="text-muted-foreground">
                {selectedTasks.length} task(s) added to your calendar with optimal timing.
              </p>
            </div>
          ) : syncStatus === 'error' ? (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Sync Failed
              </h3>
              <p className="text-muted-foreground">
                Please check your calendar connection and try again.
              </p>
            </div>
          ) : (
            <>
              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Calendar Status</span>
                  <Badge variant="secondary" className="bg-success-light text-success">
                    Connected - Outlook
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  AI will optimize scheduling based on lead activity patterns and your availability
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Select Tasks to Schedule</h4>
                {availableTasks.map((task) => (
                  <Card 
                    key={task.id}
                    className={`cursor-pointer transition-all ${
                      selectedTasks.includes(task.id) 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleTaskToggle(task.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium text-foreground">
                          {task.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {task.priority}
                          </Badge>
                          <Badge className="text-xs">
                            Score: {task.leadScore}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.estimatedTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {task.suggestedTime}
                          </span>
                        </div>
                        {selectedTasks.includes(task.id) && (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>

        {syncStatus !== 'success' && syncStatus !== 'error' && (
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={syncStatus === 'syncing'}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSync}
              disabled={selectedTasks.length === 0 || syncStatus === 'syncing'}
              className="flex-1"
            >
              {syncStatus === 'syncing' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Scheduling Tasks...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  Schedule {selectedTasks.length} Task{selectedTasks.length !== 1 ? 's' : ''}
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}