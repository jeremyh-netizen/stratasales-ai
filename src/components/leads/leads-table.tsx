import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/ui/score-badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  Calendar,
  MoreHorizontal,
  Building2,
  TrendingUp,
  Eye,
  MessageSquare,
  Edit3
} from "lucide-react";
import { Lead } from "@/pages/Leads";

interface LeadsTableProps {
  filters: any;
  selectedLead: Lead | null;
  onSelectLead: (lead: Lead) => void;
}

// Mock data for leads
const mockLeads: Lead[] = [
  {
    id: "1",
    contact: "Sarah Johnson",
    title: "Chief Technology Officer", 
    company: "TechCorp Inc",
    industry: "technology",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    score: 92,
    status: "qualified",
    engagement: "high",
    source: "Website",
    createdAt: "2024-01-15",
    lastActivity: "Opened pricing email 2h ago",
    nextAction: "Schedule product demo",
    revenue: 125000,
    emails: { sent: 8, opened: 6, clicked: 3 },
    meetings: 2,
    downloads: 4,
    outreachAttempts: 5,
  },
  {
    id: "2",
    contact: "Mike Chen",
    title: "Data Director",
    company: "DataGOL Analytics Corp", // Modified to trigger competitor detection
    industry: "technology",
    email: "mike.chen@dataflow.com",
    phone: "+1 (555) 234-5678",
    score: 74,
    status: "contacted",
    engagement: "medium",
    source: "LinkedIn",
    createdAt: "2024-01-12",
    lastActivity: "Downloaded whitepaper 1d ago",
    nextAction: "Competitor analysis needed - considering DataGOL",
    revenue: 67000,
    emails: { sent: 5, opened: 3, clicked: 1 },
    meetings: 1,
    downloads: 2,
    outreachAttempts: 3,
  },
  {
    id: "3",
    contact: "Emma Davis",
    title: "VP of Engineering",
    company: "CloudNet Solutions",
    industry: "technology",
    email: "emma.davis@cloudnet.com",
    phone: "+1 (555) 345-6789",
    score: 87,
    status: "nurturing",
    engagement: "high",
    source: "Referral",
    createdAt: "2024-01-10",
    lastActivity: "Attended webinar 3h ago",
    nextAction: "Follow-up call scheduled",
    revenue: 89000,
    emails: { sent: 12, opened: 9, clicked: 4 },
    meetings: 3,
    downloads: 6,
    outreachAttempts: 8,
  },
  {
    id: "4",
    contact: "Robert Taylor",
    title: "Head of AI Research",
    company: "InnovateLab",
    industry: "technology",
    email: "robert.taylor@innovatelab.com",
    phone: "+1 (555) 456-7890",
    score: 68,
    status: "new",
    engagement: "low",
    source: "Conference",
    createdAt: "2024-01-08",
    lastActivity: "Website visit 2d ago",
    nextAction: "Initial outreach email",
    revenue: 45000,
    emails: { sent: 2, opened: 1, clicked: 0 },
    meetings: 0,
    downloads: 1,
    outreachAttempts: 2,
  },
  {
    id: "5",
    contact: "Lisa Rodriguez",
    title: "IT Manager",
    company: "HealthTech Solutions",
    industry: "healthcare",
    email: "lisa.rodriguez@healthtech.com",
    phone: "+1 (555) 567-8901",
    score: 81,
    status: "qualified",
    engagement: "medium",
    source: "Google Ads",
    createdAt: "2024-01-05",
    lastActivity: "Requested pricing 5h ago",
    nextAction: "Send custom proposal",
    revenue: 78000,
    emails: { sent: 7, opened: 5, clicked: 2 },
    meetings: 1,
    downloads: 3,
    outreachAttempts: 4,
  },
];

