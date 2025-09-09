import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ContactsFiltersProps {
  filters: {
    company: string;
    department: string;
    authority: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function ContactsFilters({ filters, onFiltersChange }: ContactsFiltersProps) {
  const clearFilter = (key: string) => {
    onFiltersChange({ ...filters, [key]: "" });
  };

  const clearAllFilters = () => {
    onFiltersChange({ company: "", department: "", authority: "" });
  };

  const activeFilters = Object.entries(filters).filter(([_, value]) => value !== "");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select 
          value={filters.company} 
          onValueChange={(value) => onFiltersChange({ ...filters, company: value })}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Companies" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="magaya-corporation">Magaya Corporation</SelectItem>
            <SelectItem value="techflow-solutions">TechFlow Solutions</SelectItem>
            <SelectItem value="innovatecorp">InnovateCorp</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={filters.department} 
          onValueChange={(value) => onFiltersChange({ ...filters, department: value })}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="executive">Executive</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={filters.authority} 
          onValueChange={(value) => onFiltersChange({ ...filters, authority: value })}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Authority Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High">High Authority</SelectItem>
            <SelectItem value="Medium">Medium Authority</SelectItem>
            <SelectItem value="Low">Low Authority</SelectItem>
          </SelectContent>
        </Select>

        {activeFilters.length > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Clear all
          </button>
        )}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map(([key, value]) => (
            <Badge key={key} variant="secondary" className="flex items-center gap-1">
              {key}: {value}
              <button
                onClick={() => clearFilter(key)}
                className="ml-1 hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}