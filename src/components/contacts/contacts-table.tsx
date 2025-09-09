import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Building2, Mail, Phone, ExternalLink, Send, Eye, Globe, Linkedin } from "lucide-react";
import { Contact } from "@/pages/Contacts";
import { useNavigate } from "react-router-dom";

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
    priorities: ["Customer Success Optimization", "Operational Scaling", "Process Excellence"],
    linkedInUrl: "https://linkedin.com/in/dawn-russell-magaya",
    websiteUrl: "https://magaya.com",
    activity: {
      emailsSent: 34,
      emailOpens: 22,
      websiteVisits: 12
    }
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
    priorities: ["Revenue Growth", "Sales Strategy", "Market Expansion"],
    linkedInUrl: "https://linkedin.com/in/mark-buman-magaya",
    websiteUrl: "https://magaya.com",
    activity: {
      emailsSent: 45,
      emailOpens: 31,
      websiteVisits: 18
    }
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
    priorities: ["Financial Operations", "Revenue Growth Alignment", "Strategic Planning"],
    linkedInUrl: "https://linkedin.com/in/eric-ingram-cfo",
    websiteUrl: "https://magaya.com",
    activity: {
      emailsSent: 28,
      emailOpens: 19,
      websiteVisits: 8
    }
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
    priorities: ["Technology Innovation", "Performance Optimization", "Team Development"],
    linkedInUrl: "https://linkedin.com/in/niten-jaiswal-engineering",
    websiteUrl: "https://magaya.com",
    activity: {
      emailsSent: 21,
      emailOpens: 15,
      websiteVisits: 7
    }
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
    priorities: ["Digital Forwarding Innovation", "Rate Management Solutions", "Industry Partnerships"],
    linkedInUrl: "https://linkedin.com/in/david-luttrell-cto",
    websiteUrl: "https://magaya.com",
    activity: {
      emailsSent: 39,
      emailOpens: 25,
      websiteVisits: 14
    }
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
    priorities: ["Technical Excellence", "Architecture Innovation", "Development Best Practices"],
    linkedInUrl: "https://linkedin.com/in/jose-javier-perez-architect",
    websiteUrl: "https://magaya.com",
    activity: {
      emailsSent: 26,
      emailOpens: 17,
      websiteVisits: 9
    }
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
  const navigate = useNavigate();

  const handleCompanyClick = (company: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to accounts page and select Magaya Corporation account
    navigate('/accounts', { 
      state: { 
        selectedAccountName: company,
        openAccountDetails: true
      } 
    });
  };

  const handleLinkedInClick = (linkedInUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };
  
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
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Contact</TableHead>
              <TableHead className="min-w-[200px]">Title & Company</TableHead>
              <TableHead className="min-w-[250px]">Contact Info</TableHead>
              <TableHead className="min-w-[150px]">Activity</TableHead>
              <TableHead className="min-w-[120px]">Authority</TableHead>
              <TableHead className="min-w-[120px]">Department</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow
                key={contact.id}
                className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedContact?.id === contact.id ? 'bg-muted' : ''
                }`}
                onClick={() => onContactSelect(contact)}
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-left justify-start hover:text-primary"
                        onClick={(e) => handleLinkedInClick(contact.linkedInUrl, e)}
                      >
                        <Linkedin className="w-3 h-3 mr-1" />
                        {contact.name}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                      <div className="text-sm text-muted-foreground truncate">{contact.location}</div>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{contact.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Building2 className="w-3 h-3 mr-1 flex-shrink-0" />
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm text-muted-foreground hover:text-primary underline-offset-4"
                        onClick={(e) => handleCompanyClick(contact.company, e)}
                      >
                        {contact.company}
                      </Button>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm flex items-center">
                      <Mail className="w-3 h-3 mr-1 flex-shrink-0 text-muted-foreground" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                    <div className="text-sm flex items-center">
                      <Phone className="w-3 h-3 mr-1 flex-shrink-0 text-muted-foreground" />
                      <span className="truncate">{contact.phone}</span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center text-xs">
                      <Send className="w-3 h-3 mr-1 text-muted-foreground" />
                      <span className="font-medium">{contact.activity.emailsSent}</span>
                      <span className="text-muted-foreground ml-1">sent</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Eye className="w-3 h-3 mr-1 text-muted-foreground" />
                      <span className="font-medium">{contact.activity.emailOpens}</span>
                      <span className="text-muted-foreground ml-1">opens</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Globe className="w-3 h-3 mr-1 text-muted-foreground" />
                      <span className="font-medium">{contact.activity.websiteVisits}</span>
                      <span className="text-muted-foreground ml-1">visits</span>
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
      </div>
      
      {filteredContacts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No contacts found matching your criteria
        </div>
      )}
    </div>
  );
}