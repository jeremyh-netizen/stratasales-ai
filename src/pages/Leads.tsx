import { useState } from "react";
import { Navigation } from "@/components/layout/navigation";
import { LeadsHeader } from "@/components/leads/leads-header";
import { LeadsFilters } from "@/components/leads/leads-filters";
import { LeadsTable } from "@/components/leads/leads-table";
import { LeadDetails } from "@/components/leads/lead-details";

export interface Lead {
  id: string;
  contact: string;
  title: string;
  company: string;
  industry: string;
  email: string;
  phone: string;
  score: number;
  status: "new" | "contacted" | "qualified" | "nurturing" | "converted" | "lost";
  engagement: "high" | "medium" | "low";
  source: string;
  createdAt: string;
  lastActivity: string;
  nextAction: string;
  revenue: number;
  emails: {
    sent: number;
    opened: number;
    clicked: number;
  };
  meetings: number;
  downloads: number;
  outreachAttempts: number;
}

const Leads = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    engagement: "",
    industry: "",
    scoreRange: [0, 100] as [number, number],
  });

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <Navigation className="w-64 flex-shrink-0" />
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Leads List */}
        <div className={`transition-all duration-300 ${selectedLead ? 'w-1/2' : 'w-full'}`}>
          <div className="p-8">
            <LeadsHeader />
            <LeadsFilters filters={filters} onFiltersChange={setFilters} />
            <LeadsTable 
              filters={filters}
              selectedLead={selectedLead}
              onSelectLead={setSelectedLead}
            />
          </div>
        </div>

        {/* Lead Details Panel */}
        {selectedLead && (
          <div className="w-1/2 border-l border-border bg-card">
            <LeadDetails 
              lead={selectedLead} 
              onClose={() => setSelectedLead(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Leads;