export function LeadsTable({ filters, selectedLead, onSelectLead }: LeadsTableProps) {
  const [sortBy, setSortBy] = useState<keyof Lead>("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [editNextAction, setEditNextAction] = useState("");

  const handleEditNextAction = (lead: Lead) => {
    setEditingLead(lead);
    setEditNextAction(lead.nextAction);
  };

  const handleSaveNextAction = () => {
    if (editingLead) {
      // In a real app, this would update the lead via API
      const updatedLead = { ...editingLead, nextAction: editNextAction };
      console.log("Saving next action:", updatedLead);
    }
    setEditingLead(null);
    setEditNextAction("");
  };

  const handleCancelEdit = () => {
    setEditingLead(null);
    setEditNextAction("");
  };

  // Filter and sort leads
  const filteredLeads = mockLeads.filter(lead => {
    if (filters.search && !lead.contact.toLowerCase().includes(filters.search.toLowerCase()) &&
        !lead.company.toLowerCase().includes(filters.search.toLowerCase()) &&
        !lead.email.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status && lead.status !== filters.status) return false;
    if (filters.engagement && lead.engagement !== filters.engagement) return false;
    if (filters.industry && lead.industry !== filters.industry) return false;
    if (lead.score < filters.scoreRange[0] || lead.score > filters.scoreRange[1]) return false;
    return true;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (sortOrder === "asc") {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-yellow-100 text-yellow-800";
      case "qualified":
        return "bg-green-100 text-green-800";
      case "nurturing":
        return "bg-purple-100 text-purple-800";
      case "converted":
        return "bg-emerald-100 text-emerald-800";
      case "lost":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEngagementColor = (engagement: Lead["engagement"]) => {
    switch (engagement) {
      case "high":
        return "bg-success/10 text-success";
      case "medium":
        return "bg-warning/10 text-warning";
      case "low":
        return "bg-destructive/10 text-destructive";
    }
  };

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-[300px]">Contact & Company</TableHead>
            <TableHead className="text-center">Score</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Engagement</TableHead>
            <TableHead className="text-center">Activity</TableHead>
            <TableHead className="text-center">Revenue</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedLeads.map((lead) => (
            <TableRow 
              key={lead.id}
              className={`cursor-pointer hover:bg-muted/20 transition-colors ${
                selectedLead?.id === lead.id ? "bg-primary/5 border-l-2 border-l-primary" : ""
              }`}
              onClick={() => onSelectLead(lead)}
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-medium text-sm">
                    {lead.contact.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{lead.contact}</div>
                    <div className="text-sm text-muted-foreground">{lead.title}</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Building2 className="w-3 h-3 mr-1" />
                      {lead.company}
                    </div>
                  </div>
                </div>
              </TableCell>
              
              <TableCell className="text-center">
                <div className="flex flex-col items-center space-y-1">
                  <ScoreBadge score={lead.score} size="sm" />
                  {lead.score > 80 && (
                    <TrendingUp className="w-3 h-3 text-success" />
                  )}
                </div>
              </TableCell>
              
              <TableCell className="text-center">
                <Badge className={getStatusColor(lead.status)}>
                  {lead.status}
                </Badge>
              </TableCell>
              
              <TableCell className="text-center">
                <Badge variant="outline" className={getEngagementColor(lead.engagement)}>
                  {lead.engagement}
                </Badge>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Emails:</span>
                    <span>{lead.emails.sent}/{lead.emails.opened}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Meetings:</span>
                    <span>{lead.meetings}</span>
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">
                    {lead.lastActivity}
                  </div>
                </div>
              </TableCell>
              
              <TableCell className="text-center">
                <div className="font-medium text-foreground">
                  ${lead.revenue.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">potential</div>
              </TableCell>
              
              <TableCell>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center justify-center space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Calendar className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="group relative text-xs text-accent text-left max-w-[120px]">
                    <div className="pr-6">
                      {lead.nextAction}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditNextAction(lead);
                      }}
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {sortedLeads.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          <Eye className="w-8 h-8 mx-auto mb-2" />
          <p>No leads match your current filters</p>
        </div>
      )}

      {/* Edit Next Action Modal */}
      <Dialog open={!!editingLead} onOpenChange={() => handleCancelEdit()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Next Action</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nextAction">Next Action</Label>
              <Textarea
                id="nextAction"
                value={editNextAction}
                onChange={(e) => setEditNextAction(e.target.value)}
                placeholder="Enter the next action for this lead..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveNextAction}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}