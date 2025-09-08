import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, TrendingUp, Users, DollarSign, Clock, X } from "lucide-react";

interface BattleCardProps {
  competitor: string;
  onClose: () => void;
}

interface CompetitorData {
  name: string;
  description: string;
  keyMessage: string;
  challenges: Array<{
    challenge: string;
    solution: string;
  }>;
  capabilities: Array<{
    title: string;
    description: string;
    example: string;
  }>;
  differentiators: Array<{
    feature: string;
    us: string;
    them: string;
    advantage: "strong" | "moderate" | "weak";
  }>;
  objectionResponses: Array<{
    objection: string;
    response: string;
  }>;
  caseStudies: Array<{
    company: string;
    industry: string;
    result: string;
    metric: string;
  }>;
}

const competitorData: Record<string, CompetitorData> = {
  "DataGOL": {
    name: "DataGOL",
    description: "AI-Powered Agentic Data Platform",
    keyMessage: "DataGOL is your unfair advantage. By unifying data, embedding AI agents, and reducing costs, we turn fragmented, delayed reporting into real-time, revenue-driving intelligence.",
    challenges: [
      {
        challenge: "Fragmented data across CRM, ERP, billing, and product systems",
        solution: "Unifies sources into a single intelligent data model, providing a 360° business view."
      },
      {
        challenge: "Slow, manual reporting delaying decisions",
        solution: "AI Agents deliver real-time answers in plain English—no SQL or dashboards."
      },
      {
        challenge: "Compliance & audit gaps in reporting",
        solution: "Built-in governance, audit trails, and automated reconciliation."
      },
      {
        challenge: "Revenue leakage from billing vs. CRM mismatches",
        solution: "Automated reconciliation across systems, preventing errors and disputes."
      },
      {
        challenge: "Lack of customer-facing analytics",
        solution: "Embed iframe dashboards and metrics directly into SaaS platforms."
      },
      {
        challenge: "High cost & long timelines of legacy BI tools",
        solution: "8–10 weeks time-to-value vs. 6–9 months; 40–60% cost savings."
      }
    ],
    capabilities: [
      {
        title: "Unified Data Fabric & 360° Views",
        description: "Consolidates CRM, billing, product, payments, and support into one pane of glass.",
        example: "SaaS CFO reconciles Bookings vs. Billing instantly, avoiding disputes."
      },
      {
        title: "AI-Driven Insights & Automation",
        description: "Always-on monitoring of churn, anomalies, funnel drop-off.",
        example: "RevOps leader gets instant churn cohort analysis, enabling proactive campaigns."
      },
      {
        title: "Embedded Analytics & Customer Reporting",
        description: "SaaS firms embed DataGOL dashboards directly into their product.",
        example: "Remo reduced dashboarding costs by 86% and improved customer retention by 43%."
      },
      {
        title: "Operational Efficiency & Scalability",
        description: "Eliminates analyst bottlenecks and manual Excel stitching.",
        example: "Healthcare SaaS client achieved 60% efficiency gain and 15% revenue growth."
      }
    ],
    differentiators: [
      {
        feature: "Data Unification",
        us: "End-to-end platform (ingest → model → analyze)",
        them: "Separate ETL, BI, and data tools required",
        advantage: "strong"
      },
      {
        feature: "AI Productivity",
        us: "3–10x boost via AI Agents & Co-Pilots",
        them: "Limited automation, manual reporting",
        advantage: "strong"
      },
      {
        feature: "Time to Value",
        us: "8–10 weeks",
        them: "6–12 months",
        advantage: "strong"
      },
      {
        feature: "Cost",
        us: "40–60% savings vs. traditional BI",
        them: "Expensive licenses + heavy engineering cost",
        advantage: "strong"
      },
      {
        feature: "Embedded Analytics",
        us: "Native iframe dashboards & SaaS embedding",
        them: "Add-on or external BI integration",
        advantage: "strong"
      }
    ],
    objectionResponses: [
      {
        objection: "Your platform seems complex - how long will implementation take?",
        response: "That's actually our key advantage. While traditional BI tools take 6-12 months, our unified platform delivers value in 8-10 weeks. We eliminate the complexity of integrating multiple tools."
      },
      {
        objection: "We already have a BI solution in place.",
        response: "Most of our clients had existing BI tools too. The difference is DataGOL unifies everything - your CRM, billing, product data - into one intelligent platform, eliminating the manual work of stitching data together."
      },
      {
        objection: "What about data security and compliance?",
        response: "Security is built into our core. We provide built-in governance, audit trails, and automated reconciliation - actually improving your compliance posture compared to fragmented tools."
      },
      {
        objection: "The cost seems high for another data tool.",
        response: "Actually, our clients see 40-60% cost savings. You're replacing multiple tools - ETL, BI, data modeling - with one platform, plus eliminating the analyst bottlenecks that cost you time and money."
      }
    ],
    caseStudies: [
      {
        company: "Remo",
        industry: "SaaS Platform",
        result: "Reduced dashboarding costs by 86% and improved customer retention by 43%",
        metric: "86% cost reduction, 43% retention increase"
      },
      {
        company: "Healthcare SaaS Client",
        industry: "Healthcare Technology",
        result: "Achieved 60% efficiency gain and 15% revenue growth through automated insights",
        metric: "60% efficiency gain, 15% revenue growth"
      }
    ]
  }
};

