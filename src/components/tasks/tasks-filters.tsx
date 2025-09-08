import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SortAsc } from "lucide-react";

export function TasksFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tasks..."
            className="pl-10"
          />
        </div>
        
        <Select>
          <SelectTrigger className="w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="high-priority">High Priority</SelectItem>
            <SelectItem value="due-today">Due Today</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="ai-generated">AI Generated</SelectItem>
            <SelectItem value="calls">Calls</SelectItem>
            <SelectItem value="emails">Emails</SelectItem>
            <SelectItem value="follow-ups">Follow-ups</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger className="w-40">
            <SortAsc className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="predictive-score">AI Score</SelectItem>
            <SelectItem value="due-date">Due Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="contact">Contact</SelectItem>
            <SelectItem value="created">Created</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-2 items-center">
        <Badge variant="outline" className="text-xs">
          12 active filters
        </Badge>
        <Button variant="ghost" size="sm">
          Clear all
        </Button>
      </div>
    </div>
  );
}