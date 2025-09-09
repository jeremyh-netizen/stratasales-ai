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
  status: "Lead" | "Opportunity" | "Active";
  
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
    keyThesis: string;
  };
  
  personaAnalysis: {
    professionalTrajectory: string;
    coreCompetencies: string[];
    receptivityFactors: string[];
    decisionMakingContext: string;
  };
  
  messagingFramework: {
    act1: {
      title: string;
      focus: string;
      narrative: string;
      keyMessages: string[];
      proofPoints: string[];
      metricsSupport: string[];
    };
    act2: {
      title: string;
      focus: string;
      narrative: string;
      keyMessages: string[];
      proofPoints: string[];
      metricsSupport: string[];
    };
  };
  
  painPointMatrix: {
    painPoint: string;
    valueProposition: string;
    supportingProof: string;
  }[];
  
  outreachCadence: {
    email1: {
      subject: string;
      strategicRationale: string;
      body: string;
      timing: string;
    };
    email2: {
      subject: string;
      strategicRationale: string;
      body: string;
      timing: string;
    };
    email3: {
      subject: string;
      strategicRationale: string;
      body: string;
      timing: string;
    };
    email4: {
      subject: string;
      strategicRationale: string;
      body: string;
      timing: string;
    };
  };
  
  objectionHandling: {
    objection: string;
    rebuttal: string;
    strategicAngle: string;
  }[];
  
  engagementProtocols: {
    discoveryQuestions: string[];
    pivotStrategies: string[];
    nextSteps: string[];
  };
}

export interface AIInsights {
  accountId: string;
  lastUpdated: string;
  
  readinessScoring: {
    overall: number;
    fundingStage: {
      score: number;
      analysis: string;
      indicators: string[];
    };
    techStackFit: {
      score: number;
      analysis: string;
      compatibilityFactors: string[];
    };
    buyingSignals: {
      score: number;
      analysis: string;
      signals: string[];
    };
    timingIndicators: {
      score: number;
      analysis: string;
      optimalWindow: string;
    };
  };
  
  personaIntelligence: {
    communicationOptimization: {
      preferredStyle: string;
      keyLanguage: string[];
      avoidanceFactors: string[];
    };
    influenceMapping: {
      primaryInfluencers: string[];
      decisionProcess: string;
      keyStakeholders: string[];
    };
    engagementTiming: {
      bestDays: string[];
      bestTimes: string[];
      cadenceRecommendation: string;
    };
  };
  
  strategicRecommendations: {
    messagingPriority: string[];
    competitiveAngles: string[];
    roiModelCustomization: {
      primaryMetrics: string[];
      customizationFactors: string[];
    };
    riskMitigationTalking: string[];
  };
  
  engagementOptimization: {
    bestApproach: "email-sequence" | "direct-call" | "warm-intro" | "event-based";
    stakeholderPrioritization: {
      contact: string;
      priority: number;
      rationale: string;
    }[];
    contentPersonalization: string[];
    followUpOptimization: {
      cadence: string;
      channelMix: string[];
      contentProgression: string[];
    };
  };
}

