import { useState } from "react";
import { Navigation } from "@/components/layout/navigation";
import { TasksHeader } from "@/components/tasks/tasks-header";
import { TasksFilters } from "@/components/tasks/tasks-filters";
import { TasksList } from "@/components/tasks/tasks-list";
import { TasksByAccount } from "@/components/tasks/tasks-by-account";
import { TasksByContact } from "@/components/tasks/tasks-by-contact";
import { TasksByCampaign } from "@/components/tasks/tasks-by-campaign";
import { CallTranscripts } from "@/components/tasks/call-transcripts";
import { CampaignManager } from "@/components/tasks/campaign-manager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface FilterState {
  searchTerm: string;
  priority: "all" | "high" | "medium" | "low";
  type: "all" | "calls" | "emails" | "follow-ups" | "ai-generated";
  sortBy: "predictive-score" | "due-date" | "priority" | "contact" | "created";
  sortOrder: "asc" | "desc";
  secondaryFilter: "all-tasks" | "call-automation" | "outreach" | "campaigns";
  dateRange: "all" | "overdue" | "due-today" | "this-week";
}

const defaultFilters: FilterState = {
  searchTerm: "",
  priority: "all",
  type: "all", 
  sortBy: "predictive-score",
  sortOrder: "desc",
  secondaryFilter: "all-tasks",
  dateRange: "all"
};

export default function Tasks() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters(defaultFilters);
  };

  const renderTabContent = (organizationType: string) => {
    const commonProps = { filters, updateFilter, clearAllFilters };

    return (
      <div className="space-y-6">
        <TasksFilters 
          filters={filters}
          onFilterChange={updateFilter}
          onClearAll={clearAllFilters}
        />
        
        {/* Secondary Filter Content */}
        {filters.secondaryFilter === "all-tasks" && (
          <>
            {organizationType === "all-tasks" && <TasksList {...commonProps} viewType="all" />}
            {organizationType === "by-account" && <TasksByAccount {...commonProps} />}
            {organizationType === "by-contact" && <TasksByContact {...commonProps} />}
            {organizationType === "by-campaign" && <TasksByCampaign {...commonProps} />}
          </>
        )}
        
        {filters.secondaryFilter === "call-automation" && (
          <CallTranscripts {...commonProps} organizationType={organizationType} />
        )}
        
        {filters.secondaryFilter === "outreach" && (
          <CampaignManager {...commonProps} organizationType={organizationType} />
        )}
        
        {filters.secondaryFilter === "campaigns" && (
          <CampaignManager {...commonProps} organizationType={organizationType} />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Navigation className="w-64" />
        <div className="flex-1 flex flex-col">
          <TasksHeader />
          
          <div className="flex-1 p-6">
            <Tabs defaultValue="all-tasks" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
                <TabsTrigger value="by-account">Tasks by Account</TabsTrigger>
                <TabsTrigger value="by-contact">Tasks by Contact</TabsTrigger>
                <TabsTrigger value="by-campaign">Tasks by Campaign</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all-tasks">
                {renderTabContent("all-tasks")}
              </TabsContent>
              
              <TabsContent value="by-account">
                {renderTabContent("by-account")}
              </TabsContent>
              
              <TabsContent value="by-contact">
                {renderTabContent("by-contact")}
              </TabsContent>
              
              <TabsContent value="by-campaign">
                {renderTabContent("by-campaign")}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}