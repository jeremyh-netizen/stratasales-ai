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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="ml-64 p-6">
        <div className={`transition-all duration-300 ${
          selectedContact ? 'grid grid-cols-2 gap-6' : ''
        }`}>
          <div className="space-y-6">
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
          
          {selectedContact && (
            <div className="space-y-6">
              <ContactDetails 
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Contacts;