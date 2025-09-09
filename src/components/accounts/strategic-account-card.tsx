import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  onStatusChange?: (accountId: string, status: StrategicAccount['status']) => void;
}

export function StrategicAccountCard({ account, onViewDetails, onStatusChange }: StrategicAccountCardProps) {
  const getGrowthStageVariant = (stage: string) => {
    switch (stage) {
      case "startup": return "bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 border-blue-200/50";
      case "growth": return "bg-gradient-to-r from-success/10 to-success/15 text-success border-success/30";
      case "scale": return "bg-gradient-to-r from-primary/10 to-primary/15 text-primary border-primary/30";
      case "enterprise": return "bg-gradient-to-r from-muted/50 to-muted/30 text-muted-foreground border-muted";
      default: return "bg-gradient-to-r from-muted/50 to-muted/30 text-muted-foreground border-muted";
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active": 
        return {
          className: "bg-gradient-active text-white border-0 shadow-active/20",
          gradient: "from-success to-success/80"
        };
      case "Opportunity": 
        return {
          className: "bg-gradient-opportunity text-white border-0 shadow-opportunity/20",
          gradient: "from-blue-500 to-blue-600"
        };
      case "Lead": 
        return {
          className: "bg-gradient-lead text-white border-0 shadow-lead/20",
          gradient: "from-warning to-warning/80"
        };
      default: 
        return {
          className: "bg-muted text-muted-foreground border-muted",
          gradient: "from-muted to-muted/80"
        };
    }
  };

  const getHealthScoreStyles = (score: number) => {
    if (score >= 90) return {
      textColor: "text-success",
      ringColor: "ring-success/30",
      bgGradient: "bg-gradient-health-excellent",
      shadow: "shadow-glow"
    };
    if (score >= 80) return {
      textColor: "text-success",
      ringColor: "ring-success/20",
      bgGradient: "bg-gradient-to-br from-success/10 to-success/5",
      shadow: ""
    };
    if (score >= 60) return {
      textColor: "text-warning",
      ringColor: "ring-warning/30",
      bgGradient: "bg-gradient-to-br from-warning/10 to-warning/5",
      shadow: "shadow-glow"
    };
    return {
      textColor: "text-destructive",
      ringColor: "ring-destructive/30",
      bgGradient: "bg-gradient-to-br from-destructive/10 to-destructive/5",
      shadow: "shadow-glow"
    };
  };

  const isHighValueAccount = account.revenue.includes('M') && parseFloat(account.revenue.replace(/[^0-9.]/g, '')) >= 1;
  const hasRecentActivity = account.lastActivity.includes('day') || account.lastActivity.includes('hour');
  const statusStyles = getStatusStyles(account.status);
  const healthStyles = getHealthScoreStyles(account.healthScore);

  return (
    <Card className={`
      group cursor-pointer transition-all duration-300 ease-out contain-layout will-change-transform
      hover:scale-[1.01] hover:-translate-y-1
      ${isHighValueAccount ? 'shadow-card-premium hover:shadow-elegant' : 'shadow-card hover:shadow-card-hover'}
      ${hasRecentActivity ? 'ring-1 ring-primary/30 shadow-glow' : ''}
      ${account.status === 'Active' ? 'hover:shadow-active/20' : ''}
      ${account.status === 'Opportunity' ? 'hover:shadow-opportunity/20' : ''}
      ${account.status === 'Lead' ? 'hover:shadow-lead/20' : ''}
    `}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${account.name}`} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {account.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {isHighValueAccount && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-premium rounded-full border-2 border-background shadow-glow" />
              )}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <h3 
                  className="font-semibold text-lg text-foreground cursor-pointer hover:text-primary transition-colors group-hover:text-primary"
                  onClick={() => onViewDetails(account.id)}
                >
                  {account.name}
                </h3>
                <Select value={account.status} onValueChange={(value) => onStatusChange?.(account.id, value as StrategicAccount['status'])}>
                  <SelectTrigger className={`
                    w-fit border-0 p-2 h-7 text-xs font-medium rounded-full transition-all duration-200
                    ${statusStyles.className}
                    hover:scale-105 hover:shadow-md
                  `}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="min-w-fit bg-background/95 backdrop-blur-sm border-border/50">
                    <SelectItem value="Lead" className="text-xs hover:bg-gradient-lead/10">Lead</SelectItem>
                    <SelectItem value="Opportunity" className="text-xs hover:bg-gradient-opportunity/10">Opportunity</SelectItem>
                    <SelectItem value="Active" className="text-xs hover:bg-gradient-active/10">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground font-medium">{account.industry}</p>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span>{account.strategicProfile.employees} employees</span>
                </div>
                <Badge variant="outline" className={`${getGrowthStageVariant(account.strategicProfile.growthStage)} text-xs px-2 py-0.5`}>
                  {account.strategicProfile.growthStage}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`
              relative inline-flex items-center justify-center w-16 h-16 rounded-full 
              ${healthStyles.bgGradient} ${healthStyles.ringColor} ring-1 ${healthStyles.shadow}
              transition-all duration-300 ease-out contain-layout
            `}>
              <div className={`text-2xl font-bold ${healthStyles.textColor}`}>
                {account.healthScore}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">Health Score</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Strategic Mission */}
        <div className="bg-gradient-subtle p-4 rounded-xl border border-border/50">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Strategic Mission</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {account.strategicProfile.mission}
          </p>
        </div>

        {/* Recent Funding (if available) */}
        {account.strategicProfile.recentFunding && (
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-success/10 via-success/5 to-transparent border border-success/20 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-success rounded-full flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-success">
                  {account.strategicProfile.recentFunding.amount} {account.strategicProfile.recentFunding.round}
                </p>
                <p className="text-xs text-success/70">
                  {account.strategicProfile.recentFunding.date} • {account.strategicProfile.recentFunding.leadInvestor}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/30 font-medium">
              Total: {account.strategicProfile.recentFunding.totalFunding}
            </Badge>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl border border-border/30 group-hover:from-primary/5 transition-colors">
            <div className="text-lg font-bold text-foreground">{account.revenue}</div>
            <div className="text-xs text-muted-foreground font-medium">Revenue</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
            <div className="text-lg font-bold text-primary">{account.stakeholders.length}</div>
            <div className="text-xs text-primary/70 font-medium">Stakeholders</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-warning/10 to-warning/5 rounded-xl border border-warning/20">
            <div className="text-lg font-bold text-warning flex items-center justify-center space-x-1">
              <span>{account.businessIntelligence.buyingSignals.length}</span>
              {account.businessIntelligence.buyingSignals.length > 3 && (
                <div className="w-2 h-2 bg-warning rounded-full shadow-glow" />
              )}
            </div>
            <div className="text-xs text-warning/70 font-medium">Buy Signals</div>
          </div>
        </div>

        {/* Key Pressures Preview */}
        <div className="bg-gradient-to-r from-orange-500/5 to-transparent p-4 rounded-xl border border-orange-200/30">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md flex items-center justify-center">
              <Brain className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground">Key Pressures</span>
          </div>
          <div className="space-y-2">
            {account.strategicProfile.keyPressures.slice(0, 2).map((pressure, index) => (
              <div key={index} className="text-xs text-muted-foreground flex items-start space-x-2">
                <div className="w-1 h-1 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{pressure}</span>
              </div>
            ))}
            {account.strategicProfile.keyPressures.length > 2 && (
              <div className="text-xs text-orange-600 font-medium">
                +{account.strategicProfile.keyPressures.length - 2} more insights...
              </div>
            )}
          </div>
        </div>

        {/* ROI Preview */}
        <div className="p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/30 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">Potential ROI</p>
              <p className="text-xs text-primary/70 mt-1">
                {account.outreachStrategy.roiModel.costSavings} cost reduction potential
              </p>
            </div>
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-primary hover:bg-gradient-primary/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
            onClick={() => onViewDetails(account.id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Strategic View
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Engage
          </Button>
        </div>

        {/* Last Activity */}
        <div className="flex items-center justify-between text-xs pt-3 border-t border-border/50">
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Last activity:</span>
            <span className={`font-medium ${hasRecentActivity ? 'text-success' : 'text-muted-foreground'}`}>
              {account.lastActivity}
            </span>
            {hasRecentActivity && (
              <div className="w-2 h-2 bg-success rounded-full shadow-glow" />
            )}
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer">
            <span className="font-medium">View Details</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}