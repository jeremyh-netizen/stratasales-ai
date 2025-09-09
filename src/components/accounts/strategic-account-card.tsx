import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  DollarSign,
  Target,
  Brain,
  Eye,
  Calendar,
  ArrowRight
} from "lucide-react";
import type { StrategicAccount } from "@/lib/strategic-intelligence";

interface StrategicAccountCardProps {
  account: StrategicAccount;
  onViewDetails: (accountId: string) => void;
}

export function StrategicAccountCard({ account, onViewDetails }: StrategicAccountCardProps) {
  const getGrowthStageColor = (stage: string) => {
    switch (stage) {
      case "startup": return "bg-blue-100 text-blue-800 border-blue-200";
      case "growth": return "bg-green-100 text-green-800 border-green-200";
      case "scale": return "bg-purple-100 text-purple-800 border-purple-200";
      case "enterprise": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 border-green-200";
      case "Prospect": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Inactive": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${account.name}`} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                {account.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h3 
                  className="font-semibold text-lg text-foreground cursor-pointer hover:text-primary transition-colors"
                  onClick={() => onViewDetails(account.id)}
                >
                  {account.name}
                </h3>
                <Badge className={getStatusColor(account.status)}>
                  {account.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{account.industry}</p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{account.strategicProfile.employees} employees</span>
                </div>
                <Badge variant="outline" className={getGrowthStageColor(account.strategicProfile.growthStage)}>
                  {account.strategicProfile.growthStage}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-2xl font-bold ${getHealthScoreColor(account.healthScore)}`}>
              {account.healthScore}
            </div>
            <p className="text-xs text-muted-foreground">Health Score</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Strategic Mission */}
        <div className="bg-muted/30 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Mission</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {account.strategicProfile.mission}
          </p>
        </div>

        {/* Recent Funding (if available) */}
        {account.strategicProfile.recentFunding && (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  {account.strategicProfile.recentFunding.amount} {account.strategicProfile.recentFunding.round}
                </p>
                <p className="text-xs text-green-600">
                  {account.strategicProfile.recentFunding.date} • {account.strategicProfile.recentFunding.leadInvestor}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
              Total: {account.strategicProfile.recentFunding.totalFunding}
            </Badge>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 bg-muted/20 rounded-lg">
            <div className="text-lg font-bold text-foreground">{account.revenue}</div>
            <div className="text-xs text-muted-foreground">Revenue</div>
          </div>
          <div className="text-center p-2 bg-muted/20 rounded-lg">
            <div className="text-lg font-bold text-primary">{account.stakeholders.length}</div>
            <div className="text-xs text-muted-foreground">Stakeholders</div>
          </div>
          <div className="text-center p-2 bg-muted/20 rounded-lg">
            <div className="text-lg font-bold text-warning">{account.businessIntelligence.buyingSignals.length}</div>
            <div className="text-xs text-muted-foreground">Buy Signals</div>
          </div>
        </div>

        {/* Key Pressures Preview */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-foreground">Key Pressures</span>
          </div>
          <div className="space-y-1">
            {account.strategicProfile.keyPressures.slice(0, 2).map((pressure, index) => (
              <div key={index} className="text-xs text-muted-foreground">
                • {pressure}
              </div>
            ))}
            {account.strategicProfile.keyPressures.length > 2 && (
              <div className="text-xs text-primary">
                +{account.strategicProfile.keyPressures.length - 2} more...
              </div>
            )}
          </div>
        </div>

        {/* ROI Preview */}
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Potential ROI</p>
              <p className="text-xs text-muted-foreground">
                {account.outreachStrategy.roiModel.costSavings} cost reduction
              </p>
            </div>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(account.id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Strategic View
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Engage
          </Button>
        </div>

        {/* Last Activity */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          <span>Last activity: {account.lastActivity}</span>
          <div className="flex items-center space-x-1 group-hover:text-primary transition-colors">
            <span>View Details</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}