import { useState } from "react";
import { Navigation } from "@/components/layout/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CompetitorBattleCard } from "@/components/leads/competitor-battle-card";
import { Search, Shield, Plus, Eye } from "lucide-react";

export default function BattleCards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);

  const battleCards = [
    {
      id: "datagol",
      name: "DataGOL",
      description: "AI-Powered Agentic Data Platform",
      category: "Data & Analytics",
      lastUpdated: "2024-09-08",
      status: "Active",
    },
    {
      id: "tableau",
      name: "Tableau",
      description: "Visual Analytics Platform",
      category: "Business Intelligence",
      lastUpdated: "2024-09-05",
      status: "Active",
    },
    {
      id: "powerbi",
      name: "Power BI",
      description: "Microsoft Business Analytics",
      category: "Business Intelligence", 
      lastUpdated: "2024-09-03",
      status: "Active",
    },
  ];

  const filteredCards = battleCards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedCompetitor) {
    return (
      <div className="flex h-screen bg-background">
        <Navigation className="w-64 flex-shrink-0" />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <CompetitorBattleCard 
              competitor={selectedCompetitor}
              onClose={() => setSelectedCompetitor(null)}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Navigation className="w-64 flex-shrink-0" />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Battle Cards</h1>
                  <p className="text-muted-foreground">
                    Strategic competitor intelligence and objection handling guides
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Battle Card
                  </Button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search battle cards..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Battle Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCards.map((card) => (
                <Card key={card.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{card.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{card.category}</Badge>
                        <Badge 
                          variant={card.status === "Active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {card.status}
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Last updated: {card.lastUpdated}
                      </div>

                      <div className="pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => setSelectedCompetitor(card.name)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Battle Card
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCards.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No battle cards found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? "Try adjusting your search terms." : "Create your first battle card to get started."}
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Battle Card
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}