// Mock Playbook Data
export const mockOutreachPlaybooks: OutreachPlaybook[] = [
  {
    id: "p1",
    accountId: "1",
    name: "Strategic Outreach Playbook: Engaging Clerkie.io for High-Growth Partnership",
    objective: "Position DataGOL as essential partner during critical post-Series A scaling phase",
    
    executiveSummary: {
      strategicImperative: "Position DataGOL as an essential partner to clerkie.io during its critical post-Series A scaling phase",
      corePremise: "Clerkie.io's data-dependent mission requires commensurate data infrastructure agility to avoid growth bottlenecks",
      anticipatedOutcomes: [
        "60% improvement in operational efficiency",
        "40-86% cost savings in data infrastructure TCO", 
        "43% uplift in customer retention"
      ],
      keyThesis: "Transform infrastructure liability into revenue-generating asset while de-risking scale"
    },
    
    personaAnalysis: {
      professionalTrajectory: "Classically trained finance and operations professional forged in Microsoft and GE Capital's disciplined corporate environments",
      coreCompetencies: [
        "Financial modeling and ROI analysis",
        "Information systems architecture",
        "Operational scaling and risk management",
        "P&L statements and TCO analysis"
      ],
      receptivityFactors: [
        "Fluent in quantified financial implications of technical infrastructure decisions",
        "Experienced with operational dysfunction at scale from GE/Microsoft background",
        "Acutely sensitive to unquantified risk and capital efficiency"
      ],
      decisionMakingContext: "Managing future liability without clear balance sheet entry - needs concrete financial models to quantify infrastructure risk"
    },
    
    messagingFramework: {
      act1: {
        title: "De-Risk Your Scale",
        focus: "Address immediate operational challenges as COO",
        narrative: "Focus on Johnny Krueger's immediate, internal pain points. Demonstrate how DataGOL solves operational challenges of scaling by unifying data stack, slashing TCO, and automating board-level reporting.",
        keyMessages: [
          "Unify your data stack and eliminate redundant tool licensing",
          "Real-time, self-serve analytics for board reporting",
          "Single source of truth for all business data",
          "Drastic TCO reduction during post-Series A scaling"
        ],
        proofPoints: [
          "Healthcare company: 60% increase in operational efficiency",
          "40% cost savings in infrastructure",
          "Eliminate 1-2 day reporting delays",
          "95% cost reduction vs traditional AI stack"
        ],
        metricsSupport: [
          "60% operational efficiency improvement",
          "40% direct cost savings",
          "Project timelines from 9+ months to 8-10 weeks"
        ]
      },
      act2: {
        title: "Accelerate Your Roadmap & Revenue", 
        focus: "Strategic top-line oriented message for revenue growth",
        narrative: "Reframe DataGOL from cost-saving utility into revenue-generating asset. Show how it enhances Clerkie's B2B 'Fiber' product with embedded analytics for competitive advantage.",
        keyMessages: [
          "Accelerate 'Fiber' platform with best-in-class embedded analytics",
          "Enable customer-facing dashboards in weeks, not months", 
          "Improve customer retention through demonstrable ROI",
          "Create powerful competitive differentiator"
        ],
        proofPoints: [
          "Remo case study: 86% reduction in dashboarding costs",
          "43% increase in customer retention",
          "3-4 weeks implementation vs 4+ months traditional",
          "Speed-to-market advantage of 7 months"
        ],
        metricsSupport: [
          "86% cost reduction in dashboarding",
          "43% customer retention increase", 
          "3-4 week vs 4+ month delivery timeline"
        ]
      }
    },
    
    painPointMatrix: [
      {
        painPoint: "Spiraling infrastructure costs during post-Series A scaling",
        valueProposition: "Drastic TCO Reduction: Unify your data stack and eliminate redundant tool licensing and maintenance",
        supportingProof: "86% dashboarding cost reduction (Remo), 95% cost reduction vs traditional AI stack, 40% cost savings (Healthcare)"
      },
      {
        painPoint: "Slow, manual reporting to board and CEO hindering agile decision-making",
        valueProposition: "Real-Time, Self-Serve Analytics: Empower organization with unified dashboards and natural language queries",  
        supportingProof: "Deliver immediate post-event reporting instead of 1-2 day delay (Remo), Real-time Dashboards and Natural Language Queries"
      },
      {
        painPoint: "Data silos between product, engineering, and GTM teams creating friction",
        valueProposition: "Single Vertical Platform: Create single source of truth for all business data, from product usage to financial metrics",
        supportingProof: "60% Increase in operational efficiency (Healthcare), addresses data silos preventing unified dashboards"
      },
      {
        painPoint: "Long development cycles for new data-centric features in 'Fiber' platform",
        valueProposition: "Accelerated Time-to-Market: Leverage embedded analytics to deliver customer-facing dashboards in weeks, not months",
        supportingProof: "Reduced project timelines from 9+ months to 8-10 weeks (Healthcare), 3-4 weeks vs 4+ months (Remo)"
      },
      {
        painPoint: "Risk of customer churn due to lack of demonstrable ROI for lender clients",
        valueProposition: "Enhanced Customer Value & Retention: Provide best-in-class embedded analytics to prove Fiber platform value",
        supportingProof: "Led to 43% increase in retention (Remo), Enable excellent customer experience and retention"
      }
    ],
    
    outreachCadence: {
      email1: {
        subject: "A question about Clerkie's scaling efficiency",
        strategicRationale: "Establish relevance and credibility with quantified result speaking directly to COO responsibilities managing new funding. Concise, respects time, focuses on capital-efficient scaling.",
        body: "Johnny,\n\nCongratulations to the Clerkie team on the recent $33M Series A. Scaling operations efficiently after a new funding round is a critical challenge.\n\nMy firm, DataGOL, recently partnered with a healthcare tech company post-funding to unify their data infrastructure. The result was a 60% increase in operational efficiency and 40% in direct cost savings—freeing up capital and engineering cycles to focus on their core product.\n\nGiven your background in financial management and operations, I thought this benchmark might be relevant as you plan Clerkie's next phase of growth.\n\nWould 15 minutes next week be worthwhile to explain how they achieved this?\n\nBest,\nDataGOL",
        timing: "Initial outreach"
      },
      email2: {
        subject: "Re: Clerkie's scaling efficiency",
        strategicRationale: "Demonstrate multi-faceted understanding by pivoting from internal cost savings to external product enhancement and revenue generation. Introduces Remo case study as direct parallel to Fiber platform opportunity.",
        body: "Johnny,\n\nFollowing up on my previous note about operational efficiency.\n\nBeyond internal cost savings, a key challenge for B2B SaaS platforms is demonstrating value to clients through data. We worked with Remo, another SaaS company, who faced this exact issue with their customer-facing dashboards.\n\nBy embedding our analytics platform instead of building it in-house, they cut their dashboarding costs by 86% and, more importantly, increased customer retention by 43%.\n\nAs you continue to develop the \"Fiber\" platform for lenders, this strategy could represent a significant accelerator for your roadmap and a powerful tool for customer retention.\n\nDo you have a brief window to discuss how this might apply to Clerkie?\n\nBest,\nDataGOL",
        timing: "2-3 business days after first email"
      },
      email3: {
        subject: "A TCO model for your data stack",
        strategicRationale: "Shift dynamic from asking for time to providing tangible value. Addresses COO's latent pain of 'unquantified risk' with concrete financial model, positioning DataGOL as strategic advisor.",
        body: "Johnny,\n\nOne last thought. As you scale Clerkie, the total cost of ownership for a fragmented data stack (BI tools, warehousing, ETL, headcount) can quickly exceed $1M in the first 18 months.\n\nWe've built a straightforward model based on this reality that other COOs have found valuable for planning and risk mitigation. I've attached a high-level summary.\n\nHappy to walk you through the assumptions we used if it's of interest.\n\nBest,\nDataGOL",
        timing: "3-4 business days after second email"
      },
      email4: {
        subject: "Closing the loop",
        strategicRationale: "Professional closure that creates subtle urgency by signaling end of pursuit. Concisely summarizes core value propositions while leaving door open for future engagement.",
        body: "Johnny,\n\nI'll assume now isn't the right time to connect and won't continue to follow up.\n\nThe substance of my outreach was to propose a path to simultaneously:\n\n• Dramatically lower the TCO of Clerkie's data infrastructure as you scale\n• Accelerate the \"Fiber\" product roadmap with best-in-class embedded analytics to drive retention\n\nIf and when these become a priority, please feel free to get in touch. Wishing you and the Clerkie team all the best for continued growth.\n\nBest,\nDataGOL",
        timing: "4-5 business days after third email"
      }
    },
    
    objectionHandling: [
      {
        objection: "We have an engineering team; we're building this in-house",
        rebuttal: "That's the case with many of our partners. The value isn't in replacing your world-class engineers, but in liberating them. Our platform handles the data plumbing—the warehousing, ETL, and visualization framework—allowing your team to focus 100% of their time on your core IP: the proprietary debt-negotiation and financial automation algorithms that differentiate Clerkie.",
        strategicAngle: "We can deliver in 3-4 weeks what might take your team 9+ months to build, which is a massive speed-to-market advantage"
      },
      {
        objection: "We're too busy with scaling right now to consider a new platform",
        rebuttal: "I understand completely, and that's precisely why this is timely. Our platform is designed to reduce the chaos of scaling, not add to it. By unifying your data sources early in the growth curve, you prevent the creation of data silos and technical debt that become exponentially harder to fix later.",
        strategicAngle: "The implementation is fast—typically 3-4 weeks—and the goal is to give you and your team better visibility and control during your busiest time"
      },
      {
        objection: "It sounds expensive",
        rebuttal: "It's significantly less expensive than the alternative. When you calculate the total cost of ownership of a self-built stack—including licensing for multiple tools like Fivetran and Tableau, cloud warehouse costs, and the salaries for a full data team which can exceed $1.1M annually—our unified platform typically represents a 95% cost reduction.",
        strategicAngle: "We provide a predictable, scalable cost model that eliminates surprise infrastructure bills and reduces headcount dependency"
      }
    ],
    
    engagementProtocols: {
      discoveryQuestions: [
        "As you begin to deploy the $33 million in new capital, what are your top one or two operational priorities for ensuring that capital is used as efficiently as possible?",
        "Could you walk me through the current process for how your executive team and the board get visibility into key business metrics? What is the timeline and level of effort required for that reporting today?",
        "Looking at the 'Fiber' platform roadmap, what are your current plans and timelines for providing data and analytics back to your lender clients? What challenges do you anticipate there?",
        "When you think about the total cost of your data infrastructure over the next 18-24 months—including engineering headcount, tooling, and cloud spend—what is your back-of-the-envelope estimate for that investment?"
      ],
      pivotStrategies: [
        "If no response to Johnny Krueger: Begin technically-focused outreach to CTO Sebastian Wigstrom",
        "Maintain visibility through professional network engagement on posted content",
        "Pause direct outreach for one quarter to avoid fatigue"
      ],
      nextSteps: [
        "Secure discovery meeting focused on operational priorities and capital efficiency",
        "Present TCO model with specific assumptions for Clerkie's situation",
        "Demonstrate embedded analytics capability with Fiber platform parallel"
      ]
    }
  }
];

