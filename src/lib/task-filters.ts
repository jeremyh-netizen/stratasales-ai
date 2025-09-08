import type { FilterState } from "@/pages/Tasks";

export interface Task {
  id: string;
  title: string;
  description: string;
  type: "call" | "email" | "follow-up" | "meeting" | "ai-generated";
  priority: "high" | "medium" | "low";
  dueDate: string;
  contact: {
    id: string;
    name: string;
    company: string;
    avatar: string;
  };
  account: {
    id: string;
    name: string;
  };
  campaign?: {
    id: string;
    name: string;
  };
  predictiveScore: number;
  aiInsights: string[];
  tags: string[];
  completed: boolean;
  createdDate: string;
  industry?: string;
  lastInteraction?: string;
  buyingSignalsScore?: number;
  taskSource?: "manual" | "ai-generated" | "automation";
}

export function filterTasks(tasks: Task[], filters: FilterState): Task[] {
  let filteredTasks = [...tasks];

  // Filter by search term
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower) ||
      task.contact.name.toLowerCase().includes(searchLower) ||
      task.contact.company.toLowerCase().includes(searchLower) ||
      task.account.name.toLowerCase().includes(searchLower)
    );
  }

  // Filter by priority
  if (filters.priority !== "all") {
    filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
  }

  // Filter by type
  if (filters.type !== "all") {
    const typeMapping: Record<string, string[]> = {
      calls: ["call"],
      emails: ["email"],
      "follow-ups": ["follow-up"],
      "ai-generated": ["ai-generated"]
    };
    
    const allowedTypes = typeMapping[filters.type] || [filters.type];
    filteredTasks = filteredTasks.filter(task => allowedTypes.includes(task.type));
  }

  // Filter by date range
  if (filters.dateRange !== "all") {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    filteredTasks = filteredTasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      
      switch (filters.dateRange) {
        case "overdue":
          return dueDate < today;
        case "due-today":
          return dueDate >= today && dueDate < tomorrow;
        case "this-week":
          return dueDate >= today && dueDate <= weekFromNow;
        default:
          return true;
      }
    });
  }

  // Sort tasks
  filteredTasks.sort((a, b) => {
    let comparison = 0;
    
    switch (filters.sortBy) {
      case "predictive-score":
        comparison = b.predictiveScore - a.predictiveScore;
        break;
      case "due-date":
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
        break;
      case "contact":
        comparison = a.contact.name.localeCompare(b.contact.name);
        break;
      case "created":
        comparison = new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        break;
      default:
        comparison = b.predictiveScore - a.predictiveScore;
    }
    
    return filters.sortOrder === "asc" ? comparison : -comparison;
  });

  return filteredTasks;
}

export function getTaskTypeLabel(type: Task["type"]): string {
  const labels: Record<Task["type"], string> = {
    call: "Call",
    email: "Email",
    "follow-up": "Follow-up",
    meeting: "Meeting",
    "ai-generated": "AI Generated"
  };
  return labels[type] || type;
}

export function getPriorityColor(priority: Task["priority"]): string {
  const colors: Record<Task["priority"], string> = {
    high: "destructive",
    medium: "warning", 
    low: "secondary"
  };
  return colors[priority];
}