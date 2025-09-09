import { useState } from "react";
import { Navigation } from "@/components/layout/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StrategicAccountCard } from "@/components/accounts/strategic-account-card";
import { StrategicAccountDetails } from "@/components/accounts/strategic-account-details";
import { mockStrategicAccounts } from "@/lib/strategic-intelligence";
import type { StrategicAccount } from "@/lib/strategic-intelligence";
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Phone,
  Mail,
  DollarSign,
  TrendingUp,
  Brain,
  Eye,
  Grid,
  List
} from "lucide-react";

// Legacy Account interface - keeping for backward compatibility
interface Account {
  id: string;
  name: string;
  industry: string;
  size: string;
  primaryContact: string;
  email: string;
  phone: string;
  revenue: string;
  healthScore: number;
  lastActivity: string;
  status: "Active" | "Prospect" | "Inactive";
}

const mockAccounts: Account[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    industry: "Technology",
    size: "500-1000",
    primaryContact: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    revenue: "$2.5M",
    healthScore: 85,
    lastActivity: "2 days ago",
    status: "Active"
  },
  {
    id: "2",
    name: "Global Manufacturing Inc",
    industry: "Manufacturing",
    size: "1000+",
    primaryContact: "Mike Chen",
    email: "m.chen@globalmanufacturing.com",
    phone: "+1 (555) 987-6543",
    revenue: "$5.2M",
    healthScore: 92,
    lastActivity: "1 day ago",
    status: "Active"
  },
  {
    id: "3",
    name: "StartupXYZ",
    industry: "Fintech",
    size: "50-100",
    primaryContact: "Alex Rodriguez",
    email: "alex@startupxyz.com",
    phone: "+1 (555) 456-7890",
    revenue: "$750K",
    healthScore: 70,
    lastActivity: "1 week ago",
    status: "Prospect"
  }
];

const getHealthScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Active": return "default";
    case "Opportunity": return "secondary"; 
    case "Lead": return "outline";
    default: return "outline";
  }
};

export default function Accounts() {
  const [viewMode, setViewMode] = useState<"strategic" | "table">("strategic");
  const [selectedAccount, setSelectedAccount] = useState<StrategicAccount | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [accounts, setAccounts] = useState<StrategicAccount[]>(mockStrategicAccounts);

  const handleViewAccountDetails = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    if (account) {
      setSelectedAccount(account);
    }
  };

  const handleStatusChange = (accountId: string, newStatus: StrategicAccount['status']) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        account.id === accountId 
          ? { ...account, status: newStatus }
          : account
      )
    );
    
    // Update selected account if it's the one being changed
    if (selectedAccount?.id === accountId) {
      setSelectedAccount(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.primaryContact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedAccount) {
    return (
      <div className="flex h-screen bg-background">
        <Navigation />
        <main className="flex-1 overflow-hidden">
          <StrategicAccountDetails 
            account={selectedAccount} 
            onClose={() => setSelectedAccount(null)}
            onStatusChange={handleStatusChange}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Navigation />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Strategic Accounts</h1>
              <p className="text-muted-foreground">
                Strategic intelligence and relationship management
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                <Button
                  size="sm"
                  variant={viewMode === "strategic" ? "default" : "ghost"}
                  onClick={() => setViewMode("strategic")}
                  className="px-3"
                >
                  <Grid className="w-4 h-4 mr-1" />
                  Strategic
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === "table" ? "default" : "ghost"}
                  onClick={() => setViewMode("table")}
                  className="px-3"
                >
                  <List className="w-4 h-4 mr-1" />
                  Table
                </Button>
              </div>
              <Button className="space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Account</span>
              </Button>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prospects</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {accounts.filter(acc => acc.status === "Lead" || acc.status === "Opportunity").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Leads + Opportunities
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Engagements</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {accounts.filter(acc => acc.status === "Active").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  In active outreach
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8.2M</div>
                <p className="text-xs text-muted-foreground">
                  Potential revenue
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Health Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(accounts.reduce((acc, account) => acc + account.healthScore, 0) / accounts.length)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Account health
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Buy Signals</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {accounts.reduce((acc, account) => acc + account.businessIntelligence.buyingSignals.length, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Active signals
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search strategic accounts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Brain className="w-4 h-4 mr-2" />
              AI Insights
            </Button>
          </div>

          {/* Content Views */}
          {viewMode === "strategic" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAccounts.map((account) => (
                <StrategicAccountCard
                  key={account.id}
                  account={account}
                  onViewDetails={handleViewAccountDetails}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
                <CardDescription>
                  A comprehensive view of all your strategic accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Health Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAccounts.map((account) => (
                      <TableRow key={account.id} className="cursor-pointer hover:bg-muted/30" onClick={() => handleViewAccountDetails(account.id)}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${account.name}`} />
                              <AvatarFallback>
                                {account.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{account.name}</div>
                              <div className="text-sm text-muted-foreground">{account.strategicProfile.employees} employees</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{account.industry}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{account.primaryContact}</div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Mail className="w-3 h-3" />
                              <span>{account.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{account.revenue}</TableCell>
                        <TableCell>
                          <div className={`font-medium ${getHealthScoreColor(account.healthScore)}`}>
                            {account.healthScore}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(account.status) as any}>
                            {account.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{account.lastActivity}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}