// Mock AI Insights Data  
export const mockAIInsights: AIInsights[] = [
  {
    accountId: "1",
    lastUpdated: "2024-01-15",
    
    readinessScoring: {
      overall: 87,
      fundingStage: {
        score: 92,
        analysis: "Optimal timing: Post-Series A company with $33M fresh capital and pressure to scale efficiently. Board includes data-centric fintech leaders creating urgency for infrastructure decisions.",
        indicators: [
          "Recent $33M Series A funding creates operational scaling pressure",
          "Board includes data-focused fintech veterans (David Velez, Tom Proulx)",
          "Q1 2024 infrastructure decision timeline aligns with outreach",
          "Aggressive growth targets require operational efficiency gains"
        ]
      },
      techStackFit: {
        score: 85,
        analysis: "Strong technical compatibility with modern microservices architecture. Current Node.js/AWS/MongoDB stack is well-suited for DataGOL integration with minimal disruption.",
        compatibilityFactors: [
          "Modern tech stack (Node.js, AWS, MongoDB) enables easy integration",
          "Microservices architecture creates natural data unification need",
          "Existing SQL knowledge in team reduces learning curve",
          "Cloud-first infrastructure aligns with DataGOL deployment model"
        ]
      },
      buyingSignals: {
        score: 88,
        analysis: "Multiple strong buying signals indicate high purchase intent. B2B platform development dependent on analytics capabilities creates urgency.",
        signals: [
          "Building B2B CRM 'Fiber' platform requiring customer-facing analytics",
          "Mentioned data silos and reporting delays in recent interviews",
          "Engineering team hiring indicates capacity constraints for in-house build",
          "COO background suggests focus on operational efficiency and TCO"
        ]
      },
      timingIndicators: {
        score: 90,
        analysis: "Exceptional timing window due to funding cycle and infrastructure planning phase. Decision-making authority concentrated with COO creates clear engagement path.",
        optimalWindow: "Next 3-6 months during Q1 2024 infrastructure planning cycle"
      }
    },
    
    personaIntelligence: {
      communicationOptimization: {
        preferredStyle: "Data-driven, ROI-focused, process-oriented communication with quantified benefits",
        keyLanguage: [
          "Financial modeling and TCO analysis",
          "Risk mitigation and operational efficiency", 
          "Capital efficiency and burn rate optimization",
          "Quantified metrics and proof points"
        ],
        avoidanceFactors: [
          "Avoid vague benefits without metrics",
          "Don't lead with technology features over business outcomes",
          "Minimize jargon, focus on financial and operational impact"
        ]
      },
      influenceMapping: {
        primaryInfluencers: [
          "Johnny Krueger (COO) - Budget authority and operational decisions",
          "Guy Assad (CEO) - Strategic direction and vendor approvals >$500K",
          "Sebastian Wigstrom (CTO) - Technical evaluation and implementation"
        ],
        decisionProcess: "COO-led evaluation with CEO approval for significant investments. CTO consulted for technical fit assessment.",
        keyStakeholders: [
          "Board members with data expertise (David Velez, Tom Proulx)",
          "VP Engineering for implementation planning",
          "Head of Product for Fiber platform integration"
        ]
      },
      engagementTiming: {
        bestDays: ["Tuesday", "Wednesday", "Thursday"],
        bestTimes: ["9:00-11:00 AM", "2:00-4:00 PM EST"],
        cadenceRecommendation: "Multi-touch sequence over 2-3 weeks with value-add content between touchpoints"
      }
    },
    
    strategicRecommendations: {
      messagingPriority: [
        "Lead with operational efficiency and cost savings (60% efficiency, 40% cost reduction)",
        "Emphasize risk mitigation and capital efficiency for post-Series A scaling",
        "Highlight Fiber platform acceleration and customer retention benefits",
        "Include concrete TCO model showing $1M+ infrastructure cost avoidance"
      ],
      competitiveAngles: [
        "Unified platform vs fragmented point solutions requiring integration",
        "Speed-to-market advantage (weeks vs months) for customer-facing analytics",
        "Predictable cost model vs unpredictable infrastructure scaling costs",
        "Purpose-built for fintech with compliance and security requirements"
      ],
      roiModelCustomization: {
        primaryMetrics: [
          "Infrastructure TCO reduction (40-86%)",
          "Operational efficiency improvement (60%)",
          "Time-to-market acceleration (9 months to 8-10 weeks)",
          "Customer retention uplift (43%)"
        ],
        customizationFactors: [
          "Factor in Clerkie's current AWS spend trajectory",
          "Include engineering headcount cost avoidance",
          "Model Fiber platform revenue acceleration",
          "Calculate board reporting time savings"
        ]
      },
      riskMitigationTalking: [
        "Prevent data silos that become exponentially expensive to fix later",
        "Eliminate unpredictable infrastructure cost spikes during growth",
        "Reduce dependency on hard-to-find data engineering talent",
        "Mitigate technical debt accumulation in core product development"
      ]
    },
    
    engagementOptimization: {
      bestApproach: "email-sequence",
      stakeholderPrioritization: [
        {
          contact: "Johnny Krueger (COO)",
          priority: 1,
          rationale: "Primary decision maker with budget authority and operational pain points alignment"
        },
        {
          contact: "Sebastian Wigstrom (CTO)", 
          priority: 2,
          rationale: "Technical validation required, potential secondary entry point if COO outreach stalls"
        },
        {
          contact: "Guy Assad (CEO)",
          priority: 3,
          rationale: "Final approval authority for significant investments, strategic alignment needed"
        }
      ],
      contentPersonalization: [
        "Reference specific Clerkie metrics and funding details for credibility",
        "Use healthcare and Remo case studies as direct parallels",
        "Include Boston College connection if appropriate for rapport building",
        "Mention GE Capital and Microsoft experience to establish credibility"
      ],
      followUpOptimization: {
        cadence: "4-touch sequence over 2-3 weeks with strategic pauses",
        channelMix: ["Email primary", "LinkedIn connection", "Phone follow-up"],
        contentProgression: [
          "Operational efficiency hook with healthcare case study",
          "Revenue acceleration angle with Remo parallel",
          "TCO model as valuable asset provision",
          "Professional closure with value summary"
        ]
      }
    }
  }
];

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
    status: "Lead",
    
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
    status: "Opportunity",
    
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
  },

  {
    id: "3",
    name: "DataFlow Systems",
    industry: "Software",
    size: "100-500",
    primaryContact: "Michael Chen",
    email: "michael.chen@dataflow.com",
    phone: "+1 (555) 456-7890",
    revenue: "$8.5M",
    healthScore: 78,
    lastActivity: "3 days ago",
    status: "Active",
    
    strategicProfile: {
      mission: "Streamline enterprise data workflows with intelligent automation",
      marketPosition: "Enterprise data management solutions provider",
      recentFunding: {
        amount: "$15M",
        round: "Series B",
        date: "June 2023",
        leadInvestor: "Accel Partners",
        totalFunding: "$28M"
      },
      growthStage: "scale",
      employees: 220,
      keyPressures: [
        "Increase customer engagement and retention",
        "Compete with larger enterprise vendors",
        "Deliver advanced analytics capabilities"
      ],
      competitiveThreats: [
        "Established enterprise software vendors",
        "Open source alternatives gaining traction",
        "Cloud providers building native solutions"
      ]
    },
    
    businessIntelligence: {
      painPoints: [
        "Complex client integrations taking months",
        "High customer churn after initial deployment",
        "Lack of real-time analytics for enterprise clients"
      ],
      buyingSignals: [
        "Active customer success initiatives",
        "Recent hire of VP of Analytics", 
        "Customer feedback requesting better dashboards"
      ],
      technologyStack: [
        "Java",
        "AWS",
        "PostgreSQL",
        "React",
        "Apache Kafka"
      ],
      scalingChallenges: [
        "Customer onboarding complexity",
        "Enterprise security requirements",
        "Multi-tenant performance optimization"
      ],
      budgetAuthority: "VP Engineering and CFO joint approval for >$200K",
      decisionTimeline: "Q2 2024 product roadmap finalization"
    },
    
    stakeholders: [
      {
        id: "c3",
        name: "Michael Chen",
        title: "VP of Engineering",
        email: "michael.chen@dataflow.com",
        phone: "+1 (555) 456-7890",
        company: "DataFlow Systems",
        department: "Engineering",
        
        professionalBackground: {
          education: "PhD Computer Science, MIT",
          careerPath: [
            "Senior Engineer at Facebook",
            "Technical Lead at Airbnb",
            "Principal Engineer at Stripe"
          ],
          keyExperience: [
            "Large-scale system architecture",
            "Data infrastructure scaling",
            "Product engineering leadership"
          ],
          expertise: [
            "Distributed systems",
            "Data engineering",
            "Engineering management",
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
            "Engineering excellence and velocity",
            "Customer success through technology",
            "Scalable product architecture",
            "Team growth and development"
          ],
          painPoints: [
            "Technical debt from rapid growth",
            "Customer integration complexity",
            "Engineering resource allocation",
            "Performance at enterprise scale"
          ],
          success_metrics: [
            "Customer integration time reduction",
            "Product reliability metrics",
            "Engineering team velocity",
            "Customer satisfaction scores"
          ],
          communicationStyle: "Technical, analytical, results-oriented"
        },
        
        engagementStrategy: {
          preferredChannels: ["Email", "Technical calls", "GitHub"],
          messagingAngles: [
            "Engineering efficiency improvements",
            "Technical architecture advantages",
            "Performance and scalability benefits",
            "Developer productivity gains"
          ],
          valueDrivers: [
            "Reduced engineering complexity",
            "Faster customer deployments",
            "Improved system performance",
            "Team productivity enhancement"
          ],
          relationship_strength: "cold"
        }
      }
    ],
    
    outreachStrategy: {
      valueProposition: "Accelerate enterprise customer success while reducing engineering complexity",
      messagingFramework: [
        "Simplify Integration: Reduce customer onboarding from months to weeks",
        "Enhance Performance: Deliver enterprise-grade analytics capabilities",
        "Scale Efficiently: Support growth without proportional engineering overhead"
      ],
      competitivePositioning: "Modern developer experience vs legacy enterprise solutions",
      roiModel: {
        costSavings: "60% reduction in customer integration costs",
        efficiencyGains: "4x faster customer onboarding",
        revenueImpact: "35% improvement in customer retention"
      }
    }
  },

  {
    id: "4",
    name: "CloudScale Analytics",
    industry: "Cloud Services",
    size: "50-200",
    primaryContact: "Lisa Rodriguez",
    email: "lisa.rodriguez@cloudscale.io",
    phone: "+1 (555) 321-0987",
    revenue: "$12.3M",
    healthScore: 82,
    lastActivity: "1 day ago",
    status: "Active",
    
    strategicProfile: {
      mission: "Democratize advanced analytics for modern cloud-native businesses",
      marketPosition: "Cloud-first analytics platform for mid-market companies",
      recentFunding: {
        amount: "$25M",
        round: "Series A",
        date: "September 2023",
        leadInvestor: "Bessemer Venture Partners",
        totalFunding: "$35M"
      },
      growthStage: "growth",
      employees: 95,
      keyPressures: [
        "Rapid customer acquisition in competitive market",
        "Build scalable analytics platform",
        "Establish market differentiation"
      ],
      competitiveThreats: [
        "Well-funded analytics startups",
        "Cloud providers expanding analytics offerings",
        "Traditional BI vendors moving to cloud"
      ]
    },
    
    businessIntelligence: {
      painPoints: [
        "Customer requests for advanced visualizations",
        "Performance issues with large datasets",
        "Complex setup process for new customers"
      ],
      buyingSignals: [
        "Recent funding to expand product capabilities",
        "Hiring spree for engineering and product teams",
        "Customer advisory board feedback on analytics needs"
      ],
      technologyStack: [
        "Python",
        "Google Cloud",
        "BigQuery",
        "React",
        "Docker"
      ],
      scalingChallenges: [
        "Query performance optimization",
        "Multi-cloud data source integration",
        "Customer self-service capabilities"
      ],
      budgetAuthority: "CEO and CTO collaborative decisions for >$150K",
      decisionTimeline: "Q1 2024 platform enhancement roadmap"
    },
    
    stakeholders: [
      {
        id: "c4",
        name: "Lisa Rodriguez",
        title: "Chief Technology Officer",
        email: "lisa.rodriguez@cloudscale.io",
        phone: "+1 (555) 321-0987",
        company: "CloudScale Analytics",
        department: "Technology",
        
        professionalBackground: {
          education: "MS Data Science, UC Berkeley",
          careerPath: [
            "Data Scientist at Netflix",
            "Senior Analytics Engineer at Snowflake",
            "Head of Data Engineering at Datadog"
          ],
          keyExperience: [
            "Analytics platform development",
            "Large-scale data processing",
            "Customer-facing analytics products"
          ],
          expertise: [
            "Data platform architecture",
            "Analytics product development",
            "Performance optimization",
            "Customer success engineering"
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
            "Product performance and reliability",
            "Customer experience optimization",
            "Platform scalability and efficiency",
            "Innovation in analytics capabilities"
          ],
          painPoints: [
            "Platform performance at scale",
            "Customer onboarding complexity",
            "Engineering velocity vs quality balance",
            "Competitive feature differentiation"
          ],
          success_metrics: [
            "Query performance improvements",
            "Customer onboarding time",
            "Platform uptime and reliability",
            "Feature adoption rates"
          ],
          communicationStyle: "Data-driven, customer-focused, pragmatic"
        },
        
        engagementStrategy: {
          preferredChannels: ["Email", "Video calls", "Slack"],
          messagingAngles: [
            "Customer experience enhancements",
            "Platform performance improvements",
            "Analytics innovation opportunities",
            "Engineering efficiency gains"
          ],
          valueDrivers: [
            "Improved customer satisfaction",
            "Enhanced platform capabilities",
            "Reduced operational overhead",
            "Competitive advantage in analytics"
          ],
          relationship_strength: "developing"
        }
      }
    ],
    
    outreachStrategy: {
      valueProposition: "Enhance analytics platform capabilities while improving customer experience",
      messagingFramework: [
        "Accelerate Innovation: Deliver advanced analytics features faster",
        "Optimize Performance: Improve query speed and platform reliability",
        "Enhance Experience: Simplify customer onboarding and self-service"
      ],
      competitivePositioning: "Modern analytics platform vs traditional BI tools",
      roiModel: {
        costSavings: "45% reduction in platform development costs",
        efficiencyGains: "3x faster feature delivery",
        revenueImpact: "28% increase in customer expansion revenue"
      }
    }
  }
];