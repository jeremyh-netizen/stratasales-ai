import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  Building2, 
  CheckSquare, 
  BarChart3,
  Settings,
  Bell,
  Shield
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationProps {
  className?: string;
}

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
    active: true,
  },
  {
    title: "Tasks",
    icon: CheckSquare,
    path: "/tasks",
    badge: "12",
  },
  {
    title: "Leads",
    icon: Users,
    path: "/leads",
    badge: "24",
  },
  {
    title: "Opportunities",
    icon: Target,
    path: "/opportunities",
    badge: "8",
  },
  {
    title: "Battle Cards",
    icon: Shield,
    path: "/battle-cards",
    badge: "3",
  },
  {
    title: "Accounts",
    icon: Building2,
    path: "/accounts",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
];

export function Navigation({ className }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeItem = location.pathname;

  return (
    <div className={cn("flex flex-col h-screen bg-card border-r border-border shadow-soft", className)}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">DATASales AI</h1>
            <p className="text-xs text-muted-foreground">Sales Intelligence</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.path;
          
          return (
            <Button
              key={item.path}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start space-x-3 h-10 px-3",
                isActive && "bg-primary/10 text-primary border-primary/20"
              )}
              onClick={() => navigate(item.path)}
            >
              <Icon className="w-4 h-4" />
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button variant="ghost" size="sm" className="w-full justify-start space-x-3">
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
          <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full ml-auto">
            3
          </span>
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start space-x-3">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Button>
      </div>
    </div>
  );
}