export function CompetitorBattleCard({ competitor, onClose }: BattleCardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const data = competitorData[competitor];

  if (!data) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Competitor not found</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p>No battle card available for {competitor}</p>
        </CardContent>
      </Card>
    );
  }

  const getAdvantageIcon = (advantage: string) => {
    switch (advantage) {
      case "strong":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "moderate":
        return <TrendingUp className="h-4 w-4 text-yellow-500" />;
      case "weak":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Battle Card: {data.name}</CardTitle>
            <p className="text-muted-foreground mt-1">{data.description}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="differentiators">Differentiators</TabsTrigger>
            <TabsTrigger value="objections">Objections</TabsTrigger>
            <TabsTrigger value="cases">Case Studies</TabsTrigger>
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="bg-primary/5 p-4 rounded-lg border">
              <h3 className="font-semibold text-primary mb-2">Key Sales Message</h3>
              <p className="text-sm">{data.keyMessage}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">How We Solve Key Challenges</h3>
              <div className="space-y-3">
                {data.challenges.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2">Challenge</Badge>
                        <p className="text-sm text-muted-foreground">{item.challenge}</p>
                      </div>
                      <div>
                        <Badge variant="default" className="mb-2">Our Solution</Badge>
                        <p className="text-sm font-medium">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="differentiators" className="space-y-4">
            <h3 className="font-semibold">Competitive Advantages</h3>
            <div className="space-y-3">
              {data.differentiators.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    {getAdvantageIcon(item.advantage)}
                    <h4 className="font-medium">{item.feature}</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <Badge variant="default" className="mb-2">Our Platform</Badge>
                      <p className="font-medium text-green-700">{item.us}</p>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">Competitor</Badge>
                      <p className="text-muted-foreground">{item.them}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="objections" className="space-y-4">
            <h3 className="font-semibold">Common Objections & Responses</h3>
            <div className="space-y-4">
              {data.objectionResponses.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="mb-3">
                    <Badge variant="outline" className="mb-2">Objection</Badge>
                    <p className="text-sm font-medium text-red-600">{item.objection}</p>
                  </div>
                  <div>
                    <Badge variant="default" className="mb-2">Response</Badge>
                    <p className="text-sm">{item.response}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cases" className="space-y-4">
            <h3 className="font-semibold">Success Stories</h3>
            <div className="grid gap-4">
              {data.caseStudies.map((study, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <div>
                        <h4 className="font-medium">{study.company}</h4>
                        <p className="text-sm text-muted-foreground">{study.industry}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm mb-2">{study.result}</p>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">{study.metric}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="capabilities" className="space-y-4">
            <h3 className="font-semibold">Core Capabilities</h3>
            <div className="grid gap-4">
              {data.capabilities.map((capability, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{capability.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm mb-3">{capability.description}</p>
                    <div className="bg-muted p-3 rounded">
                      <p className="text-sm font-medium">Example:</p>
                      <p className="text-sm text-muted-foreground mt-1">{capability.example}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}