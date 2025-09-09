import { Navigation } from "@/components/layout/navigation";
import { CampaignManager } from "@/components/tasks/campaign-manager";
import { BarChart3 } from "lucide-react";

export default function Campaigns() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Navigation className="w-64" />
        <div className="flex-1 flex flex-col">
          <header className="border-b border-border bg-card p-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your sales campaigns and outreach sequences
                </p>
              </div>
            </div>
          </header>
          
          <div className="flex-1 p-6">
            <CampaignManager />
          </div>
        </div>
      </div>
    </div>
  );
}