import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, SortAsc, SortDesc, CheckSquare, Phone, Target, BarChart3 } from "lucide-react";
import type { FilterState } from "@/pages/Tasks";

interface TasksFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onClearAll: () => void;
}

export function TasksFilters({ filters, onFilterChange, onClearAll }: TasksFiltersProps) {
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.priority !== "all") count++;
    if (filters.type !== "all") count++;
    if (filters.dateRange !== "all") count++;
    if (filters.secondaryFilter !== "all-tasks") count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="space-y-4">
      {/* Main Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              className="pl-10"
              value={filters.searchTerm}
              onChange={(e) => onFilterChange("searchTerm", e.target.value)}
            />
          </div>
          
          <Select value={filters.type} onValueChange={(value) => onFilterChange("type", value)}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="calls">Calls</SelectItem>
              <SelectItem value="emails">Emails</SelectItem>
              <SelectItem value="follow-ups">Follow-ups</SelectItem>
              <SelectItem value="ai-generated">AI Generated</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.priority} onValueChange={(value) => onFilterChange("priority", value)}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.dateRange} onValueChange={(value) => onFilterChange("dateRange", value)}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Due Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="due-today">Due Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.sortBy} onValueChange={(value) => onFilterChange("sortBy", value)}>
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
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onFilterChange("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc")}
            className="gap-2"
          >
            {filters.sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            {filters.sortOrder === "asc" ? "Asc" : "Desc"}
          </Button>
        </div>
        
        <div className="flex gap-2 items-center">
          {activeFilterCount > 0 && (
            <Badge variant="outline" className="text-xs">
              {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear all
          </Button>
        </div>
      </div>

      {/* Secondary Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filters.secondaryFilter === "all-tasks" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("secondaryFilter", "all-tasks")}
          className="gap-2"
        >
          <CheckSquare className="w-4 h-4" />
          All Tasks
        </Button>
        
        
        <Button
          variant={filters.secondaryFilter === "outreach" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("secondaryFilter", "outreach")}
          className="gap-2"
        >
          <Target className="w-4 h-4" />
          Outreach
        </Button>
      </div>
    </div>
  );
}