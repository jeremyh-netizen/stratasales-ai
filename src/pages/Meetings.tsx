import { useState } from "react";
import { Navigation } from "@/components/layout/navigation";
import { TasksFilters } from "@/components/tasks/tasks-filters";
import { CallTranscripts } from "@/components/tasks/call-transcripts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone } from "lucide-react";

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
  sortOrder: "asc",
  secondaryFilter: "call-automation", // Default to call-automation for meetings page
  dateRange: "all"
};

export default function Meetings() {
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
        <CallTranscripts {...commonProps} organizationType={organizationType} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Navigation className="w-64" />
        <div className="flex-1 flex flex-col">
          <header className="border-b border-border bg-card p-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Meeting and Calls</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your meeting transcripts and call records
                </p>
              </div>
            </div>
          </header>
          
          <div className="flex-1 p-6">
            <Tabs defaultValue="all-meetings" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all-meetings">All Meetings</TabsTrigger>
                <TabsTrigger value="by-account">Meetings by Account</TabsTrigger>
                <TabsTrigger value="by-contact">Meetings by Contact</TabsTrigger>
                <TabsTrigger value="by-campaign">Meetings by Campaign</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all-meetings">
                {renderTabContent("all-meetings")}
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