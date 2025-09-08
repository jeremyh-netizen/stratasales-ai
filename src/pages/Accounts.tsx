import { Navigation } from "@/components/layout/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Phone,
  Mail,
  DollarSign,
  TrendingUp
} from "lucide-react";

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
    case "Prospect": return "secondary";
    case "Inactive": return "outline";
    default: return "outline";
  }
};

export default function Accounts() {
  return (
    <div className="flex h-screen bg-background">
      <Navigation />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Accounts</h1>
              <p className="text-muted-foreground">
                Manage your customer accounts and relationships
              </p>
            </div>
            <Button className="space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Account</span>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24.3M</div>
                <p className="text-xs text-muted-foreground">
                  +18% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Health Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82</div>
                <p className="text-xs text-muted-foreground">
                  +3 points from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search accounts..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Accounts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
              <CardDescription>
                A comprehensive view of all your customer accounts
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
                  {mockAccounts.map((account) => (
                    <TableRow key={account.id}>
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
                            <div className="text-sm text-muted-foreground">{account.size} employees</div>
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
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}