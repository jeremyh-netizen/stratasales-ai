import { Navigation } from "@/components/layout/navigation";
import { TasksHeader } from "@/components/tasks/tasks-header";
import { TasksFilters } from "@/components/tasks/tasks-filters";
import { TasksList } from "@/components/tasks/tasks-list";
import { CallTranscripts } from "@/components/tasks/call-transcripts";
import { CampaignManager } from "@/components/tasks/campaign-manager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Tasks() {
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
                <TabsTrigger value="calls">Call Automation</TabsTrigger>
                <TabsTrigger value="outreach">Outreach</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all-tasks" className="space-y-6">
                <TasksFilters />
                <TasksList />
              </TabsContent>
              
              <TabsContent value="calls" className="space-y-6">
                <CallTranscripts />
              </TabsContent>
              
              <TabsContent value="outreach" className="space-y-6">
                <TasksList filterType="outreach" />
              </TabsContent>
              
              <TabsContent value="campaigns" className="space-y-6">
                <CampaignManager />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}