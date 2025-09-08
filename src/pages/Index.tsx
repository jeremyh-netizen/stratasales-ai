import { Navigation } from "@/components/layout/navigation";
import { OverviewStats } from "@/components/dashboard/overview-stats";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { TopLeads } from "@/components/dashboard/top-leads";
import { AIInsights } from "@/components/dashboard/ai-insights";
import { MeetingInsightsModal } from "@/components/dashboard/meeting-insights-modal";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <Navigation className="w-64 flex-shrink-0" />
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground bg-gradient-hero bg-clip-text text-transparent">
                Sales Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                AI-powered insights for your sales pipeline
              </p>
            </div>
            <div className="flex items-center gap-4">
              <MeetingInsightsModal>
                <Button variant="outline" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Meeting Insights
                </Button>
              </MeetingInsightsModal>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="mb-8">
          <OverviewStats />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            <RecentActivities />
            <AIInsights />
          </div>
          
          {/* Right Column */}
          <div>
            <TopLeads />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
