import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  X,
  Mail,
  Phone,
  Building2,
  MapPin,
  GraduationCap,
  Briefcase,
  Target,
  User,
  ChevronDown,
  ChevronUp,
  Calendar,
  MessageSquare,
  UserPlus,
  ExternalLink,
  Globe,
  Linkedin,
  Send,
  Eye,
  BarChart3,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Contact } from "@/pages/Contacts";

interface ContactDetailsProps {
  contact: Contact;
  onClose: () => void;
}

export function ContactDetails({ contact, onClose }: ContactDetailsProps) {
  const [showFullBio, setShowFullBio] = useState(false);
  const navigate = useNavigate();

  const handleCompanyClick = () => {
    navigate('/accounts', { 
      state: { 
        selectedAccountName: contact.company,
        openAccountDetails: true
      } 
    });
  };

  const handleLinkedInClick = () => {
    window.open(contact.linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWebsiteClick = () => {
    window.open(contact.websiteUrl, '_blank', 'noopener,noreferrer');
  };

  const generateBio = (contact: Contact) => {
    const bios: Record<string, string> = {
      "Dawn Russell": "Dawn is a transformative operations leader with over a decade of experience driving customer success and operational excellence in the software industry. As COO of Magaya Corporation, she spearheads strategic initiatives that have revolutionized the customer lifecycle and operational processes. Her Six Sigma Black Belt certification and proven track record at Blue Ridge and Izenda demonstrate her commitment to data-driven process optimization. Dawn is passionate about scaling operations while maintaining the highest standards of customer satisfaction and organizational efficiency.",
      
      "Mark Buman": "Mark is a seasoned revenue executive with two decades of technology sales leadership, specializing in supply chain and enterprise software solutions. As CRO of Magaya Corporation, he has architected comprehensive sales strategies that drive consistent revenue growth and market expansion. His extensive experience at IQMS Software, HighJump, and Infor has given him deep insights into complex B2B sales cycles and enterprise customer needs. Mark's University of Utah background combined with his hands-on expertise makes him a formidable leader in the competitive technology landscape.",
      
      "Eric Ingram": "Eric is a strategic finance executive with 25+ years of leadership experience in private equity-funded technology businesses. As CFO of Magaya Corporation since June 2024, he brings a wealth of experience from his previous roles at Millennia and Logitix, where he successfully navigated complex financial operations and growth strategies. His MBA from Tennessee Tech University and deep understanding of PE business models position him perfectly to align financial operations with aggressive revenue growth objectives. Eric is known for his analytical approach and ability to drive operational efficiency through financial discipline.",
      
      "Niten Jaiswal": "Niten is an innovative engineering leader with extensive experience building scalable enterprise software solutions at world-class organizations. As VP of Engineering at Magaya Corporation, he has led groundbreaking initiatives including a database modernization project that achieved 10x performance improvements. His Columbia University education and previous roles at AWS, Broadridge, IBM Global Services, and Wizeline have equipped him with deep expertise in cloud infrastructure, security, and high-performance team leadership. Niten is passionate about leveraging cutting-edge technology to solve complex business challenges.",
      
      "David Luttrell": "David is a visionary technology leader with 15+ years of deep domain expertise in digital forwarding and logistics solutions. As CTO of Digital Forwarding at Magaya Corporation, he has been instrumental in shaping the company's rate management and forwarding technology strategy since co-founding Catapult International. His MS in Information Science and Technology from Missouri University, combined with his entrepreneurial experience, gives him unique insights into both technical architecture and business strategy. David continues to drive innovation in the rapidly evolving logistics technology landscape.",
      
      "Jose Javier Perez": "Jose is a distinguished software architect with 15+ years of technical excellence at Magaya Corporation, where he has been instrumental in designing and implementing the core software architecture that powers the company's logistics solutions. His ISPJAE education and long tenure with the organization demonstrate his deep commitment to technical excellence and innovation. Jose's expertise spans software architecture, application development, and technical leadership, making him a cornerstone of Magaya's engineering organization. He continues to drive architectural decisions that ensure scalability, reliability, and performance across all product lines."
    };
    
    return bios[contact.name] || `${contact.name} is an experienced ${contact.title.toLowerCase()} with extensive expertise in their field. Working at ${contact.company}, they focus on driving innovation and operational excellence. ${contact.name} has a proven track record of implementing strategic initiatives that deliver measurable business results. They are actively exploring new technologies and solutions to enhance their organization's competitive advantage.`;
  };

  const bio = generateBio(contact);
  const bioSentences = bio.split('. ').filter(sentence => sentence.trim());
  const shortBio = bioSentences.slice(0, 2).join('. ') + (bioSentences.length > 2 ? '.' : '');

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
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-lg">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-xl">{contact.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLinkedInClick}
                    className="p-1 h-8 w-8"
                  >
                    <Linkedin className="w-4 h-4 text-blue-600" />
                  </Button>
                </div>
                <p className="text-muted-foreground">{contact.title}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <Badge variant="outline" className={getAuthorityColor(contact.authority)}>
                    {contact.authority} Authority
                  </Badge>
                  <span className="text-sm text-muted-foreground">{contact.department}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <User className="w-4 h-4 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{contact.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{contact.phone}</span>
              </div>
              <div className="flex items-center">
                <Building2 className="w-4 h-4 mr-2 text-muted-foreground" />
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm hover:text-primary"
                  onClick={handleCompanyClick}
                >
                  {contact.company}
                </Button>
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm hover:text-primary"
                  onClick={handleWebsiteClick}
                >
                  {contact.websiteUrl}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{contact.location}</span>
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <User className="w-4 h-4 mr-2" />
                Bio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground leading-relaxed">
                <p>{showFullBio ? bio : shortBio}</p>
                {bioSentences.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 p-0 h-auto font-normal text-primary hover:text-primary/80"
                    onClick={() => setShowFullBio(!showFullBio)}
                  >
                    {showFullBio ? (
                      <>
                        Show less <ChevronUp className="w-3 h-3 ml-1" />
                      </>
                    ) : (
                      <>
                        Show more <ChevronDown className="w-3 h-3 ml-1" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Strategic Priorities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Strategic Priorities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {contact.priorities.map((priority, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span className="text-sm">{priority}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{contact.education}</p>
            </CardContent>
          </Card>

          {/* Professional Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                Professional Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm">Current Role</h4>
                <p className="text-sm text-muted-foreground">{contact.tenure}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Background</h4>
                <p className="text-sm text-muted-foreground">{contact.background}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Experience Summary</h4>
                <p className="text-sm text-muted-foreground">{contact.experience}</p>
              </div>
            </CardContent>
          </Card>

          {/* Expertise */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Areas of Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {contact.expertise.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          {/* Activity Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Activity Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Eye className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{contact.activity.emailOpens}/{contact.activity.emailsSent}</div>
                  <div className="text-sm text-muted-foreground">Opens/Sent</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Globe className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{contact.activity.websiteVisits}</div>
                  <div className="text-sm text-muted-foreground">Website Visits</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Download className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{contact.activity.downloads}</div>
                  <div className="text-sm text-muted-foreground">Downloads</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <BarChart3 className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{Math.round(((contact.activity.emailOpens / contact.activity.emailsSent) * 0.4 + (contact.activity.websiteVisits / contact.activity.emailsSent) * 0.3 + (contact.activity.downloads / contact.activity.emailsSent) * 0.3) * 100)}</div>
                  <div className="text-sm text-muted-foreground">Engagement</div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Email Open Rate:</span>
                    <span className="font-medium">{Math.round((contact.activity.emailOpens / contact.activity.emailsSent) * 100)}%</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Download Rate:</span>
                    <span className="font-medium">{Math.round((contact.activity.downloads / contact.activity.emailsSent) * 100)}%</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Overall Engagement:</span>
                    <span className="font-medium text-primary">
                      {Math.round(((contact.activity.emailOpens / contact.activity.emailsSent) * 0.4 + (contact.activity.websiteVisits / contact.activity.emailsSent) * 0.3 + (contact.activity.downloads / contact.activity.emailsSent) * 0.3) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Note
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Add to Campaign
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Eye className="w-3 h-3 mr-2 text-muted-foreground" />
                    <span>Opened email: Q4 Product Updates</span>
                  </div>
                  <span className="text-muted-foreground">2 days ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Globe className="w-3 h-3 mr-2 text-muted-foreground" />
                    <span>Visited pricing page</span>
                  </div>
                  <span className="text-muted-foreground">3 days ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Send className="w-3 h-3 mr-2 text-muted-foreground" />
                    <span>Email sent: Feature announcement</span>
                  </div>
                  <span className="text-muted-foreground">1 week ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}