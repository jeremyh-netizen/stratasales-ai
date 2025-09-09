import { useState } from "react";
import { Navigation } from "@/components/layout/navigation";
import { ContactsHeader } from "@/components/contacts/contacts-header";
import { ContactsFilters } from "@/components/contacts/contacts-filters";
import { ContactsTable } from "@/components/contacts/contacts-table";
import { ContactDetails } from "@/components/contacts/contact-details";

export interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  department: string;
  location: string;
  authority: 'High' | 'Medium' | 'Low';
  education: string;
  experience: string;
  expertise: string[];
  tenure: string;
  background: string;
  priorities: string[];
  linkedInUrl: string;
  websiteUrl: string;
  activity: {
    emailsSent: number;
    emailOpens: number;
    websiteVisits: number;
    downloads: number;
  };
}

const Contacts = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    company: "",
    department: "",
    authority: "",
  });

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <Navigation className="w-64 flex-shrink-0" />
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Contacts List */}
        <div className={`transition-all duration-300 ${selectedContact ? 'w-1/2' : 'w-full'}`}>
          <div className="p-8">
            <ContactsHeader 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            
            <ContactsFilters 
              filters={filters}
              onFiltersChange={setFilters}
            />
            
            <ContactsTable 
              searchQuery={searchQuery}
              filters={filters}
              selectedContact={selectedContact}
              onContactSelect={setSelectedContact}
            />
          </div>
        </div>

        {/* Contact Details Panel */}
        {selectedContact && (
          <div className="w-1/2 border-l border-border bg-card">
            <ContactDetails 
              contact={selectedContact}
              onClose={() => setSelectedContact(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;