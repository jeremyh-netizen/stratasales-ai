// Strategic Intelligence Data Models and Types

export interface StrategicAccount {
  id: string;
  name: string;
  industry: string;
  size: string;
  primaryContact: string;
  email: string;
  phone: string;
  revenue: string;
  healthScore: number;
  lastActivity: string;
  status: "Active" | "Prospect" | "Inactive";
  
  // Strategic Intelligence Extensions
  strategicProfile: {
    mission: string;
    marketPosition: string;
    recentFunding?: {
      amount: string;
      round: string;
      date: string;
      leadInvestor: string;
      totalFunding: string;
    };
    growthStage: "startup" | "growth" | "scale" | "enterprise";
    employees: number;
    keyPressures: string[];
    competitiveThreats: string[];
  };
  
  businessIntelligence: {
    painPoints: string[];
    buyingSignals: string[];
    technologyStack: string[];
    scalingChallenges: string[];
    budgetAuthority: string;
    decisionTimeline: string;
  };
  
  stakeholders: StrategicContact[];
  
  outreachStrategy: {
    valueProposition: string;
    messagingFramework: string[];
    competitivePositioning: string;
    roiModel: {
      costSavings: string;
      efficiencyGains: string;
      revenueImpact: string;
    };
  };
}

export interface StrategicContact {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  company: string;
  department: string;
  
  // Persona Intelligence
  professionalBackground: {
    education: string;
    careerPath: string[];
    keyExperience: string[];
    expertise: string[];
  };
  
  decisionMaking: {
    authority: "high" | "medium" | "low";
    influence: "high" | "medium" | "low";
    budgetControl: boolean;
    vendorSelection: boolean;
    implementationOversight: boolean;
  };
  
  strategicPriorities: {
    primary: string[];
    painPoints: string[];
    success_metrics: string[];
    communicationStyle: string;
  };
  
  engagementStrategy: {
    preferredChannels: string[];
    messagingAngles: string[];
    valueDrivers: string[];
    relationship_strength: "strong" | "developing" | "cold";
  };
}

export interface OutreachPlaybook {
  id: string;
  accountId: string;
  name: string;
  objective: string;
  
  executiveSummary: {
    strategicImperative: string;
    corePremise: string;
    anticipatedOutcomes: string[];
  };
  
  valueProposition: {
    primaryBenefits: string[];
    proofPoints: string[];
    competitiveDifferentiation: string[];
  };
  
  messagingFramework: {
    act1: {
      title: string;
      focus: string;
      keyMessages: string[];
      proofPoints: string[];
    };
    act2: {
      title: string;
      focus: string;
      keyMessages: string[];
      proofPoints: string[];
    };
  };
  
  targetPersonas: {
    primary: string;
    secondary: string[];
    stakeholderMap: string[];
  };
}

