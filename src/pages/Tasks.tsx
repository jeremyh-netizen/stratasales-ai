import { Navigation } from "@/components/layout/navigation";
import { TasksHeader } from "@/components/tasks/tasks-header";
import { TasksFilters } from "@/components/tasks/tasks-filters";
import { TasksList } from "@/components/tasks/tasks-list";
import { TasksByAccount } from "@/components/tasks/tasks-by-account";
import { TasksByContact } from "@/components/tasks/tasks-by-contact";
import { TasksByCampaign } from "@/components/tasks/tasks-by-campaign";
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
                <TabsTrigger value="by-account">Tasks by Account</TabsTrigger>
                <TabsTrigger value="by-contact">Tasks by Contact</TabsTrigger>
                <TabsTrigger value="by-campaign">Tasks by Campaign</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all-tasks" className="space-y-6">
                <TasksFilters />
                <TasksList viewType="all" />
              </TabsContent>
              
              <TabsContent value="by-account" className="space-y-6">
                <TasksFilters />
                <TasksByAccount />
              </TabsContent>
              
              <TabsContent value="by-contact" className="space-y-6">
                <TasksFilters />
                <TasksByContact />
              </TabsContent>
              
              <TabsContent value="by-campaign" className="space-y-6">
                <TasksFilters />
                <TasksByCampaign />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}