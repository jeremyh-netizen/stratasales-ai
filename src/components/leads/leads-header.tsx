import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Import, 
  Download,
  Brain,
  Zap
} from "lucide-react";

export function LeadsHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground bg-gradient-hero bg-clip-text text-transparent">
            Lead Management
          </h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>1,247 total leads</span>
            <span>•</span>
            <span>324 qualified this month</span>
            <span>•</span>
            <Badge className="bg-success/10 text-success">
              <Brain className="w-3 h-3 mr-1" />
              AI scoring active
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="space-x-2">
            <Import className="w-4 h-4" />
            <span>Import</span>
          </Button>
          <Button className="bg-gradient-primary space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </Button>
          <Button variant="secondary" className="space-x-2">
            <Zap className="w-4 h-4" />
            <span>Auto Actions</span>
          </Button>
        </div>
      </div>
    </div>
  );
}