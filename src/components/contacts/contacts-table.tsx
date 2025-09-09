import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2, Mail, Phone } from "lucide-react";
import { Contact } from "@/pages/Contacts";

// Mock data for the 6 Magaya executives
const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Dawn Russell",
    title: "Chief Operating Officer",
    company: "Magaya Corporation",
    email: "dawn.russell@magaya.com",
    phone: "+1 (305) 715-8090",
    department: "Executive",
    location: "Miami, FL",
    authority: "High",
    education: "Six Sigma Black Belt Certified",
    experience: "10+ years software industry customer success leadership",
    expertise: ["Customer Lifecycle Management", "Operational Excellence", "Scaling Operations", "Six Sigma"],
    tenure: "Promoted to COO March 2025, Previously Chief Customer Officer",
    background: "Previous roles at Blue Ridge (supply chain planning software) and Izenda (embedded analytics)",
    priorities: ["Customer Success Optimization", "Operational Scaling", "Process Excellence"]
  },
  {
    id: "2", 
    name: "Mark Buman",
    title: "Chief Revenue Officer",
    company: "Magaya Corporation",
    email: "mark.buman@magaya.com",
    phone: "+1 (305) 715-8091",
    department: "Sales",
    location: "Miami, FL",
    authority: "High",
    education: "University of Utah Graduate",
    experience: "20+ years technology sales experience",
    expertise: ["Enterprise Sales", "Supply Chain Solutions", "Revenue Growth", "Sales Strategy"],
    tenure: "Current CRO at Magaya Corporation",
    background: "Previous roles at IQMS Software (SVP Sales), HighJump, and Infor",
    priorities: ["Revenue Growth", "Sales Strategy", "Market Expansion"]
  },
  {
    id: "3",
    name: "Eric Ingram", 
    title: "Chief Financial Officer",
    company: "Magaya Corporation",
    email: "eric.ingram@magaya.com",
    phone: "+1 (305) 715-8092",
    department: "Finance",
    location: "Miami, FL", 
    authority: "High",
    education: "MBA from Tennessee Tech University",
    experience: "25+ years finance leadership in PE-funded businesses",
    expertise: ["Financial Operations", "PE-Funded Business Management", "Strategic Finance", "Revenue Alignment"],
    tenure: "Joined June 2024",
    background: "Previous CFO roles at Millennia (healthcare tech) and Logitix (ticketing platform)",
    priorities: ["Financial Operations", "Revenue Growth Alignment", "Strategic Planning"]
  },
  {
    id: "4",
    name: "Niten Jaiswal",
    title: "Vice President of Engineering", 
    company: "Magaya Corporation",
    email: "niten.jaiswal@magaya.com",
    phone: "+1 (305) 715-8093",
    department: "Engineering",
    location: "New York, NY",
    authority: "Medium",
    education: "Columbia University",
    experience: "10+ years enterprise software engineering",
    expertise: ["Database Modernization", "Performance Optimization", "Infrastructure", "Security", "Team Leadership"],
    tenure: "Current VP Engineering at Magaya Corporation",
    background: "Previous roles at AWS, Broadridge, IBM Global Services, and Wizeline. Led recent database modernization achieving 10x performance improvement",
    priorities: ["Technology Innovation", "Performance Optimization", "Team Development"]
  },
  {
    id: "5",
    name: "David Luttrell",
    title: "CTO Digital Forwarding",
    company: "Magaya Corporation", 
    email: "david.luttrell@magaya.com",
    phone: "+1 (305) 715-8094",
    department: "Engineering",
    location: "Miami, FL",
    authority: "Medium",
    education: "MS in Information Science and Technology from Missouri University",
    experience: "15+ years with company through Catapult acquisition",
    expertise: ["Rate Management", "Digital Forwarding Solutions", "Software Architecture", "Industry Integration"],
    tenure: "15+ years (co-founded Catapult International, now Magaya Rate Management)",
    background: "Co-founded Catapult International which became Magaya Rate Management division",
    priorities: ["Digital Forwarding Innovation", "Rate Management Solutions", "Industry Partnerships"]
  },
  {
    id: "6",
    name: "Jose Javier Perez",
    title: "Software Architect/Developer",
    company: "Magaya Corporation",
    email: "jose.perez@magaya.com", 
    phone: "+1 (305) 715-8095",
    department: "Engineering",
    location: "Miami, FL",
    authority: "Medium",
    education: "ISPJAE (Instituto Superior Politécnico José Antonio Echeverría)",
    experience: "15+ years software architecture and development",
    expertise: ["Software Architecture", "Application Development", "Technical Leadership", "System Design"],
    tenure: "15+ years with Magaya Corporation",
    background: "Long-tenure technical professional focused on core software architecture and development",
    priorities: ["Technical Excellence", "Architecture Innovation", "Development Best Practices"]
  }
];

interface ContactsTableProps {
  searchQuery: string;
  filters: {
    company: string;
    department: string; 
    authority: string;
  };
  selectedContact: Contact | null;
  onContactSelect: (contact: Contact) => void;
}

export function ContactsTable({ 
  searchQuery, 
  filters, 
  selectedContact, 
  onContactSelect 
}: ContactsTableProps) {
  
  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCompany = !filters.company || 
                          contact.company.toLowerCase().replace(/\s+/g, '-') === filters.company;
    
    const matchesDepartment = !filters.department ||
                             contact.department.toLowerCase() === filters.department;
    
    const matchesAuthority = !filters.authority ||
                            contact.authority === filters.authority;
    
    return matchesSearch && matchesCompany && matchesDepartment && matchesAuthority;
  });

  const getAuthorityColor = (authority: string) => {
    switch (authority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contact</TableHead>
            <TableHead>Title & Company</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Authority</TableHead>
            <TableHead>Department</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredContacts.map((contact) => (
            <TableRow
              key={contact.id}
              className={`cursor-pointer hover:bg-muted/50 ${
                selectedContact?.id === contact.id ? 'bg-muted' : ''
              }`}
              onClick={() => onContactSelect(contact)}
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-muted-foreground">{contact.location}</div>
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div>
                  <div className="font-medium">{contact.title}</div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Building2 className="w-3 h-3 mr-1" />
                    {contact.company}
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    {contact.email}
                  </div>
                  <div className="text-sm flex items-center">
                    <Phone className="w-3 h-3 mr-1" />
                    {contact.phone}
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <Badge variant="outline" className={getAuthorityColor(contact.authority)}>
                  {contact.authority}
                </Badge>
              </TableCell>
              
              <TableCell>
                <span className="text-sm">{contact.department}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {filteredContacts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No contacts found matching your criteria
        </div>
      )}
    </div>
  );
}