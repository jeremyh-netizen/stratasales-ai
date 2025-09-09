import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WorkflowVisualization } from "@/components/tasks/workflow-visualization";
import { 
  Mail, 
  Linkedin, 
  Phone, 
  Brain,
  Target,
  Eye,
  Clock,
  Users,
  Filter,
  Settings2
} from "lucide-react";

interface TemplateSelectionDialogProps {
  template: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TemplateSelectionDialog({ template, open, onOpenChange }: TemplateSelectionDialogProps) {
  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            {template.name}
          </DialogTitle>
          <DialogDescription>
            {template.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">{template.emails}</div>
                    <div className="text-sm text-muted-foreground">Email steps</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">{template.linkedin}</div>
                    <div className="text-sm text-muted-foreground">LinkedIn steps</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {template.phone && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold">{template.phone}</div>
                      <div className="text-sm text-muted-foreground">Phone calls</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* AI Features */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {template.aiFeatures.map((feature: string, idx: number) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  <Brain className="w-3 h-3 mr-1" />
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Enrollment Criteria - Special for "Engage with Prospects who open email" */}
          {template.name === "Engage with Prospects who open email" && (
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Enrollment Criteria
              </h3>
              <Card className="bg-accent/50">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Email opened within last 7 days</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Contact has not replied to previous sequence</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Minimum engagement score: 3/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Workflow Visualization */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-primary" />
              Campaign Workflow
            </h3>
            <WorkflowVisualization template={template} />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1 gap-2">
              <Target className="w-4 h-4" />
              Create from Template
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              View all templates
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}