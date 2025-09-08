import { Navigation } from "@/components/layout/navigation";
import { Phone, Calendar, Clock, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Meetings() {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <Navigation />
      <main className="flex-1 flex flex-col">
        <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Meeting and Calls</h1>
                  <p className="text-muted-foreground">Manage your scheduled calls and meetings</p>
                </div>
              </div>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule New Call
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 container mx-auto px-6 py-6">
          <div className="grid gap-6">
            {/* Upcoming Meetings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Upcoming Meetings
                </CardTitle>
                <CardDescription>
                  Your scheduled calls and meetings for the next 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Discovery Call - TechCorp",
                      time: "Today, 2:00 PM",
                      attendees: ["John Smith", "Sarah Johnson"],
                      type: "discovery"
                    },
                    {
                      title: "Demo Call - StartupXYZ", 
                      time: "Tomorrow, 10:00 AM",
                      attendees: ["Mike Wilson"],
                      type: "demo"
                    },
                    {
                      title: "Follow-up Call - Enterprise Co",
                      time: "Friday, 3:30 PM", 
                      attendees: ["Lisa Chen", "David Brown"],
                      type: "follow-up"
                    }
                  ].map((meeting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-1">
                        <h3 className="font-medium">{meeting.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {meeting.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {meeting.attendees.join(", ")}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {meeting.type}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Join Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Call Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    Scheduled calls
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-xs text-muted-foreground">
                    Calls completed on time
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28m</div>
                  <p className="text-xs text-muted-foreground">
                    Average call length
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}