// Mock Strategic Data
export const mockStrategicAccounts: StrategicAccount[] = [
  {
    id: "1",
    name: "Clerkie.io",
    industry: "Fintech",
    size: "11-50",
    primaryContact: "Johnny Krueger",
    email: "johnny.krueger@clerkie.io",
    phone: "+1 (555) 123-4567",
    revenue: "$5.2M",
    healthScore: 92,
    lastActivity: "1 day ago",
    status: "Active",
    
    strategicProfile: {
      mission: "Democratize financial wellness by helping over 100 million Americans ease their debt burden",
      marketPosition: "AI-powered financial automation platform with dual B2C/B2B model",
      recentFunding: {
        amount: "$33M",
        round: "Series A",
        date: "April 2023",
        leadInvestor: "Left Lane Capital",
        totalFunding: "$41M"
      },
      growthStage: "growth",
      employees: 35,
      keyPressures: [
        "Scale operations 10x-100x without failure",
        "Manage burn rate to maximize runway",
        "Deliver sophisticated B2B analytics to lenders",
        "Handle sensitive PFI data at scale"
      ],
      competitiveThreats: [
        "Incumbent financial software providers",
        "Big tech entering fintech space",
        "Rising interest rates affecting market"
      ]
    },
    
    businessIntelligence: {
      painPoints: [
        "Data silos across microservices architecture",
        "Escalating AWS costs as data volume grows",
        "Manual reporting slowing board-level decisions",
        "Engineering resources diverted from core product"
      ],
      buyingSignals: [
        "Recent $33M funding requires operational efficiency",
        "Building B2B CRM 'Fiber' platform dependent on analytics",
        "Board includes data-centric fintech leaders",
        "Aggressive scaling timeline with lean team"
      ],
      technologyStack: [
        "Node.js",
        "AWS",
        "MongoDB", 
        "Next.js",
        "SQL"
      ],
      scalingChallenges: [
        "Data fragmentation across services",
        "Unpredictable infrastructure costs",
        "Cross-functional alignment on KPIs",
        "Real-time analytics for B2B clients"
      ],
      budgetAuthority: "COO has P&L responsibility, CEO approval for >$500K",
      decisionTimeline: "Q1 2024 infrastructure decisions for year"
    },
    
    stakeholders: [
      {
        id: "c1",
        name: "Johnny Krueger",
        title: "Chief Operating Officer",
        email: "johnny.krueger@clerkie.io",
        phone: "+1 (555) 123-4567",
        company: "Clerkie.io",
        department: "Operations",
        
        professionalBackground: {
          education: "BS Finance & Information Systems, Boston College",
          careerPath: [
            "Microsoft - Associate Producer & Product Manager",
            "GE Capital - Financial Management Program",
            "GE Capital - Director Strategy & Consulting"
          ],
          keyExperience: [
            "Financial rigor at Fortune 500 companies",
            "Treasury and Portfolio Analysis",
            "Strategic consulting and FP&A"
          ],
          expertise: [
            "Financial modeling and ROI analysis",
            "Information systems architecture", 
            "Operational scaling",
            "Risk management"
          ]
        },
        
        decisionMaking: {
          authority: "high",
          influence: "high", 
          budgetControl: true,
          vendorSelection: true,
          implementationOversight: true
        },
        
        strategicPriorities: {
          primary: [
            "Capital efficiency and burn rate management",
            "Operational scaling without failure",
            "Cross-functional efficiency",
            "Board reporting and visibility"
          ],
          painPoints: [
            "Unquantified infrastructure risk",
            "Unpredictable AWS costs",
            "Manual reporting processes",
            "Engineering bandwidth constraints"
          ],
          success_metrics: [
            "Infrastructure TCO optimization",
            "Operational efficiency improvements",
            "Time-to-market for Fiber platform",
            "Board-level KPI accuracy"
          ],
          communicationStyle: "Data-driven, ROI-focused, process-oriented"
        },
        
        engagementStrategy: {
          preferredChannels: ["Email", "LinkedIn", "Phone"],
          messagingAngles: [
            "Risk mitigation and TCO reduction",
            "Operational efficiency at scale",
            "Financial modeling and ROI",
            "Strategic infrastructure planning"
          ],
          valueDrivers: [
            "Quantified cost savings",
            "Operational risk reduction", 
            "Time-to-market acceleration",
            "Resource optimization"
          ],
          relationship_strength: "developing"
        }
      }
    ],
    
    outreachStrategy: {
      valueProposition: "Transform infrastructure liability into revenue-generating asset while de-risking scale",
      messagingFramework: [
        "De-Risk Your Scale: Address immediate operational challenges", 
        "Accelerate Your Roadmap: Enable B2B revenue growth",
        "Optimize Capital Efficiency: Reduce TCO by 40-86%"
      ],
      competitivePositioning: "Unified data platform vs fragmented point solutions",
      roiModel: {
        costSavings: "40-86% reduction in data infrastructure TCO",
        efficiencyGains: "60% improvement in operational efficiency",
        revenueImpact: "43% uplift in customer retention via embedded analytics"
      }
    }
  },
  
  {
    id: "2", 
    name: "TechCorp Solutions",
    industry: "Technology",
    size: "500-1000",
    primaryContact: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com", 
    phone: "+1 (555) 987-6543",
    revenue: "$2.5M",
    healthScore: 85,
    lastActivity: "2 days ago",
    status: "Active",
    
    strategicProfile: {
      mission: "Enable digital transformation through innovative cloud solutions",
      marketPosition: "Mid-market technology solutions provider",
      growthStage: "scale",
      employees: 750,
      keyPressures: [
        "Digital transformation market competition",
        "Client demand for real-time analytics",
        "Talent acquisition in competitive market"
      ],
      competitiveThreats: [
        "Cloud hyperscalers entering market",
        "New AI-powered competitors",
        "Economic uncertainty affecting IT budgets"
      ]
    },
    
    businessIntelligence: {
      painPoints: [
        "Fragmented client reporting systems", 
        "High manual effort in data preparation",
        "Lack of real-time insights for clients"
      ],
      buyingSignals: [
        "Investing in client experience improvements",
        "Expanding analytics team",
        "Recent RFPs mentioning embedded analytics"
      ],
      technologyStack: [
        "Azure",
        "Microsoft Stack", 
        "Power BI",
        ".NET",
        "SQL Server"
      ],
      scalingChallenges: [
        "Client onboarding speed",
        "Custom analytics delivery",
        "Multi-tenant architecture"
      ],
      budgetAuthority: "CTO has technical decisions, CFO for budget >$250K", 
      decisionTimeline: "Annual planning cycle, Q4 budget approvals"
    },
    
    stakeholders: [
      {
        id: "c2",
        name: "Sarah Johnson",
        title: "Chief Technology Officer",
        email: "sarah.johnson@techcorp.com",
        phone: "+1 (555) 987-6543", 
        company: "TechCorp Solutions",
        department: "Technology",
        
        professionalBackground: {
          education: "MS Computer Science, Stanford University",
          careerPath: [
            "Senior Software Engineer at Google",
            "Engineering Manager at Uber", 
            "VP Engineering at StartupXYZ"
          ],
          keyExperience: [
            "Large-scale distributed systems",
            "Team leadership and scaling", 
            "Product architecture decisions"
          ],
          expertise: [
            "Cloud architecture",
            "Data engineering",
            "Team management", 
            "Product strategy"
          ]
        },
        
        decisionMaking: {
          authority: "high",
          influence: "high",
          budgetControl: true,
          vendorSelection: true, 
          implementationOversight: true
        },
        
        strategicPriorities: {
          primary: [
            "Technical excellence and innovation",
            "Team productivity and efficiency",
            "Client satisfaction through technology",
            "Scalable architecture decisions"
          ],
          painPoints: [
            "Technical debt accumulation",
            "Engineering team bandwidth", 
            "Client customization requests",
            "Technology vendor evaluation"
          ],
          success_metrics: [
            "System performance and reliability",
            "Development velocity",
            "Client technical satisfaction",
            "Technology ROI"
          ],
          communicationStyle: "Technical depth, evidence-based, pragmatic"
        },
        
        engagementStrategy: {
          preferredChannels: ["Email", "Technical demos", "Slack"],
          messagingAngles: [
            "Technical architecture benefits",
            "Engineering efficiency gains",
            "Scalability and performance",
            "Developer experience improvements"
          ],
          valueDrivers: [
            "Reduced technical complexity",
            "Faster feature delivery",
            "Improved system reliability", 
            "Team productivity gains"
          ],
          relationship_strength: "developing"
        }
      }
    ],
    
    outreachStrategy: {
      valueProposition: "Accelerate client value delivery while reducing engineering overhead",
      messagingFramework: [
        "Simplify Architecture: Reduce technical complexity and maintenance",
        "Accelerate Delivery: Enable faster client feature rollouts", 
        "Scale Efficiently: Handle growth without proportional resource increases"
      ],
      competitivePositioning: "Developer-first platform vs enterprise-heavy solutions",
      roiModel: {
        costSavings: "50% reduction in analytics development time",
        efficiencyGains: "3x faster client onboarding", 
        revenueImpact: "25% increase in client retention through better insights"
      }
    }
  }
];